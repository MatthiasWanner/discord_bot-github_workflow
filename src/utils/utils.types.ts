import { Response as ExpressResponse, Request } from 'express';

export type bufferArg = string | Uint8Array | ArrayBuffer | Buffer;

export type VerifyRequestHandler = (
  clientKey: string
) => (req: Request, res: ExpressResponse, buf: bufferArg) => void;

export type DiscordRequestHandler = <T>(endpoint: string, options: any) => Promise<T>;
