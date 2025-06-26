import { ConfigProvider } from 'antd';
import SurveyFlow from './SurveyFlow';

export default function SurveyPage() {
  return (
    <ConfigProvider>
      <SurveyFlow />
    </ConfigProvider>
  );
}