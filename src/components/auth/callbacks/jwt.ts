import { User, NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at?: number;
    refresh_token?: string;
    provider: string;
    scope?: string;
    error?: 'RefreshAccessTokenError';
  }
}

export interface GetJWTCallbackOptions {}

export type GetJWTCallback = (
  options?: GetJWTCallbackOptions
) => NonNullable<NonNullable<NextAuthConfig['callbacks']>['jwt']>;

export const getJWTCallback: GetJWTCallback =
  (options?: GetJWTCallbackOptions) => async (params) => {
    const { token, account, profile } = params;
    // First login, save the `access_token`, `refresh_token`, and other details into the JWT
    if (account) {
      const user: User = {
        id: token.sub,
        name: profile?.name,
        email: profile?.email,
        image: token?.picture,
      };

      // Include granted scopes to be available in the client,
      // so that later in session callback, we can determine if user has granted us the required scopes
      const jwt: JWT = {
        access_token: account.access_token!,
        expires_at: account.expires_at,
        refresh_token: account.refresh_token,
        provider: account.provider,
        scope: account.scope,
        user,
      };

      return jwt;
    }

    // Subsequent logins, if the `access_token` is still valid, return the JWT
    else if (!token.expires_at || Date.now() < token.expires_at * 1000) {
      return token;
    }

    // Subsequent logins, if the `access_token` has expired, try to refresh it
    else {
      if (!token.refresh_token) throw new Error('Missing refresh token');

      try {
        // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
        // at their `/.well-known/openid-configuration` endpoint.
        // i.e. https://accounts.google.com/.well-known/openid-configuration

        // We can use token.provider to determine which auth provider is being used.
        // Example value could be "google", "github", etc.

        const response = await fetch('https://oauth2.googleapis.com/token', {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token!,
          }),
          method: 'POST',
        });

        const responseTokens = await response.json();

        if (!response.ok) throw responseTokens;

        return {
          // Keep the previous token properties
          ...token,
          access_token: responseTokens.access_token,
          expires_at: Math.floor(
            Date.now() / 1000 + (responseTokens.expires_in as number)
          ),
          // Fall back to old refresh token, but note that
          // many providers may only allow using a refresh token once.
          refresh_token: responseTokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error('Error refreshing access token', error);
        // The error property can be used client-side to handle the refresh token error
        return { ...token, error: 'RefreshAccessTokenError' as const };
      }
    }
  };
