"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursiveLoader = exports.Loaders = void 0;
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
var Loaders;
(function (Loaders) {
    const filter = (file) => {
        return file.endsWith(".ts") || file.endsWith(".js");
    };
    /**
     *
     * @param dirname align the loader to your directory to prevent bugs simply provide __dirname for this
     * @param loadConfig this is where you provide your directory `{directory: "./slashcommands"}` and more config options
     * @returns An array of the exported object of the command information in the each file under the directory
     */
    function loadSlashCommand(dirname, loadConfig) {
        if (!dirname) {
            throw new Error("Dirname must be provided use __dirname for this field");
        }
        if (!loadConfig.directory) {
            throw new Error('Directory must be provided to slash command loader');
        }
        const collection = new discord_js_1.Collection();
        const filterFn = loadConfig.filter || filter;
        const commandDir = path_1.default.resolve(dirname, loadConfig.directory);
        const commandFiles = fs_1.default.readdirSync(commandDir).filter((file) => filterFn(file));
        let DataJson = [];
        for (const file of commandFiles) {
            const filePaths = path_1.default.join(commandDir, file);
            const commandData = require(filePaths);
            if ("data" in commandData && "execute" in commandData) {
                DataJson.push(commandData.data.toJSON());
                collection.set(commandData.data.name, commandData);
            }
            else {
                console.log(`[SLASH_LOADER_WARNING] failed to resolve 'data' or 'execute' from file ${file}`);
            }
        }
        return { JsonData: DataJson, collection: collection };
    }
    Loaders.loadSlashCommand = loadSlashCommand;
    /**
     * loads all your events files an import the exported object which should look like this `{name: string, once?: boolean, execute: (client, event) =>{},}` then initilize the event listener
     * @param dirname Align the loaderimport { loadEvents } from './loaders';
 to your directory to prevent bugs pass in __dirname for this field
     * @param loadConfig This is where you provide your directory `{directory: "events", filter?: () => boolean}` and more config options
     */
    function loadEvents(dirname, loadConfig) {
        if (!loadConfig.directory) {
            throw new Error("[EVENTS_LOADER_ERROR] directory must be provided to the event loader");
        }
        if (!loadConfig.client) {
            throw new Error("[EVENTS_LOADER_ERROR] client field was not provided");
        }
        const filterFn = loadConfig.filter || filter;
        const client = loadConfig.client;
        const eventsPath = path_1.default.resolve(dirname, loadConfig.directory);
        const eventsFiles = fs_1.default.readdirSync(eventsPath).filter(filterFn);
        for (const file of eventsFiles) {
            const filePath = path_1.default.join(eventsPath, file);
            const eventsData = require(filePath);
            if ("name" in eventsData && "execute" in eventsData) {
                if (eventsData.once) {
                    console.log('working once');
                    client.once(eventsData.name, eventsData.execute.bind(null, client));
                }
                else {
                    client.on(eventsData.name, eventsData.execute.bind(null, client));
                    console.log('working 2');
                }
            }
            else {
                console.log(`[EVENTS_LOADER_WARNING] failed to resolve 'name' or 'execute' from ${file}`);
            }
        }
    }
    Loaders.loadEvents = loadEvents;
    /**
     *
     * @param dirname
     * @param loadConfig
     * @returns returns a discord collection with the exported message from each file
     */
    function loadMessageCommand(dirname, loadConfig) {
        if (!dirname) {
            throw new Error("dirname must be provided use __dirname for this field");
        }
        if (!loadConfig.directory) {
            throw new Error("directory must be provided to the message loader");
        }
        const filterFn = loadConfig.filter || filter;
        const commandDir = path_1.default.resolve(dirname, loadConfig.directory);
        const commandFiles = fs_1.default.readdirSync(commandDir).filter(filterFn);
        const collection = new discord_js_1.Collection();
        for (const file of commandFiles) {
            const filePath = path_1.default.join(commandDir, file);
            const commandData = require(filePath);
            if ("name" in commandData && "execute" in commandData) {
                collection.set(commandData.name, commandData);
            }
            else {
                console.log(`[MESSAGECOMMAND_LOADER_WARNING] failed to resolve 'name' or  'execute' fields in ${file}`);
            }
        }
        return collection;
    }
    Loaders.loadMessageCommand = loadMessageCommand;
})(Loaders || (exports.Loaders = Loaders = {}));
var RecursiveLoader;
(function (RecursiveLoader) {
    const SlashCommand = new discord_js_1.Collection();
    const MessageCommand = new discord_js_1.Collection();
    function loadSlashCommands(dirname, loadConfig) {
        if (!loadConfig.directory) {
            throw new Error("directory must be provided to the event loader");
        }
        const commandDir = path_1.default.resolve(dirname, loadConfig.directory);
        if (!isFolder(commandDir)) {
            throw new Error("slash commmand dir must be a folder");
        }
        const filterFn = loadConfig.filter || filter;
        return loadCommandRecursively(commandDir, filterFn);
    }
    RecursiveLoader.loadSlashCommands = loadSlashCommands;
    function loadMessageCommands(dirname, loadConfig) {
        if (!loadConfig.directory) {
            throw new Error("directory must be provided to the event loader");
        }
        const commandDir = path_1.default.resolve(dirname, loadConfig.directory);
        if (!isFolder(commandDir)) {
            throw new Error("slash commmand dir must be a folder");
        }
        const filterFn = loadConfig.filter || filter;
        loadMessageCommandRecursively(commandDir, filter);
        return MessageCommand;
    }
    RecursiveLoader.loadMessageCommands = loadMessageCommands;
    function loadMessageCommandRecursively(directory, filterFn) {
        const commandsdir = fs_1.default.readdirSync(directory);
        for (const file of commandsdir) {
            const filePath = path_1.default.join(directory, file);
            if (isFolder(filePath)) {
                loadMessageCommandRecursively(filePath, filterFn);
            }
            else if (filterFn(file)) {
                const commandData = require(filePath);
                if ("name" in commandData && "execute" in commandData) {
                    MessageCommand.set(commandData.name, commandData);
                }
                else {
                    console.log(`[MESSAGECOMMAND_LOADER_WARNING] failed to resolve 'name' or  'execute' fields in ${file}`);
                }
            }
        }
    }
    function loadCommandRecursively(directory, filterFn) {
        const commandsdir = fs_1.default.readdirSync(directory);
        const JsonData = [];
        for (const file of commandsdir) {
            const filePath = path_1.default.join(directory, file);
            if (isFolder(filePath)) {
                loadCommandRecursively(filePath, filterFn);
            }
            else if (filterFn(file)) {
                const commandData = require(filePath);
                if ("data" in commandData && "execute" in commandData) {
                    JsonData.push(commandData.data.toJSON());
                    SlashCommand.set(commandData.data.name, commandData);
                }
                else {
                    console.log(`[SLASH_LOADER_WARNING] failed to resolve 'data' or  'execute' fields in ${file}`);
                }
            }
        }
        return { JsonData: JsonData, collection: SlashCommand };
    }
    function isFolder(path) {
        try {
            const stats = fs_1.default.statSync(path);
            return stats.isDirectory();
        }
        catch (err) {
            // Handle the error if the path does not exist or there was an issue accessing it
            console.error('Error:', err);
            return false;
        }
    }
    const filter = (file) => {
        return file.endsWith(".ts") || file.endsWith(".js");
    };
})(RecursiveLoader || (exports.RecursiveLoader = RecursiveLoader = {}));
