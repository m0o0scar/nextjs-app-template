import { uniq } from 'lodash';
import Github from 'next-auth/providers/github';
import { AuthProvider } from '../types';

const { AUTH_GITHUB_SCOPE = '' } = process.env;

const scopes = uniq([
  'read:user',
  ...AUTH_GITHUB_SCOPE.split(',').map((s) => s.trim()),
]).filter(Boolean);

const provider = Github({
  authorization: {
    params: {
      prompt: 'consent',
      scope: scopes.join(','),
    },
  },
});

export const github: AuthProvider = {
  name: 'github',
  scopes,
  provider,
};
