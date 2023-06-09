"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMessageCommand = exports.setupInteractionCommand = void 0;
function setupInteractionCommand(client, interaction) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.isChatInputCommand()) {
            const commandName = interaction.commandName;
            if (client.SlashCommands.has(commandName)) {
                yield ((_a = client.SlashCommands.get(commandName)) === null || _a === void 0 ? void 0 : _a.execute(client, interaction));
            }
            ;
        }
        if (interaction.isButton()) {
            const customId = interaction.customId;
            if (client.ButtonsCommands.has(customId)) {
                yield ((_b = client.ButtonsCommands.get(customId)) === null || _b === void 0 ? void 0 : _b.execute(client, interaction));
            }
        }
    });
}
exports.setupInteractionCommand = setupInteractionCommand;
function setupMessageCommand(setupOption) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!setupOption.client && !setupOption.message && !setupOption.prefix) {
            throw new Error("[MISSING_REQUIRED_FIElDS]: SetOption client, message, prefix is required for SetUp to work properly");
        }
        const prefix = setupOption.prefix;
        const message = setupOption.message;
        const client = setupOption.client;
        if (message.author.bot || !message.content.startsWith(prefix)) {
            return;
        }
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const command = client.MessageCommands.get(commandName) || client.MessageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (command) {
            command.execute(client, message, args);
        }
        else {
            if (setupOption.client && typeof setupOption.handleCommandNotFound === "function") {
                setupOption.handleCommandNotFound(commandName, message, client);
            }
        }
    });
}
exports.setupMessageCommand = setupMessageCommand;
