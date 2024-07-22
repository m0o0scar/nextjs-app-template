import { AuthButton } from '@/components/auth0/LoginButton';

export default function Home() {
  return (
    <main className="prose max-w-full p-4">
      <h1>NextJS Template</h1>
      <div>
        <AuthButton />
      </div>
    </main>
  );
}
