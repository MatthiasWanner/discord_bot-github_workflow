import { AxiosError } from 'axios';

import { DiscordRequest } from '../../utils';
import { ISlashCommand } from '../commands.types';

export async function HasGuildCommands(
  appId: string,
  guildId: string,
  commands: ISlashCommand[]
): Promise<void> {
  if (guildId === '' || appId === '') return;

  commands.forEach(c => HasGuildCommand(appId, guildId, c));
}

// Installs a command
export async function InstallGuildCommand(
  appId: string,
  guildId: string,
  command: ISlashCommand
): Promise<void> {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, {
      method: 'POST',
      data: command,
    });
  } catch (err) {
    console.error((err as AxiosError).response?.data);
  }
}

// Checks for a command
async function HasGuildCommand(
  appId: string,
  guildId: string,
  command: ISlashCommand
): Promise<void> {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const data = await DiscordRequest<any[]>(endpoint, { method: 'GET' });

    if (data) {
      const installedNames = data.map(c => c['name']);
      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command['name'])) {
        console.log(`Installing "${command['name']}"`);
        InstallGuildCommand(appId, guildId, command);
      } else {
        console.log(`"${command['name']}" command already installed`);
      }
    }
  } catch (err) {
    console.error((err as Error).message);
  }
}
