export interface FoodItem {
  label: string;
  value: string;
}

export interface FoodCategory {
  name: string;
  code: string;
  items: FoodItem[];
}

export const foodDatabase: FoodCategory[] = [
  {
    name: "STARCH/GLUTEN",
    code: "starch",
    items: [
      { label: "Rice cereal", value: "rice_cereal" },
      { label: "Oatmeal", value: "oatmeal" },
      { label: "Barley cereal", value: "barley_cereal" },
      { label: "Wheat cereal", value: "wheat_cereal" },
      { label: "Quinoa", value: "quinoa" },
      { label: "Millet", value: "millet" },
      { label: "Bread", value: "bread" },
      { label: "Pasta", value: "pasta" },
      { label: "Crackers", value: "crackers" },
      { label: "Sweet potato", value: "sweet_potato" },
      { label: "Regular potato", value: "potato" },
      { label: "Rice", value: "rice" },
      { label: "Noodles", value: "noodles" },
      { label: "Couscous", value: "couscous" }
    ]
  },
  {
    name: "VEGETABLES",
    code: "vegetables",
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Sweet potato", value: "sweet_potato_veg" },
      { label: "Broccoli", value: "broccoli" },
      { label: "Cauliflower", value: "cauliflower" },
      { label: "Green beans", value: "green_beans" },
      { label: "Peas", value: "peas" },
      { label: "Spinach", value: "spinach" },
      { label: "Kale", value: "kale" },
      { label: "Zucchini", value: "zucchini" },
      { label: "Squash", value: "squash" },
      { label: "Bell pepper", value: "bell_pepper" },
      { label: "Tomato", value: "tomato" },
      { label: "Cucumber", value: "cucumber" },
      { label: "Beetroot", value: "beetroot" },
      { label: "Pumpkin", value: "pumpkin" },
      { label: "Corn", value: "corn" },
      { label: "Artichoke", value: "artichoke" },
      { label: "Asparagus", value: "asparagus" },
      { label: "Brussels sprouts", value: "brussels_sprouts" },
      { label: "Cabbage", value: "cabbage" }
    ]
  },
  {
    name: "LEGUMES",
    code: "legumes",
    items: [
      { label: "Lentils (red)", value: "red_lentils" },
      { label: "Lentils (green)", value: "green_lentils" },
      { label: "Chickpeas", value: "chickpeas" },
      { label: "Black beans", value: "black_beans" },
      { label: "Kidney beans", value: "kidney_beans" },
      { label: "White beans", value: "white_beans" },
      { label: "Navy beans", value: "navy_beans" },
      { label: "Pinto beans", value: "pinto_beans" },
      { label: "Lima beans", value: "lima_beans" },
      { label: "Split peas", value: "split_peas" },
      { label: "Black-eyed peas", value: "black_eyed_peas" },
      { label: "Soybeans", value: "soybeans" },
      { label: "Edamame", value: "edamame" },
      { label: "Tofu", value: "tofu" },
      { label: "Tempeh", value: "tempeh" }
    ]
  },
  {
    name: "MEAT",
    code: "meat",
    items: [
      { label: "Chicken (pureed)", value: "chicken_pureed" },
      { label: "Chicken (ground)", value: "chicken_ground" },
      { label: "Chicken (finger foods)", value: "chicken_finger" },
      { label: "Turkey", value: "turkey" },
      { label: "Beef (pureed)", value: "beef_pureed" },
      { label: "Beef (ground)", value: "beef_ground" },
      { label: "Lamb", value: "lamb" },
      { label: "Pork", value: "pork" },
      { label: "Duck", value: "duck" },
      { label: "Liver", value: "liver" },
      { label: "Ham", value: "ham" },
      { label: "Sausage", value: "sausage" },
      { label: "Bacon", value: "bacon" }
    ]
  },
  {
    name: "FISH/SHELLFISH",
    code: "fish",
    items: [
      { label: "Salmon", value: "salmon" },
      { label: "Cod", value: "cod" },
      { label: "Sole", value: "sole" },
      { label: "Tuna", value: "tuna" },
      { label: "Sardines", value: "sardines" },
      { label: "Mackerel", value: "mackerel" },
      { label: "Haddock", value: "haddock" },
      { label: "Tilapia", value: "tilapia" },
      { label: "Flounder", value: "flounder" },
      { label: "Trout", value: "trout" },
      { label: "Shrimp", value: "shrimp" },
      { label: "Crab", value: "crab" },
      { label: "Lobster", value: "lobster" },
      { label: "Mussels", value: "mussels" },
      { label: "Scallops", value: "scallops" },
      { label: "Clams", value: "clams" },
      { label: "Oysters", value: "oysters" }
    ]
  },
  {
    name: "FRUIT",
    code: "fruit",
    items: [
      { label: "Apple (pureed)", value: "apple_pureed" },
      { label: "Apple (pieces)", value: "apple_pieces" },
      { label: "Banana", value: "banana" },
      { label: "Pear", value: "pear" },
      { label: "Peach", value: "peach" },
      { label: "Plum", value: "plum" },
      { label: "Apricot", value: "apricot" },
      { label: "Mango", value: "mango" },
      { label: "Papaya", value: "papaya" },
      { label: "Avocado", value: "avocado" },
      { label: "Blueberries", value: "blueberries" },
      { label: "Strawberries", value: "strawberries" },
      { label: "Raspberries", value: "raspberries" },
      { label: "Blackberries", value: "blackberries" },
      { label: "Grapes (halved)", value: "grapes" },
      { label: "Orange (segments)", value: "orange" },
      { label: "Mandarin", value: "mandarin" },
      { label: "Kiwi", value: "kiwi" },
      { label: "Pineapple", value: "pineapple" },
      { label: "Melon", value: "melon" },
      { label: "Watermelon", value: "watermelon" },
      { label: "Cherries (pitted)", value: "cherries" }
    ]
  },
  {
    name: "DAIRY PRODUCTS/SUBSTITUTES",
    code: "dairy",
    items: [
      { label: "Breast milk", value: "breast_milk" },
      { label: "Formula milk", value: "formula_milk" },
      { label: "Whole milk", value: "whole_milk" },
      { label: "Yogurt (plain)", value: "yogurt_plain" },
      { label: "Yogurt (fruit)", value: "yogurt_fruit" },
      { label: "Greek yogurt", value: "greek_yogurt" },
      { label: "Cheese (soft)", value: "cheese_soft" },
      { label: "Cheese (hard)", value: "cheese_hard" },
      { label: "Cottage cheese", value: "cottage_cheese" },
      { label: "Cream cheese", value: "cream_cheese" },
      { label: "Mozzarella", value: "mozzarella" },
      { label: "Cheddar", value: "cheddar" },
      { label: "Butter", value: "butter" },
      { label: "Almond milk", value: "almond_milk" },
      { label: "Soy milk", value: "soy_milk" },
      { label: "Oat milk", value: "oat_milk" },
      { label: "Rice milk", value: "rice_milk" },
      { label: "Coconut milk", value: "coconut_milk" }
    ]
  },
  {
    name: "EGG",
    code: "egg",
    items: [
      { label: "Egg yolk", value: "egg_yolk" },
      { label: "Whole egg", value: "whole_egg" },
      { label: "Scrambled egg", value: "scrambled_egg" },
      { label: "Hard-boiled egg", value: "hard_boiled_egg" },
      { label: "Egg in baked goods", value: "egg_baked" },
      { label: "Quail egg", value: "quail_egg" }
    ]
  },
  {
    name: "FAT/OIL",
    code: "fat",
    items: [
      { label: "Olive oil", value: "olive_oil" },
      { label: "Coconut oil", value: "coconut_oil" },
      { label: "Sunflower oil", value: "sunflower_oil" },
      { label: "Canola oil", value: "canola_oil" },
      { label: "Avocado oil", value: "avocado_oil" },
      { label: "Butter", value: "butter_fat" },
      { label: "Ghee", value: "ghee" },
      { label: "Sesame oil", value: "sesame_oil" },
      { label: "Flaxseed oil", value: "flaxseed_oil" }
    ]
  },
  {
    name: "SWEETS",
    code: "sweets",
    items: [
      { label: "Natural fruit puree", value: "fruit_puree" },
      { label: "Date paste", value: "date_paste" },
      { label: "Maple syrup", value: "maple_syrup" },
      { label: "Honey", value: "honey" },
      { label: "Agave syrup", value: "agave_syrup" },
      { label: "Brown sugar", value: "brown_sugar" },
      { label: "White sugar", value: "white_sugar" },
      { label: "Cookies", value: "cookies" },
      { label: "Cake", value: "cake" },
      { label: "Ice cream", value: "ice_cream" },
      { label: "Chocolate", value: "chocolate" }
    ]
  },
  {
    name: "NUTS/SEEDS",
    code: "nuts",
    items: [
      { label: "Peanut butter", value: "peanut_butter" },
      { label: "Almond butter", value: "almond_butter" },
      { label: "Cashew butter", value: "cashew_butter" },
      { label: "Sunflower seed butter", value: "sunflower_seed_butter" },
      { label: "Tahini (sesame)", value: "tahini" },
      { label: "Ground almonds", value: "ground_almonds" },
      { label: "Ground walnuts", value: "ground_walnuts" },
      { label: "Ground hazelnuts", value: "ground_hazelnuts" },
      { label: "Chia seeds", value: "chia_seeds" },
      { label: "Flax seeds", value: "flax_seeds" },
      { label: "Pumpkin seeds", value: "pumpkin_seeds" },
      { label: "Sunflower seeds", value: "sunflower_seeds" },
      { label: "Pine nuts", value: "pine_nuts" },
      { label: "Coconut (shredded)", value: "coconut_shredded" }
    ]
  },
  {
    name: "SALT/SPICES",
    code: "spices",
    items: [
      { label: "No added salt", value: "no_salt" },
      { label: "Minimal salt", value: "minimal_salt" },
      { label: "Cinnamon", value: "cinnamon" },
      { label: "Ginger", value: "ginger" },
      { label: "Turmeric", value: "turmeric" },
      { label: "Cumin", value: "cumin" },
      { label: "Paprika", value: "paprika" },
      { label: "Oregano", value: "oregano" },
      { label: "Basil", value: "basil" },
      { label: "Thyme", value: "thyme" },
      { label: "Rosemary", value: "rosemary" },
      { label: "Parsley", value: "parsley" },
      { label: "Garlic", value: "garlic" },
      { label: "Onion powder", value: "onion_powder" },
      { label: "Black pepper", value: "black_pepper" },
      { label: "Vanilla", value: "vanilla" }
    ]
  },
  {
    name: "ADDITIONAL GUIDANCE",
    code: "additional",
    items: [
      { label: "Water", value: "water" },
      { label: "Diluted fruit juice", value: "diluted_juice" },
      { label: "Herbal teas", value: "herbal_teas" },
      { label: "Probiotic foods", value: "probiotic_foods" },
      { label: "Vitamin D drops", value: "vitamin_d" },
      { label: "Iron supplements", value: "iron_supplements" },
      { label: "Finger foods", value: "finger_foods" },
      { label: "Self-feeding encouraged", value: "self_feeding" },
      { label: "Family meals", value: "family_meals" },
      { label: "Cultural/traditional foods", value: "cultural_foods" }
    ]
  }
];

// Helper function to get food category by code
export function getFoodCategoryByCode(code: string): FoodCategory | undefined {
  return foodDatabase.find(category => category.code === code);
}

// Helper function to get all food items as flat list
export function getAllFoodItems(): FoodItem[] {
  return foodDatabase.flatMap(category => category.items);
}

// Helper function to get food items by category codes
export function getFoodItemsByCategoryCodes(codes: string[]): FoodItem[] {
  return foodDatabase
    .filter(category => codes.includes(category.code))
    .flatMap(category => category.items);
}