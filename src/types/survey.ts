import { z } from 'zod';
import type { FoodPlacement } from '../data/foodCategories';

// Food placement schema
export const foodPlacementSchema = z.object({
  foodItemId: z.string(),
  foodItemName: z.string(),
  monthId: z.string(),
  riskLevel: z.enum(['low', 'high']),
});

// Basic demographic schemas - matching original survey
export const demographicsSchema = z.object({
  q1: z.enum(['q1_a1', 'q1_a2', '']).refine(val => val !== '', 'Please select an option'), // Male, Female
  q2: z.string().min(1, 'Profession is required'),
  q3: z.string().min(1, 'Age is required'), // Text input with number
  q4: z.string().min(1, 'Years of practice is required'), // Text input with number
  q5: z.enum(['yes', 'no', '']).refine(val => val !== '', 'Please select an option'),
  q5a: z.array(z.string()).optional(),
  q6: z.string().min(1, 'Country is required'),
});

// Complementary feeding schemas - matching original survey
export const feedingPracticesSchema = z.object({
  q7a: z.string().min(1, 'Breast-fed infant age is required').refine(val => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number of months'),
  q7b: z.string().min(1, 'Formula-fed infant age is required').refine(val => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number of months'),
  q7c: z.string().min(1, 'High-risk infant age is required').refine(val => !isNaN(Number(val)) && Number(val) >= 0, 'Must be a valid number of months'),
  q8: z.array(z.string()).min(1, 'Please select at least one risk factor'),
  q8_other: z.string().optional(),
  q9a_main: z.enum(['yes', 'no', '']).refine(val => val !== '', 'Please select Yes or No'),
  q9a_elaborate: z.array(z.string()).optional(),
  q9a_elaborate_other: z.string().optional(),
  q9b_main: z.enum(['yes', 'no', '']).refine(val => val !== '', 'Please select Yes or No'),
  q9b_elaborate: z.array(z.string()).optional(),
  q9b_elaborate_other: z.string().optional(),
  q10: z.enum(['yes', 'no', '']).refine(val => val !== '', 'Please select Yes or No'),
  q10_food_plan: z.array(foodPlacementSchema).optional(),
  q11: z.enum(['yes', 'no', '']).refine(val => val !== '', 'Please select Yes or No'),
  q11_food_plan: z.array(foodPlacementSchema).optional(),
  q12: z.string().optional(),
  q14: z.array(z.string()).min(1, 'Please select at least one supplement option'),
  q14_other: z.string().optional(),
  q15: z.enum(['q15_18_a1', 'q15_18_a2', 'q15_18_a3', '']).refine(val => val !== '', 'Please select an interval'),
  q16: z.enum(['q15_18_a1', 'q15_18_a2', 'q15_18_a3', '']).refine(val => val !== '', 'Please select an interval'),
  q17: z.enum(['q15_18_a1', 'q15_18_a2', 'q15_18_a3', '']).refine(val => val !== '', 'Please select an interval'),
  q18: z.enum(['q15_18_a1', 'q15_18_a2', 'q15_18_a3', '']).refine(val => val !== '', 'Please select an interval'),
});

// Food plan entry schema - matching original survey structure
export const foodPlanEntrySchema = z.object({
  id: z.string(),
  month: z.string(),
  food_category: z.string(),
  food_items: z.array(z.string()).min(1, 'Select at least one food item'),
});

// Food plan schemas
export const foodPlansSchema = z.object({
  food_plan_low_risk: z.array(foodPlanEntrySchema).optional(),
  food_plan_high_risk: z.array(foodPlanEntrySchema).optional(),
});

// Complete survey schema
export const surveySchema = z.object({
  ...demographicsSchema.shape,
  ...feedingPracticesSchema.shape,
  ...foodPlansSchema.shape,
});

export type SurveyData = z.infer<typeof surveySchema>;
export type DemographicsData = z.infer<typeof demographicsSchema>;
export type FeedingPracticesData = z.infer<typeof feedingPracticesSchema>;
export type FoodPlanEntry = z.infer<typeof foodPlanEntrySchema>;

// Food category type
export interface FoodCategory {
  name: string;
  code: string;
  items: SurveyFoodItem[];
}

export interface SurveyFoodItem {
  label: string;
  value: string;
}

// Form step type
export type FormStep = 'demographics' | 'feeding-practices' | 'food-plans' | 'review';

// Original survey choice values
export const OriginalChoices = {
  q1: {
    male: 'q1_a1',
    female: 'q1_a2'
  },
  q2: {
    paediatrician: 'q2_a1',
    dietitian: 'q2_a2',
    allergist: 'q2_a3',
    nurse: 'q2_a4',
    other: 'other'
  },
  q5a: {
    online_course: 'q5a_a1',
    university_course: 'q5a_a2',
    msc: 'q5a_a3',
    phd: 'q5a_a4',
    other: 'other'
  },
  q8: {
    coexisting_eczema: 'q8_a1',
    recurrent_bronchiolitis: 'q8_a2',
    family_history_allergies: 'q8_a3',
    other: 'other'
  },
  q9a_elaborate: {
    soy_formula: 'q9a_a1',
    hydrolysed_formula: 'q9a_a2',
    restrict_allergens: 'q9a_a3',
    emollients: 'q9a_a4',
    prebiotics: 'q9a_a5',
    vitamin_supplements: 'q9a_a6',
    regular_formula: 'q9a_a7',
    exclusive_breastfeeding: 'q9a_a8',
    other: 'other'
  },
  q9b_elaborate: {
    soy_formula: 'q9b_a1',
    hydrolysed_formula: 'q9b_a2',
    restrict_allergens: 'q9b_a3',
    emollients: 'q9b_a4',
    prebiotics: 'q9b_a5',
    vitamin_supplements: 'q9b_a6',
    regular_formula: 'q9b_a7',
    exclusive_breastfeeding: 'q9b_a8',
    other: 'other'
  },
  q14: {
    iron: 'q14_a1',
    multivitamin: 'q14_a2',
    omega_3: 'q14_a3',
    probiotic: 'q14_a4',
    prebiotic: 'q14_a5',
    synbiotic: 'q14_a6',
    vitamin_a: 'q14_a7',
    vitamin_c: 'q14_a8',
    vitamin_d: 'q14_a9',
    no_supplements: 'q14_a10',
    other: 'other'
  },
  intervals: {
    one_day: 'q15_18_a1',
    one_to_three_days: 'q15_18_a2',
    more_than_three_days: 'q15_18_a3'
  }
};