import NextAuth from 'next-auth';
import { google } from './providers/google';
import { github } from './providers/github';
import { getSignInCallback } from './callbacks/signIn';
import { getJWTCallback } from './callbacks/jwt';
import { getSessionCallback } from './callbacks/session';
import { getAuthroizedCallback } from './callbacks/authorized';

const providers = [google, github];

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: providers.map((p) => p.provider),
  callbacks: {
    signIn: getSignInCallback({ providers }),
    jwt: getJWTCallback(),
    session: getSessionCallback({ providers }),
    authorized: getAuthroizedCallback(),
  },
});
