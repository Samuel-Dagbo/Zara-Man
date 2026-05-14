'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { categories, formatPrice } from '@/lib/utils';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import { HiOutlineShoppingBag, HiOutlineStar, HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

  const initialSearch = searchParams?.get('search') || '';

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, sortBy, currentPage, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);
      params.append('sort', sortBy);
      params.append('page', currentPage.toString());
      params.append('limit', '12');
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setTotalProducts(data.pagination?.total || 0);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setProducts(data);
        setTotalProducts(data.length);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, selectedSize, selectedColor);
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-black border-b border-gold-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-bold">Discover</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold-500 mt-3">Our Collection</h1>
            </motion.div>

            <div className="flex flex-wrap gap-2 mt-10">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-gold-500 text-dark-950 font-bold shadow-lg shadow-gold-500/20'
                      : 'border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 hover:text-gold-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="relative flex-1 max-w-md">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/30" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-11 text-sm"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field max-w-[180px] text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-16 bg-dark-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="aspect-[3/4]" />
                    <div className="mt-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                icon={HiOutlineShoppingBag}
                title="No products found"
                description="Try adjusting your filters or search query."
              />
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize(product.sizes?.[0] || '');
                      setSelectedColor(product.colors?.[0] || '');
                    }}
                  >
                    <div className="aspect-[3/4] bg-dark-900/80 overflow-hidden relative border border-gold-500/10 group-hover:border-gold-500/30 transition-all duration-500">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.onSale && (
                        <span className="absolute top-4 left-4 bg-gold-500 text-dark-950 text-[9px] tracking-wider uppercase px-3 py-1.5 font-bold shadow-lg">
                          Sale
                        </span>
                      )}
                      {product.featured && !product.onSale && (
                        <span className="absolute top-4 left-4 bg-gold-500 text-dark-950 text-[9px] tracking-wider uppercase px-3 py-1.5 font-bold shadow-lg">
                          Featured
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="absolute bottom-4 right-4 bg-gold-500 text-dark-950 p-3 shadow-lg hover:bg-gold-400 transition-all duration-300 group/btn opacity-0 group-hover:opacity-100 shadow-gold-500/20"
                      >
                        <HiOutlineShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-8 right-0 bg-gold-500 text-dark-950 text-[9px] tracking-wider uppercase px-2 py-1 whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none font-bold">
                          Add to Cart
                        </span>
                      </button>
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] text-gold-500/40 tracking-[0.2em] uppercase">{product.category}</p>
                      <h3 className="font-display text-lg font-bold text-gold-400 mt-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <HiOutlineStar key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-gold-500/20'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-gold-500/30">({product.numReviews})</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="font-display text-lg font-bold text-gold-500">{formatPrice(product.price)}</span>
                        {product.comparePrice > 0 && (
                          <span className="text-sm text-gold-500/30 line-through">{formatPrice(product.comparePrice)}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-[10px] tracking-wider uppercase font-bold border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 hover:text-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 text-xs font-bold transition-all ${
                        page === currentPage
                          ? 'bg-gold-500 text-dark-950'
                          : 'border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 hover:text-gold-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-[10px] tracking-wider uppercase font-bold border border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 hover:text-gold-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-[calc(100%-2rem)] md:max-w-4xl bg-dark-950 overflow-y-auto max-h-[90vh] pointer-events-auto border border-gold-500/10"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-dark-900/80 hover:text-gold-500 z-10 text-gold-500/40 transition-colors border border-gold-500/10"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-[3/4] bg-dark-900/80 border-r border-gold-500/10">
                    <img
                      src={selectedProduct.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <p className="text-[10px] text-gold-500 tracking-[0.2em] uppercase">{selectedProduct.category}</p>
                    <h2 className="font-display text-3xl font-bold text-gold-500 mt-2">{selectedProduct.name}</h2>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <HiOutlineStar key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-gold-500 fill-current' : 'text-gold-500/20'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gold-500/30">({selectedProduct.numReviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                      <span className="font-display text-3xl font-bold text-gold-500">{formatPrice(selectedProduct.price)}</span>
                      {selectedProduct.comparePrice > 0 && (
                        <span className="text-lg text-gold-500/30 line-through">{formatPrice(selectedProduct.comparePrice)}</span>
                      )}
                    </div>

                    <p className="text-gold-500/50 mt-6 leading-relaxed text-sm">{selectedProduct.description}</p>

                    {selectedProduct.material && (
                      <p className="text-sm text-gold-500/40 mt-4">
                        <span className="font-bold text-gold-400 tracking-wider">Material:</span> {selectedProduct.material}
                      </p>
                    )}

                    {selectedProduct.sizes?.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-bold text-gold-400 tracking-[0.15em] uppercase mb-3">Size</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizes.map(size => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`w-12 h-12 border text-xs font-bold transition-all ${
                                selectedSize === size
                                  ? 'bg-gold-500 text-dark-950 border-gold-500'
                                  : 'border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 hover:text-gold-400'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProduct.colors?.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-bold text-gold-400 tracking-[0.15em] uppercase mb-3">Color</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-5 py-2.5 border text-xs transition-all ${
                                selectedColor === color
                                  ? 'bg-gold-500 text-dark-950 border-gold-500'
                                  : 'border-gold-500/20 text-gold-500/60 hover:border-gold-500/50 hover:text-gold-400'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => handleAddToCart(selectedProduct)}
                        disabled={!selectedProduct.inStock}
                        className={`flex-1 py-4 tracking-[0.15em] uppercase text-xs font-bold transition-all ${
                          selectedProduct.inStock
                            ? 'bg-gold-500 text-dark-950 hover:bg-gold-400 shadow-lg shadow-gold-500/20'
                            : 'bg-gold-500/10 text-gold-500/30 border border-gold-500/10 cursor-not-allowed'
                        }`}
                      >
                        {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>

                    {selectedProduct.careInstructions && (
                      <p className="text-[10px] text-gold-500/30 mt-6 tracking-wider">
                        <span className="font-bold text-gold-500/50">Care:</span> {selectedProduct.careInstructions}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
