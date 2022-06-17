import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { RequestHandler } from 'express';

import { IDiscordChannel } from '../../../types/channels.types';
import { ICreateRoleBody, IDiscordRole } from '../../../types/roles.types';
import { ICreateWebhookBody, IDiscordWebhook } from '../../../types/webhooks.types';
import { capitalize, DiscordRequest, getRandomEmoji } from '../../../utils';
import { IInteractionBody } from '../interactions.types';

const postInteractionController: RequestHandler<
  null,
  Record<string, any>,
  IInteractionBody,
  null
> = async (req, res) => {
  const { type, data, channel_id: channelId, guild_id: guildId } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND && data) {
    const { name } = data;

    // "test" guild command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }

    if (name === 'project' && channelId && guildId) {
      // Create the dedicated role
      const { name: channelName = 'channel_name' } = await DiscordRequest<IDiscordChannel>(
        `channels/${channelId}`,
        {
          method: 'GET',
        }
      );

      const roleBoby: ICreateRoleBody = {
        mentionable: true,
        name: `${channelName}_team`,
      };

      const { id: roleId } = await DiscordRequest<IDiscordRole>(`guilds/${guildId}/roles`, {
        method: 'POST',
        data: roleBoby,
      });

      // Create dedicated webhook

      const webhookBody: ICreateWebhookBody = {
        name: `${capitalize(channelName || 'workflow')}_webhook`,
      };

      const { id: webhookId, token: webhookToken } = await DiscordRequest<IDiscordWebhook>(
        `channels/${channelId}/webhooks`,
        {
          method: 'POST',
          data: webhookBody,
        }
      );

      // Send a message into the channel where command was triggered from the server
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
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
                  value: webhookToken
                    ? `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`
                    : 'Error during webhook creation, please create it manually',
                }
              ),
          ],
        },
      });
    }
  }

  return res.send({ type: InteractionResponseType.PONG });
};

export default postInteractionController;
