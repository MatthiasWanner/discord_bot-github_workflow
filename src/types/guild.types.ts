import { IDiscordWelcomeScreen } from './channels.types';
import { IDiscordEmoji } from './emoji.types';
import { IDiscordRole } from './roles.types';
import { IDiscordSticker } from './stickers.types';
import { IDiscordUser } from './users.types';

export interface IDiscordGuild {
  id: string;
  name: string;
  icon: null | string;
  icon_hash?: null | string;
  splash: null | string;
  discovery_splash: null | string;
  owner_id: string;
  owner?: boolean;
  permissions?: string;
  region?: null | string;
  afk_channel_id: null | string;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: null | string;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: IDiscordRole[];
  emojis: IDiscordEmoji[];
  features: IDiscordGuildFeature[];
  mfa_level: number;
  application_id: null | string;
  system_channel_id: null | string;
  system_channel_flags: number;
  rules_channel_id: null | string;
  max_presences?: null | number;
  max_members?: number;
  vanity_url_code: null | string;
  description: null | string;
  banner: null | string;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id: null | string;
  max_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: IDiscordWelcomeScreen;
  nsfw_level: number;
  stickers?: IDiscordSticker[];
  premium_progress_bar_enabled: boolean;
}

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

export type IDiscordGuildFeature =
  | 'ANIMATED_BANNER'
  | 'ANIMATED_ICON'
  | 'AUTO_MODERATION'
  | 'BANNER'
  | 'COMMERCE'
  | 'COMMUNITY'
  | 'DISCOVERABLE'
  | 'FEATURABLE'
  | 'INVITE_SPLASH'
  | 'MEMBER_VERIFICATION_GATE_ENABLED'
  | 'MONETIZATION_ENABLED'
  | 'MORE_STICKERS'
  | 'NEWS'
  | 'PARTNERED'
  | 'PREVIEW_ENABLED'
  | 'PRIVATE_THREADS'
  | 'ROLE_ICONS'
  | 'TICKETED_EVENTS_ENABLED'
  | 'VANITY_URL'
  | 'VERIFIED'
  | 'VIP_REGIONS'
  | 'WELCOME_SCREEN_ENABLED';

/*


*/
