import { useState } from 'react';
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
  const { t } = useTranslation();

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
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <Card style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff', flex: 1, textAlign: 'center' }}>
            {t('title')}
          </Title>
          <LanguageDropdown onLanguageChange={onLanguageChange} />
        </div>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', textAlign: 'justify' }}>
          {t('introduction.description')}
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '30px' }}>
          {t('introduction.duration')}
        </Paragraph>
        
        <div style={{ textAlign: 'center' }}>
          <Paragraph style={{ fontSize: '16px', marginBottom: '20px' }}>
            {t('introduction.passwordPrompt')}
          </Paragraph>
          
          <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '400px' }}>
            <Input.Password
              placeholder="Enter password"
              size="large"
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
              />
            )}
            
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              disabled={!password.trim()}
              style={{ width: '200px' }}
            >
              {t('introduction.continue')}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
}