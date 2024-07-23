// see https://authjs.dev/getting-started/session-management/login
import { signIn, signOut } from '@/auth';

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button className="btn btn-sm" type="submit">
        Sign in
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="btn btn-sm" type="submit">
        Sign Out
      </button>
    </form>
  );
}
