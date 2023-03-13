import { readFile } from 'fs/promises';
import { Messages } from '@salesforce/core';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import * as snowflake from 'snowflake-sdk';

// import {SnowflakeQueryResult} from '../types'
export type SnowflakeQueryResult = {
  account: string;
  username: string;
  query: string;
  data: any;
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

export default class SnowflakeQuery extends SfCommand<SnowflakeQueryResult> {
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

      const connection = await snowflake.createConnection({
        account: account,
        username: username,
        authenticator: "EXTERNALBROWSER",
      })<any>
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
              console.log(`number of rows ${stmt.getNumRows()}`);
              
              if(err) {
                  console.log(err)
                  return stmt
              }
              if(rows){
                  console.table(rows)
                  return rows
              }
            }
          },
        })
      })
    }

    public async run(): Promise<SnowflakeQueryResult> {
      const { flags } = await this.parse(SnowflakeQuery);
      const time = new Date().toDateString();

      const snowQuery = await this.snowflakeConn(
        flags.account,
        flags.username,
        flags.query
      )
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
  