'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { HiOutlineUser, HiOutlineTrash, HiOutlineShieldCheck } from 'react-icons/hi';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/auth/users');
      setUsers(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
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
    } catch (err) { toast.error('Something went wrong'); }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('User deleted');
        fetchUsers();
      } else toast.error('Failed to delete');
    } catch (err) { toast.error('Something went wrong'); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-espresso">User Management</h1>
        <p className="text-luxury-500 mt-1">View and manage registered users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Users" value={users.length} icon={HiOutlineUser} color="gold" />
        <StatsCard title="Admins" value={users.filter(u => u.role === 'admin').length} icon={HiOutlineShieldCheck} color="purple" />
        <StatsCard title="Customers" value={users.filter(u => u.role === 'user').length} icon={HiOutlineUser} color="blue" />
      </div>

      <div className="bg-white border border-luxury-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-luxury-50">
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">User</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Email</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Role</th>
                <th className="text-left p-4 text-xs tracking-wider uppercase text-luxury-500">Joined</th>
                <th className="text-right p-4 text-xs tracking-wider uppercase text-luxury-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-luxury-500">Loading...</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-t border-luxury-50 hover:bg-luxury-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center">
                          <HiOutlineUser className="w-5 h-5 text-gold-500" />
                        </div>
                        <p className="text-sm font-medium text-espresso">{user.name}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-luxury-600">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 text-xs tracking-wider uppercase ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-luxury-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleRole(user._id, user.role)}
                          className="px-3 py-1.5 text-xs tracking-wider uppercase border border-luxury-200 text-luxury-600 hover:border-espresso hover:text-espresso transition-all"
                        >
                          Make {user.role === 'admin' ? 'User' : 'Admin'}
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="p-2 text-luxury-500 hover:text-red-600 hover:bg-red-50 transition-all">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
