const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  image: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
}, { timestamps: true });

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  comparePrice: { type: Number, default: 0 },
  category: String,
  images: [String],
  sizes: [String],
  colors: [String],
  tags: [String],
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, default: 10 },
  featured: { type: Boolean, default: false },
  onSale: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  material: String,
  careInstructions: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const seedProducts = [
  // Suits & Blazers
  {
    name: 'Navy Tailored Fit Suit',
    description: 'A masterfully tailored two-piece suit in deep navy. Crafted from premium Italian wool with a refined slim fit silhouette. Features a two-button closure, notch lapels, and flat-front trousers. Perfect for the boardroom or special occasions.',
    price: 895,
    comparePrice: 1200,
    category: 'suits',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80'],
    sizes: ['38S', '38R', '40R', '40L', '42R', '42L', '44R', '44L'],
    colors: ['Navy', 'Charcoal', 'Black'],
    tags: ['suit', 'formal', 'wool', 'tailored'],
    featured: true,
    rating: 4.8,
    numReviews: 124,
    material: 'Italian Wool Blend',
    careInstructions: 'Dry clean only. Iron on low heat.',
    inStock: true,
    quantity: 25,
  },
  {
    name: 'Charcoal Slim Fit Blazer',
    description: 'A versatile single-breasted blazer in charcoal grey. Constructed with a half-canvas chest for superior drape and shape retention. Features a two-button closure, peak lapels, and a chest pocket.',
    price: 595,
    comparePrice: 0,
    category: 'suits',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80'],
    sizes: ['38S', '38R', '40R', '40L', '42R', '42L', '44R'],
    colors: ['Charcoal', 'Navy', 'Tan'],
    tags: ['blazer', 'smart casual', 'wool'],
    featured: true,
    rating: 4.6,
    numReviews: 89,
    material: 'Worsted Wool',
    careInstructions: 'Dry clean only.',
    inStock: true,
    quantity: 30,
  },
  {
    name: 'Black Tuxedo Set',
    description: 'The ultimate formalwear ensemble. This peak-lapel tuxedo in midnight black features satin-covered buttons, a single-breasted jacket with jetted pockets, and matching trousers with a satin side stripe.',
    price: 1295,
    comparePrice: 1600,
    category: 'suits',
    images: ['https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80'],
    sizes: ['38R', '40R', '40L', '42R', '42L', '44R'],
    colors: ['Black'],
    tags: ['tuxedo', 'formal', 'black tie', 'event'],
    featured: false,
    onSale: true,
    rating: 4.9,
    numReviews: 56,
    material: 'Wool-Mohair Blend',
    careInstructions: 'Dry clean only. Store on padded hanger.',
    inStock: true,
    quantity: 15,
  },

  // Shirts
  {
    name: 'Italian Linen Shirt',
    description: 'A lightweight linen shirt perfect for warm-weather sophistication. Cut from premium Italian flax with a relaxed yet refined fit. Features a button-down collar, chest pocket, and mother-of-pearl buttons.',
    price: 195,
    comparePrice: 0,
    category: 'shirts',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Sky Blue', 'Pink', 'Mint'],
    tags: ['shirt', 'linen', 'casual', 'summer'],
    featured: true,
    rating: 4.5,
    numReviews: 203,
    material: '100% Italian Linen',
    careInstructions: 'Machine wash cold. Tumble dry low. Iron while damp.',
    inStock: true,
    quantity: 50,
  },
  {
    name: 'Oxford Button-Down Shirt',
    description: 'A timeless wardrobe essential. This classic oxford shirt is crafted from premium cotton oxford cloth with a button-down collar, adjustable barrel cuffs, and a box pleat with locker loop for effortless sophistication.',
    price: 145,
    comparePrice: 0,
    category: 'shirts',
    images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White', 'Blue', 'Pink', 'Striped Blue'],
    tags: ['shirt', 'oxford', 'classic', 'casual'],
    featured: false,
    rating: 4.7,
    numReviews: 312,
    material: 'Premium Cotton Oxford',
    careInstructions: 'Machine wash warm. Tumble dry medium. Iron on medium heat.',
    inStock: true,
    quantity: 75,
  },

  // Pants
  {
    name: 'Wool Trousers',
    description: 'Impeccably tailored trousers in lightweight wool. Featuring a flat front, side pockets, and a tapered leg for a modern silhouette. The perfect companion for your blazer or sport coat.',
    price: 295,
    comparePrice: 395,
    category: 'pants',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'],
    sizes: ['30x30', '32x30', '32x32', '34x30', '34x32', '36x32', '36x34', '38x34'],
    colors: ['Charcoal', 'Navy', 'Khaki'],
    tags: ['trousers', 'wool', 'formal', 'work'],
    featured: true,
    rating: 4.4,
    numReviews: 98,
    material: 'Lightweight Wool',
    careInstructions: 'Dry clean recommended.',
    inStock: true,
    quantity: 40,
  },
  {
    name: 'Slim Fit Chinos',
    description: 'Modern essentials redefined. These premium chinos offer a slim, tapered fit in comfortable stretch cotton twill. Features a mid-rise waist, zip fly, and classic five-pocket styling.',
    price: 125,
    comparePrice: 0,
    category: 'pants',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'],
    sizes: ['30x30', '30x32', '32x30', '32x32', '34x30', '34x32', '36x32'],
    colors: ['Khaki', 'Navy', 'Olive', 'Black'],
    tags: ['chinos', 'casual', 'cotton', 'stretch'],
    featured: false,
    rating: 4.3,
    numReviews: 245,
    material: 'Cotton Stretch Twill',
    careInstructions: 'Machine wash cold. Tumble dry low.',
    inStock: true,
    quantity: 60,
  },

  // Outerwear
  {
    name: 'Cashmere Overcoat',
    description: 'A sumptuous full-length overcoat in pure cashmere. The epitome of refined luxury, featuring a notch lapel, two-button closure, pick-stitch detailing, and a satin-lined interior.',
    price: 1895,
    comparePrice: 2400,
    category: 'outerwear',
    images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Camel', 'Charcoal', 'Black'],
    tags: ['overcoat', 'cashmere', 'winter', 'luxury'],
    featured: true,
    rating: 4.9,
    numReviews: 67,
    material: '100% Pure Cashmere',
    careInstructions: 'Dry clean only. Store in garment bag.',
    inStock: true,
    quantity: 10,
  },
  {
    name: 'Leather Bomber Jacket',
    description: 'A rugged yet refined bomber jacket in supple Italian lambskin leather. Features a ribbed knit collar, cuffs and hem, YKK zippers throughout, and multiple pockets for a timeless aviator-inspired look.',
    price: 895,
    comparePrice: 0,
    category: 'outerwear',
    images: ['https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Burgundy'],
    tags: ['jacket', 'leather', 'bomber', 'casual'],
    featured: false,
    onSale: true,
    rating: 4.7,
    numReviews: 134,
    material: 'Italian Lambskin Leather',
    careInstructions: 'Professional leather clean only. Condition annually.',
    inStock: true,
    quantity: 20,
  },

  // Shoes
  {
    name: 'Oxford Cap-Toe Shoes',
    description: 'The quintessential dress shoe for the discerning gentleman. Handcrafted in Italy from the finest calfskin leather with a classic cap-toe design, Blake-stitched construction, and a leather sole.',
    price: 695,
    comparePrice: 895,
    category: 'shoes',
    images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80'],
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    colors: ['Black', 'Dark Brown', 'Cordovan'],
    tags: ['shoes', 'oxford', 'formal', 'dress'],
    featured: true,
    rating: 4.8,
    numReviews: 156,
    material: 'Calfskin Leather',
    careInstructions: 'Polish regularly. Use shoe trees. Resole as needed.',
    inStock: true,
    quantity: 30,
  },
  {
    name: 'Suede Chelsea Boots',
    description: 'Effortlessly stylish Chelsea boots in luxurious Italian suede. Features elastic side panels, a pull tab, and a leather outsole with rubber insert for grip. The perfect transitional boot.',
    price: 495,
    comparePrice: 0,
    category: 'shoes',
    images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80'],
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Tan Suede', 'Brown Suede', 'Black Suede'],
    tags: ['boots', 'chelsea', 'suede', 'casual'],
    featured: true,
    rating: 4.6,
    numReviews: 89,
    material: 'Italian Suede',
    careInstructions: 'Use suede protector spray. Brush regularly. Spot clean only.',
    inStock: true,
    quantity: 25,
  },

  // Watches
  {
    name: 'Automatic Dress Watch',
    description: 'A masterpiece of horological craftsmanship. Features a 40mm stainless steel case, Japanese automatic movement, sapphire crystal, exhibition caseback, and genuine leather strap with deployant clasp.',
    price: 1295,
    comparePrice: 1595,
    category: 'watches',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Silver Dial', 'Black Dial', 'Blue Dial'],
    tags: ['watch', 'automatic', 'luxury', 'dress'],
    featured: true,
    rating: 4.7,
    numReviews: 78,
    material: 'Stainless Steel / Sapphire Crystal',
    careInstructions: 'Avoid magnetic fields. Service every 3-5 years.',
    inStock: true,
    quantity: 15,
  },
  {
    name: 'Chronograph Sport Watch',
    description: 'A rugged yet refined chronograph built for the active gentleman. Features a 44mm titanium case, Swiss quartz movement, tachymeter bezel, 100m water resistance, and a silicone strap.',
    price: 795,
    comparePrice: 0,
    category: 'watches',
    images: ['https://images.unsplash.com/photo-1548171915-e34c1b3ba97e?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Black Dial', 'Blue Dial'],
    tags: ['watch', 'chronograph', 'sport', 'titanium'],
    featured: false,
    rating: 4.5,
    numReviews: 112,
    material: 'Titanium / Mineral Crystal',
    careInstructions: 'Rinse after saltwater exposure. Replace battery every 2 years.',
    inStock: true,
    quantity: 20,
  },

  // Accessories
  {
    name: 'Italian Leather Belt',
    description: 'A hand-finished dress belt crafted from full-grain Italian leather. Features a brushed stainless steel buckle, tapered profile, and meticulous edge painting for a refined appearance.',
    price: 195,
    comparePrice: 0,
    category: 'accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Dark Brown', 'Tan'],
    tags: ['belt', 'leather', 'dress', 'italian'],
    featured: true,
    rating: 4.4,
    numReviews: 189,
    material: 'Full-Grain Italian Leather',
    careInstructions: 'Condition leather every 6 months. Avoid excessive moisture.',
    inStock: true,
    quantity: 50,
  },
  {
    name: 'Silk Necktie Collection',
    description: 'Handcrafted from the finest Italian silk jacquard. Each tie is expertly cut on the bias for superior draping and features a seven-fold construction with a self-tipped tip and branded keeper loop.',
    price: 145,
    comparePrice: 195,
    category: 'accessories',
    images: ['https://images.unsplash.com/photo-1589756823695-278bc923f962?w=800&q=80'],
    sizes: ['Standard'],
    colors: ['Navy Paisley', 'Burgundy Stripe', 'Black Herringbone', 'Forest Green'],
    tags: ['tie', 'silk', 'formal', 'italian'],
    featured: false,
    rating: 4.3,
    numReviews: 234,
    material: 'Italian Silk Jacquard',
    careInstructions: 'Dry clean only. Store rolled or hung.',
    inStock: true,
    quantity: 40,
  },
  {
    name: 'Cufflink Set',
    description: 'Exquisite sterling silver cufflinks with 18k gold-plated accents. Features a whale-back closure mechanism and arrives presented in a luxurious velvet-lined box. The perfect finishing touch.',
    price: 295,
    comparePrice: 0,
    category: 'accessories',
    images: ['https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Two-Tone'],
    tags: ['cufflinks', 'sterling silver', 'formal', 'luxury'],
    featured: false,
    rating: 4.8,
    numReviews: 45,
    material: 'Sterling Silver / 18k Gold',
    careInstructions: 'Polish with jewelry cloth. Store in provided box.',
    inStock: true,
    quantity: 20,
  },

  // Bags
  {
    name: 'Full-Grain Leather Briefcase',
    description: 'A distinguished briefcase handcrafted from full-grain American leather. Features a padded laptop compartment, multiple organizer pockets, brass hardware, and a removable shoulder strap.',
    price: 895,
    comparePrice: 0,
    category: 'bags',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan'],
    tags: ['briefcase', 'leather', 'professional', 'laptop'],
    featured: true,
    rating: 4.7,
    numReviews: 92,
    material: 'Full-Grain American Leather',
    careInstructions: 'Condition leather every 3 months. Avoid overloading.',
    inStock: true,
    quantity: 15,
  },
  {
    name: 'Canvas Weekender Bag',
    description: 'The ultimate travel companion. Craftured from heavy-duty waxed canvas with full-grain leather trim and accents. Features a spacious main compartment, external zip pockets, and reinforced carry handles.',
    price: 495,
    comparePrice: 650,
    category: 'bags',
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80'],
    sizes: ['One Size'],
    colors: ['Olive', 'Navy', 'Black'],
    tags: ['bag', 'weekender', 'travel', 'canvas'],
    featured: false,
    onSale: true,
    rating: 4.5,
    numReviews: 67,
    material: 'Waxed Canvas / Leather Trim',
    careInstructions: 'Spot clean with damp cloth. Re-wax periodically.',
    inStock: true,
    quantity: 20,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop old unique slug indexes that may conflict
    try {
      const collection = mongoose.connection.db.collection('products');
      const indexes = await collection.indexes();
      for (const idx of indexes) {
        if (idx.key && idx.key.slug !== undefined && idx.unique) {
          await collection.dropIndex(idx.name);
          console.log(`Dropped index ${idx.name} from products`);
        }
      }
    } catch (e) {
      // Index may not exist, that's fine
    }

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin',
      email: 'admin@zaraman247.com',
      password: adminPassword,
      role: 'admin',
      phone: '+1 (555) 000-0001',
    });
    console.log('✓ Admin user created: admin@zaraman247.com / admin123');

    // Create test user
    const userPassword = await bcrypt.hash('user123', 12);
    await User.create({
      name: 'James Mitchell',
      email: 'james@example.com',
      password: userPassword,
      role: 'user',
      phone: '+1 (555) 000-0002',
      address: {
        street: '123 Park Avenue',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States',
      },
    });
    console.log('✓ Test user created: james@example.com / user123');

    // Create second test user
    const userPassword2 = await bcrypt.hash('test123', 12);
    await User.create({
      name: 'Alexander Stone',
      email: 'alex@example.com',
      password: userPassword2,
      role: 'user',
      phone: '+1 (555) 000-0003',
      address: {
        street: '456 Beverly Hills Drive',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210',
        country: 'United States',
      },
    });
    console.log('✓ Test user created: alex@example.com / test123');

    // Seed products
    for (const product of seedProducts) {
      await Product.create(product);
    }
    console.log(`✓ ${seedProducts.length} products seeded`);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Seeding Complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n  Test Accounts:');
    console.log('  ─────────────────────────────');
    console.log('  Admin:  admin@zaraman247.com / admin123');
    console.log('  User 1: james@example.com  / user123');
    console.log('  User 2: alex@example.com   / test123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
