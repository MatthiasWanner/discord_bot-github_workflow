import { IDiscordUser } from './users.types';

export interface IDiscordEmoji {
  id: string;
  name: string;
  roles?: string[];
  user?: IDiscordUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
