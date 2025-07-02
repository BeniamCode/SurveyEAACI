import React, { useEffect, useState } from "react";
import { Model, settings, FunctionFactory } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import surveyJson from "../survey-questions.json";
import LanguageDropdown from "./LanguageDropdown";
import { foodDatabase } from "../data/foodDatabase";
import { convex, generateParticipantId, getSessionMetadata } from "../lib/convex";
import { useMutation } from "convex/react";

const { Title, Text } = Typography;

interface SurveyComponentProps {
  onLanguageChange: (language: string) => void;
}

export default function SurveyComponent({
  onLanguageChange,
}: SurveyComponentProps) {
  const [survey, setSurvey] = useState<Model | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [participantId] = useState(() => generateParticipantId());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Convex mutation for submitting survey responses
  const submitSurveyResponse = useMutation("surveyResponses:submitSurveyResponse");

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

        // Register the getFoodItems custom function
        function getFoodItems(params: any[]): any {
          if (!params || !params[0]) return [];
          const category = params[0];
          const categoryData = foodDatabase.find(cat => cat.name === category);
          return categoryData ? categoryData.items.map(item => item.label) : [];
        }
        FunctionFactory.Instance.register("getFoodItems", getFoodItems);
        console.log("getFoodItems function registered");

        // Create survey model
        {
          // Create survey model
          console.log("Creating survey model with JSON:", surveyJson);
          const surveyModel = new Model(surveyJson);
          console.log("Survey model created:", surveyModel);
        
          // Debug panels right after creation
          console.log("Panels after creation:", surveyModel.getAllPanels().map(p => ({
            name: p.name, 
            visible: p.isVisible,
            visibleIf: p.visibleIf,
            elements: p.elements?.map(e => ({type: e.getType(), name: e.name}))
          })));

          const saveSurveyResults = async (survey: Model) => {
              const results = survey.data;
              console.log("Survey results:", results);

              setIsSubmitting(true);
              
              try {
                // Submit to Convex
                const responseId = await submitSurveyResponse({
                  participantId: participantId,
                  surveyData: results,
                  isComplete: true,
                  metadata: {
                    ...getSessionMetadata(),
                    language: i18n.language,
                  }
                });
                
                console.log("Survey submitted to Convex with ID:", responseId);
                
                // Display success message
                alert(`Survey completed successfully! Your response has been recorded.\n\nParticipant ID: ${participantId}\nSubmission ID: ${responseId}`);
                
              } catch (error) {
                console.error("Error submitting survey to Convex:", error);
                
                // Fallback: show results in alert
                alert("Survey completed! There was an issue saving to the database, but your responses have been logged locally. Please contact support if needed.");
              } finally {
                setIsSubmitting(false);
              }
            };

            surveyModel.onComplete.add(saveSurveyResults);

            // Add value change listener for auto-save and debugging
            let autoSaveTimeout: NodeJS.Timeout;
            
            surveyModel.onValueChanged.add((survey: Model, options: any) => {
              console.log(
                "Survey value changed:",
                options.name,
                "=",
                options.value
              );
              console.log("Current survey data:", survey.data);
              
              // Auto-save after 2 seconds of inactivity
              clearTimeout(autoSaveTimeout);
              autoSaveTimeout = setTimeout(async () => {
                try {
                  await submitSurveyResponse({
                    participantId: participantId,
                    surveyData: survey.data,
                    isComplete: false,
                    metadata: {
                      ...getSessionMetadata(),
                      language: i18n.language,
                    }
                  });
                  console.log("Auto-saved survey progress");
                } catch (error) {
                  console.log("Auto-save failed (this is normal):", error);
                }
              }, 2000);
              
              // Debug panel visibility
              if (options.name === "q10_advise_order_low_risk" || options.name === "q11_advise_order_high_risk") {
                console.log(`=== ${options.name} changed to: ${options.value} ===`);
                
                // Check panel visibility after a short delay
                setTimeout(() => {
                  const panel10 = survey.getQuestionByName("food_plan_low_risk");
                  const panel11 = survey.getQuestionByName("food_plan_high_risk");
                  console.log("Panel food_plan_low_risk visibility:", panel10?.isVisible);
                  console.log("Panel food_plan_high_risk visibility:", panel11?.isVisible);
                  
                  // Check all questions
                  console.log("All dynamic panels:", [panel10, panel11].map(p => ({name: p?.name, visible: p?.isVisible})));
                }, 50);
              }
            });

          setSurvey(surveyModel);
          console.log("Survey component initialization complete");
        }
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
