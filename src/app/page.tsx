import UserProfile from '@/components/auth/Profile';
import { SignIn, SignOut } from '@/components/auth/SignInOut';

export default function Home() {
  return (
    <main className="prose max-w-full p-4">
      <h1>NextJS Template</h1>
      <div className="flex flex-row gap-2 items-center">
        <SignIn />
        <SignOut />
        <UserProfile />
      </div>
    </main>
  );
}
