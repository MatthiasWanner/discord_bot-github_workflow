import { ISlashCommande } from './commands.types';

// Simple test command
export const projectCommand: ISlashCommande = {
  name: 'project',
  description: 'Assign channel to team project, with dedicated webhook and role',
  type: 1,
};
