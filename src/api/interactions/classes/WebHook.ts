import { ICreateWebhookBody, IDiscordWebhook } from '../../../types';
import { capitalize, DiscordRequest } from '../../../utils';

export class Webhook {
  constructor(private readonly channelName: string, private readonly channelId: string) {}

  private async createWebhook(): Promise<IDiscordWebhook> {
    const webhookBody: ICreateWebhookBody = {
      name: `${capitalize(this.channelName || 'workflow')}_webhook`,
    };

    return await DiscordRequest<IDiscordWebhook>(`channels/${this.channelId}/webhooks`, {
      method: 'POST',
      data: webhookBody,
    });
  }

  public async getWebhookUrl(): Promise<string> {
    const { id: webhookId, token: webhookToken } = await this.createWebhook();

    return webhookToken
      ? `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`
      : 'Error during webhook creation, please create it manually';
  }
}
