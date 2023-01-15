import { dotEnvConfig, Intents } from "./deps.ts";

dotEnvConfig({ export: true });

/*
    Get Token and Client ID from https://discord.com/developers/applications/
*/
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = Deno.env.get("BOT_ID") || "";

/** The gateway intents you would like to use. */
export const INTENTS: Intents =
  Intents.DirectMessageReactions |
  Intents.DirectMessageTyping |
  Intents.DirectMessages |
  Intents.GuildBans |
  Intents.GuildEmojis |
  Intents.GuildIntegrations |
  Intents.GuildInvites |
  Intents.GuildMembers |
  Intents.GuildMessageReactions |
  Intents.GuildMessageTyping |
  Intents.GuildMessages |
  Intents.GuildPresences |
  Intents.GuildVoiceStates |
  Intents.GuildWebhooks |
  Intents.Guilds;

/* 
    Check out https://deno.land/x/discordeno@17.0.0/mod.ts?s=GatewayIntents
    If want to add more INTENTS.
*/