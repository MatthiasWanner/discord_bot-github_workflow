import { InteractionType } from 'discord-interactions';

import { IGuildMember } from '../../types/guild.types';

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
