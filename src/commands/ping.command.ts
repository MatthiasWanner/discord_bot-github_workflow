import { Message } from 'discord.js';

export const pingCommand = {
  name: 'ping',
  description: 'Ping!',
  execute(msg: Message<boolean>) {
    msg.reply(`You wan't to play ping pong 🏓 ?`);
    msg.channel.send('pong');
  },
};
