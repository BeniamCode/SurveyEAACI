import React, { useEffect, useState } from "react";
import { Model, settings, FunctionFactory } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { getTranslatedSurveyJson, getTranslatedFoodDatabase } from "../utils/surveyTranslation";
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
  
  // Debug logging for translations
  console.log('Survey - Current language:', i18n.language);
  console.log('Survey - Title translation:', t('title'));
  console.log('Survey - Loading translation:', t('common.loading'));
  const [currentFoodDatabase, setCurrentFoodDatabase] = useState(() => getTranslatedFoodDatabase());
  
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

  // Handle language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // Update food database with new translations
      setCurrentFoodDatabase(getTranslatedFoodDatabase());
      
      // Recreate survey with new translations
      setSurvey(null); // This will trigger a re-render with new translations
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);


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
          console.log("getFoodItems called with params:", params);
          if (!params || !params[0]) {
            console.log("No params provided to getFoodItems");
            return [];
          }
          const category = params[0];
          console.log("Looking for category:", category);
          console.log("Available categories:", currentFoodDatabase.map(cat => cat.name));
          
          const categoryData = currentFoodDatabase.find(cat => cat.name === category);
          console.log("Found category data:", categoryData);
          
          if (categoryData) {
            // Return choices in the format SurveyJS expects
            const choices = categoryData.items.map(item => ({
              value: item.value,
              text: item.label
            }));
            console.log("Returning food choices:", choices);
            return choices;
          } else {
            console.log("No category found for:", category);
            return [];
          }
        }
        FunctionFactory.Instance.register("getFoodItems", getFoodItems);
        console.log("getFoodItems function registered");

        // Create survey model
        {
          // Create survey model with translated content
          const translatedSurveyJson = getTranslatedSurveyJson();
          console.log("Creating survey model with translated JSON:", translatedSurveyJson);
          const surveyModel = new Model(translatedSurveyJson);
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
            
            // Store food selections per panel to maintain state
            const panelFoodSelections = new Map();
            
            // Set up dynamic choice loading for food items
            surveyModel.onDynamicPanelItemValueChanged.add((survey: Model, options: any) => {
              console.log("Dynamic panel item value changed:", options);
              
              if (options.name === "food_category") {
                const panel = options.panel;
                const foodItemsQuestion = panel.getQuestionByName("food_items");
                
                if (foodItemsQuestion && options.value) {
                  console.log(`Updating food items for category: ${options.value}`);
                  
                  // Get food items for the selected category
                  const categoryData = currentFoodDatabase.find(cat => cat.name === options.value);
                  
                  if (categoryData) {
                    const newChoices = categoryData.items.map(item => ({
                      value: item.value,
                      text: item.label
                    }));
                    
                    console.log(`Setting ${newChoices.length} choices:`, newChoices);
                    
                    // Clear value and set new choices
                    foodItemsQuestion.value = [];
                    foodItemsQuestion.choices = newChoices;
                  }
                }
              }
            });

            // Also handle when food_items question is rendered
            surveyModel.onAfterRenderQuestion.add((survey: Model, options: any) => {
              if (options.question.name === "food_items") {
                console.log("food_items question rendered");
                
                const panel = options.question.parent;
                if (panel) {
                  const categoryQuestion = panel.getQuestionByName("food_category");
                  const selectedCategory = categoryQuestion?.value;
                  
                  if (selectedCategory && options.question.choices.length === 0) {
                    console.log(`Setting choices for rendered food_items, category: ${selectedCategory}`);
                    
                    const categoryData = currentFoodDatabase.find(cat => cat.name === selectedCategory);
                    if (categoryData) {
                      const newChoices = categoryData.items.map(item => ({
                        value: item.value,
                        text: item.label
                      }));
                      
                      options.question.choices = newChoices;
                      console.log(`Set ${newChoices.length} choices on render`);
                    }
                  }
                }
              }
            });

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
  }, [currentFoodDatabase]);

  if (!survey) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div key={i18n.language} style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header Section with constrained width */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e8e8e8",
          marginBottom: isMobile ? "10px" : "20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: isMobile ? "15px 10px" : "20px",
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
        </div>
      </div>
      
      {/* Survey Content with constrained width */}
      <div 
        style={{ 
          maxWidth: "900px",
          margin: "0 auto",
          padding: isMobile ? "0 10px" : "0 20px",
        }}
      >
        <Survey model={survey} />
      </div>
    </div>
  );
}
