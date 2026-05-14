import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UserSidebar from '@/components/dashboard/UserSidebar';

export default async function UserDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role === 'admin') {
    redirect('/dashboard/admin');
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <UserSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
