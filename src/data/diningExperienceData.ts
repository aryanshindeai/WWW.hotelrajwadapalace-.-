/**
 * THE RAJWADA DINING EXPERIENCE — SIGNATURE DISHES DATA
 * Hotel Rajwada Palace, Tukum, Durgapur Road, Chandrapur
 *
 * All dishes, IDs, prices, and categories are extracted directly from
 * the official pure-vegetarian restaurant menu (menu rajwada.pdf / foodMenuData.ts).
 */

export interface SignatureDishItem {
  id: string; // Exact MenuItem id from foodMenuData.ts
  name: string;
  price: number;
  portion?: string;
  categorySlug: 'tandoor' | 'mains' | 'biryani-breads' | 'desserts';
  categoryLabel: string;
  image: string;
  description: string;
  isVeg: boolean;
  tags?: string[];
}

export interface DiningCategoryFilter {
  id: 'all' | 'tandoor' | 'mains' | 'biryani-breads' | 'desserts';
  label: string;
}

export const DINING_CATEGORY_FILTERS: DiningCategoryFilter[] = [
  { id: 'all', label: 'All Signatures' },
  { id: 'tandoor', label: 'Tandoor & Starters' },
  { id: 'mains', label: 'Royal Mains' },
  { id: 'biryani-breads', label: 'Biryani & Breads' },
  { id: 'desserts', label: 'Desserts' },
];

export const SIGNATURE_DISHES: SignatureDishItem[] = [
  {
    id: 'tan-01',
    name: 'Paneer Tikka',
    price: 250,
    categorySlug: 'tandoor',
    categoryLabel: 'Tandoor Starter',
    image: '/images/dining/dish-paneer-tikka.jpg',
    description: 'Succulent fresh cottage cheese cubes marinated in spiced hung curd with bell peppers, char-grilled to smoky perfection in our clay tandoor.',
    isVeg: true,
    tags: ['Chef Signature', 'Clay Oven Roasted'],
  },
  {
    id: 'tan-03',
    name: 'Hara Bhara Kabab',
    price: 260,
    categorySlug: 'tandoor',
    categoryLabel: 'Tandoor Starter',
    image: '/images/dining/dish-hara-bhara-kabab.jpg',
    description: 'Crispy pan-seared patties of finely blended spinach, green garden peas, and paneer crowned with whole roasted cashews and served with mint chutney.',
    isVeg: true,
    tags: ['Guest Favourite', 'Crispy Seared'],
  },
  {
    id: 'ind-m-32',
    name: 'Paneer Kadhai',
    price: 280,
    categorySlug: 'mains',
    categoryLabel: 'Indian Main Course',
    image: '/images/dining/dish-paneer-kadhai.jpg',
    description: 'Soft cottage cheese chunks tossed with fresh bell peppers, onions, and freshly ground roasted coriander and red chilies in an iron kadhai gravy.',
    isVeg: true,
    tags: ['Heritage Recipe', 'Rich & Spiced'],
  },
  {
    id: 'ind-m-12',
    name: 'Malai Kofta',
    price: 280,
    categorySlug: 'mains',
    categoryLabel: 'Indian Main Course',
    image: '/images/dining/dish-malai-kofta.jpg',
    description: 'Delicate melt-in-mouth cottage cheese and mawa dumplings gently simmered in a velvety golden cashew nut and fresh cream gravy.',
    isVeg: true,
    tags: ['Royal Classic', 'Mild & Velvety'],
  },
  {
    id: 'rc-15',
    name: 'Veg Biryani',
    price: 280,
    categorySlug: 'biryani-breads',
    categoryLabel: 'Rice & Biryani',
    image: '/images/dining/dish-veg-biryani.jpg',
    description: 'Slow-cooked royal basmati rice layered with seasonal farm vegetables, saffron, caramelized onions, mint, and whole aromatic spices.',
    isVeg: true,
    tags: ['Dum Pukht', 'Aromatic Saffron'],
  },
  {
    id: 'brd-06',
    name: 'Garlic Naan (Tawa)',
    price: 60,
    categorySlug: 'biryani-breads',
    categoryLabel: 'Indian Bread',
    image: '/images/dining/dish-garlic-naan.jpg',
    description: 'Artisan clay-baked flatbread generously brushed with pure clarified butter, roasted golden garlic bits, and fresh coriander leaves.',
    isVeg: true,
    tags: ['Fresh Tandoori', 'Buttery & Crisp'],
  },
  {
    id: 'des-02',
    name: 'Gulab Jamun',
    portion: '2 Pc.',
    price: 90,
    categorySlug: 'desserts',
    categoryLabel: 'Dessert',
    image: '/images/dining/dish-gulab-jamun.jpg',
    description: 'Warm golden caramelized milk dumplings steeped in green cardamom and saffron-infused sugar syrup, garnished with slivered pistachios.',
    isVeg: true,
    tags: ['Traditional Sweet', 'Rose & Cardamom'],
  },
];
