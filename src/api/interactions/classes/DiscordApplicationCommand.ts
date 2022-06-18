import { MessageEmbed } from 'discord.js';
import { InteractionResponseTypes } from 'discord.js/typings/enums';

import {
  ICreateRoleBody,
  ICreateWebhookBody,
  IDiscordChannel,
  IDiscordRole,
  IDiscordWebhook,
} from '../../../types';
import { capitalize, DiscordRequest, getRandomEmoji } from '../../../utils';
import { IInteractionResponse } from '../interactions.types';

export class DiscordApplicationCommand {
  private discordMessageEmbed: MessageEmbed;
  private discordRequest: <T>(url: string, options: any) => Promise<T>;
  private getRandomEmoji: () => string;

  constructor(private name: string, private channelId: string, private guildId: string) {
    this.discordMessageEmbed = new MessageEmbed();
    this.discordRequest = DiscordRequest;
    this.getRandomEmoji = getRandomEmoji;
  }

  private async createWebhook(channelName: string): Promise<IDiscordWebhook> {
    const webhookBody: ICreateWebhookBody = {
      name: `${capitalize(channelName || 'workflow')}_webhook`,
    };

    return await this.discordRequest<IDiscordWebhook>(`channels/${this.channelId}/webhooks`, {
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

  private async getRoleId(channelName: string): Promise<string> {
    const { id: roleId } = await this.createRole(channelName);
    return roleId;
  }

  private async projectCommandHandler(): Promise<IInteractionResponse> {
    const channelName = await this.getChannelName();
    const roleId = await this.getRoleId(channelName);
    return {
      type: InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: `New Project linked to this channel 🚀`,
        embeds: [
          this.discordMessageEmbed
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

  private testCommandeHandler(): IInteractionResponse {
    return {
      type: InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: 'hello world ' + this.getRandomEmoji(),
      },
    };
  }

  public async execute(): Promise<IInteractionResponse> {
    switch (this.name) {
      case 'test':
        return this.testCommandeHandler();
      case 'project':
        return await this.projectCommandHandler();
      default:
        return {
          type: InteractionResponseTypes.PONG,
          data: {},
        };
    }
  }
}
