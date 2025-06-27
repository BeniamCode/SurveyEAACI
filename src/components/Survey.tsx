import React, { useEffect, useState } from "react";
import { Model, settings } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import surveyJson from "../survey-questions.json";
import LanguageDropdown from "./LanguageDropdown";
import { registerDragDropTimelineWidget } from "./DragDropTimelineWidget";

const { Title, Text } = Typography;

interface SurveyComponentProps {
  onLanguageChange: (language: string) => void;
}

export default function SurveyComponent({
  onLanguageChange,
}: SurveyComponentProps) {
  const [survey, setSurvey] = useState<Model | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


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

        // Manual injection after q11 as backup
        const injectTimeline = () => {
          console.log("Attempting manual timeline injection");
          const q11Element = document.querySelector('[data-name="q11"]');
          if (q11Element && surveyModel.data.q11 === "yes") {
            console.log("q11 found and answered yes, injecting timeline");
            
            let timelineContainer = document.getElementById("manual-timeline-high-risk");
            if (!timelineContainer) {
              timelineContainer = document.createElement("div");
              timelineContainer.id = "manual-timeline-high-risk";
              timelineContainer.innerHTML = `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0;">
                  <div id="timeline-high-risk-root"></div>
                </div>
              `;
              q11Element.parentNode?.insertBefore(timelineContainer, q11Element.nextSibling);
              
              // Import and render React component
              const rootElement = document.getElementById("timeline-high-risk-root");
              if (rootElement) {
                import("react").then((React) => {
                  import("react-dom/client").then((ReactDOM) => {
                    import("./DragDropTimeline").then((module) => {
                      const DragDropTimeline = module.default;
                      
                      const root = ReactDOM.createRoot(rootElement);
                      const foodGroups = [
                        {
                          "name": "VEGETABLES",
                          "items": [
                            {"label": "Carrot", "value": "carrot"},
                            {"label": "Pepper", "value": "pepper"},
                            {"label": "Tomato", "value": "tomato"}
                          ]
                        },
                        {
                          "name": "FRUIT", 
                          "items": [
                            {"label": "Apple", "value": "apple"},
                            {"label": "Banana", "value": "banana"},
                            {"label": "Orange", "value": "orange"}
                          ]
                        }
                      ];
                      
                      console.log("Rendering DragDropTimeline with foodGroups:", foodGroups);
                      
                      root.render(React.createElement(DragDropTimeline, {
                        foodGroups: foodGroups,
                        targetLists: [],
                        sourceListTitle: "Advice",
                        onChange: (result: any) => {
                          console.log("Timeline result:", result);
                          surveyModel.setValue("food-timeline-high-risk", result);
                        },
                        value: surveyModel.getValue("food-timeline-high-risk") || {},
                        surveyData: surveyModel.data,
                      }));
                    }).catch(err => console.error("Error importing DragDropTimeline:", err));
                  }).catch(err => console.error("Error importing ReactDOM:", err));
                }).catch(err => console.error("Error importing React:", err));
              }
            }
          }
          
          // Same for q10
          const q10Element = document.querySelector('[data-name="q10"]');
          if (q10Element && surveyModel.data.q10 === "yes") {
            console.log("q10 found and answered yes, injecting timeline");
            
            let timelineContainer = document.getElementById("manual-timeline-low-risk");
            if (!timelineContainer) {
              timelineContainer = document.createElement("div");
              timelineContainer.id = "manual-timeline-low-risk";
              timelineContainer.innerHTML = `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0;">
                  <div id="timeline-low-risk-root"></div>
                </div>
              `;
              q10Element.parentNode?.insertBefore(timelineContainer, q10Element.nextSibling);
              
              // Import and render React component
              const rootElement = document.getElementById("timeline-low-risk-root");
              if (rootElement) {
                import("react").then((React) => {
                  import("react-dom/client").then((ReactDOM) => {
                    import("./DragDropTimeline").then((module) => {
                      const DragDropTimeline = module.default;
                      
                      const root = ReactDOM.createRoot(rootElement);
                      const foodGroups = [
                        {
                          "name": "VEGETABLES",
                          "items": [
                            {"label": "Carrot", "value": "carrot"},
                            {"label": "Pepper", "value": "pepper"},
                            {"label": "Tomato", "value": "tomato"}
                          ]
                        },
                        {
                          "name": "FRUIT", 
                          "items": [
                            {"label": "Apple", "value": "apple"},
                            {"label": "Banana", "value": "banana"},
                            {"label": "Orange", "value": "orange"}
                          ]
                        }
                      ];
                      
                      console.log("Rendering DragDropTimeline with foodGroups:", foodGroups);
                      
                      root.render(React.createElement(DragDropTimeline, {
                        foodGroups: foodGroups,
                        targetLists: [],
                        sourceListTitle: "Advice",
                        onChange: (result: any) => {
                          console.log("Timeline result:", result);
                          surveyModel.setValue("food-timeline-low-risk", result);
                        },
                        value: surveyModel.getValue("food-timeline-low-risk") || {},
                        surveyData: surveyModel.data,
                      }));
                    }).catch(err => console.error("Error importing DragDropTimeline:", err));
                  }).catch(err => console.error("Error importing ReactDOM:", err));
                }).catch(err => console.error("Error importing React:", err));
              }
            }
          }
        };

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

        // Add value change listener to debug conditional logic
        surveyModel.onValueChanged.add((survey: Model, options: any) => {
          console.log(
            "Survey value changed:",
            options.name,
            "=",
            options.value
          );
          console.log("Current survey data:", survey.data);
          
          // Debug panel visibility
          if (options.name === "q10" || options.name === "q11") {
            const panel10 = survey.getPanelByName("food-timeline-low-risk-panel");
            const panel11 = survey.getPanelByName("food-timeline-high-risk-panel");
            console.log("Panel 10 visibility:", panel10?.isVisible);
            console.log("Panel 11 visibility:", panel11?.isVisible);
            
            // Try manual injection
            setTimeout(() => injectTimeline(), 100);
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
