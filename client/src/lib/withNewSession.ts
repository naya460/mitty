import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from 'ioredis';
import { getCookie } from 'cookies-next';

const redis = new Redis();

export default async function authNewSession(req: NextApiRequest, res: NextApiResponse): Promise<string> {
  return (await redis.hget('session', getCookie('new-session-cookie', { req, res })));
}

