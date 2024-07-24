import { Provider } from 'next-auth/providers';

export interface AuthProvider {
  name: string;
  scopes: string[];
  provider: Provider;
}
