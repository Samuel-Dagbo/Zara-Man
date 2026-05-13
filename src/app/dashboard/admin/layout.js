import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/AdminSidebar';

export default async function AdminDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'admin') redirect('/dashboard/user');

  return (
    <div className="flex min-h-screen bg-luxury-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
