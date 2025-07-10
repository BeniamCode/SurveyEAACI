import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import LanguageDropdown from './LanguageDropdown';

interface IntroductionScreenProps {
  onPasswordSubmit: (password: string) => void;
  onLanguageChange: (language: string) => void;
}

export default function IntroductionScreen({ onPasswordSubmit, onLanguageChange }: IntroductionScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Debug logging for translations
  console.log('IntroductionScreen - Current language:', i18n.language);
  console.log('IntroductionScreen - Title translation:', t('title'));
  console.log('IntroductionScreen - Continue translation:', t('introduction.continue'));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = () => {
    if (password === '111111') {
      onPasswordSubmit(password);
    } else {
      setError('Invalid password. Please enter the correct password.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card 
        key={i18n.language}
        className="max-w-4xl w-full mx-auto">
        <CardContent className="p-8">
          {/* Organization Logos */}
          <div className={`flex justify-center items-center ${isMobile ? 'gap-4 mb-5' : 'gap-8 mb-8'} flex-wrap`}>
            <img 
              src="/eaaci.jpg" 
              alt="EAACI Logo" 
              className={`${isMobile ? 'h-20' : 'h-30'} w-auto object-contain`}
            />
            <img 
              src="/IHU.jpg" 
              alt="IHU Logo" 
              className={`${isMobile ? 'h-20' : 'h-30'} w-auto object-contain`}
            />
            <img 
              src="/Apaaci.png" 
              alt="APAACI Logo" 
              className={`${isMobile ? 'h-20' : 'h-30'} w-auto object-contain`}
            />
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between ${isMobile ? 'items-stretch' : 'items-center'} ${isMobile ? 'mb-4' : 'mb-5'} gap-3`}>
            <h1 className={`${isMobile ? 'text-lg' : 'text-3xl'} font-bold text-blue-600 flex-1 text-center m-0 ${isMobile ? 'leading-tight' : ''}`}>
              {t('title')}
            </h1>
            <div className={isMobile ? 'self-center' : 'self-start'}>
              <LanguageDropdown onLanguageChange={onLanguageChange} />
            </div>
          </div>
          
          <p className={`${isMobile ? 'text-sm' : 'text-base'} leading-relaxed text-justify ${isMobile ? 'mb-4' : 'mb-5'}`}>
            {t('introduction.description')}
          </p>
          
          <p className={`${isMobile ? 'text-sm' : 'text-base'} font-bold ${isMobile ? 'mb-5' : 'mb-8'}`}>
            {t('introduction.duration')}
          </p>
          
          <div className="text-center">
            <p className={`${isMobile ? 'text-sm' : 'text-base'} mb-5`}>
              {t('introduction.passwordPrompt')}
            </p>
            
            <div className={`flex flex-col items-center gap-6 w-full ${isMobile ? 'max-w-xs' : 'max-w-sm'} mx-auto`}>
              <Input
                type="password"
                placeholder="Enter password"
                className={`${isMobile ? 'h-10' : 'h-12'} text-center`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
              />
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md w-full">
                  <div className="flex items-center">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{error}</span>
                  </div>
                </div>
              )}
              
              <Button
                onClick={handleSubmit}
                disabled={!password.trim()}
                className={`${isMobile ? 'w-36 text-sm' : 'w-48 text-base'} ${isMobile ? 'h-10' : 'h-12'}`}
              >
                {t('introduction.continue')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}