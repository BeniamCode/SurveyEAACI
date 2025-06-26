import React from 'react';
import { ConfigProvider } from 'antd';
import AppLayout from './AppLayout';
import SurveyComponent from './Survey';

export default function SurveyPage() {
  return (
    <ConfigProvider>
      <AppLayout>
        <SurveyComponent />
      </AppLayout>
    </ConfigProvider>
  );
}