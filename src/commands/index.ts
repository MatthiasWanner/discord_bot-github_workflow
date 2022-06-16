export * from './commands.types';

import { kickCommand } from './kick.command';
import { pingCommand } from './ping.command';

export const botCommands = {
  ping: pingCommand,
  kick: kickCommand,
};
