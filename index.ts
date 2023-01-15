import {
    Bot,
    ActivityTypes,
    Collection,
    createBot,
    startBot,
    fastFileLoader,
    enableCachePlugin,
    enableCacheSweepers,
    enableHelpersPlugin,
    enablePermissionsPlugin,
    BotWithCache
} from "./deps.ts";
import { 
    BOT_ID, 
    BOT_TOKEN,
    INTENTS
} from "./config.ts";
import { events } from "./events/mod.ts";
import { updateCommands } from "./utils/helper.ts";

const paths = ["./events", "./commands"];
await fastFileLoader(paths).catch((err) => {
    console.log(`Unable to Import ${paths}`);
    console.log(err);
    Deno.exit(1);
});

export const bot: Bot = createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    intents: INTENTS,
    events,
});

bot.commands = new Collection();
enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

bot.gateway.manager.createShardOptions.makePresence = (shardId: number) => {
    return {
        shardId: shardId,
        status: "idle",
        activities: [
            {
                name: "AADHU2005/Discordeno-Handler",
                type: ActivityTypes.Watching,  // Activity types: Competing, Game, Listening, Streaming, Watching
                createdAt: Date.now(),
                // url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Works only for Streaming Activity
            },
        ],
    };
};

await startBot(bot);
await updateCommands(bot)