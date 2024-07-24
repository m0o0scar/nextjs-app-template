import { NextAuthConfig } from 'next-auth';
import { AuthProvider } from '../types';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    provider: string;
    error?: 'RefreshAccessTokenError';
  }
}

export interface GetSessionCallbackOptions {
  providers?: AuthProvider[];
}

export type GetSessionCallback = (
  options?: GetSessionCallbackOptions
) => NonNullable<NonNullable<NextAuthConfig['callbacks']>['session']>;

export const getSessionCallback: GetSessionCallback =
  (options?: GetSessionCallbackOptions) => async (params) => {
    const { providers = [] } = options || {};
    const { session, token } = params;

    // are the required scopes granted?
    const provider = providers.find((p) => p.name === token?.provider);
    const requiredScopes = provider?.scopes || [];
    if (requiredScopes.length) {
      const grantedScopes = token?.scope?.split(/[ ,]/);
      const hasRequiredScopes = requiredScopes.every((requiredScope) =>
        grantedScopes?.includes(requiredScope)
      );
      if (!hasRequiredScopes) {
        throw new Error('Access denied: required scope not granted');
      }
    }

    // Send properties to the client, for example access_token from a provider.
    if (token.user) {
      Object.assign(session, {
        accessToken: token.access_token,
        provider: token.provider,
        user: token.user,
      });
    }

    return session;
  };
