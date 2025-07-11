import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IntroductionScreen from './IntroductionScreen';
import SurveyForm from './SurveyForm/SurveyForm';
import LanguageDropdown from './LanguageDropdown';
import '../i18n';

type FlowStep = 'introduction' | 'survey';

export default function SurveyFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('introduction');
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize with browser language or fallback to English
    const browserLang = navigator.language.toLowerCase();
    const supportedLangs = ['en', 'el', 'pl', 'it', 'es', 'de', 'pt', 'nl', 'fr', 'ro', 'zh-tw'];
    
    // Check for exact match first (for zh-tw), then check language part only
    let defaultLang = 'en';
    if (supportedLangs.includes(browserLang)) {
      defaultLang = browserLang;
    } else {
      const langPart = browserLang.split('-')[0];
      if (supportedLangs.includes(langPart)) {
        defaultLang = langPart;
      }
    }
    
    i18n.changeLanguage(defaultLang);
  }, [i18n]);

  const handlePasswordSubmit = (password: string) => {
    if (password === '111111') {
      setCurrentStep('survey');
    }
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  switch (currentStep) {
    case 'introduction':
      return (
        <IntroductionScreen
          onPasswordSubmit={handlePasswordSubmit}
          onLanguageChange={handleLanguageChange}
        />
      );
    
    case 'survey':
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white border-b border-gray-200 mb-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {i18n.t('title')}
                </h1>
                <LanguageDropdown onLanguageChange={handleLanguageChange} />
              </div>
            </div>
          </div>
          <SurveyForm />
        </div>
      );
    
    default:
      return (
        <IntroductionScreen
          onPasswordSubmit={handlePasswordSubmit}
          onLanguageChange={handleLanguageChange}
        />
      );
  }
}