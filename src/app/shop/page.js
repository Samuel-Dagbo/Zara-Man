'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { categories, formatPrice, truncate } from '@/lib/utils';
import { HiOutlineAdjustments, HiOutlineX, HiOutlineStar, HiOutlineShoppingBag, HiOutlineSearch } from 'react-icons/hi';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      params.append('sort', sortBy);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <section className="py-12 bg-cream border-b border-luxury-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-gold-500 tracking-[0.3em] uppercase text-sm">Discover</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-espresso mt-2">Our Collection</h1>
            </motion.div>

            <div className="flex flex-wrap gap-3 mt-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-espresso text-cream'
                      : 'border border-luxury-200 text-luxury-600 hover:border-espresso hover:text-espresso'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="relative flex-1 max-w-md">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field max-w-[200px]"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-luxury-100" />
                    <div className="mt-4 space-y-2">
                      <div className="h-4 bg-luxury-100 w-3/4" />
                      <div className="h-3 bg-luxury-100 w-1/2" />
                      <div className="h-4 bg-luxury-100 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <HiOutlineShoppingBag className="w-20 h-20 text-luxury-300 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-espresso mb-2">No products found</h3>
                <p className="text-luxury-500">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
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
                    <div className="aspect-[3/4] bg-luxury-100 overflow-hidden relative">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.onSale && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs tracking-wider uppercase px-3 py-1">
                          Sale
                        </span>
                      )}
                      {product.featured && !product.onSale && (
                        <span className="absolute top-4 left-4 bg-gold-500 text-espresso text-xs tracking-wider uppercase px-3 py-1">
                          Featured
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="absolute bottom-4 right-4 bg-cream text-espresso p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg hover:bg-gold-500 hover:text-white"
                      >
                        <HiOutlineShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-luxury-500 tracking-wider uppercase">{product.category}</p>
                      <h3 className="font-display text-lg font-semibold text-espresso mt-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <HiOutlineStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-luxury-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-luxury-500">({product.numReviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-display text-lg font-bold text-espresso">{formatPrice(product.price)}</span>
                        {product.comparePrice > 0 && (
                          <span className="text-sm text-luxury-400 line-through">{formatPrice(product.comparePrice)}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl w-full bg-cream z-50 overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white shadow-md hover:text-gold-500 z-10"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[3/4] bg-luxury-100">
                  <img
                    src={selectedProduct.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12">
                  <p className="text-xs text-gold-500 tracking-wider uppercase">{selectedProduct.category}</p>
                  <h2 className="font-display text-3xl font-bold text-espresso mt-2">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <HiOutlineStar key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-gold-500 fill-current' : 'text-luxury-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-luxury-500">({selectedProduct.numReviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <span className="font-display text-3xl font-bold text-espresso">{formatPrice(selectedProduct.price)}</span>
                    {selectedProduct.comparePrice > 0 && (
                      <span className="text-lg text-luxury-400 line-through">{formatPrice(selectedProduct.comparePrice)}</span>
                    )}
                  </div>

                  <p className="text-luxury-600 mt-6 leading-relaxed">{selectedProduct.description}</p>

                  {selectedProduct.material && (
                    <p className="text-sm text-luxury-500 mt-4">
                      <span className="font-medium text-espresso">Material:</span> {selectedProduct.material}
                    </p>
                  )}

                  {selectedProduct.sizes?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-medium text-espresso tracking-wider uppercase mb-3">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 border text-sm font-medium transition-all ${
                              selectedSize === size
                                ? 'bg-espresso text-cream border-espresso'
                                : 'border-luxury-200 text-espresso hover:border-espresso'
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
                      <p className="text-sm font-medium text-espresso tracking-wider uppercase mb-3">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 border text-sm transition-all ${
                              selectedColor === color
                                ? 'bg-espresso text-cream border-espresso'
                                : 'border-luxury-200 text-espresso hover:border-espresso'
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
                      className={`flex-1 py-4 tracking-wider uppercase text-sm font-medium transition-all ${
                        selectedProduct.inStock
                          ? 'bg-espresso text-cream hover:bg-gold-500 hover:text-espresso'
                          : 'bg-luxury-200 text-luxury-500 cursor-not-allowed'
                      }`}
                    >
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>

                  {selectedProduct.careInstructions && (
                    <p className="text-xs text-luxury-400 mt-6">
                      <span className="font-medium text-espresso">Care:</span> {selectedProduct.careInstructions}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
