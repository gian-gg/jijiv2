import { toNextJsHandler } from 'better-auth/next-js';

const getHandler = async () => {
  const { auth } = await import('@/lib/auth');
  return toNextJsHandler(auth);
};

export const POST = async (req: Request) => {
  const handler = await getHandler();
  return handler.POST(req);
};

export const GET = async (req: Request) => {
  const handler = await getHandler();
  return handler.GET(req);
};
