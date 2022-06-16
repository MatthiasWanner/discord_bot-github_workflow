import { BitFieldResolvable, Collection, IntentsString, Options, PartialTypes } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

import api from './api';
import { botCommands } from './commands';
import { IBotCommande } from './commands/commands.types';
import { config } from './config';
import { CustomClient } from './extensions';
import { VerifyDiscordRequest } from './utils';

dotenv.config();

const start = async (): Promise<void> => {
  const app = express();
  const { client, port } = config;

  if (!client.id || !client.token || !client.publicKey)
    throw new Error('Missing client ID, token or public key');

  app.use(express.json({ verify: VerifyDiscordRequest(client.publicKey) }));

  app.use('/', api);

  app.listen(port, async () => {
    // eslint-disable-next-line no-console
    console.log(`Listening: http://localhost:${port}`);
  });

  const discordClient = new CustomClient({
    intents: config.client.intents as BitFieldResolvable<IntentsString, number>,
    partials: config.client.partials as PartialTypes[],
    makeCache: Options.cacheWithLimits({
      // Keep default caching behavior
      ...Options.defaultMakeCacheSettings,
      // Override specific options from config
      ...config.client.caches,
    }),
  });

  discordClient.login(client.token);

  const botCommandsCollection = new Collection<string, IBotCommande>();

  (Object.keys(botCommands) as (keyof typeof botCommands)[]).map(key => {
    botCommandsCollection.set(botCommands[key].name, botCommands[key]);
  });

  discordClient.on('ready', () => {
    console.info(`Logged in as ${discordClient.user?.tag || 'Unknow'}!`);
  });

  discordClient.on('messageCreate', msg => {
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
