import { Client, Collection, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import path from "path"
import fs from "fs"
import { Interfaces } from "./types";
import { EventHandler } from "./handlers/EventHandler";

export namespace Loaders {

    const filter = (file: string) => {
        return file.endsWith(".ts") || file.endsWith(".js");
    };

    /**
     * 
     * @param dirname align the loader to your directory to prevent bugs simply provide __dirname for this
     * @param loadConfig this is where you provide your directory `{directory: "./slashcommands"}` and more config options
     * @returns An array of the exported object of the command information in the each file under the directory
     */
    export function loadSlashCommand(dirname: string, loadConfig: Interfaces.ISlashCommandLoadOption): { JsonData: RESTPostAPIChatInputApplicationCommandsJSONBody[]; collection: Collection<string, Interfaces.ISlashCommand>; } {
        if (!dirname) {
            throw new Error("Dirname must be provided use __dirname for this field")
        }

        if (!loadConfig.directory) {
            throw new Error('Directory must be provided to slash command loader')
        }

        const collection = new Collection<string, Interfaces.ISlashCommand>();

        const filterFn = loadConfig.filter || filter;

        const commandDir = path.resolve(dirname, loadConfig.directory);

        const commandFiles = fs.readdirSync(commandDir).filter((file) => filterFn(file));

        let DataJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
        for (const file of commandFiles) {
            const filePaths = path.join(commandDir, file);
            const commandData: Interfaces.ISlashCommand = require(filePaths);


            if ("data" in commandData && "execute" in commandData) {
                DataJson.push(commandData.data.toJSON())
                collection.set(commandData.data.name, commandData)
            } else {
                console.log(`[SLASH_LOADER_WARNING] failed to resolve 'data' or 'execute' from file ${file}`)
            }
        }

        return { JsonData: DataJson, collection: collection };
    }

    /**
     * loads all your events files an import the exported object which should look like this `{name: string, once?: boolean, execute: (client, event) =>{},}` then initilize the event listener
     * @param dirname Align the loaderimport { loadEvents } from './loaders';
 to your directory to prevent bugs pass in __dirname for this field
     * @param loadConfig This is where you provide your directory `{directory: "events", filter?: () => boolean}` and more config options
     */
    export function loadEvents<T extends Client>(dirname: string, loadConfig: Interfaces.IEventLoadOption<T>) {
        if (!loadConfig.directory) {
            throw new Error("[EVENTS_LOADER_ERROR] directory must be provided to the event loader")
        }

        if (!loadConfig.client) {
            throw new Error("[EVENTS_LOADER_ERROR] client field was not provided");
        }

        const filterFn = loadConfig.filter || filter;
        const client = loadConfig.client;

        const eventsPath = path.resolve(dirname, loadConfig.directory);
        const eventsFiles = fs.readdirSync(eventsPath).filter(filterFn);


        for (const file of eventsFiles) {
            const filePath = path.join(eventsPath, file)

            const eventsData = require(filePath);

            if ("name" in eventsData && "execute" in eventsData) {
                if (eventsData.once) {
                    console.log('working once')
                    client.once(eventsData.name, eventsData.execute.bind(null, client));
                } else {
                    client.on(eventsData.name, eventsData.execute.bind(null, client))
                    console.log('working 2')
                }
            } else {
                console.log(`[EVENTS_LOADER_WARNING] failed to resolve 'name' or 'execute' from ${file}`)
            }
        }
    }


    /**
     * 
     * @param dirname 
     * @param loadConfig 
     * @returns returns a discord collection with the exported message from each file
     */
    export function loadMessageCommand(dirname: string, loadConfig: Interfaces.IMessageCommandLoadOptions): Collection<string, Interfaces.IMessageCommand> {
        if (!dirname) {
            throw new Error("dirname must be provided use __dirname for this field")
        }

        if (!loadConfig.directory) {
            throw new Error("directory must be provided to the message loader");
        }
        const filterFn = loadConfig.filter || filter;
        const commandDir = path.resolve(dirname, loadConfig.directory);

        const commandFiles = fs.readdirSync(commandDir).filter(filterFn);
        const collection = new Collection<string, Interfaces.IMessageCommand>();

        for (const file of commandFiles) {
            const filePath = path.join(commandDir, file);
            const commandData: Interfaces.IMessageCommand = require(filePath);

            if ("name" in commandData && "execute" in commandData) {
                collection.set(commandData.name, commandData);
            } else {
                console.log(`[MESSAGECOMMAND_LOADER_WARNING] failed to resolve 'name' or  'execute' fields in ${file}`)
            }
        }

        return collection;
    }
}

export namespace RecursiveLoader {

    const SlashCommand = new Collection<string, Interfaces.ISlashCommand>();
    const MessageCommand = new Collection<string, Interfaces.IMessageCommand>();

    export interface ISlashCommandLoadOption {
        filter?: (file: string) => boolean;
        directory: string,
    }

    export function loadSlashCommands(dirname: string, loadConfig: Interfaces.ISlashCommandLoadOption) {
        if (!loadConfig.directory) {
            throw new Error("directory must be provided to the event loader")
        }
        
        const commandDir = path.resolve(dirname, loadConfig.directory);

        if (!isFolder(commandDir)) {
            throw new Error("slash commmand dir must be a folder")
        }
        const filterFn = loadConfig.filter || filter;

        return loadCommandRecursively(commandDir, filterFn)
    }

    export function loadMessageCommands(dirname: string, loadConfig: Interfaces.ISlashCommandLoadOption) {
        if (!loadConfig.directory) {
            throw new Error("directory must be provided to the event loader")
        }

        const commandDir = path.resolve(dirname, loadConfig.directory);

        if (!isFolder(commandDir)) {
            throw new Error("slash commmand dir must be a folder")
        }
        const filterFn = loadConfig.filter || filter;
        loadMessageCommandRecursively(commandDir, filter)
        return MessageCommand;
    }

    function loadMessageCommandRecursively(directory: string, filterFn: (file: string) => boolean) {
        const commandsdir = fs.readdirSync(directory);

        for (const file of commandsdir) {
            const filePath = path.join(directory, file);

            
            if (isFolder(filePath)) {
                loadMessageCommandRecursively(filePath, filterFn);
            } else if (filterFn(file)) {
                const commandData: Interfaces.IMessageCommand = require(filePath);
                if ("name" in commandData && "execute" in commandData) {
                    MessageCommand.set(commandData.name, commandData);
                } else {
                    console.log(`[MESSAGECOMMAND_LOADER_WARNING] failed to resolve 'name' or  'execute' fields in ${file}`)
                }
            }
        }
    }

    function loadCommandRecursively(directory: string, filterFn: (file: string) => boolean) {
        const commandsdir = fs.readdirSync(directory);
        const JsonData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

        for (const file of commandsdir) {
            const filePath = path.join(directory, file);



            if (isFolder(filePath)) {
                loadCommandRecursively(filePath, filterFn);
            } else if (filterFn(file)) {
                const commandData: Interfaces.ISlashCommand = require(filePath);
                if ("data" in commandData && "execute" in commandData) {
                    JsonData.push(commandData.data.toJSON());
                    SlashCommand.set(commandData.data.name, commandData);
                } else {
                    console.log(`[SLASH_LOADER_WARNING] failed to resolve 'data' or  'execute' fields in ${file}`)
                }
            }
        }

        return { JsonData: JsonData, collection: SlashCommand };
    }




    function isFolder(path: string) {
        try {
            const stats = fs.statSync(path);
            return stats.isDirectory();
        } catch (err) {
            // Handle the error if the path does not exist or there was an issue accessing it
            console.error('Error:', err);
            return false;
        }
    }


    const filter = (file: string) => {
        return file.endsWith(".ts") || file.endsWith(".js");
    };
}