import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { Request, Response } from 'express';

const postInteractionController = (
  req: Request,
  res: Response
): Response<any, Record<string, any>> => {
  const { type } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  return res.send({ type: InteractionResponseType.PONG });
};

export default postInteractionController;
