import { uniq } from 'lodash';
import Google from 'next-auth/providers/google';
import { AuthProvider } from '../types';

const { AUTH_GOOGLE_SCOPE = '' } = process.env;

const scopes = uniq([
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  ...AUTH_GOOGLE_SCOPE.split(',').map((s) => s.trim()),
]).filter(Boolean);

const provider = Google({
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
      scope: scopes.join(' '),
    },
  },
});

export const google: AuthProvider = {
  name: 'google',
  scopes,
  provider,
};
