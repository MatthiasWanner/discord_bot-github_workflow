import 'dotenv/config';
import axios from 'axios';
import { verifyKey } from 'discord-interactions';
import { Response as ExpressResponse, Request } from 'express';

import { bufferArg, DiscordRequestHandler, VerifyRequestHandler } from './utils.types';

export const VerifyDiscordRequest: VerifyRequestHandler = (clientKey: string) => {
  return function (req: Request, res: ExpressResponse, buf: bufferArg) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    if (!signature || !timestamp) throw new Error('Missing signature or timestamp');

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
};

/**
 *
 * @param endpoint The endpoint to call without beginning "/"
 * @param options request option (headers, data as body, etc.)
 * @returns Object or array according to API and provided T parameter
 */
export const DiscordRequest: DiscordRequestHandler = async (endpoint: string, options: any) => {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;

  // Use axios to make requests
  const res = await axios(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options,
  });
  // throw API errors
  if (!res.data) {
    console.log(res.status);
    throw new Error(JSON.stringify(res.statusText));
  }
  // return original response
  return res.data;
};

export function getRandomEmoji(): string {
  const emojiList = [
    '😭',
    '😄',
    '😌',
    '🤓',
    '😎',
    '😤',
    '🤖',
    '😶‍🌫️',
    '🌏',
    '📸',
    '💿',
    '👋',
    '🌊',
    '✨',
  ];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
