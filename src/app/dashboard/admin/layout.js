import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/AdminSidebar';

export default async function AdminDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'admin') {
    redirect('/dashboard/user');
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
