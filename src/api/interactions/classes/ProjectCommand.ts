import { MessageEmbed } from 'discord.js';
import { InteractionResponseTypes } from 'discord.js/typings/enums';

import { IInteractionResponse } from '../interactions.types';
import { Channel } from './Channel';
import { Role } from './Role';
import { Webhook } from './WebHook';

export class ProjectCommand {
  constructor(private channelId: string, private guildId: string) {}

  public async execute(): Promise<IInteractionResponse> {
    const channelName = await new Channel(this.channelId).getChannelName();
    const roleId = await new Role(channelName, this.guildId).getNewRoleId();
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
                value: await new Webhook(channelName, this.channelId).getWebhookUrl(),
              }
            ),
        ],
      },
    };
  }
}
