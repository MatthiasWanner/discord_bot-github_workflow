import { ISlashCommand } from './commands.types';

// Simple test command
export const projectCommand: ISlashCommand = {
  name: 'project',
  description: 'Assign channel to team project, with dedicated webhook and role',
  type: 1,
};
