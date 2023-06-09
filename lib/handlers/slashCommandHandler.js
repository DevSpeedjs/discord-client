"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
class SlashCommand {
    constructor(createOptions) {
        this.data = createOptions.data;
        this.execute = createOptions.execute;
        return this;
    }
}
exports.SlashCommand = SlashCommand;
