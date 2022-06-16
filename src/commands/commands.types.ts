import { Message } from 'discord.js';

export interface IBotCommande {
  name: string;
  description: string;
  execute(msg: Message<boolean>): void;
}

export interface IBotCommandeCollection {
  [key: string]: IBotCommande;
}