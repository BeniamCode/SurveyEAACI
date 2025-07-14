import i18n from "../i18n";

// Helper function to get translated text
const t = (key: string) => i18n.t(key);

// Generate translated survey JSON
export const getTranslatedSurveyJson = () => {
  return {
    title: t("survey.title"),
    showQuestionNumbers: "off",
    pages: [
      {
        name: "basic_information_page",
        title: t("survey.pages.basic_information.title"),
        elements: [
          {
            type: "radiogroup",
            name: "q1",
            title: t("survey.questions.q1.title"),
            isRequired: true,
            choices: [
              { text: t("survey.questions.q1.choices.male"), value: "q1_a1" },
              { text: t("survey.questions.q1.choices.female"), value: "q1_a2" },
            ],
          },
          {
            type: "dropdown",
            name: "q2",
            title: t("survey.questions.q2.title"),
            isRequired: true,
            choices: [
              {
                text: t("survey.questions.q2.choices.paediatrician"),
                value: "q2_a1",
              },
              {
                text: t("survey.questions.q2.choices.dietitian"),
                value: "q2_a2",
              },
              {
                text: t("survey.questions.q2.choices.allergist"),
                value: "q2_a3",
              },
              { text: t("survey.questions.q2.choices.nurse"), value: "q2_a4" },
            ],
            showOtherItem: true,
            otherText: t("survey.questions.q2.other"),
            otherPlaceholder: t("survey.questions.q2.otherPlaceholder"),
          },
          {
            type: "text",
            name: "q3",
            title: t("survey.questions.q3.title"),
            isRequired: true,
            inputType: "number",
          },
          {
            type: "text",
            name: "q4",
            title: t("survey.questions.q4.title"),
            isRequired: true,
            inputType: "number",
          },
          {
            type: "radiogroup",
            name: "q5",
            title: t("survey.questions.q5.title"),
            isRequired: true,
            choices: [
              { text: t("survey.questions.q5.choices.yes"), value: "yes" },
              { text: t("survey.questions.q5.choices.no"), value: "no" },
            ],
          },
          {
            type: "checkbox",
            name: "q5a",
            title: t("survey.questions.q5a.title"),
            isRequired: true,
            visibleIf: "{q5} = 'yes'",
            choices: [
              {
                text: t("survey.questions.q5a.choices.online_course"),
                value: "q5a_a1",
              },
              {
                text: t("survey.questions.q5a.choices.university_course"),
                value: "q5a_a2",
              },
              { text: t("survey.questions.q5a.choices.msc"), value: "q5a_a3" },
              { text: t("survey.questions.q5a.choices.phd"), value: "q5a_a4" },
              {
                text: t("survey.questions.q5a.choices.conference_attendance"),
                value: "q5a_a5",
              },
            ],
            showOtherItem: true,
            otherText: t("survey.questions.q5a.other"),
            otherPlaceholder: t("survey.questions.q5a.otherPlaceholder"),
          },
          {
            type: "text",
            name: "q6",
            title: t("survey.questions.q6.title"),
            isRequired: true,
          },
        ],
      },
      {
        name: "complementary_feeding_page",
        title: t("survey.pages.complementary_feeding.title"),
        elements: [
          {
            type: "panel",
            name: "q7_group",
            title: t("survey.questions.q7.title"),
            elements: [
              {
                type: "text",
                name: "q7a",
                title: t("survey.questions.q7.breast_fed"),
                titleLocation: "left",
                isRequired: true,
                inputType: "number",
                description: t("survey.questions.q7.months"),
              },
              {
                type: "text",
                name: "q7b",
                title: t("survey.questions.q7.formula_fed"),
                titleLocation: "left",
                isRequired: true,
                inputType: "number",
                description: t("survey.questions.q7.months"),
              },
              {
                type: "text",
                name: "q7c",
                title: t("survey.questions.q7.increased_risk"),
                titleLocation: "left",
                isRequired: true,
                inputType: "number",
                description: t("survey.questions.q7.months"),
              },
            ],
          },
          {
            type: "checkbox",
            name: "q8",
            title: t("survey.questions.q8.title"),
            isRequired: true,
            choices: [
              { text: t("survey.questions.q8.choices.eczema"), value: "q8_a1" },
              {
                text: t("survey.questions.q8.choices.bronchiolitis"),
                value: "q8_a2",
              },
              {
                text: t("survey.questions.q8.choices.family_history"),
                value: "q8_a3",
              },
            ],
            showOtherItem: true,
            otherText: t("survey.questions.q8.other"),
            otherPlaceholder: t("survey.questions.q8.otherPlaceholder"),
          },
          {
            type: "radiogroup",
            name: "q9a_main",
            title: t("survey.questions.q9a.title"),
            isRequired: true,
            choices: [
              { text: t("survey.questions.q9a.choices.yes"), value: "yes" },
              { text: t("survey.questions.q9a.choices.no"), value: "no" },
            ],
          },
          {
            type: "checkbox",
            name: "q9a_elaborate",
            title: t("survey.questions.q9a.elaborate.title"),
            isRequired: true,
            visibleIf: "{q9a_main} = 'yes'",
            choices: [
              {
                text: t("survey.questions.q9a.elaborate.choices.soy_formula"),
                value: "q9a_a1",
              },
              {
                text: t(
                  "survey.questions.q9a.elaborate.choices.hydrolysed_formula"
                ),
                value: "q9a_a2",
              },
              {
                text: t(
                  "survey.questions.q9a.elaborate.choices.restrict_allergens"
                ),
                value: "q9a_a3",
              },
              {
                text: t("survey.questions.q9a.elaborate.choices.emollients"),
                value: "q9a_a4",
              },
              {
                text: t("survey.questions.q9a.elaborate.choices.prebiotics"),
                value: "q9a_a5",
              },
              {
                text: t(
                  "survey.questions.q9a.elaborate.choices.vitamin_supplements"
                ),
                value: "q9a_a6",
              },
              {
                text: t(
                  "survey.questions.q9a.elaborate.choices.regular_formula"
                ),
                value: "q9a_a7",
              },
              {
                text: t(
                  "survey.questions.q9a.elaborate.choices.exclusive_breastfeeding"
                ),
                value: "q9a_a8",
              },
              {
                text: t(
                  "survey.questions.q9a.elaborate.choices.early_introduction"
                ),
                value: "q9a_a9",
              },
            ],
            showOtherItem: true,
            otherText: t("survey.questions.q9a.elaborate.other"),
            otherPlaceholder: t(
              "survey.questions.q9a.elaborate.otherPlaceholder"
            ),
          },
          {
            type: "radiogroup",
            name: "q9b_main",
            title: t("survey.questions.q9b.title"),
            isRequired: true,
            choices: [
              { text: t("survey.questions.q9b.choices.yes"), value: "yes" },
              { text: t("survey.questions.q9b.choices.no"), value: "no" },
            ],
          },
          {
            type: "checkbox",
            name: "q9b_elaborate",
            title: t("survey.questions.q9b.elaborate.title"),
            isRequired: true,
            visibleIf: "{q9b_main} = 'yes'",
            choices: [
              {
                text: t("survey.questions.q9b.elaborate.choices.soy_formula"),
                value: "q9b_a1",
              },
              {
                text: t(
                  "survey.questions.q9b.elaborate.choices.hydrolysed_formula"
                ),
                value: "q9b_a2",
              },
              {
                text: t(
                  "survey.questions.q9b.elaborate.choices.restrict_allergens"
                ),
                value: "q9b_a3",
              },
              {
                text: t("survey.questions.q9b.elaborate.choices.emollients"),
                value: "q9b_a4",
              },
              {
                text: t("survey.questions.q9b.elaborate.choices.prebiotics"),
                value: "q9b_a5",
              },
              {
                text: t(
                  "survey.questions.q9b.elaborate.choices.vitamin_supplements"
                ),
                value: "q9b_a6",
              },
              {
                text: t(
                  "survey.questions.q9b.elaborate.choices.regular_formula"
                ),
                value: "q9b_a7",
              },
              {
                text: t(
                  "survey.questions.q9b.elaborate.choices.exclusive_breastfeeding"
                ),
                value: "q9b_a8",
              },
              {
                text: t(
                  "survey.questions.q9b.elaborate.choices.early_introduction"
                ),
                value: "q9b_a9",
              },
            ],
            showOtherItem: true,
            otherText: t("survey.questions.q9b.elaborate.other"),
            otherPlaceholder: t(
              "survey.questions.q9b.elaborate.otherPlaceholder"
            ),
          },
          {
            type: "radiogroup",
            name: "q10_advise_order_low_risk",
            title: t("survey.questions.q10.title"),
            isRequired: true,
            choices: [
              { value: "yes", text: t("survey.questions.q10.choices.yes") },
              { value: "no", text: t("survey.questions.q10.choices.no") },
            ],
          },
          {
            type: "paneldynamic",
            name: "food_plan_low_risk",
            title: t("survey.questions.food_plan_low_risk.title"),
            description: t("survey.questions.food_plan_low_risk.description"),
            visibleIf: "{q10_advise_order_low_risk} = 'yes'",
            templateElements: [
              {
                type: "dropdown",
                name: "month",
                title: t("survey.dynamic_panel.month.title"),
                isRequired: true,
                choices: [
                  t("survey.dynamic_panel.month.choices.birth"),
                  t("survey.dynamic_panel.month.choices.month_1"),
                  t("survey.dynamic_panel.month.choices.month_2"),
                  t("survey.dynamic_panel.month.choices.month_3"),
                  t("survey.dynamic_panel.month.choices.month_4"),
                  t("survey.dynamic_panel.month.choices.month_5"),
                  t("survey.dynamic_panel.month.choices.month_6"),
                  t("survey.dynamic_panel.month.choices.month_7"),
                  t("survey.dynamic_panel.month.choices.month_8"),
                  t("survey.dynamic_panel.month.choices.month_9"),
                  t("survey.dynamic_panel.month.choices.month_10"),
                  t("survey.dynamic_panel.month.choices.month_11"),
                  t("survey.dynamic_panel.month.choices.month_12"),
                  t("survey.dynamic_panel.month.choices.month_13"),
                  t("survey.dynamic_panel.month.choices.month_14"),
                  t("survey.dynamic_panel.month.choices.month_15"),
                  t("survey.dynamic_panel.month.choices.month_16"),
                  t("survey.dynamic_panel.month.choices.month_17"),
                  t("survey.dynamic_panel.month.choices.month_18"),
                ],
              },
              {
                type: "dropdown",
                name: "food_category",
                title: t("survey.dynamic_panel.food_category.title"),
                isRequired: true,
                choices: [
                  t("foodCategories.starch_gluten"),
                  t("foodCategories.vegetables"),
                  t("foodCategories.legumes"),
                  t("foodCategories.meat"),
                  t("foodCategories.fish_shellfish"),
                  t("foodCategories.fruit"),
                  t("foodCategories.dairy"),
                  t("foodCategories.egg"),
                  t("foodCategories.fat_oil"),
                  t("foodCategories.sweets"),
                  t("foodCategories.nuts_seeds"),
                  t("foodCategories.salt_spices"),
                  t("foodCategories.additional_guidance"),
                ],
              },
              {
                type: "checkbox",
                name: "food_items",
                title: t("survey.dynamic_panel.food_items.title"),
                description: t("survey.dynamic_panel.food_items.description"),
                isRequired: true,
                visibleIf: "{panel.food_category} notempty",
                choices: [],
              },
            ],
            panelAddText: t("survey.dynamic_panel.add_entry"),
            panelRemoveText: t("survey.dynamic_panel.remove_entry"),
          },
          {
            type: "radiogroup",
            name: "q11_advise_order_high_risk",
            title: t("survey.questions.q11.title"),
            isRequired: true,
            choices: [
              { value: "yes", text: t("survey.questions.q11.choices.yes") },
              { value: "no", text: t("survey.questions.q11.choices.no") },
            ],
          },
          {
            type: "paneldynamic",
            name: "food_plan_high_risk",
            title: t("survey.questions.food_plan_high_risk.title"),
            description: t("survey.questions.food_plan_high_risk.description"),
            visibleIf: "{q11_advise_order_high_risk} = 'yes'",
            templateElements: [
              {
                type: "dropdown",
                name: "month",
                title: t("survey.dynamic_panel.month.title"),
                isRequired: true,
                choices: [
                  t("survey.dynamic_panel.month.choices.birth"),
                  t("survey.dynamic_panel.month.choices.month_1"),
                  t("survey.dynamic_panel.month.choices.month_2"),
                  t("survey.dynamic_panel.month.choices.month_3"),
                  t("survey.dynamic_panel.month.choices.month_4"),
                  t("survey.dynamic_panel.month.choices.month_5"),
                  t("survey.dynamic_panel.month.choices.month_6"),
                  t("survey.dynamic_panel.month.choices.month_7"),
                  t("survey.dynamic_panel.month.choices.month_8"),
                  t("survey.dynamic_panel.month.choices.month_9"),
                  t("survey.dynamic_panel.month.choices.month_10"),
                  t("survey.dynamic_panel.month.choices.month_11"),
                  t("survey.dynamic_panel.month.choices.month_12"),
                  t("survey.dynamic_panel.month.choices.month_13"),
                  t("survey.dynamic_panel.month.choices.month_14"),
                  t("survey.dynamic_panel.month.choices.month_15"),
                  t("survey.dynamic_panel.month.choices.month_16"),
                  t("survey.dynamic_panel.month.choices.month_17"),
                  t("survey.dynamic_panel.month.choices.month_18"),
                ],
              },
              {
                type: "dropdown",
                name: "food_category",
                title: t("survey.dynamic_panel.food_category.title"),
                isRequired: true,
                choices: [
                  t("foodCategories.starch_gluten"),
                  t("foodCategories.vegetables"),
                  t("foodCategories.legumes"),
                  t("foodCategories.meat"),
                  t("foodCategories.fish_shellfish"),
                  t("foodCategories.fruit"),
                  t("foodCategories.dairy"),
                  t("foodCategories.egg"),
                  t("foodCategories.fat_oil"),
                  t("foodCategories.sweets"),
                  t("foodCategories.nuts_seeds"),
                  t("foodCategories.salt_spices"),
                  t("foodCategories.additional_guidance"),
                ],
              },
              {
                type: "checkbox",
                name: "food_items",
                title: t("survey.dynamic_panel.food_items.title"),
                description: t("survey.dynamic_panel.food_items.description"),
                isRequired: true,
                visibleIf: "{panel.food_category} notempty",
                choices: [],
              },
            ],
            panelAddText: t("survey.dynamic_panel.add_entry"),
            panelRemoveText: t("survey.dynamic_panel.remove_entry"),
          },
          {
            type: "comment",
            name: "q12",
            title: t("survey.questions.q12.title"),
            isRequired: false,
          },
          {
            type: "checkbox",
            name: "q14",
            title: t("survey.questions.q14.title"),
            isRequired: true,
            choices: [
              { text: t("survey.questions.q14.choices.iron"), value: "q14_a1" },
              {
                text: t("survey.questions.q14.choices.multivitamin"),
                value: "q14_a2",
              },
              {
                text: t("survey.questions.q14.choices.omega3"),
                value: "q14_a3",
              },
              {
                text: t("survey.questions.q14.choices.probiotic"),
                value: "q14_a4",
              },
              {
                text: t("survey.questions.q14.choices.prebiotic"),
                value: "q14_a5",
              },
              {
                text: t("survey.questions.q14.choices.synbiotic"),
                value: "q14_a6",
              },
              {
                text: t("survey.questions.q14.choices.vitamin_a"),
                value: "q14_a7",
              },
              {
                text: t("survey.questions.q14.choices.vitamin_c"),
                value: "q14_a8",
              },
              {
                text: t("survey.questions.q14.choices.vitamin_d"),
                value: "q14_a9",
              },
              {
                text: t("survey.questions.q14.choices.no_supplements"),
                value: "q14_a10",
              },
            ],
            showOtherItem: true,
            otherText: t("survey.questions.q14.other"),
            otherPlaceholder: t("survey.questions.q14.otherPlaceholder"),
          },
          {
            type: "dropdown",
            name: "q15",
            title: t("survey.questions.q15.title"),
            isRequired: true,
            choices: [
              {
                text: t("survey.questions.q15.choices.1_day"),
                value: "q15_18_a1",
              },
              {
                text: t("survey.questions.q15.choices.1_3_days"),
                value: "q15_18_a2",
              },
              {
                text: t("survey.questions.q15.choices.more_3_days"),
                value: "q15_18_a3",
              },
            ],
          },
          {
            type: "dropdown",
            name: "q16",
            title: t("survey.questions.q16.title"),
            isRequired: true,
            choices: [
              {
                text: t("survey.questions.q16.choices.1_day"),
                value: "q15_18_a1",
              },
              {
                text: t("survey.questions.q16.choices.1_3_days"),
                value: "q15_18_a2",
              },
              {
                text: t("survey.questions.q16.choices.more_3_days"),
                value: "q15_18_a3",
              },
            ],
          },
          {
            type: "dropdown",
            name: "q17",
            title: t("survey.questions.q17.title"),
            isRequired: true,
            choices: [
              {
                text: t("survey.questions.q17.choices.1_day"),
                value: "q15_18_a1",
              },
              {
                text: t("survey.questions.q17.choices.1_3_days"),
                value: "q15_18_a2",
              },
              {
                text: t("survey.questions.q17.choices.more_3_days"),
                value: "q15_18_a3",
              },
            ],
          },
          {
            type: "dropdown",
            name: "q18",
            title: t("survey.questions.q18.title"),
            isRequired: true,
            choices: [
              {
                text: t("survey.questions.q18.choices.1_day"),
                value: "q15_18_a1",
              },
              {
                text: t("survey.questions.q18.choices.1_3_days"),
                value: "q15_18_a2",
              },
              {
                text: t("survey.questions.q18.choices.more_3_days"),
                value: "q15_18_a3",
              },
            ],
          },
        ],
      },
    ],
  };
};

// Generate translated food database
export const getTranslatedFoodDatabase = () => {
  return [
    {
      name: t("foodCategories.starch_gluten"),
      code: "starch",
      items: [
        { label: t("foodItems.starch.gluten_grains"), value: "g_starch_1" },
        {
          label: t("foodItems.starch.gluten_free_cereals"),
          value: "g_starch_2",
        },
        { label: t("foodItems.starch.maize_products"), value: "g_starch_3" },
        {
          label: t("foodItems.starch.potato_sweet_potato"),
          value: "g_starch_4",
        },
        { label: t("foodItems.starch.rice"), value: "g_starch_5" },
        { label: t("foodItems.starch.rice_pudding"), value: "g_starch_6" },
        { label: t("foodItems.starch.semolina_pudding"), value: "g_starch_7" },
        { label: t("foodItems.starch.trahanas"), value: "g_starch_8" },
      ],
    },
    {
      name: t("foodCategories.vegetables"),
      code: "veg",
      items: [
        { label: t("foodItems.vegetables.cabbage_broccoli"), value: "g_veg_1" },
        { label: t("foodItems.vegetables.carrot"), value: "g_veg_2" },
        { label: t("foodItems.vegetables.root_vegetables"), value: "g_veg_3" },
        { label: t("foodItems.vegetables.leafy_vegetables"), value: "g_veg_4" },
        { label: t("foodItems.vegetables.pea_beans"), value: "g_veg_5" },
        { label: t("foodItems.vegetables.pepper"), value: "g_veg_6" },
        { label: t("foodItems.vegetables.tomato"), value: "g_veg_7" },
        { label: t("foodItems.vegetables.zucchini"), value: "g_veg_8" },
      ],
    },
    {
      name: t("foodCategories.legumes"),
      code: "legume",
      items: [
        { label: t("foodItems.legumes.beans"), value: "g_legumes_1" },
        { label: t("foodItems.legumes.chickpeas"), value: "g_legumes_2" },
        { label: t("foodItems.legumes.lentils"), value: "g_legumes_3" },
        { label: t("foodItems.legumes.soya"), value: "g_legumes_4" },
        { label: t("foodItems.legumes.peanut"), value: "g_legumes_5" },
      ],
    },
    {
      name: t("foodCategories.meat"),
      code: "meat",
      items: [
        { label: t("foodItems.meat.poultry"), value: "g_meat_1" },
        { label: t("foodItems.meat.processed_meat"), value: "g_meat_2" },
        { label: t("foodItems.meat.lamb"), value: "g_meat_3" },
        { label: t("foodItems.meat.liver_pate"), value: "g_meat_4" },
        { label: t("foodItems.meat.pork"), value: "g_meat_5" },
        { label: t("foodItems.meat.rabbit"), value: "g_meat_6" },
        { label: t("foodItems.meat.beef"), value: "g_meat_7" },
        { label: t("foodItems.meat.venison"), value: "g_meat_8" },
      ],
    },
    {
      name: t("foodCategories.fish_shellfish"),
      code: "fish",
      items: [
        { label: t("foodItems.fish.crustaceans"), value: "g_fish_1" },
        { label: t("foodItems.fish.fish"), value: "g_fish_2" },
        { label: t("foodItems.fish.mollusks"), value: "g_fish_3" },
      ],
    },
    {
      name: t("foodCategories.fruit"),
      code: "fruit",
      items: [
        { label: t("foodItems.fruit.apple"), value: "g_fruit_1" },
        { label: t("foodItems.fruit.mango"), value: "g_fruit_2" },
        { label: t("foodItems.fruit.banana"), value: "g_fruit_3" },
        { label: t("foodItems.fruit.berries"), value: "g_fruit_4" },
        { label: t("foodItems.fruit.dried_fruits"), value: "g_fruit_5" },
        { label: t("foodItems.fruit.figs"), value: "g_fruit_6" },
        { label: t("foodItems.fruit.fresh_juice"), value: "g_fruit_7" },
        { label: t("foodItems.fruit.fruit_juice"), value: "g_fruit_8" },
        { label: t("foodItems.fruit.grapes"), value: "g_fruit_9" },
        { label: t("foodItems.fruit.kiwi"), value: "g_fruit_10" },
        { label: t("foodItems.fruit.melon"), value: "g_fruit_11" },
        { label: t("foodItems.fruit.citrus"), value: "g_fruit_12" },
        { label: t("foodItems.fruit.stone_fruits"), value: "g_fruit_13" },
        { label: t("foodItems.fruit.pear"), value: "g_fruit_14" },
      ],
    },
    {
      name: t("foodCategories.dairy"),
      code: "dairy",
      items: [
        { label: t("foodItems.dairy.plant_milk"), value: "g_dairy_1" },
        { label: t("foodItems.dairy.cow_yogurt"), value: "g_dairy_2" },
        { label: t("foodItems.dairy.cream_cheese"), value: "g_dairy_3" },
        { label: t("foodItems.dairy.feta"), value: "g_dairy_4" },
        { label: t("foodItems.dairy.fresh_cow_milk"), value: "g_dairy_5" },
        { label: t("foodItems.dairy.goat_sheep_milk"), value: "g_dairy_6" },
        { label: t("foodItems.dairy.kephir"), value: "g_dairy_7" },
        { label: t("foodItems.dairy.kids_yogurt"), value: "g_dairy_8" },
        { label: t("foodItems.dairy.rice_milk"), value: "g_dairy_9" },
        { label: t("foodItems.dairy.goat_sheep_yogurt"), value: "g_dairy_10" },
        { label: t("foodItems.dairy.soy_cheese"), value: "g_dairy_11" },
        { label: t("foodItems.dairy.soy_milk"), value: "g_dairy_12" },
        { label: t("foodItems.dairy.soy_yogurt"), value: "g_dairy_13" },
        { label: t("foodItems.dairy.cheese"), value: "g_dairy_14" },
      ],
    },
    {
      name: t("foodCategories.egg"),
      code: "egg",
      items: [
        { label: t("foodItems.egg.hard_boiled"), value: "g_egg_1" },
        { label: t("foodItems.egg.raw"), value: "g_egg_2" },
        { label: t("foodItems.egg.partially_cooked"), value: "g_egg_3" },
      ],
    },
    {
      name: t("foodCategories.fat_oil"),
      code: "fat",
      items: [
        { label: t("foodItems.fat.butter"), value: "g_fat_1" },
        { label: t("foodItems.fat.vegetable_oils"), value: "g_fat_2" },
        { label: t("foodItems.fat.margarine"), value: "g_fat_3" },
        { label: t("foodItems.fat.olive_oil"), value: "g_fat_4" },
        { label: t("foodItems.fat.nut_seed_oils"), value: "g_fat_5" },
      ],
    },
    {
      name: t("foodCategories.sweets"),
      code: "sweets",
      items: [
        { label: t("foodItems.sweets.baby_biscuits"), value: "g_sweets_1" },
        { label: t("foodItems.sweets.fruit_spread"), value: "g_sweets_2" },
        { label: t("foodItems.sweets.honey"), value: "g_sweets_3" },
        { label: t("foodItems.sweets.sweets_cake"), value: "g_sweets_4" },
      ],
    },
    {
      name: t("foodCategories.nuts_seeds"),
      code: "nuts",
      items: [
        { label: t("foodItems.nuts.mustard"), value: "g_nuts_seeds_1" },
        { label: t("foodItems.nuts.sesame"), value: "g_nuts_seeds_2" },
        { label: t("foodItems.nuts.tree_nuts"), value: "g_nuts_seeds_3" },
      ],
    },
    {
      name: t("foodCategories.salt_spices"),
      code: "spices",
      items: [
        { label: t("foodItems.spices.salt"), value: "g_spices_salt_1" },
        { label: t("foodItems.spices.spices_herbs"), value: "g_spices_salt_2" },
      ],
    },
    {
      name: t("foodCategories.additional_guidance"),
      code: "additional",
      items: [
        { label: t("foodItems.additional.baby_food"), value: "g_addit_guid_1" },
        {
          label: t("foodItems.additional.family_meal_salt"),
          value: "g_addit_guid_2",
        },
        {
          label: t("foodItems.additional.family_meal_no_salt"),
          value: "g_addit_guid_3",
        },
        {
          label: t("foodItems.additional.mashed_food"),
          value: "g_addit_guid_4",
        },
        {
          label: t("foodItems.additional.pureed_food"),
          value: "g_addit_guid_5",
        },
        {
          label: t("foodItems.additional.finger_food"),
          value: "g_addit_guid_6",
        },
        {
          label: t("foodItems.additional.baby_led_weaning"),
          value: "g_addit_guid_7",
        },
      ],
    },
  ];
};
