"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCommand = void 0;
class MessageCommand {
    constructor(createOptions) {
        this.name = createOptions.name;
        this.description = createOptions.description;
        this.execute = createOptions.execute;
        if (createOptions.aliases) {
            this.aliases = createOptions.aliases;
        }
        if (createOptions.cooldown) {
            this.cooldown = createOptions.cooldown;
        }
        if (createOptions.enabled) {
            this.disabled = createOptions.enabled;
        }
        if (createOptions.category) {
            this.catagory = createOptions.category;
        }
        return this;
    }
}
exports.MessageCommand = MessageCommand;
