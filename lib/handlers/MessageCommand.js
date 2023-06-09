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
            this.enabled = createOptions.enabled;
        }
        if (createOptions.disabled) {
            this.disabled = createOptions.disabled;
        }
        if (createOptions.catagory) {
            this.catagory = createOptions.catagory;
        }
        return this;
    }
}
exports.MessageCommand = MessageCommand;
