import { IDiscordChannel } from '../../../types';
import { DiscordRequest } from '../../../utils';

export class Channel {
  constructor(private readonly channelId: string) {}

  public async getChannelName(): Promise<string> {
    const { name: channelName } = await this.getChannel();
    return channelName || 'channel_name';
  }

  private async getChannel(): Promise<IDiscordChannel> {
    return await DiscordRequest<IDiscordChannel>(`channels/${this.channelId}`, {
      method: 'GET',
    });
  }
}
