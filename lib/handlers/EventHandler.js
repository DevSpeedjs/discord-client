"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
class EventHandler {
    constructor(options) {
        this.name = options.name;
        this.run = options.run;
        this.once = options.once;
        return this;
    }
}
exports.EventHandler = EventHandler;
