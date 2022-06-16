import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { RequestHandler } from 'express';

import { getRandomEmoji } from '../../../utils';

const postInteractionController: RequestHandler<
  null,
  Record<string, any>,
  {
    type: number;
    data: {
      guild_id: string;
      id: string;
      name: string;
      type: 1;
    };
  },
  null
> = (req, res) => {
  const { type, data } = req.body;

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
  if (type === InteractionType.APPLICATION_COMMAND) {
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
  }

  return res.send({ type: InteractionResponseType.PONG });
};

export default postInteractionController;
