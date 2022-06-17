import { IDiscordChannel } from './channels.types';
import { IDiscordGuild } from './guild.types';
import { IDiscordUser } from './users.types';

export interface IDiscordWebhook {
  id: string;
  type: number;
  guild_id?: string;
  channel_id: string | null;
  user?: IDiscordUser;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: string | null;
  source_guild?: Partial<IDiscordGuild>;
  source_channel?: Partial<IDiscordChannel>;
  url?: string;
}

export interface ICreateWebhookBody {
  name: string;
  avatar?: null | string; // Corresponding image data URI format
}
