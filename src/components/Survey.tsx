import React, { useEffect, useState } from "react";
import { Model, settings } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import surveyJson from "../survey-questions.json";
import { registerDragDropTimelineWidget } from "./DragDropTimelineWidget";
import LanguageDropdown from "./LanguageDropdown";
import DragDropTimeline from "./DragDropTimeline";
import ReactDOM from "react-dom/client";

const { Title, Text } = Typography;

interface SurveyComponentProps {
  onLanguageChange: (language: string) => void;
}

export default function SurveyComponent({
  onLanguageChange,
}: SurveyComponentProps) {
  const [survey, setSurvey] = useState<Model | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [timelineRoot, setTimelineRoot] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const injectTimeline = (survey: Model) => {
    const shouldShow = survey.getValue("q10") === "yes" || survey.getValue("q11") === "yes";
    
    if (shouldShow && !timelineRoot) {
      // Find q11 element to inject after it
      const q11Element = document.querySelector('[data-name="q11"]');
      if (q11Element) {
        // Create container div
        const container = document.createElement('div');
        container.id = 'timeline-container';
        container.style.marginTop = '20px';
        container.style.padding = '20px';
        container.style.backgroundColor = '#f8f9fa';
        container.style.borderRadius = '8px';
        container.style.border = '1px solid #e0e0e0';
        
        // Insert after q11's parent row
        const q11Row = q11Element.closest('.sd-page__row');
        if (q11Row && q11Row.parentNode) {
          q11Row.parentNode.insertBefore(container, q11Row.nextSibling);
          
          // Create React root and render
          const root = ReactDOM.createRoot(container);
          setTimelineRoot(root);
          
          // Get food groups and target lists from survey JSON
          const panelData = surveyJson.pages
            .find((page) => page.name === "complementary_feeding_page")
            ?.elements?.find(
              (element) => element.name === "food-picker-panel"
            ) as any;
          
          const foodGroups = panelData?.customData?.food_groups || [];
          const allLists = panelData?.customData?.target_lists || [];
          
          const filteredLists = allLists.filter((list: any) => {
            if (!list.conditional_logic) return true;
            const dependsOnValue = survey.getValue(list.conditional_logic.depends_on);
            return dependsOnValue === list.conditional_logic.value;
          });
          
          root.render(
            React.createElement(DragDropTimeline, {
              foodGroups: foodGroups,
              targetLists: filteredLists,
              sourceListTitle: "Advice",
              onChange: (result: any) => {
                console.log("Timeline result:", result);
                // Save to survey if needed
              },
              value: {},
              surveyData: survey.data,
            })
          );
        }
      }
    } else if (!shouldShow && timelineRoot) {
      // Remove timeline
      timelineRoot.unmount();
      setTimelineRoot(null);
      const container = document.getElementById('timeline-container');
      if (container) {
        container.remove();
      }
    }
  };

  useEffect(() => {
    console.log("SurveyComponent mounted");

    try {
      // Initialize SurveyJS environment settings on client side only
      if (typeof window !== "undefined") {
        if (!settings.environment) {
          settings.environment = {
            root: document,
            rootElement: document.body,
            popupMountContainer: document.body,
            svgMountContainer: document.body,
            stylesSheetsMountContainer: document.head,
          };
        }

        console.log("Environment settings initialized:", settings.environment);

        // Register the custom widget
        registerDragDropTimelineWidget();
        console.log("Custom widget registered");

        // Create survey model
        console.log("Creating survey model with JSON:", surveyJson);
        const surveyModel = new Model(surveyJson);
        console.log("Survey model created:", surveyModel);

        const saveSurveyResults = (survey: Model) => {
          const results = survey.data;
          console.log("Survey results:", results);

          // Display results in a simple alert for this healthcare survey
          alert("Survey completed! Check the console for detailed results.");
        };

        surveyModel.onComplete.add(saveSurveyResults);
        
        // Add panel visibility change listener
        surveyModel.onPanelVisibleChanged.add((_survey: Model, options: any) => {
          console.log("Panel visibility changed:", options.panel.name, "visible:", options.panel.isVisible);
          if (options.panel.name === "food-picker-panel" && options.panel.isVisible) {
            console.log("Food picker panel is now visible!");
            // Force re-render of questions in the panel
            const questions = options.panel.questions;
            questions.forEach((q: any) => {
              console.log("Question in panel:", q.name, "type:", q.getType());
            });
          }
        });

        // Add value change listener to debug conditional logic
        surveyModel.onValueChanged.add((survey: Model, options: any) => {
          console.log(
            "Survey value changed:",
            options.name,
            "=",
            options.value
          );
          console.log("Current survey data:", survey.data);
          
          // Inject timeline when q10 or q11 changes
          if (options.name === "q10" || options.name === "q11") {
            // Use timeout to ensure DOM is updated
            setTimeout(() => {
              injectTimeline(survey);
            }, 100);
          }
        });

        setSurvey(surveyModel);
        console.log("Survey component initialization complete");
      }
    } catch (err) {
      console.error("Error initializing survey:", err);
    }
  }, []);

  if (!survey) {
    return <div>Loading survey...</div>;
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: isMobile ? "15px 10px" : "20px",
          borderBottom: "1px solid #e8e8e8",
          marginBottom: isMobile ? "10px" : "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "stretch" : "center",
            marginBottom: isMobile ? "10px" : "15px",
            gap: "10px",
          }}
        >
          <Title
            level={isMobile ? 4 : 2}
            style={{
              margin: 0,
              color: "#1890ff",
              flex: 1,
              fontSize: isMobile ? "16px" : undefined,
              lineHeight: isMobile ? "1.3" : undefined,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {t("title")}
          </Title>
          <div style={{ alignSelf: isMobile ? "center" : "flex-start" }}>
            <LanguageDropdown onLanguageChange={onLanguageChange} />
          </div>
        </div>

        <div style={{ marginBottom: isMobile ? "8px" : "10px" }}>
          <Text style={{ fontSize: isMobile ? "13px" : "14px" }}>
            {t("survey.thanks")}
          </Text>
        </div>

        <Text
          style={{
            fontStyle: "italic",
            fontSize: isMobile ? "12px" : "14px",
            display: "block",
            lineHeight: "1.4",
          }}
        >
          {t("survey.guidance")}
        </Text>

        <div
          style={{
            marginTop: isMobile ? "15px" : "20px",
            paddingTop: isMobile ? "10px" : "15px",
            borderTop: "1px solid #e8e8e8",
          }}
        >
          <Title
            level={isMobile ? 5 : 3}
            style={{
              margin: 0,
              color: "#333",
              fontSize: isMobile ? "14px" : undefined,
            }}
          >
            {t("survey.basicInfo")}
          </Title>
        </div>
      </div>{" "}
      <div style={{ padding: isMobile ? "0 10px" : "0 20px" }}>
        <Survey model={survey} />
      </div>
    </div>
  );
}
