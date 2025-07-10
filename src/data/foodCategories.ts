// Food categories and items extracted from table.html
export interface FoodItem {
  id: string;
  name: string;
  icon: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string;
  items: FoodItem[];
}

// Type for tracking food placements
export interface FoodPlacement {
  foodItemId: string;
  foodItemName: string;
  monthId: string;
  riskLevel: 'low' | 'high';
}

export const foodCategories: FoodCategory[] = [
  {
    id: 'starch',
    name: 'STARCH/GLUTEN',
    icon: 'fa-wheat-awn',
    items: [
      { id: 'g_starch_1', name: 'Gluten containing grains (wheat, barley, rye eg pasta, bread, etc)', icon: 'fa-wheat-awn' },
      { id: 'g_starch_2', name: 'Gluten free cereals (buckwheat, quinoa, oat)', icon: 'fa-wheat-awn' },
      { id: 'g_starch_3', name: 'Maize products (i.e. pollenta, baby maize snacks)', icon: 'fa-wheat-awn' },
      { id: 'g_starch_4', name: 'Potato, Sweet potato', icon: 'fa-wheat-awn' },
      { id: 'g_starch_5', name: 'Rice (including rice flour)', icon: 'fa-wheat-awn' },
      { id: 'g_starch_6', name: 'Rice pudding (containing milk)', icon: 'fa-wheat-awn' },
      { id: 'g_starch_7', name: 'Semolina pudding (containing milk)', icon: 'fa-wheat-awn' },
      { id: 'g_starch_8', name: 'Trahanas', icon: 'fa-wheat-awn' },
    ]
  },
  {
    id: 'vegetables',
    name: 'VEGETABLES',
    icon: 'fa-carrot',
    items: [
      { id: 'g_veg_1', name: 'Cabbage, broccoli, cauliflower', icon: 'fa-carrot' },
      { id: 'g_veg_2', name: 'Carrot', icon: 'fa-carrot' },
      { id: 'g_veg_4', name: 'Green leafy vegetables (spinach, lettuce etc)', icon: 'fa-carrot' },
      { id: 'g_veg_5', name: 'Pea, green beans', icon: 'fa-carrot' },
      { id: 'g_veg_6', name: 'Pepper', icon: 'fa-carrot' },
      { id: 'g_veg_3', name: 'Root vegetables like celery', icon: 'fa-carrot' },
      { id: 'g_veg_7', name: 'Tomato', icon: 'fa-carrot' },
      { id: 'g_veg_8', name: 'Zucchini or courgette οr other squashes', icon: 'fa-carrot' },
    ]
  },
  {
    id: 'legumes',
    name: 'LEGUMES',
    icon: 'fa-bowl-rice',
    items: [
      { id: 'g_legumes_1', name: 'Beans (all types)', icon: 'fa-bowl-rice' },
      { id: 'g_legumes_2', name: 'Chickpeas', icon: 'fa-bowl-rice' },
      { id: 'g_legumes_3', name: 'Lentils', icon: 'fa-bowl-rice' },
      { id: 'g_legumes_5', name: 'Peanut/peanut butter', icon: 'fa-bowl-rice' },
      { id: 'g_legumes_4', name: 'Soya', icon: 'fa-bowl-rice' },
    ]
  },
  {
    id: 'meat',
    name: 'MEAT',
    icon: 'fa-drumstick-bite',
    items: [
      { id: 'g_meat_7', name: 'Beef', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_1', name: 'Chicken/turkey/duck', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_3', name: 'Lamb', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_4', name: 'Liver pate', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_5', name: 'Pork', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_2', name: 'Processed meat like cold cuts/ham/salami', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_6', name: 'Rabbit', icon: 'fa-drumstick-bite' },
      { id: 'g_meat_8', name: 'Venison', icon: 'fa-drumstick-bite' },
    ]
  },
  {
    id: 'fish',
    name: 'FISH/SHELLFISH',
    icon: 'fa-fish',
    items: [
      { id: 'g_fish_1', name: 'Crustaceans (shrimps, crayfish, crab, lobster)', icon: 'fa-fish' },
      { id: 'g_fish_2', name: 'Fish', icon: 'fa-fish' },
      { id: 'g_fish_3', name: 'Mollusks (clams, scallops, oysters, mussels, octopus, snails, kalamari, cuttlefish)', icon: 'fa-fish' },
    ]
  },
  {
    id: 'fruit',
    name: 'FRUIT',
    icon: 'fa-apple-whole',
    items: [
      { id: 'g_fruit_1', name: 'Apple (and products made from apple like apple sauce)', icon: 'fa-apple-whole' },
      { id: 'g_fruit_3', name: 'Banana', icon: 'fa-apple-whole' },
      { id: 'g_fruit_4', name: 'Berries including strawberry', icon: 'fa-apple-whole' },
      { id: 'g_fruit_5', name: 'Dried fruits', icon: 'fa-apple-whole' },
      { id: 'g_fruit_6', name: 'Figs', icon: 'fa-apple-whole' },
      { id: 'g_fruit_7', name: 'Fresh fruit juice', icon: 'fa-apple-whole' },
      { id: 'g_fruit_8', name: 'Fruit juice (with or without sugar)', icon: 'fa-apple-whole' },
      { id: 'g_fruit_9', name: 'Grapes', icon: 'fa-apple-whole' },
      { id: 'g_fruit_10', name: 'Kiwi', icon: 'fa-apple-whole' },
      { id: 'g_fruit_2', name: 'Mango', icon: 'fa-apple-whole' },
      { id: 'g_fruit_11', name: 'Melon, watermelon', icon: 'fa-apple-whole' },
      { id: 'g_fruit_12', name: 'Orange, mantarine', icon: 'fa-apple-whole' },
      { id: 'g_fruit_13', name: 'Peach, apricot', icon: 'fa-apple-whole' },
      { id: 'g_fruit_14', name: 'Pear', icon: 'fa-apple-whole' },
    ]
  },
  {
    id: 'dairy',
    name: 'DAIRY PRODUCTS / SUBSTITUTES',
    icon: 'fa-cheese',
    items: [
      { id: 'g_dairy_14', name: 'Cheese (i.e cheddar, edam, Comte, parmesan)', icon: 'fa-cheese' },
      { id: 'g_dairy_2', name: "Cow's milk yogurt", icon: 'fa-cheese' },
      { id: 'g_dairy_3', name: 'Cream cheese', icon: 'fa-cheese' },
      { id: 'g_dairy_4', name: 'Feta cheese', icon: 'fa-cheese' },
      { id: 'g_dairy_5', name: "Fresh cow's milk", icon: 'fa-cheese' },
      { id: 'g_dairy_6', name: 'Fresh goat/sheep milk', icon: 'fa-cheese' },
      { id: 'g_dairy_7', name: 'Kephir/Airani', icon: 'fa-cheese' },
      { id: 'g_dairy_8', name: 'Kids yogurt', icon: 'fa-cheese' },
      { id: 'g_dairy_1', name: 'Plant-based milk (specify here fortified/non-fortified)', icon: 'fa-cheese' },
      { id: 'g_dairy_9', name: 'Rice milk', icon: 'fa-cheese' },
      { id: 'g_dairy_10', name: 'Sheep/ goat yogurt', icon: 'fa-cheese' },
      { id: 'g_dairy_11', name: 'Soy cheese', icon: 'fa-cheese' },
      { id: 'g_dairy_12', name: 'Soy milk', icon: 'fa-cheese' },
      { id: 'g_dairy_13', name: 'Soy yogurt', icon: 'fa-cheese' },
    ]
  },
  {
    id: 'egg',
    name: 'EGG',
    icon: 'fa-egg',
    items: [
      { id: 'g_egg_1', name: 'Hard boiled egg (boiling >6min)', icon: 'fa-egg' },
      { id: 'g_egg_3', name: 'Partially cooked like scrambled egg and sunny side egg', icon: 'fa-egg' },
      { id: 'g_egg_2', name: 'Raw egg', icon: 'fa-egg' },
    ]
  },
  {
    id: 'fat',
    name: 'FAT/OIL',
    icon: 'fa-bottle-droplet',
    items: [
      { id: 'g_fat_1', name: 'Butter', icon: 'fa-bottle-droplet' },
      { id: 'g_fat_2', name: 'Corn oil/vegetable oils', icon: 'fa-bottle-droplet' },
      { id: 'g_fat_3', name: 'Margarine', icon: 'fa-bottle-droplet' },
      { id: 'g_fat_5', name: 'Nut and seed oils', icon: 'fa-bottle-droplet' },
      { id: 'g_fat_4', name: 'Olive oil', icon: 'fa-bottle-droplet' },
    ]
  },
  {
    id: 'sweets',
    name: 'SWEETS',
    icon: 'fa-cookie',
    items: [
      { id: 'g_sweets_1', name: 'Baby biscuits without sugar', icon: 'fa-cookie' },
      { id: 'g_sweets_2', name: 'Fruit spread (i.e. jam)', icon: 'fa-cookie' },
      { id: 'g_sweets_3', name: 'Honey', icon: 'fa-cookie' },
      { id: 'g_sweets_4', name: 'Sweets, cake, biscuits', icon: 'fa-cookie' },
    ]
  },
  {
    id: 'nuts',
    name: 'NUTS/SEEDS',
    icon: 'fa-seedling',
    items: [
      { id: 'g_nuts_seeds_1', name: 'Mustard', icon: 'fa-seedling' },
      { id: 'g_nuts_seeds_2', name: 'Sesame/tahini', icon: 'fa-seedling' },
      { id: 'g_nuts_seeds_3', name: 'Tree nuts (and nut butters)', icon: 'fa-seedling' },
    ]
  },
  {
    id: 'spices',
    name: 'SALT/SPICES',
    icon: 'fa-mortar-pestle',
    items: [
      { id: 'g_spices_salt_1', name: 'Salt', icon: 'fa-mortar-pestle' },
      { id: 'g_spices_salt_2', name: 'Spices/herbs (e.g. pepper, cinammon, etc)', icon: 'fa-mortar-pestle' },
    ]
  },
  {
    id: 'additional',
    name: 'ADDITIONAL GUIDANCE',
    icon: 'fa-kitchen-set',
    items: [
      { id: 'g_addit_guid_7', name: 'Baby-led weaning', icon: 'fa-kitchen-set' },
      { id: 'g_addit_guid_6', name: 'Food in pieces and finger food', icon: 'fa-kitchen-set' },
      { id: 'g_addit_guid_4', name: 'Mashed Food', icon: 'fa-kitchen-set' },
      { id: 'g_addit_guid_1', name: 'Preprepared baby food - Baby jars, pouches', icon: 'fa-kitchen-set' },
      { id: 'g_addit_guid_5', name: 'Pureed food', icon: 'fa-kitchen-set' },
      { id: 'g_addit_guid_2', name: 'Share family meal with salt', icon: 'fa-kitchen-set' },
      { id: 'g_addit_guid_3', name: 'Share family meal without salt', icon: 'fa-kitchen-set' },
    ]
  },
];

export const timelineMonths = [
  { id: 'month-0', label: 'Birth' },
  { id: 'month-1', label: 'Month 1' },
  { id: 'month-2', label: 'Month 2' },
  { id: 'month-3', label: 'Month 3' },
  { id: 'month-4', label: 'Month 4' },
  { id: 'month-5', label: 'Month 5' },
  { id: 'month-6', label: 'Month 6' },
  { id: 'month-7', label: 'Month 7' },
  { id: 'month-8', label: 'Month 8' },
  { id: 'month-9', label: 'Month 9' },
  { id: 'month-10', label: 'Month 10' },
  { id: 'month-11', label: 'Month 11' },
  { id: 'month-12', label: 'Month 12' },
  { id: 'month-13', label: 'Month 13' },
  { id: 'month-14', label: 'Month 14' },
  { id: 'month-15', label: 'Month 15' },
  { id: 'month-16', label: 'Month 16' },
  { id: 'month-17', label: 'Month 17' },
  { id: 'month-18', label: 'Month 18' },
];

// Explicit exports to ensure proper TypeScript recognition
export type { FoodItem, FoodCategory, FoodPlacement };