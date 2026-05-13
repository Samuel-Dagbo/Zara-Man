import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/auth/signin');
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== 'admin') {
    redirect('/dashboard/user');
  }
  return session;
}