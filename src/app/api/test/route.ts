import { getSession } from '@auth0/nextjs-auth0/edge';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return new Response('You are not logged in');
  }

  const { name, email } = session.user;
  return new Response(`Hello ${name || email}`);
}
