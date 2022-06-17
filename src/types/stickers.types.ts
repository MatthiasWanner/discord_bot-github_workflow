import { IDiscordUser } from './users.types';

export interface IDiscordSticker {
  id: string;
  pack_id?: string;
  name: string;
  description: null | string;
  tags: string;
  asset?: string;
  type: number;
  format_type: number;
  available?: boolean;
  guild_id?: string;
  user?: IDiscordUser;
  sort_value?: number;
}
