import { ISlashCommande } from './commands.types';

// Simple test command
export const testCommand: ISlashCommande = {
  name: 'test',
  description: 'Basic guild command',
  type: 1,
};
