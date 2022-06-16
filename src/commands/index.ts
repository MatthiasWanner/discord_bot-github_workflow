import { kickCommand } from './kick.command';
import { pingCommand } from './ping.command';
import { testCommand } from './test.command';

export * from './commands.types';

export * from './utils';

export const botCommands = {
  ping: pingCommand,
  kick: kickCommand,
};

export const slashCommands = [testCommand];
