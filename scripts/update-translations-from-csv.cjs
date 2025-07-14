const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

// Read CSV file
const csvPath = path.join(__dirname, '..', 'Language-questions.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV with comma delimiter
const records = csv.parse(csvContent, {
  delimiter: ',',
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true,
  quote: false
});

// CSV parsing complete

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

// Question code to translation key mapping
const questionMapping = {
  'q1': 'survey.questions.q1.title',
  'q1_a1': 'survey.questions.q1.choices.male',
  'q1_a2': 'survey.questions.q1.choices.female',
  'q2': 'survey.questions.q2.title',
  'q2_a1': 'survey.questions.q2.choices.paediatrician',
  'q2_a2': 'survey.questions.q2.choices.dietitian',
  'q2_a3': 'survey.questions.q2.choices.allergist',
  'q2_a4': 'survey.questions.q2.choices.nurse',
  'q2_aother': 'survey.questions.q2.other',
  'q2_aother_placeh': 'survey.questions.q2.otherPlaceholder',
  'q3': 'survey.questions.q3.title',
  'q4': 'survey.questions.q4.title',
  'q5': 'survey.questions.q5.title',
  'q5a': 'survey.questions.q5a.title',
  'q5a_a1': 'survey.questions.q5a.choices.online_course',
  'q5a_a2': 'survey.questions.q5a.choices.university_course',
  'q5a_a3': 'survey.questions.q5a.choices.msc',
  'q5a_a4': 'survey.questions.q5a.choices.phd',
  'q5a_a5': 'survey.questions.q5a.choices.conference_attendance',
  'q5a_aother': 'survey.questions.q5a.other',
  'q5a_aother_placeh': 'survey.questions.q5a.otherPlaceholder',
  'q6': 'survey.questions.q6.title',
  'q7': 'survey.questions.q7.title',
  'q7a': 'survey.questions.q7.breast_fed',
  'q7b': 'survey.questions.q7.formula_fed', 
  'q7c': 'survey.questions.q7.increased_risk',
  'q8': 'survey.questions.q8.title',
  'q8_a1': 'survey.questions.q8.choices.eczema',
  'q8_a2': 'survey.questions.q8.choices.bronchiolitis',
  'q8_a3': 'survey.questions.q8.choices.family_history',
  'q8_aother': 'survey.questions.q8.other',
  'q8_aother_placeh': 'survey.questions.q8.otherPlaceholder',
  'q9a': 'survey.questions.q9a.title',
  'q9b': 'survey.questions.q9b.title',
  'q9_el': 'survey.questions.q9a.elaborate.title',
  'q9_a1': 'survey.questions.q9a.elaborate.choices.soy_formula',
  'q9_a2': 'survey.questions.q9a.elaborate.choices.hydrolysed_formula',
  'q9_a3': 'survey.questions.q9a.elaborate.choices.restrict_allergens',
  'q9_a4': 'survey.questions.q9a.elaborate.choices.emollients',
  'q9_a5': 'survey.questions.q9a.elaborate.choices.prebiotics',
  'q9_a6': 'survey.questions.q9a.elaborate.choices.vitamin_supplements',
  'q9_a7': 'survey.questions.q9a.elaborate.choices.regular_formula',
  'q9_a8': 'survey.questions.q9a.elaborate.choices.exclusive_breastfeeding',
  'q9_a9': 'survey.questions.q9a.elaborate.choices.early_introduction',
  'q9_aother': 'survey.questions.q9a.elaborate.other',
  'q9_aother_placeh': 'survey.questions.q9a.elaborate.otherPlaceholder',
  'q10': 'survey.questions.q10.title',
  'q11': 'survey.questions.q11.title',
  'q12': 'survey.questions.q12.title',
  'q14': 'survey.questions.q14.title',
  'q14_a1': 'survey.questions.q14.choices.iron',
  'q14_a2': 'survey.questions.q14.choices.multivitamin',
  'q14_a3': 'survey.questions.q14.choices.omega3',
  'q14_a4': 'survey.questions.q14.choices.probiotic',
  'q14_a5': 'survey.questions.q14.choices.prebiotic',
  'q14_a6': 'survey.questions.q14.choices.synbiotic',
  'q14_a7': 'survey.questions.q14.choices.vitamin_a',
  'q14_a8': 'survey.questions.q14.choices.vitamin_c',
  'q14_a9': 'survey.questions.q14.choices.vitamin_d',
  'q14_a10': 'survey.questions.q14.choices.no_supplements',
  'q14_aother': 'survey.questions.q14.other',
  'q14_aother_placeh': 'survey.questions.q14.otherPlaceholder',
  'q15': 'survey.questions.q15.title',
  'q16': 'survey.questions.q16.title',
  'q17': 'survey.questions.q17.title',
  'q18': 'survey.questions.q18.title',
  'q15_18_a1': 'survey.questions.q15.choices.1_day',
  'q15_18_a2': 'survey.questions.q15.choices.1_3_days',
  'q15_18_a3': 'survey.questions.q15.choices.more_3_days',
  'yes': 'survey.questions.q5.choices.yes',
  'no': 'survey.questions.q5.choices.no'
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

// First, get the base English structure
const enPath = path.join(__dirname, '..', 'src', 'locales', 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

// Update translations for each language
Object.entries(languageMap).forEach(([csvLang, localeLang]) => {
  const localePath = path.join(__dirname, '..', 'src', 'locales', `${localeLang}.json`);
  
  // Read existing locale file or start with English structure
  let localeData = {};
  if (fs.existsSync(localePath)) {
    localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
  }
  
  // For non-English languages, ensure we have the full structure by copying from English
  if (localeLang !== 'en') {
    // Deep merge to preserve existing translations while ensuring complete structure
    function deepMerge(target, source) {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          deepMerge(target[key], source[key]);
        } else if (!target[key]) {
          target[key] = source[key];
        }
      }
    }
    deepMerge(localeData, enData);
  }
  
  // Update translations from CSV - force update all mapped translations
  records.forEach(record => {
    const code = record['CODE'];
    const translation = record[csvLang];
    
    if (code && translation && questionMapping[code]) {
      // Force update the translation even if it exists
      const keys = questionMapping[code].split('.');
      let current = localeData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Force set the final value
      current[keys[keys.length - 1]] = translation;
    }
  });
  
  // Also update yes/no for other questions that use them
  const yesValue = records.find(r => r.CODE === 'yes')?.[csvLang] || 'Yes';
  const noValue = records.find(r => r.CODE === 'no')?.[csvLang] || 'No';
  
  // Update yes/no for all questions that need them
  setNestedProperty(localeData, 'survey.questions.q5.choices.yes', yesValue);
  setNestedProperty(localeData, 'survey.questions.q5.choices.no', noValue);
  setNestedProperty(localeData, 'survey.questions.q9a.choices.yes', yesValue);
  setNestedProperty(localeData, 'survey.questions.q9a.choices.no', noValue);
  setNestedProperty(localeData, 'survey.questions.q9b.choices.yes', yesValue);
  setNestedProperty(localeData, 'survey.questions.q9b.choices.no', noValue);
  setNestedProperty(localeData, 'survey.questions.q10.choices.yes', yesValue);
  setNestedProperty(localeData, 'survey.questions.q10.choices.no', noValue);
  setNestedProperty(localeData, 'survey.questions.q11.choices.yes', yesValue);
  setNestedProperty(localeData, 'survey.questions.q11.choices.no', noValue);
  
  // Also update the intervals for q16, q17, q18 with the same values as q15
  const day1Value = records.find(r => r.CODE === 'q15_18_a1')?.[csvLang] || '1 day';
  const days13Value = records.find(r => r.CODE === 'q15_18_a2')?.[csvLang] || '1-3 days';
  const days3PlusValue = records.find(r => r.CODE === 'q15_18_a3')?.[csvLang] || '>3 days';
  
  setNestedProperty(localeData, 'survey.questions.q16.choices.1_day', day1Value);
  setNestedProperty(localeData, 'survey.questions.q16.choices.1_3_days', days13Value);
  setNestedProperty(localeData, 'survey.questions.q16.choices.more_3_days', days3PlusValue);
  setNestedProperty(localeData, 'survey.questions.q17.choices.1_day', day1Value);
  setNestedProperty(localeData, 'survey.questions.q17.choices.1_3_days', days13Value);
  setNestedProperty(localeData, 'survey.questions.q17.choices.more_3_days', days3PlusValue);
  setNestedProperty(localeData, 'survey.questions.q18.choices.1_day', day1Value);
  setNestedProperty(localeData, 'survey.questions.q18.choices.1_3_days', days13Value);
  setNestedProperty(localeData, 'survey.questions.q18.choices.more_3_days', days3PlusValue);
  
  // Update q9b elaborate choices with same values as q9a
  records.forEach(record => {
    const code = record['CODE'];
    const translation = record[csvLang];
    
    // Map q9_a* codes to both q9a and q9b elaborate choices
    if (code && translation && code.startsWith('q9_a')) {
      const choiceKey = code.replace('q9_a', '');
      const mappings = {
        '1': 'soy_formula',
        '2': 'hydrolysed_formula', 
        '3': 'restrict_allergens',
        '4': 'emollients',
        '5': 'prebiotics',
        '6': 'vitamin_supplements',
        '7': 'regular_formula',
        '8': 'exclusive_breastfeeding',
        '9': 'early_introduction'
      };
      
      if (mappings[choiceKey]) {
        setNestedProperty(localeData, `survey.questions.q9b.elaborate.choices.${mappings[choiceKey]}`, translation);
      }
    }
  });
  
  // Also copy q9_el to q9b elaborate title
  const q9ElaborateTitle = records.find(r => r.CODE === 'q9_el')?.[csvLang];
  if (q9ElaborateTitle) {
    setNestedProperty(localeData, 'survey.questions.q9b.elaborate.title', q9ElaborateTitle);
  }
  
  // Copy other text for q9b
  const q9OtherText = records.find(r => r.CODE === 'q9_aother')?.[csvLang];
  const q9OtherPlaceholder = records.find(r => r.CODE === 'q9_aother_placeh')?.[csvLang];
  if (q9OtherText) {
    setNestedProperty(localeData, 'survey.questions.q9b.elaborate.other', q9OtherText);
  }
  if (q9OtherPlaceholder) {
    setNestedProperty(localeData, 'survey.questions.q9b.elaborate.otherPlaceholder', q9OtherPlaceholder);
  }
  
  // Write updated locale file
  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + '\n');
  console.log(`Updated ${localeLang}.json with ${Object.keys(localeData.survey?.questions || {}).length} questions`);
});

console.log('Translation update complete!');