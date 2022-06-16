import { BitFieldResolvable, Collection, IntentsString, Options, PartialTypes } from 'discord.js';
import dotenv from 'dotenv';

import { botCommands } from './commands';
import { IBotCommande } from './commands/commands.types';
import { config } from './config';
import { CustomClient } from './extensions';

dotenv.config();

const start = async (): Promise<void> => {
  const appToken = config.client.token;
  if (!appToken) throw new Error('No Bot token Provided');

  const client = new CustomClient({
    intents: config.client.intents as BitFieldResolvable<IntentsString, number>,
    partials: config.client.partials as PartialTypes[],
    makeCache: Options.cacheWithLimits({
      // Keep default caching behavior
      ...Options.defaultMakeCacheSettings,
      // Override specific options from config
      ...config.client.caches,
    }),
  });

  client.login(appToken);

  const botCommandsCollection = new Collection<string, IBotCommande>();

  (Object.keys(botCommands) as (keyof typeof botCommands)[]).map(key => {
    botCommandsCollection.set(botCommands[key].name, botCommands[key]);
  });

  client.on('ready', () => {
    console.info(`Logged in as ${client.user?.tag || 'Unknow'}!`);
  });

  client.on('messageCreate', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift()?.toLowerCase() || '';

    if (!botCommandsCollection.has(command)) return;

    try {
      console.info(`Called command: ${command}`);
      botCommandsCollection.get(command)?.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  });
};

start().catch(error => console.error(error));
