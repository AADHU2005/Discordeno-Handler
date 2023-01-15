import { ApplicationCommandTypes, InteractionResponseTypes } from "../deps.ts";
import { snowflakeToTimestamp, humanizeMilliseconds } from "../utils/helper.ts";
import { createCommand } from "./mod.ts";

createCommand({
    name: "ping",
    description: "Returns latency of the bot!",
    type: ApplicationCommandTypes.ChatInput,
    scope: "Global",
    run: async (bot, interaction) => {
        const ping = Date.now() - snowflakeToTimestamp(interaction.id);

        await bot.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
                type: InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: `🏓 Pong! Ping ${ping}ms (${humanizeMilliseconds(ping)})`,
                },
            },
        );
    },
});