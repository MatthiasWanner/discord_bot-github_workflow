import { IDiscordUser } from './users.types';

export interface IGuildMember {
  avatar?: string | null;
  communication_disabled_until?: null | string;
  deaf: boolean;
  flags: number;
  is_pending?: boolean;
  joined_at: string;
  mute: boolean;
  nick?: string | null;
  pending?: false;
  permissions?: string;
  premium_since?: string | null;
  roles: string[];
  user?: IDiscordUser;
}

export interface IThreadMember {
  id?: string;
  user_id?: string;
  join_timestamp: string;
  flags: number;
}
