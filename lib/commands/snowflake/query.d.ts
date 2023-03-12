import { SfCommand } from '@salesforce/sf-plugins-core';
export type SnowflakeImportResult = {
    account: string;
    username: string;
    sobject: string;
    method: string;
    extIdField: string;
    query: string;
    time: string;
};
export default class SnowflakeImport extends SfCommand<SnowflakeImportResult> {
    static readonly summary: string;
    static readonly description: string;
    static readonly examples: string[];
    static flags: {
        account: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        username: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        query: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    snowflakeConn(account: string, username: string, sql: string): Promise<void>;
    run(): Promise<SnowflakeImportResult>;
}
