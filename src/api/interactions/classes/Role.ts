import { ICreateRoleBody, IDiscordRole } from '../../../types';
import { DiscordRequest } from '../../../utils';

export class Role {
  constructor(private readonly channelName: string, private readonly guildId: string) {}

  private async createRole(): Promise<IDiscordRole> {
    const roleBoby: ICreateRoleBody = {
      mentionable: true,
      name: `${this.channelName}_team`,
    };

    return await DiscordRequest<IDiscordRole>(`guilds/${this.guildId}/roles`, {
      method: 'POST',
      data: roleBoby,
    });
  }

  public async getNewRoleId(): Promise<string> {
    const { id: roleId } = await this.createRole();
    return roleId;
  }
}
