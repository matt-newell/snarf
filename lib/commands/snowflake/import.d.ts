import { SfCommand } from '@salesforce/sf-plugins-core';
export type SnowflakeImportResult = {
    name: string;
    time: string;
};
export default class SnowflakeImport extends SfCommand<SnowflakeImportResult> {
    static readonly summary: string;
    static readonly description: string;
    static readonly examples: string[];
    static flags: {
        targetOrg: import("@oclif/core/lib/interfaces").OptionFlag<import("@salesforce/core").Org, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        name: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        sobject: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        method: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        extIdField: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        query: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<SnowflakeImportResult>;
}
