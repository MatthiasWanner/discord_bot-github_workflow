export interface IDiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  avatar_decoration: string | null; // TODO: check if other value is string (null already checked, not in the doc)
  bot?: boolean;
  banner?: string | null;
  mfa_enabled?: boolean;
  accent_color?: number | null;
  system?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags: number;
}
