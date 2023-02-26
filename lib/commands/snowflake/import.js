"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sf_plugins_core_1 = require("@salesforce/sf-plugins-core");
const core_1 = require("@salesforce/core");
// import {snowflake} from 'snowflake-sdk';
//import {sfbulk2} from 'node-sf-bulk2';
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.load('snarf', 'snowflake.import', [
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
class SnowflakeImport extends sf_plugins_core_1.SfCommand {
    // private async snowflakeConn(account:string, username:string, sql:string): Promise<any> {
    //   const connection = snowflake.createConnection({
    //     // account: "sga53801",
    //     // username: "mnewell",
    //     account: account,
    //     username: username,
    //     authenticator: "EXTERNALBROWSER",
    //   })
    //   connection.connectAsync()
    //   .then(() => {
    //     connection.execute({
    //       sqlText: sql,
    //       complete: function (err, stmt, rows) {
    //         if (err) {
    //           console.error(
    //             "Failed to execute statement due to the following error: " +
    //             err.message
    //           )
    //         } else {
    //           // console.log("Number of rows produced: " + rows.length)
    //           // return bulkv2(JSON.parse(JSON.stringify(rows)))
    //           return rows
    //         }
    //       },
    //     })
    //   })
    // }
    async run() {
        const { flags } = await this.parse(SnowflakeImport);
        const time = new Date().toDateString();
        //const conn = flags['target-org'].getConnection(flags['api-version']);
        // const snowQuery = await this.snowflakeConn(
        //   flags.account,
        //   flags.username,
        //   flags.query
        // )
        // this.log(snowQuery)
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
exports.default = SnowflakeImport;
SnowflakeImport.summary = messages.getMessage('summary');
SnowflakeImport.description = messages.getMessage('description');
SnowflakeImport.examples = messages.getMessages('examples');
SnowflakeImport.flags = {
    'target-org': sf_plugins_core_1.Flags.requiredOrg({
        char: 'o',
        required: true
    }),
    account: sf_plugins_core_1.Flags.string({
        char: 'a',
        summary: messages.getMessage('flags.account.summary'),
        required: true
    }),
    username: sf_plugins_core_1.Flags.string({
        char: 'u',
        summary: messages.getMessage('flags.username.summary'),
        required: true
    }),
    sobject: sf_plugins_core_1.Flags.string({
        char: 's',
        summary: messages.getMessage('flags.sobject.summary'),
        default: 'Account',
    }),
    method: sf_plugins_core_1.Flags.string({
        char: 'm',
        summary: messages.getMessage('flags.method.summary'),
        default: 'Upsert',
    }),
    extIdField: sf_plugins_core_1.Flags.string({
        char: 'e',
        summary: messages.getMessage('flags.extIdField.summary'),
        default: 'Id',
    }),
    query: sf_plugins_core_1.Flags.string({
        char: 'q',
        summary: messages.getMessage('flags.query.summary')
    }),
};
//# sourceMappingURL=import.js.map