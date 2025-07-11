import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const languages = ['en', 'el', 'pl', 'it', 'es', 'de', 'pt', 'nl', 'fr', 'ro', 'zh-tw'];

// Read CSV to get interface string translations
const csvContent = fs.readFileSync('feeding-interface.csv', 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());
const header = lines[0].split(',');

const languageColumns = {
  en: header.indexOf('EN'),
  el: header.indexOf('EL'),
  pl: header.indexOf('PL'),
  it: header.indexOf('IT'),
  es: header.indexOf('ES'),
  de: header.indexOf('DE'),
  pt: header.indexOf('PT'),
  nl: header.indexOf('NL'),
  fr: header.indexOf('FR'),
  ro: header.indexOf('RO'),
  'zh-tw': header.indexOf('TC')
};

// Extract specific interface strings we need
const interfaceStrings = {};

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  const columns = line.split(',');
  const code = columns[1]?.trim();
  
  if (code === 'str19') { // "Advice" -> "Food Categories"
    languages.forEach(lang => {
      const colIndex = languageColumns[lang];
      if (colIndex >= 0 && columns[colIndex]) {
        const translation = columns[colIndex].replace(/"/g, '').trim();
        if (!interfaceStrings[lang]) interfaceStrings[lang] = {};
        interfaceStrings[lang].foodCategories = translation === 'Advice' ? 'Food Categories' : translation;
      }
    });
  }
  
  if (code === 'str11') { // "Low-risk"
    languages.forEach(lang => {
      const colIndex = languageColumns[lang];
      if (colIndex >= 0 && columns[colIndex]) {
        const translation = columns[colIndex].replace(/"/g, '').trim();
        if (!interfaceStrings[lang]) interfaceStrings[lang] = {};
        interfaceStrings[lang].lowRiskTimeline = translation + ' Timeline';
      }
    });
  }
  
  if (code === 'str12') { // "High-risk"
    languages.forEach(lang => {
      const colIndex = languageColumns[lang];
      if (colIndex >= 0 && columns[colIndex]) {
        const translation = columns[colIndex].replace(/"/g, '').trim();
        if (!interfaceStrings[lang]) interfaceStrings[lang] = {};
        interfaceStrings[lang].highRiskTimeline = translation + ' Timeline';
      }
    });
  }
}

// Manual translations for "drag here" and "summary" messages
const manualTranslations = {
  en: {
    dragHere: "Drag foods here for {{month}}",
    summary: "Summary: {{count}} foods planned",
    foodCategories: "Food Categories"
  },
  el: {
    dragHere: "Σύρετε τρόφιμα εδώ για {{month}}",
    summary: "Περίληψη: {{count}} τρόφιμα προγραμματισμένα",
    foodCategories: "Κατηγορίες Τροφίμων"
  },
  pl: {
    dragHere: "Przeciągnij żywność tutaj dla {{month}}",
    summary: "Podsumowanie: {{count}} zaplanowanych pokarmów",
    foodCategories: "Kategorie Żywności"
  },
  it: {
    dragHere: "Trascina gli alimenti qui per {{month}}",
    summary: "Riepilogo: {{count}} alimenti pianificati",
    foodCategories: "Categorie Alimentari"
  },
  es: {
    dragHere: "Arrastra alimentos aquí para {{month}}",
    summary: "Resumen: {{count}} alimentos planificados",
    foodCategories: "Categorías de Alimentos"
  },
  de: {
    dragHere: "Lebensmittel hier hinziehen für {{month}}",
    summary: "Zusammenfassung: {{count}} Lebensmittel geplant",
    foodCategories: "Lebensmittelkategorien"
  },
  pt: {
    dragHere: "Arraste alimentos aqui para {{month}}",
    summary: "Resumo: {{count}} alimentos planejados",
    foodCategories: "Categorias de Alimentos"
  },
  nl: {
    dragHere: "Sleep voedingsmiddelen hier voor {{month}}",
    summary: "Samenvatting: {{count}} voedingsmiddelen gepland",
    foodCategories: "Voedselcategorieën"
  },
  fr: {
    dragHere: "Faites glisser les aliments ici pour {{month}}",
    summary: "Résumé: {{count}} aliments planifiés",
    foodCategories: "Catégories d'Aliments"
  },
  ro: {
    dragHere: "Trageți alimentele aici pentru {{month}}",
    summary: "Rezumat: {{count}} alimente planificate",
    foodCategories: "Categorii de Alimente"
  },
  'zh-tw': {
    dragHere: "將食物拖拽到此處用於{{month}}",
    summary: "摘要：已計劃{{count}}種食物",
    foodCategories: "食物類別"
  }
};

// Update each language file
languages.forEach(lang => {
  const filename = `${lang}.json`;
  const filepath = path.join(localesDir, filename);
  
  if (fs.existsSync(filepath)) {
    try {
      const translations = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      
      // Update food planning translations
      if (!translations.survey) translations.survey = {};
      if (!translations.survey.foodPlanning) translations.survey.foodPlanning = {};
      
      const foodPlanning = translations.survey.foodPlanning;
      const manual = manualTranslations[lang];
      const interfaceStr = interfaceStrings[lang] || {};
      
      // Use manual translations first, then interface strings, then fallback
      foodPlanning.foodCategories = manual?.foodCategories || interfaceStr.foodCategories || foodPlanning.foodCategories || "Food Categories";
      foodPlanning.lowRiskTimeline = interfaceStr.lowRiskTimeline || manual?.lowRiskTimeline || foodPlanning.lowRiskTimeline || "Low-Risk Timeline";
      foodPlanning.highRiskTimeline = interfaceStr.highRiskTimeline || manual?.highRiskTimeline || foodPlanning.highRiskTimeline || "High-Risk Timeline";
      foodPlanning.dragHere = manual?.dragHere || foodPlanning.dragHere || "Drag foods here for {{month}}";
      foodPlanning.summary = manual?.summary || foodPlanning.summary || "Summary: {{count}} foods planned";
      
      // Write back to file
      fs.writeFileSync(filepath, JSON.stringify(translations, null, 2), 'utf-8');
      console.log(`Updated ${filename} food planning translations`);
      
    } catch (e) {
      console.error(`Error updating ${filename}:`, e.message);
    }
  }
});

console.log('Food planning translation update complete!');