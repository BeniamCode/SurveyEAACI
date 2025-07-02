# Translation Guide for Complementary Feeding Survey

## Overview
This application supports internationalization (i18n) for the healthcare professional survey on complementary feeding practices. The application is built using React with react-i18next for translation management.

## Translation Structure
All translation files are located in the `/src/locales/` directory:
- `en.json` - English (source language)
- `zh-tw.json` - Traditional Chinese (completed)
- `el.json` - Greek (needs update)
- `pl.json` - Polish (needs update)

## Translation Keys Structure

### 1. **Main Categories**
- `title` - Application title
- `introduction` - Welcome screen content
- `survey` - All survey-related content
- `foodCategories` - Food category names
- `foodItems` - Individual food item names
- `navigation` - Navigation elements
- `common` - Common UI elements

### 2. **Survey Questions Structure**
Questions are organized by ID:
- `survey.questions.q1` - Basic demographic questions
- `survey.questions.q10` - Food introduction order (low-risk)
- `survey.questions.q11` - Food introduction order (high-risk)
- `survey.dynamic_panel` - Dynamic form elements

### 3. **Food Categories (13 categories)**
```json
"foodCategories": {
  "starch_gluten": "STARCH/GLUTEN",
  "vegetables": "VEGETABLES",
  "legumes": "LEGUMES",
  "meat": "MEAT",
  "fish_shellfish": "FISH/SHELLFISH",
  "fruit": "FRUIT",
  "dairy": "DAIRY PRODUCTS / SUBSTITUTES",
  "egg": "EGG",
  "fat_oil": "FAT/OIL",
  "sweets": "SWEETS",
  "nuts_seeds": "NUTS/SEEDS",
  "salt_spices": "SALT/SPICES",
  "additional_guidance": "ADDITIONAL GUIDANCE"
}
```

### 4. **Food Items (73 total items)**
Food items are grouped by category under `foodItems`:
- `foodItems.starch.*` - 8 starch/gluten items
- `foodItems.vegetables.*` - 8 vegetable items
- `foodItems.meat.*` - 8 meat items
- etc.

## Translation Guidelines

### **Context & Audience**
- **Target audience**: Healthcare professionals (pediatricians, dietitians, allergists, nurses)
- **Domain**: Medical/nutritional research survey
- **Tone**: Professional, clinical, precise

### **Key Translation Principles**

1. **Medical Terminology**: Use established medical terms in the target language
2. **Food Names**: Use common local food names while maintaining scientific accuracy
3. **Age Specifications**: Ensure age/month references are culturally appropriate
4. **Consistency**: Maintain consistent terminology throughout

### **Special Considerations**

#### **Food Items Translation**
- Some foods may not exist in certain cultures - use closest equivalent or transliterate
- Consider local food preparation methods
- Maintain nutritional categories (allergen groups must remain accurate)

#### **Medical Terms**
- "Complementary feeding" should use established medical terminology
- Allergy-related terms must be medically accurate
- Age references (months) should follow local medical conventions

#### **Cultural Adaptation**
- Traditional foods mentioned in Q12 should be culturally relevant
- Professional titles may vary by country's healthcare system

## Files to Translate

### **Primary Translation Files**
1. `/src/locales/[language].json` - Main translation file

### **Already Completed**
- ✅ English (`en.json`) - Source language
- ✅ Traditional Chinese (`zh-tw.json`) - Complete professional translation

### **Needs Professional Translation**
- ❌ Greek (`el.json`) - Needs update to new structure
- ❌ Polish (`pl.json`) - Needs update to new structure

## Translation Process

### **For New Languages**
1. Copy the English `en.json` file
2. Rename to appropriate language code (e.g., `fr.json`, `de.json`)
3. Translate all values while keeping keys unchanged
4. Update `/src/i18n.ts` to include the new language
5. Test the translation in the application

### **For Existing Languages**
1. Compare existing file with current `en.json` structure
2. Add missing keys and translations
3. Update outdated translations
4. Verify medical/food terminology accuracy

## Quality Assurance

### **Validation Checklist**
- [ ] All keys from `en.json` are present
- [ ] No untranslated English text remains
- [ ] Medical terminology is accurate
- [ ] Food names are culturally appropriate
- [ ] Professional titles match local healthcare system
- [ ] Age/time references are correct
- [ ] JSON syntax is valid

### **Testing**
1. Load the application with the new language
2. Navigate through the entire survey
3. Verify all text displays correctly
4. Check dynamic content (food items based on category selection)
5. Verify form validation messages

## Technical Notes

### **JSON Structure**
- All files must be valid JSON
- Keys must match exactly between languages
- Use proper escaping for special characters
- Maintain hierarchical structure

### **Dynamic Content**
The application dynamically loads:
- Food categories in dropdown menus
- Food items based on selected category
- Form validation messages
- All survey questions and choices

### **Language Switching**
The application supports real-time language switching:
- Survey regenerates with new translations
- Food databases update automatically
- User selections are preserved when possible

## Contact for Translation

For questions about:
- **Medical terminology**: Consult with local medical professionals
- **Technical issues**: Contact development team
- **Context clarification**: Refer to this documentation or English source

## File Locations
- Translation files: `/src/locales/`
- i18n configuration: `/src/i18n.ts`
- Translation utilities: `/src/utils/surveyTranslation.ts`
- Main survey component: `/src/components/Survey.tsx`