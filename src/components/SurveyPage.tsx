import { ConfigProvider } from "antd";
import SurveyFlow from "./SurveyFlow";
import "../i18n"; // Initialize i18n

export default function SurveyPage() {
  return (
    <ConfigProvider>
      <SurveyFlow />
    </ConfigProvider>
  );
}
