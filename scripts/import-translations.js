import fs from 'fs';
import path from 'path';

// Read the CSV file
const csvContent = fs.readFileSync('feeding-interface.csv', 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Parse CSV header to get language codes
const header = lines[0].split(',');
const languageColumns = {
  EN: header.indexOf('EN'),
  EL: header.indexOf('EL'),
  PL: header.indexOf('PL'),
  IT: header.indexOf('IT'),
  ES: header.indexOf('ES'),
  DE: header.indexOf('DE'),
  PT: header.indexOf('PT'),
  NL: header.indexOf('NL'),
  FR: header.indexOf('FR'),
  RO: header.indexOf('RO'),
  TC: header.indexOf('TC')
};

// Language code mappings to file names
const languageFiles = {
  EN: 'en.json',
  EL: 'el.json',
  PL: 'pl.json',
  IT: 'it.json',
  ES: 'es.json',
  DE: 'de.json',
  PT: 'pt.json',
  NL: 'nl.json',
  FR: 'fr.json',
  RO: 'ro.json',
  TC: 'zh-tw.json'
};

// Parse each line and extract translations
const translations = {};

// Initialize translation objects for each language
Object.keys(languageFiles).forEach(lang => {
  translations[lang] = {
    survey: {
      foodPlanning: {},
      interface: {}
    },
    foodCategories: {}
  };
});

// Process each line
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  const columns = line.split(',');
  const code = columns[1]?.trim();
  const noteLocation = columns[2]?.trim();
  
  if (!code) continue;
  
  // Process food groups
  if (noteLocation === 'FOOD GROUP') {
    Object.keys(languageColumns).forEach(lang => {
      const colIndex = languageColumns[lang];
      if (colIndex >= 0 && columns[colIndex]) {
        const translation = columns[colIndex].replace(/"/g, '').trim();
        if (translation) {
          // Map food group codes to existing keys
          const keyMap = {
            'starch': 'starch_gluten',
            'veg': 'vegetables',
            'legume': 'legumes',
            'meat': 'meat',
            'fish': 'fish_shellfish',
            'fruit': 'fruit',
            'dairy': 'dairy',
            'egg': 'egg',
            'fat': 'fat_oil',
            'sweets': 'sweets',
            'nuts': 'nuts_seeds',
            'spices': 'salt_spices',
            'additional': 'additional_guidance'
          };
          
          const mappedKey = keyMap[code] || code;
          translations[lang].foodCategories[mappedKey] = translation;
        }
      }
    });
  }
  
  // Process interface strings
  if (code.startsWith('str')) {
    Object.keys(languageColumns).forEach(lang => {
      const colIndex = languageColumns[lang];
      if (colIndex >= 0 && columns[colIndex]) {
        const translation = columns[colIndex].replace(/"/g, '').trim();
        if (translation) {
          translations[lang].survey.interface[code] = translation;
        }
      }
    });
  }
}

// Add food planning interface translations
Object.keys(languageFiles).forEach(lang => {
  const t = translations[lang].survey;
  
  // Use existing interface strings where available
  t.foodPlanning.foodCategories = t.interface.str19 || "Food Categories"; // "Advice" -> repurpose
  t.foodPlanning.lowRiskTimeline = t.interface.str11 || "Low-risk";
  t.foodPlanning.highRiskTimeline = t.interface.str12 || "High-risk";
  t.foodPlanning.dragHere = "Drag foods here for {{month}}"; // Will need manual translation
  t.foodPlanning.summary = "Summary: {{count}} foods planned"; // Will need manual translation
  
  // Add basic interface strings
  t.title = t.interface.str1 || "Complementary feeding: a survey on the Healthcare Professional practices";
  t.submit = t.interface.str13 || "Submit Form";
  t.thanks = t.interface.str15 || "Thank you for agreeing to participate";
  t.months = t.interface.str21 || "months";
  t.basicInfo = t.interface.str17 || "Basic Information";
});

// Read existing translation files and merge
Object.keys(languageFiles).forEach(lang => {
  const filename = languageFiles[lang];
  const filepath = path.join('src/locales', filename);
  
  let existingTranslations = {};
  if (fs.existsSync(filepath)) {
    try {
      existingTranslations = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    } catch (e) {
      console.warn(`Could not parse existing ${filename}:`, e.message);
    }
  }
  
  // Merge translations (preserve existing, add new)
  const merged = {
    ...existingTranslations,
    ...translations[lang],
    survey: {
      ...existingTranslations.survey,
      ...translations[lang].survey,
      foodPlanning: {
        ...existingTranslations.survey?.foodPlanning,
        ...translations[lang].survey.foodPlanning
      }
    },
    foodCategories: {
      ...existingTranslations.foodCategories,
      ...translations[lang].foodCategories
    }
  };
  
  // Write the merged translations
  fs.writeFileSync(filepath, JSON.stringify(merged, null, 2), 'utf-8');
  console.log(`Updated ${filename} with ${Object.keys(translations[lang].foodCategories).length} food categories and interface strings`);
});

console.log('Translation import complete!');