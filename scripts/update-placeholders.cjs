const fs = require('fs');
const path = require('path');

// Placeholder translations for each language
const placeholderTranslations = {
  en: {
    'survey.questions.q2.placeholder': 'Select your profession',
    'survey.questions.q3.placeholder': 'Enter your age',
    'survey.questions.q4.placeholder': 'Enter years of practice',
    'survey.questions.q6.placeholder': 'Enter your country',
    'survey.questions.q2.other_specify': 'Please specify your profession',
    'survey.questions.q5a.other_specify': 'Please describe your additional education'
  },
  el: {
    'survey.questions.q2.placeholder': 'Επιλέξτε το επάγγελμά σας',
    'survey.questions.q3.placeholder': 'Εισάγετε την ηλικία σας',
    'survey.questions.q4.placeholder': 'Εισάγετε έτη πρακτικής',
    'survey.questions.q6.placeholder': 'Εισάγετε τη χώρα σας',
    'survey.questions.q2.other_specify': 'Παρακαλώ προσδιορίστε το επάγγελμά σας',
    'survey.questions.q5a.other_specify': 'Παρακαλώ περιγράψτε την πρόσθετη εκπαίδευσή σας'
  },
  pl: {
    'survey.questions.q2.placeholder': 'Wybierz swój zawód',
    'survey.questions.q3.placeholder': 'Podaj swój wiek',
    'survey.questions.q4.placeholder': 'Podaj lata praktyki',
    'survey.questions.q6.placeholder': 'Podaj swój kraj',
    'survey.questions.q2.other_specify': 'Proszę określić swój zawód',
    'survey.questions.q5a.other_specify': 'Proszę opisać dodatkowe wykształcenie'
  },
  it: {
    'survey.questions.q2.placeholder': 'Seleziona la tua professione',
    'survey.questions.q3.placeholder': 'Inserisci la tua età',
    'survey.questions.q4.placeholder': 'Inserisci anni di pratica',
    'survey.questions.q6.placeholder': 'Inserisci il tuo paese',
    'survey.questions.q2.other_specify': 'Si prega di specificare la propria professione',
    'survey.questions.q5a.other_specify': 'Si prega di descrivere la formazione aggiuntiva'
  },
  es: {
    'survey.questions.q2.placeholder': 'Selecciona tu profesión',
    'survey.questions.q3.placeholder': 'Ingresa tu edad',
    'survey.questions.q4.placeholder': 'Ingresa años de práctica',
    'survey.questions.q6.placeholder': 'Ingresa tu país',
    'survey.questions.q2.other_specify': 'Por favor especifica tu profesión',
    'survey.questions.q5a.other_specify': 'Por favor describe tu educación adicional'
  },
  de: {
    'survey.questions.q2.placeholder': 'Wählen Sie Ihren Beruf',
    'survey.questions.q3.placeholder': 'Geben Sie Ihr Alter ein',
    'survey.questions.q4.placeholder': 'Geben Sie die Jahre der Praxis ein',
    'survey.questions.q6.placeholder': 'Geben Sie Ihr Land ein',
    'survey.questions.q2.other_specify': 'Bitte geben Sie Ihren Beruf an',
    'survey.questions.q5a.other_specify': 'Bitte beschreiben Sie Ihre zusätzliche Ausbildung'
  },
  pt: {
    'survey.questions.q2.placeholder': 'Selecione sua profissão',
    'survey.questions.q3.placeholder': 'Digite sua idade',
    'survey.questions.q4.placeholder': 'Digite anos de prática',
    'survey.questions.q6.placeholder': 'Digite seu país',
    'survey.questions.q2.other_specify': 'Por favor especifique sua profissão',
    'survey.questions.q5a.other_specify': 'Por favor descreva sua educação adicional'
  },
  nl: {
    'survey.questions.q2.placeholder': 'Selecteer uw beroep',
    'survey.questions.q3.placeholder': 'Voer uw leeftijd in',
    'survey.questions.q4.placeholder': 'Voer jaren ervaring in',
    'survey.questions.q6.placeholder': 'Voer uw land in',
    'survey.questions.q2.other_specify': 'Gelieve uw beroep te specificeren',
    'survey.questions.q5a.other_specify': 'Gelieve uw aanvullende opleiding te beschrijven'
  },
  fr: {
    'survey.questions.q2.placeholder': 'Sélectionnez votre profession',
    'survey.questions.q3.placeholder': 'Entrez votre âge',
    'survey.questions.q4.placeholder': 'Entrez les années de pratique',
    'survey.questions.q6.placeholder': 'Entrez votre pays',
    'survey.questions.q2.other_specify': 'Veuillez spécifier votre profession',
    'survey.questions.q5a.other_specify': 'Veuillez décrire votre formation supplémentaire'
  },
  ro: {
    'survey.questions.q2.placeholder': 'Selectați profesia dvs.',
    'survey.questions.q3.placeholder': 'Introduceți vârsta dvs.',
    'survey.questions.q4.placeholder': 'Introduceți anii de practică',
    'survey.questions.q6.placeholder': 'Introduceți țara dvs.',
    'survey.questions.q2.other_specify': 'Vă rugăm să specificați profesia dvs.',
    'survey.questions.q5a.other_specify': 'Vă rugăm să descrieți educația dvs. suplimentară'
  }
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

// Update all language files
Object.entries(placeholderTranslations).forEach(([lang, translations]) => {
  const filePath = path.join(__dirname, '..', 'src', 'locales', `${lang}.json`);
  
  if (fs.existsSync(filePath)) {
    const localeData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Apply all placeholder translations
    Object.entries(translations).forEach(([key, value]) => {
      setNestedProperty(localeData, key, value);
    });
    
    // Write updated file
    fs.writeFileSync(filePath, JSON.stringify(localeData, null, 2) + '\n');
    console.log(`Updated ${lang}.json with placeholder translations`);
  }
});

console.log('Placeholder translation update complete!');