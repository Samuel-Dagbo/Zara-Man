import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import UserSidebar from '@/components/dashboard/UserSidebar';

export default async function UserDashboardLayout({ children }) {
  const session = await getServerSession();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'user') redirect('/dashboard/admin');

  return (
    <div className="flex min-h-screen bg-luxury-50">
      <UserSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
