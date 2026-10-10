/**
 * FOOD MENU DATA FOR HOTEL RAJWADA PALACE RESTAURANT
 * Verified Indian Vegetarian Restaurant & Banquet Dining
 * Tukum, Urjanagar, Chandrapur
 *
 * Sourced from local listing menus & restaurant research:
 * Includes Starters, Main Course curries, Tandoori Breads, Rice/Biryani, and Beverages/Desserts.
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'breads' | 'rice' | 'desserts';
  isVeg: boolean;
  isPopular?: boolean;
}

export const RESTAURANT_MENU_ITEMS: MenuItem[] = [
  // --- STARTERS & SOUPS ---
  {
    id: 'str-01',
    name: 'Harabhara Kabab',
    description: 'Crispy spinach, green pea, and spiced potato patties with mint chutney.',
    price: 190,
    category: 'starters',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'str-02',
    name: 'Paneer Tikka Dry',
    description: 'Fresh cottage cheese cubes marinated in yogurt, ajwain, and tandoori spices.',
    price: 240,
    category: 'starters',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'str-03',
    name: 'Veg Crispy',
    description: 'Shredded fresh vegetables tossed in garlic, pepper, and oriental herbs.',
    price: 180,
    category: 'starters',
    isVeg: true,
  },
  {
    id: 'str-04',
    name: 'Tomato Dhaniya Shorba',
    description: 'Slow-simmered vine tomato soup infused with fresh coriander and roasted cumin.',
    price: 130,
    category: 'starters',
    isVeg: true,
  },

  // --- MAIN COURSE (CURRIES & SABZI) ---
  {
    id: 'main-01',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese simmered in a velvety makhani gravy with butter and fresh cream.',
    price: 260,
    category: 'mains',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'main-02',
    name: 'Veg Kolhapuri',
    description: 'Assorted seasonal vegetables prepared in spicy, aromatic Kolhapuri masala.',
    price: 220,
    category: 'mains',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'main-03',
    name: 'Cheese Angoori',
    description: 'Small paneer/cheese koftas in a mildly spiced cashew nut and tomato gravy.',
    price: 280,
    category: 'mains',
    isVeg: true,
  },
  {
    id: 'main-04',
    name: 'Dal Tadka Special',
    description: 'Yellow lentils tempered with golden garlic, cumin seeds, and Kashmiri chillies in pure desi ghee.',
    price: 170,
    category: 'mains',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'main-05',
    name: 'Bhindi Masala',
    description: 'Tender fresh okra sautéed with chopped onions, tomatoes, and dry mango powder.',
    price: 190,
    category: 'mains',
    isVeg: true,
  },

  // --- TANDOORI BREADS ---
  {
    id: 'brd-01',
    name: 'Butter Naan',
    description: 'Soft leavened refined flour flatbread cooked in tandoor and brushed with butter.',
    price: 55,
    category: 'breads',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'brd-02',
    name: 'Garlic Naan',
    description: 'Tandoori naan topped with roasted minced garlic and fresh coriander.',
    price: 70,
    category: 'breads',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'brd-03',
    name: 'Tandoori Roti',
    description: 'Whole wheat flatbread baked crisp on clay oven walls.',
    price: 25,
    category: 'breads',
    isVeg: true,
  },
  {
    id: 'brd-04',
    name: 'Butter Kulcha',
    description: 'Layered tandoori flatbread with nigella seeds and butter.',
    price: 60,
    category: 'breads',
    isVeg: true,
  },
  {
    id: 'brd-05',
    name: 'Jowari Bhakar (Local Special)',
    description: 'Traditional Vidarbha sorghum flatbread cooked on griddle.',
    price: 35,
    category: 'breads',
    isVeg: true,
    isPopular: true,
  },

  // --- RICE & BIRYANI ---
  {
    id: 'rice-01',
    name: 'Veg Dum Biryani',
    description: 'Fragrant basmati rice layered with spiced vegetables, saffron milk, and fried onions. Served with raita.',
    price: 240,
    category: 'rice',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'rice-02',
    name: 'Jeera Rice',
    description: 'Steamed long-grain basmati rice tempered with roasted cumin seeds and desi ghee.',
    price: 150,
    category: 'rice',
    isVeg: true,
  },
  {
    id: 'rice-03',
    name: 'Dal Khichdi Tadka',
    description: 'Comforting rice and moong dal preparation tempered with garlic and cumin.',
    price: 180,
    category: 'rice',
    isVeg: true,
  },

  // --- DESSERTS & BEVERAGES ---
  {
    id: 'des-01',
    name: 'Gulab Jamun (2 Pcs)',
    description: 'Warm milk-solid dumplings soaked in cardamom rose syrup.',
    price: 90,
    category: 'desserts',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'des-02',
    name: 'Sweet Masala Lassi',
    description: 'Chilled hand-churned yogurt beverage flavoured with green cardamom and saffron.',
    price: 80,
    category: 'desserts',
    isVeg: true,
  },
  {
    id: 'des-03',
    name: 'Mineral Water / Fresh Lime Soda',
    description: 'Refreshing sweet or salted lime soda with fresh mint.',
    price: 60,
    category: 'desserts',
    isVeg: true,
  },
];
