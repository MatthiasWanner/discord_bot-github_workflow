export interface IDiscordEmbed {
  title?: string;
  type?: EmbedType; // type of embed (always "rich" for webhook embeds)
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: IDiscordEmbedFooter;
  image?: IDiscordEmbedImage;
  thumbnail?: IDiscordEmbedThumbnail;
  video?: IDiscordEmbedVideo;
  provider?: IDiscordEmbedProvider;
  author?: IDiscordEmbedAuthor;
  fields?: IDiscordEmbedField[];
}

export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

export interface IDiscordEmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface IDiscordEmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface IDiscordEmbedThumbnail {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface IDiscordEmbedVideo {
  url: string;
  proxy_url?: string;
  height: number;
  width: number;
}

export interface IDiscordEmbedProvider {
  name?: string;
  url?: string;
}

export interface IDiscordEmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface IDiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}
