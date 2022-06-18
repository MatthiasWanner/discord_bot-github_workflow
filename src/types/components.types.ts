import { IDiscordEmoji } from './emoji.types';

export interface IDiscordComponent {
  type: number;
  component: IDiscordActionRowComponent[] | IDiscordButtonComponent[];
}

export interface IDiscordActionRowComponent {
  type: number;
  label: string;
  style: number;
  custom_id: string;
}

/**
 *  Button styles
 *  Primary	    1	blurple	custom_id
 *  Secondary	2	grey	custom_id
 *  Success	    3	green	custom_id
 *  Danger	    4	red	custom_id
 *  Link	    5
 */
export interface IDiscordButtonComponent {
  type: number;
  label?: string;
  style: number;
  custom_id?: string;
  emoji?: Pick<IDiscordEmoji, 'id' | 'name' | 'animated'>;
  url?: string;
  disabled?: boolean;
}
