import { RESTPostAPIChatInputApplicationCommandsJSONBody, REST, Routes } from "discord.js";

interface IGuildCommandConfig {
    guilldId: string;
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string,
    token: string,
    log?: true;
}

export async function resgisterGuildCommand(config: IGuildCommandConfig) {
    try {
        const rest = new REST().setToken(config.token);

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
            console.log(`Started refreshing ${config.commands.length} application (/) commands.`)
        }

        const data: any = await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guilldId),
            { body: config.commands },
        );

        if (config.log) {
            console.log(`Successfully reloaded ${data?.length} application (/) commands.`)
        }
    } catch (error) {
        throw error;
    }
}
interface IClientCommandConfig {
    guilldId: string;
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    clientId: string,
    token: string,
    log?: boolean
}
export async function resgisterClientCommand(config: IClientCommandConfig) {
    try {
        const rest = new REST().setToken(config.token);

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
            console.log(`Started refreshing ${config.commands.length} application  (/) commands.`)
        }


       const data: any = await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: config.commands },
        );

        if (config.log) {
            console.log(`Successfully reloaded ${data?.length} application (/) commands.`)
        }
    } catch (error) {
        throw error;
    }
}

