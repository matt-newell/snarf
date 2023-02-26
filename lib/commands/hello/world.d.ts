import { SfCommand } from '@salesforce/sf-plugins-core';
export type HelloWorldResult = {
    name: string;
    time: string;
};
export default class World extends SfCommand<HelloWorldResult> {
    static readonly summary: string;
    static readonly description: string;
    static readonly examples: string[];
    static flags: {
        name: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<HelloWorldResult>;
}
