import { Message } from 'discord.js';

import { IBotCommande } from './commands.types';

export const kickCommand: IBotCommande = {
  name: '!kick',
  description: 'Kick!',
  execute(msg: Message<boolean>) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser?.username || 'Unknown User'}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  },
};
