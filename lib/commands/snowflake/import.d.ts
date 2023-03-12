import { SfCommand } from '@salesforce/sf-plugins-core';
import { Connection } from '@salesforce/core';
import * as sfbulk2 from 'node-sf-bulk2';
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
        'target-org': import("@oclif/core/lib/interfaces").OptionFlag<import("@salesforce/core").Org, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        account: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        username: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        sobject: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        method: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        extIdField: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        query: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    arrayToCSV(data: any): any;
    snowflakeConn(account: string, username: string, sql: string): Promise<void>;
    salesforceBulk(conn: Connection, sobject: string, operation: string, extIdField: string, transientData: any): Promise<sfbulk2.JobUploadResponse>;
    run(): Promise<SnowflakeImportResult>;
}
