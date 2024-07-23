// see https://authjs.dev/getting-started/session-management/get-session
import { auth } from '@/auth';

export default async function UserProfile() {
  const session = await auth();

  if (!session?.user) return <div>Please sign in first.</div>;

  return <div>Hello {session.user.name || session.user.email}</div>;
}
