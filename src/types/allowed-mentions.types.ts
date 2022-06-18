export enum AllowedMentionType {
  ROLE_MENTION = 'roles',
  USER_MENTION = 'users',
  EVERYONE_MENTION = 'everyone',
}

export interface IDiscordAllowedMentions {
  parse: AllowedMentionType[];
  roles: string[];
  users: string[];
  replied_user: boolean;
}
