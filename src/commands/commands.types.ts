import { Message } from 'discord.js';

export interface IBotCommand {
  name: string;
  description: string;
  execute(msg: Message<boolean>): void;
}

export interface IBotCommandeCollection {
  [key: string]: IBotCommand;
}

export interface ISlashCommand {
  name: string;
  description: string;
  type: number;
}
