import { MessageEmbed } from 'discord.js';
import { InteractionResponseTypes } from 'discord.js/typings/enums';

import {
  ICreateRoleBody,
  ICreateWebhookBody,
  IDiscordChannel,
  IDiscordRole,
  IDiscordWebhook,
} from '../../../types';
import { capitalize, DiscordRequest } from '../../../utils';
import { IInteractionResponse } from '../interactions.types';

export class ProjectCommand {
  constructor(private channelId: string, private guildId: string) {}

  private async createWebhook(channelName: string): Promise<IDiscordWebhook> {
    const webhookBody: ICreateWebhookBody = {
      name: `${capitalize(channelName || 'workflow')}_webhook`,
    };

    return await DiscordRequest<IDiscordWebhook>(`channels/${this.channelId}/webhooks`, {
      method: 'POST',
      data: webhookBody,
    });
  }

  private async getWebhookUrl(channelName: string): Promise<string> {
    const { id: webhookId, token: webhookToken } = await this.createWebhook(channelName);

    return webhookToken
      ? `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`
      : 'Error during webhook creation, please create it manually';
  }

  private async getChannelName(): Promise<string> {
    const { name: channelName } = await DiscordRequest<IDiscordChannel>(
      `channels/${this.channelId}`,
      {
        method: 'GET',
      }
    );
    return channelName || 'channel_name';
  }

  private async createRole(channelName: string): Promise<IDiscordRole> {
    const roleBoby: ICreateRoleBody = {
      mentionable: true,
      name: `${channelName}_team`,
    };

    return await DiscordRequest<IDiscordRole>(`guilds/${this.guildId}/roles`, {
      method: 'POST',
      data: roleBoby,
    });
  }

  private async getNewRoleId(channelName: string): Promise<string> {
    const { id: roleId } = await this.createRole(channelName);
    return roleId;
  }

  public async projectCommandHandler(): Promise<IInteractionResponse> {
    const channelName = await this.getChannelName();
    const roleId = await this.getNewRoleId(channelName);
    return {
      type: InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: `New Project linked to this channel 🚀`,
        embeds: [
          new MessageEmbed()
            .setTitle('New team project')
            .setColor(10181046)
            .setDescription(
              `A new role <@&${roleId}> and a channel webhook have been created for the occasion 🥂.\n
                    1️⃣ Assign this role to the project team so that they are notified of events.\n
                    2️⃣ Add this variables into your GitHub repo secrets 🔐`
            )
            .addFields(
              { name: 'DISCORD_ROLE', value: roleId },
              {
                name: 'DISCORD_WEBHOOK_URL',
                value: await this.getWebhookUrl(channelName),
              }
            ),
        ],
      },
    };
  }
}
