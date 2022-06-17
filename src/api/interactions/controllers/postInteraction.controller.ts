import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { RequestHandler } from 'express';

import { IDiscordChannel } from '../../../types/channels.types';
import { ICreateRoleBody, IDiscordRole } from '../../../types/roles.types';
import { DiscordRequest, getRandomEmoji } from '../../../utils';
import { IInteractionBody } from '../interactions.types';

const postInteractionController: RequestHandler<
  null,
  Record<string, any>,
  IInteractionBody,
  null
> = async (req, res) => {
  const { type, data, channel_id, guild_id } = req.body;

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

    if (name === 'project' && channel_id && guild_id) {
      // Create the dedicated role
      const { name = 'channelname' } = await DiscordRequest<IDiscordChannel>(
        `channels/${channel_id}`,
        {
          method: 'GET',
        }
      );

      const data: ICreateRoleBody = {
        mentionable: true,
        name: `${name}team`,
      };

      const { id: roleId, name: roleName } = await DiscordRequest<IDiscordRole>(
        `guilds/${guild_id}/roles`,
        {
          method: 'POST',
          data,
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
                `New role ${roleName} was created to tag the team.Add this variable into your github repo secrets`
              )
              .addFields({ name: 'DISCORD_ROLE', value: roleId }),
          ],
        },
      });
    }
  }

  return res.send({ type: InteractionResponseType.PONG });
};

export default postInteractionController;
