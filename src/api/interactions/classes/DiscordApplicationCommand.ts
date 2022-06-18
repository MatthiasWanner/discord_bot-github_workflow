import { InteractionResponseTypes } from 'discord.js/typings/enums';

import { getRandomEmoji } from '../../../utils';
import { IInteractionResponse } from '../interactions.types';
import { ProjectCommand } from './ProjectCommand';

export class DiscordApplicationCommand {
  constructor(private name: string, private channelId: string, private guildId: string) {}

  private testCommandeHandler(): IInteractionResponse {
    return {
      type: InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: 'hello world ' + getRandomEmoji(),
      },
    };
  }

  public async execute(): Promise<IInteractionResponse> {
    switch (this.name) {
      case 'test':
        return this.testCommandeHandler();
      case 'project':
        return await new ProjectCommand(this.channelId, this.guildId).projectCommandHandler();
      default:
        return {
          type: InteractionResponseTypes.PONG,
          data: {},
        };
    }
  }
}
