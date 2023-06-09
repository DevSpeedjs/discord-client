import {
    Client,
    ClientOptions,
    Collection,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    REST,
    Routes,
    ButtonInteraction,
    Message,
} from "discord.js"

import path from 'path'
import fs from 'fs'
import { EventHandler } from "./handlers/EventHandler";
import { IslashCommand } from "./handlers/slashCommand";
import { IButtonCommand } from "./handlers/buttonCommands";
import { IMessageCommand } from "./handlers/MessageCommand";

export interface IHandlerConfig {
    MessageCommands?: string, // the commands files directory
    SlashCommands?: string, // the slash commands directory
    events?: string, // the events handler directory
    ButtonCommands?: string,
}



export interface DiscordBotClientOptions {
    statuslogs?: boolean,
    dirname: string,
    directories: IHandlerConfig | undefined;
    clientOptions: ClientOptions;
}


export class DiscordBot extends Client {


    public store: any;

    config: DiscordBotClientOptions;
    token: string;
    slashCommandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    Events = new Collection<string, { name: string, once?: boolean, execute: (client: any, run: any) => void }>();
    SlashCommands = new Collection<string, IslashCommand>()
    ButtonsCommands = new Collection<string, IButtonCommand>();
    MessageCommands = new Collection<string, IMessageCommand>();

    constructor(token: string, configOptions: DiscordBotClientOptions,) {
        super(configOptions.clientOptions);

        if (!configOptions) {
            throw new Error("configOptions cannot be undefined please Specfic the required fields Token, clientID, guildID, projectDir")
        }



        if (!token) {
            throw new Error("token field is required at configOptions")
        }



        if (!configOptions.dirname) {
            throw new Error("dirname field is required at configOptions this will be used to loadCommands")
        }

        this.config = configOptions;
        this.token = token;
    }

    async loadEvents() {

        try {

            if (!this.config.dirname) {
                throw new Error('Project directory is required for loaders to work please, You can use __dirname');
            }

            if (!this.config.directories?.events) {
                console.warn("[warning] Events directory was not provided but button loader was declared");
                return;
            }


            const eventsPath = path.join(this.config.dirname, this.config.directories.events);
            console.log(eventsPath)

            const files = fs.readdirSync(eventsPath).filter(file => file.endsWith('ts') || file.endsWith('.js'));
            const EventsLogs = [];
            for (const file of files) {
                const filePath = path.join(eventsPath, file);
                const event = require(filePath);

                if ("name" in event && "run" in event) {
                    this.Events.set(event.name, event);




                    if (event.once) {
                        this.once(event.name, event.run.bind(null, this))
                        EventsLogs.push(`${file}:(once:true):${event.name}`)
                    } else {
                        this.on(event.name, event.run.bind(null, this))
                        EventsLogs.push(`${file}:(once:false):${event.name}`)
                    }

                } else {
                    console.warn(`[WARNING] missing name or run keys in ${file}`);
                }


            }
            if (this.config.statuslogs) {
                console.log("Events", EventsLogs);
            }

        } catch (error) {
            console.log(error);
        }
    }


    async loadSlashCommands() {
        if (!this.config.directories?.SlashCommands) {
            console.warn("[warning] slashCommands directory was not provided but slashcommand loader was declared");
            return;
        }

        try {
            const slashCommandsPath = path.join(this.config.dirname, this.config.directories.SlashCommands);
            const files = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

            const SlashCommandLogs = [];

            for (const file of files) {
                const filePath = path.join(slashCommandsPath, file);
                const command: IslashCommand = require(filePath);

                if ("data" in command && "execute" in command) {
                    this.slashCommandsJson.push(command.data.toJSON());
                    this.SlashCommands.set(command.data.name, command);

                    SlashCommandLogs.push(`${file}:${command.data.name}`)
                } else {
                    console.log(`[WARNING] Missing data or execute keys in ${file} type: SlashCommand`)
                }
            }
            if (this.config.statuslogs) {
                console.log("SlashCommand", SlashCommandLogs);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async loadButtons() {
        if (!this.config.directories?.ButtonCommands) {
            console.warn("[warning] buttons directory was not provided but button loader was declared");
            return;
        }

        try {
            const buttonsPath = path.join(this.config.dirname, this.config.directories.ButtonCommands);
            const files = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
            const buttonsCommandsLogs = [];
            for (const file of files) {
                const filePath = path.join(buttonsPath, file);
                const command: IButtonCommand = require(filePath);


                if ("name" in command && "execute" in command) {
                    this.ButtonsCommands.set(command.name, command);
                    buttonsCommandsLogs.push(`${File}:${command.name}`)
                } else {
                    console.log(`[WARNING] Missing name or execute in ${file} type: ButtonEvent`)
                }


            }
            if (this.config.statuslogs) {
                console.log("ButtonCommands:", buttonsCommandsLogs);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loadMessageCommands() {
        if (!this.config.directories?.MessageCommands) {
            console.warn("[warning] commands directory was not provided");
            return;
        }

        try {
            const MessageCommandPath = path.join(this.config.dirname, this.config.directories.MessageCommands);
            const files = fs.readdirSync(MessageCommandPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
            const MessageCommandLogs = [];

            for (const file of files) {
                const filePath = path.join(MessageCommandPath, file);
                const command: IMessageCommand = require(filePath);



                if ("name" in command && "execute" in command) {
                    this.MessageCommands.set(command.name, command);
                    MessageCommandLogs.push(`${file}:${command.name}`)
                } else {
                    console.log(`[WARNING] Missing name or execute in ${file}`)
                }


            }

            if (this.config.statuslogs) {
                console.log("MessageCommand:", MessageCommandLogs)
            }
        } catch (error) {
            console.log(error);
        }
    }



    async resgisterGuildCommand(clientId: string, guildId: string) {
        const rest = new REST().setToken(this.token);

        if (this.config.statuslogs) {
            console.log(`Successfully reloaded ${this.slashCommandsJson.length} application (/) commands.`);
        }
        try {
            const res: any = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: this.slashCommandsJson });
            if (this.config?.statuslogs) {
                console.log(`Successfully refreshed reloaded ${res.length} application (/) commands.`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async resgisterGlobalCommand(clientId: string) {
        const rest = new REST().setToken(this.token);

        if (this.config.statuslogs) {
            console.log(`Successfully reloaded ${this.slashCommandsJson.length} application (/) commands.`);
        }
        try {
            const res: any = await rest.put(Routes.applicationCommands(clientId), { body: this.slashCommandsJson });
            if (this.config?.statuslogs) {
                console.log(`Successfully refreshed ${res.length} application (/) commands.`);
            }
        } catch (error) {
            console.log(error)
        }
    }




    async initializeLoaders() {
        try {
            await this.loadEvents()
            await this.loadButtons()
            await this.loadSlashCommands()
            await this.loadMessageCommands()
        } catch (error) {
            console.log(error);
        }
    }


    async start() {
        try {
            this.login(this.token);
        } catch (error) {
            throw error;
        }
    }
}

