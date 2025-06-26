import React, { useState } from 'react';
import { ConfigProvider, Switch, Space, Typography } from 'antd';
import AppLayout from './AppLayout';
import SurveyComponent from './Survey';
import AntdSurveyComponent from './AntdSurvey';

const { Text } = Typography;

export default function SurveyPage() {
  const [useAntdTheme, setUseAntdTheme] = useState(true);
  
  return (
    <ConfigProvider>
      <AppLayout>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space align="center">
            <Text>Use Ant Design Components:</Text>
            <Switch 
              checked={useAntdTheme} 
              onChange={setUseAntdTheme}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
            <Text type="secondary">
              {useAntdTheme ? 'Using Ant Design UI components' : 'Using default SurveyJS components'}
            </Text>
          </Space>
          {useAntdTheme ? <AntdSurveyComponent /> : <SurveyComponent />}
        </Space>
      </AppLayout>
    </ConfigProvider>
  );
}