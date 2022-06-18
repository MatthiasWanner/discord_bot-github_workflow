import { Message } from 'discord.js';

import { IBotCommand } from './commands.types';

export const pingCommand: IBotCommand = {
  name: 'ping',
  description: 'Ping!',
  execute(msg: Message<boolean>) {
    msg.reply(`You wan't to play ping pong 🏓 ?`);
    msg.channel.send('pong');
  },
};
