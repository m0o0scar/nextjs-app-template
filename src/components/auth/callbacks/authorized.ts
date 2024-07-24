import { NextAuthConfig } from 'next-auth';

export interface GetAuthorizedCallbackOptions {}

export type GetAuthorizedCallback = (
  options?: GetAuthorizedCallbackOptions
) => NonNullable<NonNullable<NextAuthConfig['callbacks']>['authorized']>;

export const getAuthroizedCallback: GetAuthorizedCallback =
  (options?: GetAuthorizedCallbackOptions) => async (params) => {
    // Protecting resources with middleware
    // https://authjs.dev/getting-started/session-management/protecting#nextjs-middleware

    const { request, auth } = params;

    // Ignore auth related routes
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/auth/')) return true;

    // Logged in users are authenticated, otherwise redirect to login page
    return !!auth;
  };
