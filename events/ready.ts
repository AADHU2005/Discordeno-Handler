import { events } from "./mod.ts";

events.ready = async (_, bot) => {

  console.log(bot.user.username + " is ready!");

};