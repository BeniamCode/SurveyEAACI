import { ConfigProvider } from "antd";
import { ConvexProvider } from "convex/react";
import SurveyFlow from "./SurveyFlow";
import { convex } from "../lib/convex";
import "../i18n"; // Initialize i18n

export default function SurveyPage() {
  return (
    <ConvexProvider client={convex}>
      <ConfigProvider>
        <SurveyFlow />
      </ConfigProvider>
    </ConvexProvider>
  );
}
