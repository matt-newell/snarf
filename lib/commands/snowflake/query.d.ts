import { SfCommand } from '@salesforce/sf-plugins-core';
export type SnowflakeQueryResult = {
    account: string;
    username: string;
    query: string;
    data: any;
    time: string;
};
export default class SnowflakeQuery extends SfCommand<SnowflakeQueryResult> {
    static readonly summary: string;
    static readonly description: string;
    static readonly examples: string[];
    static flags: {
        account: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        username: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        query: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    snowflakeConn(account: string, username: string, sql: string): Promise<void>;
    run(): Promise<SnowflakeQueryResult>;
}
