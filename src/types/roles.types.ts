export interface IDiscordRole {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicode_emoji?: string | null;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: IRoleTag;
}

export interface IRoleTag {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
}

export interface ICreateRoleBody {
  name?: string;
  color?: number;
  permissions?: string;
  hoist?: boolean;
  icon?: string | null; // Corresponding image data URI format
  unicode_emoji?: string | null;
  mentionable?: boolean;
}
