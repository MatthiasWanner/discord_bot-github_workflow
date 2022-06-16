import dotenv from 'dotenv';
dotenv.config();

export const config = {
  developers: ['8048'],
  port: process.env.PORT && !isNaN(Number(process.env.PORT)) ? +process.env.PORT : 5000,
  client: {
    id: process.env.APP_ID,
    guildId: process.env.GUILD_ID,
    token: process.env.DISCORD_TOKEN,
    publicKey: process.env.PUBLIC_KEY,
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    caches: {
      BaseGuildEmojiManager: 0,
      GuildBanManager: 0,
      GuildInviteManager: 0,
      GuildStickerManager: 0,
      MessageManager: 0,
      PresenceManager: 0,
      StageInstanceManager: 0,
      ThreadManager: 0,
      ThreadMemberManager: 0,
      VoiceStateManager: 0,
    },
  },
};
