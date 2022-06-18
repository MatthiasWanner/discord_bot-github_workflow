import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { RequestHandler } from 'express';

import { DiscordApplicationCommand } from '../classes/DiscordApplicationCommand';
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
  if (type === InteractionType.APPLICATION_COMMAND && data && channelId && guildId) {
    const { name } = data;

    const discordApplicationCommand = new DiscordApplicationCommand(name, channelId, guildId);

    return res.send(await discordApplicationCommand.execute());
  }

  return res.send({ type: InteractionResponseType.PONG });
};

export default postInteractionController;
