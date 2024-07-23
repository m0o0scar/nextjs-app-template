import { auth } from '@/auth';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const session = await auth();
  return new Response(JSON.stringify(session));
}
