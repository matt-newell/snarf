import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.load('snarf', 'snowflake.import', [
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

export type SnowflakeImportResult = {
  name: string;
  time: string;
};

export default class SnowflakeImport extends SfCommand<SnowflakeImportResult> {
    public static readonly summary = messages.getMessage('summary');
    public static readonly description = messages.getMessage('description');
    public static readonly examples = messages.getMessages('examples');
  
    public static flags = {
      'target-org': Flags.requiredOrg({
        char: 'o',
        required: true
      }),
      name: Flags.string({
        char: 'n',
        summary: messages.getMessage('flags.name.summary'),
        default: 'World',
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
  
    public async run(): Promise<SnowflakeImportResult> {
      const { flags } = await this.parse(SnowflakeImport);
      const time = new Date().toDateString();
      
      const conn = flags['target-org'].getConnection(flags['api-version']);
      
      
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
  