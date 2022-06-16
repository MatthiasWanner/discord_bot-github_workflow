import { Message } from 'discord.js';

import { IBotCommande } from './commands.types';

export const pingCommand: IBotCommande = {
  name: 'ping',
  description: 'Ping!',
  execute(msg: Message<boolean>) {
    msg.reply(`You wan't to play ping pong 🏓 ?`);
    msg.channel.send('pong');
  },
};
