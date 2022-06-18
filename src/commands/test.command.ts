import { ISlashCommand } from './commands.types';

// Simple test command
export const testCommand: ISlashCommand = {
  name: 'test',
  description: 'Basic guild command',
  type: 1,
};
