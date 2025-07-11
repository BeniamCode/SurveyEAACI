import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const languages = ['en', 'el', 'pl', 'it', 'es', 'de', 'pt', 'nl', 'fr', 'ro', 'zh-tw'];

// Read English translations as the base
const enFilePath = path.join(localesDir, 'en.json');
const enTranslations = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'));

// Update each language file
languages.forEach(lang => {
  const filename = `${lang}.json`;
  const filepath = path.join(localesDir, filename);
  
  if (fs.existsSync(filepath)) {
    try {
      const translations = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      
      // Copy all foodItems from English to maintain structure
      if (enTranslations.foodItems) {
        translations.foodItems = enTranslations.foodItems;
      }
      
      // Write back to file
      fs.writeFileSync(filepath, JSON.stringify(translations, null, 2), 'utf-8');
      console.log(`Updated ${filename} with all food items structure`);
      
    } catch (e) {
      console.error(`Error updating ${filename}:`, e.message);
    }
  }
});

console.log('Food items structure copy complete!');
console.log('All language files now have the same food item translation keys.');
console.log('You can now translate the individual food items in each language file.');