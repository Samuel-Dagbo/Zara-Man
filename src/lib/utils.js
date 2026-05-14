export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BTQ-${timestamp}${random}`;
}

export const categories = [
  { id: 'all', name: 'All', icon: '✦' },
  { id: 'suits', name: 'Suits & Blazers', icon: '🎯' },
  { id: 'shirts', name: 'Shirts', icon: '👔' },
  { id: 'pants', name: 'Pants & Trousers', icon: '👖' },
  { id: 'outerwear', name: 'Outerwear', icon: '🧥' },
  { id: 'shoes', name: 'Shoes', icon: '👞' },
  { id: 'watches', name: 'Watches', icon: '⌚' },
  { id: 'accessories', name: 'Accessories', icon: '💼' },
  { id: 'bags', name: 'Bags & Luggage', icon: '👜' },
  { id: 'new-arrivals', name: 'New Arrivals', icon: '⭐' },
];

export const orderStatuses = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: 'processing', label: 'Processing', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

export function generateCartItemId() {
  return Math.random().toString(36).substring(2, 11);
}
