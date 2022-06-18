import { InteractionType } from 'discord-interactions';
import { InteractionResponseTypes } from 'discord.js/typings/enums';

import {
  IDiscordAllowedMentions,
  IDiscordAttachment,
  IDiscordComponent,
  IDiscordEmbed,
  IGuildMember,
} from '../../types';

export interface IInteractionData {
  guild_id: string;
  id: string;
  name: string;
  type: number;
}

export interface IInteractionBody {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: IInteractionData;
  guild_id?: string;
  channel_id?: string;
  guild_locale?: string;
  locale?: string;
  member?: IGuildMember;
  user?: any;
  token: string;
  version: number;
}

export interface IInteractionResponse {
  type: InteractionResponseTypes;
  data: any;
}

export interface IInteractionDataResponse {
  tts?: boolean;
  content?: string;
  embeds?: IDiscordEmbed[];
  allowed_mentions?: IDiscordAllowedMentions;
  flags?: number;
  components?: IDiscordComponent[];
  attachments?: IDiscordAttachment[];
}
