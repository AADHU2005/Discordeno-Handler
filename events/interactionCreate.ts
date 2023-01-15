import {
    ApplicationCommandOptionTypes,
    BotWithCache,
    Guild,
    InteractionResponseTypes
  } from "../deps.ts";
import { events } from "./mod.ts";
import { getGuildFromId, isSubCommand, isSubCommandGroup } from "../utils/helper.ts";
import { Command, commands } from "../commands/mod.ts";
  
events.interactionCreate = async (rawBot, interaction) => {
    const bot = rawBot as BotWithCache;
  
    if (interaction.data && interaction.id) {
        let guildName = "Direct Message";
        let guild = {} as Guild;
  
        // Set guild, if there was an error getting the guild, then just say it was a DM. (What else are we going to do?)
        if (interaction.guildId) {
            const guildOrVoid = await getGuildFromId(bot, interaction.guildId).catch(
                (err) => {
                    console.log(err);
                },
            );
            if (guildOrVoid) {
                guild = guildOrVoid;
                guildName = guild.name;
            }
        }
  
        let command: undefined | Command = interaction.data.name ? commands.get(interaction.data.name) : undefined;
        let commandName = command?.name;
  
        if (command !== undefined) {
            if (interaction.data.name) {
                if (interaction.data.options?.[0]) {
                    const optionType = interaction.data.options[0].type;
   
                    if (optionType === ApplicationCommandOptionTypes.SubCommandGroup) {
                        // Check if command has subcommand and handle types
                        if (!command.subcommands) return;
  
                        // Try to find the subcommand group
                        const subCommandGroup = command.subcommands?.find((command) => command.name == interaction.data?.options?.[0].name);
                        if (!subCommandGroup) return;
  
                        if (isSubCommand(subCommandGroup)) return;
   
                        // Get name of the command which we are looking for
                        const targetCmdName = interaction.data.options?.[0].options?.[0].name ||
                        interaction.data.options?.[0].options?.[0].name;
                        if (!targetCmdName) return;
  
                        // Try to find the command
                        command = subCommandGroup.subCommands.find((c) => c.name === targetCmdName);
  
                        commandName += ` ${subCommandGroup.name} ${command?.name}`;
  
                    }
  
                    if (optionType === ApplicationCommandOptionTypes.SubCommandGroup) {
                        // Check if command has subcommand and handle types
                        if (!command?.subcommands) return;
  
                        // Try to find the command
                        const found = command.subcommands.find((command) => command.name == interaction.data?.options?.[0].name);
                        if (!found) return;
  
                        if (isSubCommandGroup(found)) return;
  
                        command = found;
                        commandName += ` ${command?.name}`;
                    }
                }
  
                try {
                    if (command) {
                        command.run(bot, interaction);
                    } else {
                        throw "";
                    }
                } catch (err) {
                    err.length ? console.log(err) : undefined;
                }
            } else {
                await bot.helpers.sendInteractionResponse(
                    interaction.id,
                    interaction.token,
                    {
                        type: InteractionResponseTypes.ChannelMessageWithSource,
                        data: {
                            content: `Command not found!`,
                        },
                    },
                );
            }
        }
    }
};