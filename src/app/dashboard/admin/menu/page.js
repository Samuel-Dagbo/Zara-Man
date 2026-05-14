'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { StatsCardSkeleton, TableSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineCollection, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX, HiOutlineExclamationCircle } from 'react-icons/hi';
import { formatPrice, categories } from '@/lib/utils';
import ImageUploader from '@/components/ui/ImageUploader';

const catList = categories.filter(c => c.id !== 'all');

const emptyForm = {
  name: '', description: '', price: '', comparePrice: '', category: 'suits',
  images: [''], sizes: [], colors: [], tags: [], material: '',
  careInstructions: '', inStock: true, featured: false, onSale: false,
  rating: 0, numReviews: 0, quantity: 10,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      comparePrice: product.comparePrice?.toString() || '',
      category: product.category || 'suits',
      images: product.images?.length ? product.images : [''],
      sizes: product.sizes || [],
      colors: product.colors || [],
      tags: product.tags || [],
      material: product.material || '',
      careInstructions: product.careInstructions || '',
      inStock: product.inStock ?? true,
      featured: product.featured || false,
      onSale: product.onSale || false,
      rating: product.rating || 0,
      numReviews: product.numReviews || 0,
      quantity: product.quantity ?? 10,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted');
        fetchProducts();
      } else toast.error('Failed to delete');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      comparePrice: parseFloat(form.comparePrice) || 0,
      quantity: parseInt(form.quantity) || 0,
      images: form.images.filter(i => i),
      rating: parseFloat(form.rating),
      numReviews: parseInt(form.numReviews),
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(editingProduct ? 'Product updated' : 'Product created');
        setShowModal(false);
        fetchProducts();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to save');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.inStock).length,
    featured: products.filter(p => p.featured).length,
    onSale: products.filter(p => p.onSale).length,
    lowStock: products.filter(p => p.inStock && p.quantity <= 5).length,
  };

  if (error) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gold-500">Products</h1>
            <p className="text-gold-500/50 mt-1 text-sm">Manage your inventory.</p>
          </div>
        </div>
        <EmptyState
          icon={HiOutlineExclamationCircle}
          title="Failed to load products"
          description={error}
          actionLabel="Retry"
          onAction={() => { setLoading(true); setError(''); fetchProducts(); }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-gold-500">Products</h1>
          <p className="text-sm lg:text-base text-gold-500/50 mt-1">Manage your inventory.</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-xs px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto justify-center shadow-gold-500/20">
          <HiOutlinePlus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard title="Total" value={stats.total} icon={HiOutlineCollection} color="gold" />
            <StatsCard title="In Stock" value={stats.inStock} icon={HiOutlineCollection} color="green" />
            <StatsCard title="Low Stock" value={stats.lowStock} icon={HiOutlineExclamationCircle} color="red" />
            <StatsCard title="Featured" value={stats.featured} icon={HiOutlineCollection} color="purple" />
            <StatsCard title="On Sale" value={stats.onSale} icon={HiOutlineCollection} color="blue" />
          </>
        )}
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <TableSkeleton rows={8} cols={6} />
          ) : products.length === 0 ? (
            <EmptyState
              icon={HiOutlineCollection}
              title="No products yet"
              description="Add your first product to start building your catalog."
              actionLabel="Add Product"
              onAction={openCreate}
            />
          ) : (
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Qty</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-dark-800/60 flex-shrink-0 overflow-hidden border border-gold-500/10">
                          <img src={product.images?.[0] || ''} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gold-400 truncate">{product.name}</p>
                          <p className="text-[10px] text-gold-500/40 tracking-wider">{product._id?.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gold-500/50 capitalize">{product.category}</td>
                    <td>
                      <p className="text-sm font-bold text-gold-500">{formatPrice(product.price)}</p>
                      {product.comparePrice > 0 && (
                        <p className="text-[10px] text-gold-500/30 line-through">{formatPrice(product.comparePrice)}</p>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${product.inStock ? 'badge-green' : 'badge-red'}`}>
                        {product.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td>
                      <span className={`text-sm font-bold ${product.quantity <= 5 && product.inStock ? 'text-red-400' : 'text-gold-500/50'}`}>
                        {product.quantity ?? '-'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(product)} className="p-2 text-gold-500/40 hover:text-gold-500 hover:bg-gold-500/10 transition-all" title="Edit">
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="p-2 text-gold-500/40 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                          <HiOutlineTrash className="w-4 h-4" />
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

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:max-w-2xl bg-dark-950 overflow-y-auto max-h-[90vh] pointer-events-auto border border-gold-500/10"
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-gold-500">
                      {editingProduct ? 'Edit Product' : 'New Product'}
                    </h2>
                    <button onClick={() => setShowModal(false)} className="p-2 text-gold-500/40 hover:text-gold-500 transition-colors">
                      <HiOutlineX className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Description</label>
                        <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Price (GHS)</label>
                        <input type="number" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Compare Price</label>
                        <input type="number" step="0.01" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Category</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                          {catList.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Quantity</label>
                        <input type="number" min="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Material</label>
                        <input type="text" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="input-field" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Images</label>
                        <ImageUploader
                          images={form.images.filter(i => i)}
                          onChange={(urls) => setForm({ ...form, images: urls.length ? urls : [''] })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Sizes (comma separated)</label>
                        <input type="text" value={form.sizes.join(', ')} onChange={(e) => setForm({ ...form, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="input-field" placeholder="XS, S, M, L, XL" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Colors (comma separated)</label>
                        <input type="text" value={form.colors.join(', ')} onChange={(e) => setForm({ ...form, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="input-field" placeholder="Black, White, Red" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Care Instructions</label>
                        <input type="text" value={form.careInstructions} onChange={(e) => setForm({ ...form, careInstructions: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gold-500/60 tracking-[0.15em] uppercase mb-2">Rating</label>
                        <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="input-field" />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4 text-gold-500 focus:ring-gold-500 bg-dark-900 border-gold-500/20" />
                        <span className="text-xs sm:text-sm text-gold-400">In Stock</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 text-gold-500 focus:ring-gold-500 bg-dark-900 border-gold-500/20" />
                        <span className="text-xs sm:text-sm text-gold-400">Featured</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.onSale} onChange={(e) => setForm({ ...form, onSale: e.target.checked })} className="w-4 h-4 text-gold-500 focus:ring-gold-500 bg-dark-900 border-gold-500/20" />
                        <span className="text-xs sm:text-sm text-gold-400">On Sale</span>
                      </label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                      <button type="submit" disabled={submitting} className="btn-primary flex-1 disabled:opacity-50 text-center text-xs shadow-gold-500/20">
                        {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                      </button>
                      <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 text-center text-xs">Cancel</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
