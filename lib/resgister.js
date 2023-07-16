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
exports.resgisterClientCommand = exports.resgisterGuildCommand = void 0;
const discord_js_1 = require("discord.js");
function resgisterGuildCommand(config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rest = new discord_js_1.REST().setToken(config.token);
            if (!config.token) {
                throw new Error("[RESGISTER_ERROR] token was not provided");
            }
            if (!config.guilldId) {
                throw new Error("[RESGISTER_ERROR] guildId was not provided");
            }
            if (!config.clientId) {
                throw new Error("[RESGISTER_ERROR] clientId was not provided");
            }
            if (!config.commands) {
                throw new Error("[RESGISTER_ERROR] commands was not provided");
            }
            if (config.log) {
                console.log(`Started refreshing ${config.commands.length} application (/) commands.`);
            }
            const data = yield rest.put(discord_js_1.Routes.applicationGuildCommands(config.clientId, config.guilldId), { body: config.commands });
            if (config.log) {
                console.log(`Successfully reloaded ${data === null || data === void 0 ? void 0 : data.length} application (/) commands.`);
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.resgisterGuildCommand = resgisterGuildCommand;
function resgisterClientCommand(config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rest = new discord_js_1.REST().setToken(config.token);
            if (!config.token) {
                throw new Error("[RESGISTER_ERROR] token was not provided");
            }
            if (!config.guilldId) {
                throw new Error("[RESGISTER_ERROR] guildId was not provided");
            }
            if (!config.clientId) {
                throw new Error("[RESGISTER_ERROR] clientId was not provided");
            }
            if (!config.commands) {
                throw new Error("[RESGISTER_ERROR] commands was not provided");
            }
            if (config.log) {
                console.log(`Started refreshing ${config.commands.length} application  (/) commands.`);
            }
            const data = yield rest.put(discord_js_1.Routes.applicationCommands(config.clientId), { body: config.commands });
            if (config.log) {
                console.log(`Successfully reloaded ${data === null || data === void 0 ? void 0 : data.length} application (/) commands.`);
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.resgisterClientCommand = resgisterClientCommand;
