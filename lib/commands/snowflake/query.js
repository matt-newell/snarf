"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const core_1 = require("@salesforce/core");
const sf_plugins_core_1 = require("@salesforce/sf-plugins-core");
const snowflake = require("snowflake-sdk");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.load('snarf', 'snowflake.query', [
    'summary',
    'description',
    'examples',
    'flags.account.summary',
    'flags.username.summary',
    'flags.query.summary',
    'info.snowflake',
]);
class SnowflakeQuery extends sf_plugins_core_1.SfCommand {
    async snowflakeConn(account, username, sql) {
        const sqlQuery = await (0, promises_1.readFile)(sql, { encoding: 'utf8', flag: 'r' });
        const connection = await snowflake.createConnection({
            account: account,
            username: username,
            authenticator: "EXTERNALBROWSER",
        });
        connection.connectAsync()
            .then(() => {
            connection.execute({
                sqlText: sqlQuery,
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error("Failed to execute statement due to the following error: " +
                            err.message);
                    }
                    else {
                        // console.log("Number of rows produced: " + rows.length)
                        // return bulkv2(JSON.parse(JSON.stringify(rows)))
                        console.log(`number of rows ${stmt.getNumRows()}`);
                        if (err) {
                            console.log(err);
                            return stmt;
                        }
                        return rows;
                    }
                },
            });
        });
    }
    async run() {
        const { flags } = await this.parse(SnowflakeQuery);
        const time = new Date().toDateString();
        const snowQuery = await this.snowflakeConn(flags.account, flags.username, flags.query);
        this.log('bulkJob', snowQuery);
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
exports.default = SnowflakeQuery;
SnowflakeQuery.summary = messages.getMessage('summary');
SnowflakeQuery.description = messages.getMessage('description');
SnowflakeQuery.examples = messages.getMessages('examples');
SnowflakeQuery.flags = {
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
    query: sf_plugins_core_1.Flags.string({
        char: 'q',
        summary: messages.getMessage('flags.query.summary')
    }),
};
//# sourceMappingURL=query.js.map