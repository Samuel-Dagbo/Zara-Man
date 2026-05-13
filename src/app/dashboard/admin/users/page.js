'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton, TableSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineUser, HiOutlineTrash, HiOutlineShieldCheck, HiOutlineExclamationCircle } from 'react-icons/hi';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/auth/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      setUsers(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        toast.success(`User role updated to ${newRole}`);
        fetchUsers();
      } else toast.error('Failed to update role');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('User deleted');
        fetchUsers();
      } else toast.error('Failed to delete');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-espresso">User Management</h1>
          <p className="text-luxury-500 mt-1">View and manage registered users.</p>
        </div>
        <EmptyState
          icon={HiOutlineExclamationCircle}
          title="Failed to load users"
          description={error}
          actionLabel="Retry"
          onAction={() => { setLoading(true); setError(''); fetchUsers(); }}
        />
      </div>
    );
  }

  const admins = users.filter(u => u.role === 'admin').length;
  const customers = users.filter(u => u.role === 'user').length;

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-espresso">User Management</h1>
        <p className="text-sm lg:text-base text-luxury-500 mt-1">View and manage registered users.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total Users" value={users.length} icon={HiOutlineUser} color="gold" />
            <StatsCard title="Admins" value={admins} icon={HiOutlineShieldCheck} color="purple" />
            <StatsCard title="Customers" value={customers} icon={HiOutlineUser} color="blue" />
          </>
        )}
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <TableSkeleton rows={8} cols={5} />
          ) : users.length === 0 ? (
            <EmptyState
              icon={HiOutlineUser}
              title="No users found"
              description="User accounts will appear here once people register."
            />
          ) : (
            <table className="premium-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-500/20 to-gold-500/5 rounded-full flex items-center justify-center">
                          <HiOutlineUser className="w-5 h-5 text-gold-600" />
                        </div>
                        <p className="text-sm font-medium text-espresso">{user.name}</p>
                      </div>
                    </td>
                    <td className="text-sm text-luxury-600">{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'badge-purple' : 'badge-blue'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="text-sm text-luxury-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button
                          onClick={() => toggleRole(user._id, user.role)}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs tracking-wider uppercase rounded-lg border border-luxury-200 text-luxury-600 hover:border-espresso hover:text-espresso hover:bg-luxury-50 transition-all font-medium"
                        >
                          Make {user.role === 'admin' ? 'User' : 'Admin'}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-1.5 sm:p-2 rounded-lg text-luxury-500 hover:text-red-600 hover:bg-red-50 transition-all"
                          aria-label="Delete user"
                        >
                          <HiOutlineTrash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
