import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IntroductionScreen from './IntroductionScreen';
import SurveyComponent from './Survey';
import '../i18n';

type FlowStep = 'introduction' | 'survey';

export default function SurveyFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('introduction');
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize with browser language or fallback to English
    const browserLang = navigator.language.toLowerCase();
    const supportedLangs = ['en', 'el', 'pl', 'zh-tw'];
    
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
        <SurveyComponent
          onLanguageChange={handleLanguageChange}
        />
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