import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: 'Complementary feeding: a survey on the Healthcare Professional practices',
      languageSelect: 'Please select your language to proceed:',
      introduction: {
        description: 'The introduction of solid foods and drinks other than milk (complementary feeding) is a key developmental milestone that exerts powerful changes in terms of functional changes to the gastrointestinal tract, the immune system and metabolic processes. Moreover, the timing of food introduction appears crucial for the prevention of food allergy. The aim of the current survey is to collect information on the usual practices of healthcare professionals from different countries about the order of solid foods\' introduction into the infants diet and the how this differs for infants at low or high risk for development of food allergy.',
        duration: 'Completion of the questionnaire will take approximately 10 minutes.',
        passwordPrompt: 'If you agree to participate in this research, please type the password that was provided to you:',
        continue: 'Continue'
      },
      survey: {
        thanks: 'Thank you for agreeing to participate. Please answer all the questions below and then click on the \'Submit Form\' button.',
        guidance: 'While we acknowledge that individualized guidance is essential, please provide a general indication of when it is typically appropriate to consider introducing complementary foods to these infants.',
        basicInfo: 'Basic Information',
        switchLanguage: 'switch language'
      }
    }
  },
  de: {
    translation: {
      title: 'Ergänzungsnahrung: eine Umfrage zu den Praktiken von Gesundheitsfachkräften',
      languageSelect: 'Bitte wählen Sie Ihre Sprache aus, um fortzufahren:',
      // Add German translations here
    }
  },
  // Add other languages as needed
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;