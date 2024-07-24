import { NextAuthConfig } from 'next-auth';
import { AuthProvider } from '../types';

export interface GetSignInCallbackOptions {
  providers?: AuthProvider[];
}

export type GetSignInCallback = (
  options?: GetSignInCallbackOptions
) => NonNullable<NonNullable<NextAuthConfig['callbacks']>['signIn']>;

const { AUTH_ALLOWED_USERS, AUTH_ALLOWED_DOMAINS } = process.env;
const allowedUsers = AUTH_ALLOWED_USERS?.split(',') || undefined;
const allowedDomains = AUTH_ALLOWED_DOMAINS?.split(',') || undefined;

export const getSignInCallback: GetSignInCallback =
  (options?: GetSignInCallbackOptions) => async (params) => {
    const { user } = params;
    const domain = user.email?.split('@')[1];

    // is this user allowed?
    if (allowedUsers && !allowedUsers.includes(user.email || '')) return false;

    // is this domain allowed?
    if (allowedDomains && !allowedDomains.includes(domain || '')) return false;

    return true;
  };
