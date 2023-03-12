import { readFile } from 'fs/promises';
import { Messages } from '@salesforce/core';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import * as snowflake from 'snowflake-sdk';

// import {SnowflakeImportResult} from '../types'
export type SnowflakeImportResult = {
  account: string;
  username: string;
  query: string;
  data: object;
  time: string;
};

Messages.importMessagesDirectory(__dirname);
const messages = Messages.load('snarf', 'snowflake.query', [
  'summary',
  'description',
  'examples',
  'flags.account.summary',
  'flags.username.summary',
  'flags.query.summary',
  'info.snowflake',
]);

export default class SnowflakeImport extends SfCommand<SnowflakeImportResult> {
    public static readonly summary = messages.getMessage('summary');
    public static readonly description = messages.getMessage('description');
    public static readonly examples = messages.getMessages('examples');
  
    public static flags = {
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
      query: Flags.string({
        char: 'q',
        summary: messages.getMessage('flags.query.summary')
      }),
    };

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
          complete: (err, stmt, rows) => {
            if (err) {
              console.error(
                "Failed to execute statement due to the following error: " +
                err.message
              )
            } else {
              // console.log("Number of rows produced: " + rows.length)
              // return bulkv2(JSON.parse(JSON.stringify(rows)))
              if(err) {
                  console.log(err)
                  return stmt
              }
              return {rows, stmt}
            }
          },
        })
      })
    }

    public async run(): Promise<SnowflakeImportResult> {
      const { flags } = await this.parse(SnowflakeImport);
      const time = new Date().toDateString();

      const snowQuery = await this.snowflakeConn(
        flags.account,
        flags.username,
        flags.query
      )

      this.log('bulkJob',snowQuery)
      this.log(messages.getMessage('info.snowflake', [
        flags.account, 
        flags.username,
        flags.query, 
      ]));
      return {
        account: flags.account,
        username: flags.username,
        data: snowQuery,
        query: flags.query,
        time: time
      };
    }
  }
  