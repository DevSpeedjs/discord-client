import { Client, Collection, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { Interfaces } from "./types";
export declare namespace Loaders {
    /**
     *
     * @param dirname align the loader to your directory to prevent bugs simply provide __dirname for this
     * @param loadConfig this is where you provide your directory `{directory: "./slashcommands"}` and more config options
     * @returns An array of the exported object of the command information in the each file under the directory
     */
    function loadSlashCommand(dirname: string, loadConfig: Interfaces.ISlashCommandLoadOption): {
        JsonData: RESTPostAPIChatInputApplicationCommandsJSONBody[];
        collection: Collection<string, Interfaces.ISlashCommand>;
    };
    /**
     * loads all your events files an import the exported object which should look like this `{name: string, once?: boolean, execute: (client, event) =>{},}` then initilize the event listener
     * @param dirname Align the loaderimport { loadEvents } from './loaders';
 to your directory to prevent bugs pass in __dirname for this field
     * @param loadConfig This is where you provide your directory `{directory: "events", filter?: () => boolean}` and more config options
     */
    function loadEvents<T extends Client>(dirname: string, loadConfig: Interfaces.IEventLoadOption<T>): void;
    /**
     *
     * @param dirname
     * @param loadConfig
     * @returns returns a discord collection with the exported message from each file
     */
    function loadMessageCommand(dirname: string, loadConfig: Interfaces.IMessageCommandLoadOptions): Collection<string, Interfaces.IMessageCommand>;
}
export declare namespace RecursiveLoader {
    interface ISlashCommandLoadOption {
        filter?: (file: string) => boolean;
        directory: string;
    }
    function loadSlashCommands(dirname: string, loadConfig: Interfaces.ISlashCommandLoadOption): {
        JsonData: RESTPostAPIChatInputApplicationCommandsJSONBody[];
        collection: Collection<string, Interfaces.ISlashCommand>;
    };
    function loadMessageCommands(dirname: string, loadConfig: Interfaces.ISlashCommandLoadOption): Collection<string, Interfaces.IMessageCommand>;
}
