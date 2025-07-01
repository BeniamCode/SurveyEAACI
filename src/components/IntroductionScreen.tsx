import { useState, useEffect } from 'react';
import { Button, Card, Input, Typography, Alert, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';

const { Title, Paragraph } = Typography;

interface IntroductionScreenProps {
  onPasswordSubmit: (password: string) => void;
  onLanguageChange: (language: string) => void;
}

export default function IntroductionScreen({ onPasswordSubmit, onLanguageChange }: IntroductionScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '10px',
      backgroundColor: '#f5f5f5'
    }}>
      <Card style={{ 
        maxWidth: '900px', 
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Organization Logos */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '15px' : '30px',
          marginBottom: isMobile ? '20px' : '30px',
          flexWrap: 'wrap'
        }}>
          <img 
            src="/eaaci.jpg" 
            alt="EAACI Logo" 
            style={{ 
              height: isMobile ? '40px' : '60px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          <img 
            src="/IHU.jpg" 
            alt="IHU Logo" 
            style={{ 
              height: isMobile ? '40px' : '60px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          <img 
            src="/Apaaci.png" 
            alt="APAACI Logo" 
            style={{ 
              height: isMobile ? '40px' : '60px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'stretch' : 'center',
          marginBottom: isMobile ? '15px' : '20px',
          gap: '10px'
        }}>
          <Title level={isMobile ? 4 : 2} style={{ 
            margin: 0, 
            color: '#1890ff', 
            flex: 1, 
            textAlign: 'center',
            fontSize: isMobile ? '16px' : undefined,
            lineHeight: isMobile ? '1.3' : undefined
          }}>
            {t('title')}
          </Title>
          <div style={{ alignSelf: isMobile ? 'center' : 'flex-start' }}>
            <LanguageDropdown onLanguageChange={onLanguageChange} />
          </div>
        </div>
        
        <Paragraph style={{ 
          fontSize: isMobile ? '14px' : '16px', 
          lineHeight: '1.6', 
          textAlign: 'justify',
          marginBottom: isMobile ? '15px' : '20px'
        }}>
          {t('introduction.description')}
        </Paragraph>
        
        <Paragraph style={{ 
          fontSize: isMobile ? '14px' : '16px', 
          fontWeight: 'bold', 
          marginBottom: isMobile ? '20px' : '30px' 
        }}>
          {t('introduction.duration')}
        </Paragraph>
        
        <div style={{ textAlign: 'center' }}>
          <Paragraph style={{ 
            fontSize: isMobile ? '14px' : '16px', 
            marginBottom: '20px' 
          }}>
            {t('introduction.passwordPrompt')}
          </Paragraph>
          
          <Space direction="vertical" size="large" style={{ 
            width: '100%', 
            maxWidth: isMobile ? '300px' : '400px' 
          }}>
            <Input.Password
              placeholder="Enter password"
              size={isMobile ? 'middle' : 'large'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              style={{ textAlign: 'center' }}
            />
            
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ fontSize: isMobile ? '12px' : '14px' }}
              />
            )}
            
            <Button
              type="primary"
              size={isMobile ? 'middle' : 'large'}
              onClick={handleSubmit}
              disabled={!password.trim()}
              style={{ 
                width: isMobile ? '150px' : '200px',
                fontSize: isMobile ? '14px' : '16px'
              }}
            >
              {t('introduction.continue')}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
}