import { readFile } from 'fs/promises';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Connection, Messages } from '@salesforce/core';
import * as sfbulk2 from 'node-sf-bulk2';
import * as snowflake from 'snowflake-sdk';

// import {SnowflakeImportResult} from '../types'
export type SnowflakeImportResult = {
  account: string;
  username: string;
  sobject: string;
  method: string;
  extIdField: string;
  query: string;
  time: string;
};

Messages.importMessagesDirectory(__dirname);
const messages = Messages.load('snarf', 'snowflake.import', [
  'summary',
  'description',
  'examples',
  'flags.account.summary',
  'flags.username.summary',
  'flags.sobject.summary',
  'flags.method.summary',
  'flags.extIdField.summary',
  'flags.query.summary',
  'info.snowflake',
]);

export default class SnowflakeImport extends SfCommand<SnowflakeImportResult> {
    public static readonly summary = messages.getMessage('summary');
    public static readonly description = messages.getMessage('description');
    public static readonly examples = messages.getMessages('examples');
  
    public static flags = {
      'target-org': Flags.requiredOrg({
        char: 'o',
        required: true
      }),
      account: Flags.string({
        char: 'a',
        summary: messages.getMessage('flags.account.summary'),
        required: true
      }),
      username: Flags.string({
        char: 'u',
        summary: messages.getMessage('flags.username.summary'),
        required: true
      }),
      sobject: Flags.string({
        char: 's',
        summary: messages.getMessage('flags.sobject.summary'),
        default: 'Account',
      }),
      method: Flags.string({
        char: 'm',
        summary: messages.getMessage('flags.method.summary'),
        default: 'Upsert',
      }),
      extIdField: Flags.string({
        char: 'e',
        summary: messages.getMessage('flags.extIdField.summary'),
        default: 'Id',
      }),
      query: Flags.string({
        char: 'q',
        summary: messages.getMessage('flags.query.summary')
      }),
    };

    public async arrayToCSV(data) {
      const csv = data.map(row => Object.values(row));
      csv.unshift(Object.keys(data[0]));
      return csv.join('\n');
    }

    public async snowflakeConn(account:string, username:string, sql:string) {
      const sqlQuery = await readFile(sql,{encoding:'utf8', flag:'r'})

      const connection = snowflake.createConnection({
        account: account,
        username: username,
        authenticator: "EXTERNALBROWSER",
      })
      connection.connectAsync()
      .then(() => {
        connection.execute({
          sqlText: sqlQuery,
          complete: async (err, stmt, rows) => {
            if(rows){
              // console.table(rows)
              return JSON.parse(JSON.stringify(rows))
            }
            if (err) {
              console.log(err)
              console.error(
                "Failed to execute statement due to the following error: " +
                err.message
              )
            }
          },
        })
      })
    }

    public async salesforceBulk(conn:Connection, sobject:string, operation:string, extIdField:string, transientData) {
      const bulkConnect = {
        'accessToken': conn.accessToken,
        'apiVersion': '51.0',
        'instanceUrl': conn.instanceUrl
      }
      const bulkrequest = new sfbulk2.BulkAPI2(bulkConnect)
      // create a bulk insert job
      const jobRequest = {
        'object': sobject,
        'operation': operation,
        'contentType': 'CSV',
        'externalIdFieldName': extIdField
      };
      // request job
      const response = await bulkrequest.createDataUploadJob(jobRequest)
      if (response.id) {
        const status = await bulkrequest.uploadJobData(response.contentUrl, await this.arrayToCSV(transientData))
        console.log('status', JSON.stringify(status))
        if (status === 201) {
            // close the job for processing
            await bulkrequest.closeOrAbortJob(response.id, 'UploadComplete');
            return response
        }
      }
    }

    public async run(): Promise<SnowflakeImportResult> {
      const { flags } = await this.parse(SnowflakeImport);
      const time = new Date().toDateString();

      const snowQuery = await this.snowflakeConn(
        flags.account,
        flags.username,
        flags.query
      )

      const conn = flags['target-org'].getConnection();
      const bulkJob = await this.salesforceBulk(conn, flags.sobject, flags.method, flags.extIdField, snowQuery)

      this.log('bulkJob',bulkJob)
      this.log(messages.getMessage('info.snowflake', [
        flags.account, 
        flags.username, 
        flags.sobject, 
        flags.method, 
        flags.extIdField, 
        flags.query, 
      ]));
      return {
        account: flags.account,
        username: flags.username,
        sobject: flags.sobject,
        method: flags.method,
        extIdField: flags.extIdField,
        query: flags.query,
        time: time
      };
    }
  }
  