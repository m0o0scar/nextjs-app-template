import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next App',
  description: 'NextJS Template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
