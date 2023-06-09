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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class DiscordBot extends discord_js_1.Client {
    constructor(token, configOptions) {
        super(configOptions.clientOptions);
        this.slashCommandsJson = [];
        this.Events = new discord_js_1.Collection();
        this.SlashCommands = new discord_js_1.Collection();
        this.ButtonsCommands = new discord_js_1.Collection();
        this.MessageCommands = new discord_js_1.Collection();
        if (!configOptions) {
            throw new Error("configOptions cannot be undefined please Specfic the required fields Token, clientID, guildID, projectDir");
        }
        if (!token) {
            throw new Error("token field is required at configOptions");
        }
        if (!configOptions.dirname) {
            throw new Error("dirname field is required at configOptions this will be used to loadCommands");
        }
        this.config = configOptions;
        this.token = token;
    }
    loadEvents() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.config.dirname) {
                    throw new Error('Project directory is required for loaders to work please, You can use __dirname');
                }
                if (!((_a = this.config.directories) === null || _a === void 0 ? void 0 : _a.events)) {
                    console.warn("[warning] Events directory was not provided but button loader was declared");
                    return;
                }
                const eventsPath = path_1.default.join(this.config.dirname, this.config.directories.events);
                console.log(eventsPath);
                const files = fs_1.default.readdirSync(eventsPath).filter(file => file.endsWith('ts') || file.endsWith('.js'));
                const EventsLogs = [];
                for (const file of files) {
                    const filePath = path_1.default.join(eventsPath, file);
                    const event = require(filePath);
                    if ("name" in event && "execute" in event) {
                        this.Events.set(event.name, event);
                        if (event.once) {
                            this.once(event.name, event.execute.bind(null, this));
                            EventsLogs.push(`${file}:(once:true):${event.name}`);
                        }
                        else {
                            this.on(event.name, event.execute.bind(null, this));
                            EventsLogs.push(`${file}:(once:false):${event.name}`);
                        }
                    }
                    else {
                        console.warn(`[WARNING] Missing name or execute keys in ${file}`);
                    }
                }
                if (this.config.statuslogs) {
                    console.log("Events", EventsLogs);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadSlashCommands() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.config.directories) === null || _a === void 0 ? void 0 : _a.SlashCommands)) {
                console.warn("[warning] slashCommands directory was not provided but slashcommand loader was declared");
                return;
            }
            try {
                const slashCommandsPath = path_1.default.join(this.config.dirname, this.config.directories.SlashCommands);
                const files = fs_1.default.readdirSync(slashCommandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
                const SlashCommandLogs = [];
                for (const file of files) {
                    const filePath = path_1.default.join(slashCommandsPath, file);
                    const command = require(filePath);
                    if ("data" in command && "execute" in command) {
                        this.slashCommandsJson.push(command.data.toJSON());
                        this.SlashCommands.set(command.data.name, command);
                        SlashCommandLogs.push(`${file}:${command.data.name}`);
                    }
                    else {
                        console.log(`[WARNING] Missing data or execute keys in ${file} type: SlashCommand`);
                    }
                }
                if (this.config.statuslogs) {
                    console.log("SlashCommand", SlashCommandLogs);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadButtons() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.config.directories) === null || _a === void 0 ? void 0 : _a.ButtonCommands)) {
                console.warn("[warning] buttons directory was not provided but button loader was declared");
                return;
            }
            try {
                const buttonsPath = path_1.default.join(this.config.dirname, this.config.directories.ButtonCommands);
                const files = fs_1.default.readdirSync(buttonsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
                const buttonsCommandsLogs = [];
                for (const file of files) {
                    const filePath = path_1.default.join(buttonsPath, file);
                    const command = require(filePath);
                    if ("name" in command && "execute" in command) {
                        this.ButtonsCommands.set(command.name, command);
                        buttonsCommandsLogs.push(`${File}:${command.name}`);
                    }
                    else {
                        console.log(`[WARNING] Missing name or execute in ${file} type: ButtonEvent`);
                    }
                }
                if (this.config.statuslogs) {
                    console.log("ButtonCommands:", buttonsCommandsLogs);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadMessageCommands() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.config.directories) === null || _a === void 0 ? void 0 : _a.MessageCommands)) {
                console.warn("[warning] commands directory was not provided");
                return;
            }
            try {
                const MessageCommandPath = path_1.default.join(this.config.dirname, this.config.directories.MessageCommands);
                const files = fs_1.default.readdirSync(MessageCommandPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
                const MessageCommandLogs = [];
                for (const file of files) {
                    const filePath = path_1.default.join(MessageCommandPath, file);
                    const command = require(filePath);
                    if ("name" in command && "execute" in command) {
                        this.MessageCommands.set(command.name, command);
                        MessageCommandLogs.push(`${file}:${command.name}`);
                    }
                    else {
                        console.log(`[WARNING] Missing name or execute in ${file}`);
                    }
                }
                if (this.config.statuslogs) {
                    console.log("MessageCommand:", MessageCommandLogs);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resgisterGuildCommand(clientId, guildId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rest = new discord_js_1.REST().setToken(this.token);
            if (this.config.statuslogs) {
                console.log(`Successfully reloaded ${this.slashCommandsJson.length} application (/) commands.`);
            }
            try {
                const res = yield rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), { body: this.slashCommandsJson });
                if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.statuslogs) {
                    console.log(`Successfully refreshed reloaded ${res.length} application (/) commands.`);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resgisterGlobalCommand(clientId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const rest = new discord_js_1.REST().setToken(this.token);
            if (this.config.statuslogs) {
                console.log(`Successfully reloaded ${this.slashCommandsJson.length} application (/) commands.`);
            }
            try {
                const res = yield rest.put(discord_js_1.Routes.applicationCommands(clientId), { body: this.slashCommandsJson });
                if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.statuslogs) {
                    console.log(`Successfully refreshed ${res.length} application (/) commands.`);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    initializeLoaders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadEvents();
                yield this.loadButtons();
                yield this.loadSlashCommands();
                yield this.loadMessageCommands();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.login(this.token);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DiscordBot = DiscordBot;
