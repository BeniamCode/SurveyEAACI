interface FoodItem {
  label: string;
  value: string;
}

interface FoodCategory {
  name: string;
  code: string;
  items: FoodItem[];
}

export const foodDatabase: FoodCategory[] = [
  {
    name: "STARCH/GLUTEN",
    code: "starch",
    items: [
      { label: "Gluten containing grains (wheat, barley, rye eg pasta, bread, etc", value: "g_starch_1" },
      { label: "Gluten free cereals (buckwheat, quinoa, oat)", value: "g_starch_2" },
      { label: "Maize products (i.e. pollenta, baby maize snacks)", value: "g_starch_3" },
      { label: "Potato, Sweet potato", value: "g_starch_4" },
      { label: "Rice (including rice flour)", value: "g_starch_5" },
      { label: "Rice pudding (containing milk)", value: "g_starch_6" },
      { label: "Semolina pudding (containing milk", value: "g_starch_7" },
      { label: "Trahanas", value: "g_starch_8" }
    ]
  },
  {
    name: "VEGETABLES",
    code: "veg",
    items: [
      { label: "Cabbage, broccoli, cauliflower", value: "g_veg_1" },
      { label: "Carrot", value: "g_veg_2" },
      { label: "Root vegetables like celery", value: "g_veg_3" },
      { label: "Green leafy vegetables (spinach, lettuce etc)", value: "g_veg_4" },
      { label: "Pea, green beans", value: "g_veg_5" },
      { label: "Pepper", value: "g_veg_6" },
      { label: "Tomato", value: "g_veg_7" },
      { label: "Zucchini or courgette οr other squashes", value: "g_veg_8" }
    ]
  },
  {
    name: "LEGUMES",
    code: "legume",
    items: [
      { label: "Beans (all types)", value: "g_legumes_1" },
      { label: "Chickpeas", value: "g_legumes_2" },
      { label: "Lentils", value: "g_legumes_3" },
      { label: "Soya", value: "g_legumes_4" },
      { label: "Peanut/peanut butter", value: "g_legumes_5" }
    ]
  },
  {
    name: "MEAT",
    code: "meat",
    items: [
      { label: "Chicken/turkey/duck", value: "g_meat_1" },
      { label: "Processed meat like cold cuts/ham/salami", value: "g_meat_2" },
      { label: "Lamb", value: "g_meat_3" },
      { label: "Liver pate", value: "g_meat_4" },
      { label: "Pork", value: "g_meat_5" },
      { label: "Rabbit", value: "g_meat_6" },
      { label: "Beef", value: "g_meat_7" },
      { label: "Venison", value: "g_meat_8" }
    ]
  },
  {
    name: "FISH/SHELLFISH",
    code: "fish",
    items: [
      { label: "Crustaceans (shrimps, crayfish, crab, lobster)", value: "g_fish_1" },
      { label: "Fish", value: "g_fish_2" },
      { label: "Mollusks (clams, scallops, oysters, mussels, octopus, snails, kalamari, cuttlefish)", value: "g_fish_3" }
    ]
  },
  {
    name: "FRUIT",
    code: "fruit",
    items: [
      { label: "Apple (and products made from apple like apple sauce)", value: "g_fruit_1" },
      { label: "Mango", value: "g_fruit_2" },
      { label: "Banana", value: "g_fruit_3" },
      { label: "Berries including strawberry", value: "g_fruit_4" },
      { label: "Dried fruits", value: "g_fruit_5" },
      { label: "Figs", value: "g_fruit_6" },
      { label: "Fresh fruit juice", value: "g_fruit_7" },
      { label: "Fruit juice (with or without sugar)", value: "g_fruit_8" },
      { label: "Grapes", value: "g_fruit_9" },
      { label: "Kiwi", value: "g_fruit_10" },
      { label: "Melon, watermelon", value: "g_fruit_11" },
      { label: "Orange, mantarine", value: "g_fruit_12" },
      { label: "Peach, apricot", value: "g_fruit_13" },
      { label: "Pear", value: "g_fruit_14" }
    ]
  },
  {
    name: "DAIRY PRODUCTS / SUBSTITUTES",
    code: "dairy",
    items: [
      { label: "Plant-based milk (specify here fortified/non-fortified)", value: "g_dairy_1" },
      { label: "Cow's milk yogurt", value: "g_dairy_2" },
      { label: "Cream cheese", value: "g_dairy_3" },
      { label: "Feta cheese", value: "g_dairy_4" },
      { label: "Fresh cow's milk", value: "g_dairy_5" },
      { label: "Fresh goat/sheep milk", value: "g_dairy_6" },
      { label: "Kephir/Airani", value: "g_dairy_7" },
      { label: "Kids yogurt", value: "g_dairy_8" },
      { label: "Rice milk", value: "g_dairy_9" },
      { label: "Sheep/ goat yogurt", value: "g_dairy_10" },
      { label: "Soy cheese", value: "g_dairy_11" },
      { label: "Soy milk", value: "g_dairy_12" },
      { label: "Soy yogurt", value: "g_dairy_13" },
      { label: "Cheese (i.e cheddar, edam, Comte, parmesan)", value: "g_dairy_14" }
    ]
  },
  {
    name: "EGG",
    code: "egg",
    items: [
      { label: "Hard boiled egg (boiling >6min)", value: "g_egg_1" },
      { label: "Raw egg", value: "g_egg_2" },
      { label: "Partially cooked like scrambled egg and sunny side egg", value: "g_egg_3" }
    ]
  },
  {
    name: "FAT/OIL",
    code: "fat",
    items: [
      { label: "Butter", value: "g_fat_1" },
      { label: "Corn oil/vegetable oils", value: "g_fat_2" },
      { label: "Margarine", value: "g_fat_3" },
      { label: "Olive oil", value: "g_fat_4" },
      { label: "Nut and seed oils", value: "g_fat_5" }
    ]
  },
  {
    name: "SWEETS",
    code: "sweets",
    items: [
      { label: "Baby biscuits without sugar", value: "g_sweets_1" },
      { label: "Fruit spread (i.e. jam)", value: "g_sweets_2" },
      { label: "Honey", value: "g_sweets_3" },
      { label: "Sweets, cake, biscuits", value: "g_sweets_4" }
    ]
  },
  {
    name: "NUTS/SEEDS",
    code: "nuts",
    items: [
      { label: "Mustard", value: "g_nuts_seeds_1" },
      { label: "Sesame/tahini", value: "g_nuts_seeds_2" },
      { label: "Tree nuts (and nut butters)", value: "g_nuts_seeds_3" }
    ]
  },
  {
    name: "SALT/SPICES",
    code: "spices",
    items: [
      { label: "Salt", value: "g_spices_salt_1" },
      { label: "Spices/herbs (e.g. pepper, cinammon, etc)", value: "g_spices_salt_2" }
    ]
  },
  {
    name: "ADDITIONAL GUIDANCE",
    code: "additional",
    items: [
      { label: "Preprepared baby food - Baby jars, pouches", value: "g_addit_guid_1" },
      { label: "Share family meal with salt", value: "g_addit_guid_2" },
      { label: "Share family meal without salt", value: "g_addit_guid_3" },
      { label: "Mashed Food", value: "g_addit_guid_4" },
      { label: "Pureed food", value: "g_addit_guid_5" },
      { label: "Food in pieces and finger food", value: "g_addit_guid_6" },
      { label: "Baby-led weaning", value: "g_addit_guid_7" }
    ]
  }
];

// Helper function to get food category by code
export function getFoodCategoryByCode(code: string) {
  return foodDatabase.find(category => category.code === code);
}

// Helper function to get all food items as flat list
export function getAllFoodItems() {
  return foodDatabase.flatMap(category => category.items);
}

// Helper function to get food items by category codes
export function getFoodItemsByCategoryCodes(codes: string[]) {
  return foodDatabase
    .filter(category => codes.includes(category.code))
    .flatMap(category => category.items);
}