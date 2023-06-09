"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonCommand = void 0;
class buttonCommand {
    constructor(createObject) {
        this.name = createObject.name;
        this.execute = createObject.execute;
        return this;
    }
}
exports.buttonCommand = buttonCommand;
