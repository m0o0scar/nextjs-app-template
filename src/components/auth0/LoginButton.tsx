'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export const LoginButton = () => <a href="/api/auth/login">Login</a>;

export const LogoutButton = () => <a href="/api/auth/logout">Logout</a>;

export const AuthButton = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!user) return <LoginButton />;

  return (
    <span>
      Hello {user.name || user.email}, click here to <LogoutButton />
    </span>
  );
};
