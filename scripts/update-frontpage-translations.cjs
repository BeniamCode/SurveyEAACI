const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

// Read CSV file
const csvPath = path.join(__dirname, '..', 'extra-stuff.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV with proper quote handling for complex text
const records = csv.parse(csvContent, {
  delimiter: ',',
  columns: true,
  skip_empty_lines: true,
  quote: '"',
  escape: '"',
  relax_column_count: true
});

// Language codes mapping from CSV to locale files
const languageMap = {
  'EN': 'en',
  'EL': 'el', 
  'PL': 'pl',
  'IT': 'it',
  'ES': 'es',
  'DE': 'de',
  'PT': 'pt',
  'NL': 'nl',
  'FR': 'fr',
  'RO': 'ro'
};

// Mapping from CSV codes to translation keys
const frontPageMapping = {
  'str1': 'title',
  'str2': 'introduction.description',
  'str3': 'introduction.duration',
  'str4': 'introduction.passwordPrompt',
  'str24': 'introduction.extraHeader'
};

// Helper to set nested property in object
function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
}

// Update translations for each language
Object.entries(languageMap).forEach(([csvLang, localeLang]) => {
  const localePath = path.join(__dirname, '..', 'src', 'locales', `${localeLang}.json`);
  
  // Read existing locale file
  let localeData = {};
  if (fs.existsSync(localePath)) {
    localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
  }
  
  // Update front page translations from CSV
  records.forEach(record => {
    const code = record['CODE'];
    const translation = record[csvLang];
    
    if (code && translation && frontPageMapping[code]) {
      setNestedProperty(localeData, frontPageMapping[code], translation);
    }
  });
  
  // Write updated locale file
  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + '\n');
  console.log(`Updated ${localeLang}.json with front page translations`);
});

console.log('Front page translation update complete!');