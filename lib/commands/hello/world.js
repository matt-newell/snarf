"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sf_plugins_core_1 = require("@salesforce/sf-plugins-core");
const core_1 = require("@salesforce/core");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.load('snarf', 'hello.world', [
    'summary',
    'description',
    'examples',
    'flags.name.summary',
    'info.hello',
]);
class World extends sf_plugins_core_1.SfCommand {
    async run() {
        const { flags } = await this.parse(World);
        const time = new Date().toDateString();
        this.log(messages.getMessage('info.hello', [flags.name, time]));
        return {
            name: flags.name,
            time,
        };
    }
}
exports.default = World;
World.summary = messages.getMessage('summary');
World.description = messages.getMessage('description');
World.examples = messages.getMessages('examples');
World.flags = {
    name: sf_plugins_core_1.Flags.string({
        char: 'n',
        summary: messages.getMessage('flags.name.summary'),
        default: 'World',
    }),
};
//# sourceMappingURL=world.js.map