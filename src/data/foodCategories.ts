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
    name: 'starch_gluten',
    icon: 'fa-wheat-awn',
    items: [
      { id: 'starch.gluten_grains', name: 'starch.gluten_grains', icon: 'fa-wheat-awn' },
      { id: 'starch.gluten_free_cereals', name: 'starch.gluten_free_cereals', icon: 'fa-wheat-awn' },
      { id: 'starch.maize_products', name: 'starch.maize_products', icon: 'fa-wheat-awn' },
      { id: 'starch.potato_sweet_potato', name: 'starch.potato_sweet_potato', icon: 'fa-wheat-awn' },
      { id: 'starch.rice', name: 'starch.rice', icon: 'fa-wheat-awn' },
      { id: 'starch.rice_pudding', name: 'starch.rice_pudding', icon: 'fa-wheat-awn' },
      { id: 'starch.semolina_pudding', name: 'starch.semolina_pudding', icon: 'fa-wheat-awn' },
      { id: 'starch.trahanas', name: 'starch.trahanas', icon: 'fa-wheat-awn' },
    ]
  },
  {
    id: 'vegetables',
    name: 'vegetables',
    icon: 'fa-carrot',
    items: [
      { id: 'vegetables.cabbage_broccoli', name: 'vegetables.cabbage_broccoli', icon: 'fa-carrot' },
      { id: 'vegetables.carrot', name: 'vegetables.carrot', icon: 'fa-carrot' },
      { id: 'vegetables.leafy_vegetables', name: 'vegetables.leafy_vegetables', icon: 'fa-carrot' },
      { id: 'vegetables.pea_beans', name: 'vegetables.pea_beans', icon: 'fa-carrot' },
      { id: 'vegetables.pepper', name: 'vegetables.pepper', icon: 'fa-carrot' },
      { id: 'vegetables.root_vegetables', name: 'vegetables.root_vegetables', icon: 'fa-carrot' },
      { id: 'vegetables.tomato', name: 'vegetables.tomato', icon: 'fa-carrot' },
      { id: 'vegetables.zucchini', name: 'vegetables.zucchini', icon: 'fa-carrot' },
    ]
  },
  {
    id: 'legumes',
    name: 'legumes',
    icon: 'fa-bowl-rice',
    items: [
      { id: 'legumes.beans', name: 'legumes.beans', icon: 'fa-bowl-rice' },
      { id: 'legumes.chickpeas', name: 'legumes.chickpeas', icon: 'fa-bowl-rice' },
      { id: 'legumes.lentils', name: 'legumes.lentils', icon: 'fa-bowl-rice' },
      { id: 'legumes.peanut', name: 'legumes.peanut', icon: 'fa-bowl-rice' },
      { id: 'legumes.soya', name: 'legumes.soya', icon: 'fa-bowl-rice' },
    ]
  },
  {
    id: 'meat',
    name: 'meat',
    icon: 'fa-drumstick-bite',
    items: [
      { id: 'meat.beef', name: 'meat.beef', icon: 'fa-drumstick-bite' },
      { id: 'meat.poultry', name: 'meat.poultry', icon: 'fa-drumstick-bite' },
      { id: 'meat.lamb', name: 'meat.lamb', icon: 'fa-drumstick-bite' },
      { id: 'meat.liver_pate', name: 'meat.liver_pate', icon: 'fa-drumstick-bite' },
      { id: 'meat.pork', name: 'meat.pork', icon: 'fa-drumstick-bite' },
      { id: 'meat.processed_meat', name: 'meat.processed_meat', icon: 'fa-drumstick-bite' },
      { id: 'meat.rabbit', name: 'meat.rabbit', icon: 'fa-drumstick-bite' },
      { id: 'meat.venison', name: 'meat.venison', icon: 'fa-drumstick-bite' },
    ]
  },
  {
    id: 'fish',
    name: 'fish_shellfish',
    icon: 'fa-fish',
    items: [
      { id: 'fish.crustaceans', name: 'fish.crustaceans', icon: 'fa-fish' },
      { id: 'fish.fish', name: 'fish.fish', icon: 'fa-fish' },
      { id: 'fish.mollusks', name: 'fish.mollusks', icon: 'fa-fish' },
    ]
  },
  {
    id: 'fruit',
    name: 'fruit',
    icon: 'fa-apple-whole',
    items: [
      { id: 'fruit.apple', name: 'fruit.apple', icon: 'fa-apple-whole' },
      { id: 'fruit.banana', name: 'fruit.banana', icon: 'fa-apple-whole' },
      { id: 'fruit.berries', name: 'fruit.berries', icon: 'fa-apple-whole' },
      { id: 'fruit.dried_fruits', name: 'fruit.dried_fruits', icon: 'fa-apple-whole' },
      { id: 'fruit.figs', name: 'fruit.figs', icon: 'fa-apple-whole' },
      { id: 'fruit.fresh_juice', name: 'fruit.fresh_juice', icon: 'fa-apple-whole' },
      { id: 'fruit.fruit_juice', name: 'fruit.fruit_juice', icon: 'fa-apple-whole' },
      { id: 'fruit.grapes', name: 'fruit.grapes', icon: 'fa-apple-whole' },
      { id: 'fruit.kiwi', name: 'fruit.kiwi', icon: 'fa-apple-whole' },
      { id: 'fruit.mango', name: 'fruit.mango', icon: 'fa-apple-whole' },
      { id: 'fruit.melon', name: 'fruit.melon', icon: 'fa-apple-whole' },
      { id: 'fruit.citrus', name: 'fruit.citrus', icon: 'fa-apple-whole' },
      { id: 'fruit.stone_fruits', name: 'fruit.stone_fruits', icon: 'fa-apple-whole' },
      { id: 'fruit.pear', name: 'fruit.pear', icon: 'fa-apple-whole' },
    ]
  },
  {
    id: 'dairy',
    name: 'dairy',
    icon: 'fa-cheese',
    items: [
      { id: 'dairy.cheese', name: 'dairy.cheese', icon: 'fa-cheese' },
      { id: 'dairy.cow_yogurt', name: 'dairy.cow_yogurt', icon: 'fa-cheese' },
      { id: 'dairy.cream_cheese', name: 'dairy.cream_cheese', icon: 'fa-cheese' },
      { id: 'dairy.feta', name: 'dairy.feta', icon: 'fa-cheese' },
      { id: 'dairy.fresh_cow_milk', name: 'dairy.fresh_cow_milk', icon: 'fa-cheese' },
      { id: 'dairy.goat_sheep_milk', name: 'dairy.goat_sheep_milk', icon: 'fa-cheese' },
      { id: 'dairy.kephir', name: 'dairy.kephir', icon: 'fa-cheese' },
      { id: 'dairy.kids_yogurt', name: 'dairy.kids_yogurt', icon: 'fa-cheese' },
      { id: 'dairy.plant_milk', name: 'dairy.plant_milk', icon: 'fa-cheese' },
      { id: 'dairy.rice_milk', name: 'dairy.rice_milk', icon: 'fa-cheese' },
      { id: 'dairy.goat_sheep_yogurt', name: 'dairy.goat_sheep_yogurt', icon: 'fa-cheese' },
      { id: 'dairy.soy_cheese', name: 'dairy.soy_cheese', icon: 'fa-cheese' },
      { id: 'dairy.soy_milk', name: 'dairy.soy_milk', icon: 'fa-cheese' },
      { id: 'dairy.soy_yogurt', name: 'dairy.soy_yogurt', icon: 'fa-cheese' },
    ]
  },
  {
    id: 'egg',
    name: 'egg',
    icon: 'fa-egg',
    items: [
      { id: 'egg.hard_boiled', name: 'egg.hard_boiled', icon: 'fa-egg' },
      { id: 'egg.partially_cooked', name: 'egg.partially_cooked', icon: 'fa-egg' },
      { id: 'egg.raw', name: 'egg.raw', icon: 'fa-egg' },
    ]
  },
  {
    id: 'fat',
    name: 'fat_oil',
    icon: 'fa-bottle-droplet',
    items: [
      { id: 'fat.butter', name: 'fat.butter', icon: 'fa-bottle-droplet' },
      { id: 'fat.vegetable_oils', name: 'fat.vegetable_oils', icon: 'fa-bottle-droplet' },
      { id: 'fat.margarine', name: 'fat.margarine', icon: 'fa-bottle-droplet' },
      { id: 'fat.nut_seed_oils', name: 'fat.nut_seed_oils', icon: 'fa-bottle-droplet' },
      { id: 'fat.olive_oil', name: 'fat.olive_oil', icon: 'fa-bottle-droplet' },
    ]
  },
  {
    id: 'sweets',
    name: 'sweets',
    icon: 'fa-cookie',
    items: [
      { id: 'sweets.baby_biscuits', name: 'sweets.baby_biscuits', icon: 'fa-cookie' },
      { id: 'sweets.fruit_spread', name: 'sweets.fruit_spread', icon: 'fa-cookie' },
      { id: 'sweets.honey', name: 'sweets.honey', icon: 'fa-cookie' },
      { id: 'sweets.sweets_cake', name: 'sweets.sweets_cake', icon: 'fa-cookie' },
    ]
  },
  {
    id: 'nuts',
    name: 'nuts_seeds',
    icon: 'fa-seedling',
    items: [
      { id: 'nuts.mustard', name: 'nuts.mustard', icon: 'fa-seedling' },
      { id: 'nuts.sesame', name: 'nuts.sesame', icon: 'fa-seedling' },
      { id: 'nuts.tree_nuts', name: 'nuts.tree_nuts', icon: 'fa-seedling' },
    ]
  },
  {
    id: 'spices',
    name: 'salt_spices',
    icon: 'fa-mortar-pestle',
    items: [
      { id: 'spices.salt', name: 'spices.salt', icon: 'fa-mortar-pestle' },
      { id: 'spices.spices_herbs', name: 'spices.spices_herbs', icon: 'fa-mortar-pestle' },
    ]
  },
  {
    id: 'additional',
    name: 'additional_guidance',
    icon: 'fa-kitchen-set',
    items: [
      { id: 'additional.baby_led_weaning', name: 'additional.baby_led_weaning', icon: 'fa-kitchen-set' },
      { id: 'additional.finger_food', name: 'additional.finger_food', icon: 'fa-kitchen-set' },
      { id: 'additional.mashed_food', name: 'additional.mashed_food', icon: 'fa-kitchen-set' },
      { id: 'additional.baby_food', name: 'additional.baby_food', icon: 'fa-kitchen-set' },
      { id: 'additional.pureed_food', name: 'additional.pureed_food', icon: 'fa-kitchen-set' },
      { id: 'additional.family_meal_salt', name: 'additional.family_meal_salt', icon: 'fa-kitchen-set' },
      { id: 'additional.family_meal_no_salt', name: 'additional.family_meal_no_salt', icon: 'fa-kitchen-set' },
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