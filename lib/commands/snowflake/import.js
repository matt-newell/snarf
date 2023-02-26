"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sf_plugins_core_1 = require("@salesforce/sf-plugins-core");
const core_1 = require("@salesforce/core");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.load('snarf', 'snowflake.import', [
    'summary',
    'description',
    'examples',
    'flags.name.summary',
    'flags.sobject.summary',
    'flags.method.summary',
    'flags.extIdField.summary',
    'flags.query.summary',
    'info.snowflake',
]);
class SnowflakeImport extends sf_plugins_core_1.SfCommand {
    async run() {
        const { flags } = await this.parse(SnowflakeImport);
        const time = new Date().toDateString();
        this.log(messages.getMessage('info.snowflake', [
            flags.name,
            flags.sobject,
            flags.method,
            flags.extIdField,
            flags.query,
            time
        ]));
        return {
            name: flags.name,
            time,
        };
    }
}
exports.default = SnowflakeImport;
SnowflakeImport.summary = messages.getMessage('summary');
SnowflakeImport.description = messages.getMessage('description');
SnowflakeImport.examples = messages.getMessages('examples');
SnowflakeImport.flags = {
    'targetOrg': sf_plugins_core_1.Flags.requiredOrg({
        char: 'o',
        required: true
    }),
    name: sf_plugins_core_1.Flags.string({
        char: 'n',
        summary: messages.getMessage('flags.name.summary'),
        default: 'World',
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