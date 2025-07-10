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
import { useFoodReservationStore } from "../stores/foodReservationStore";

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
  const submitSurveyResponse = useMutation("surveyResponses:submitSurveyResponse" as any);
  
  // Get food reservation store methods
  const { getReservedFoods, updateReservations, clearAllReservations } = useFoodReservationStore();

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
          // Clear any existing reservations when creating new survey
          clearAllReservations();
          
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
                
                // Clear all food reservations after successful submission
                clearAllReservations();
                
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
            let autoSaveTimeout: any;
            
            // Store food selections per panel to maintain state
            const panelFoodSelections = new Map();
            
            // Set up dynamic choice loading for food items
            surveyModel.onDynamicPanelItemValueChanged.add((survey: Model, options: any) => {
              console.log("Dynamic panel item value changed:", options);
              
              if (options.name === "food_category") {
                const panel = options.panel;
                const panelId = panel.id;
                const foodItemsQuestion = panel.getQuestionByName("food_items");
                
                if (foodItemsQuestion && options.value) {
                  console.log(`Updating food items for category: ${options.value}`);
                  
                  // Store current selection before changing category
                  const previousCategory = options.oldValue || categoryQuestion.oldValue;
                  const currentSelections = foodItemsQuestion.value || [];
                  if (currentSelections.length > 0 && previousCategory) {
                    console.log(`Storing selections for ${previousCategory}:`, currentSelections);
                    panelFoodSelections.set(`${panelId}_${previousCategory}`, currentSelections);
                  }
                  
                  // Get food items for the selected category
                  const categoryData = currentFoodDatabase.find(cat => cat.name === options.value);
                  
                  if (categoryData) {
                    // Get parent question name for reservation tracking
                    const parentQuestion = panel.parent;
                    const questionName = parentQuestion?.name || '';
                    
                    // Get reserved foods for this question type
                    const reservedFoods = getReservedFoods(questionName, panelId);
                    console.log(`Reserved foods for ${questionName} (excluding panel ${panelId}):`, Array.from(reservedFoods.entries()));
                    
                    const newChoices = categoryData.items.map(item => {
                      const reservedMonth = reservedFoods.get(item.value);
                      return {
                        value: item.value,
                        text: reservedMonth ? `${item.label} (Reserved for ${reservedMonth})` : item.label
                      };
                    });
                    
                    // Set choices
                    foodItemsQuestion.choices = newChoices;
                    
                    // Create a list of reserved items
                    const reservedItems = Array.from(reservedFoods.keys());
                    
                    // Use choicesEnableIf to disable reserved items
                    foodItemsQuestion.choicesEnableIf = `{item} notin [${reservedItems.map(item => `'${item}'`).join(', ')}]`;
                    
                    console.log(`Setting ${newChoices.length} choices:`, newChoices);
                    
                    // Restore previous selections for this category if they exist
                    const previousSelections = panelFoodSelections.get(`${panelId}_${options.value}`) || [];
                    console.log(`Restoring previous selections for ${options.value}:`, previousSelections);
                    
                    // Filter out any items that are now reserved by other panels
                    const validSelections = previousSelections.filter((val: string) => 
                      !reservedFoods.has(val)
                    );
                    
                    if (validSelections.length > 0) {
                      foodItemsQuestion.value = validSelections;
                    } else {
                      foodItemsQuestion.value = [];
                    }
                    
                    // Store the old value for next time
                    categoryQuestion.oldValue = options.value;
                  }
                }
              } else if (options.name === "month" || options.name === "food_items") {
                // Update reservations when month or food items change
                const panel = options.panel;
                const panelId = panel.id;
                const parentQuestion = panel.parent;
                const questionName = parentQuestion?.name || '';
                const monthValue = panel.getQuestionByName('month')?.value || '';
                const foodItems = panel.getQuestionByName('food_items')?.value || [];
                
                console.log(`Updating reservations - Panel: ${panelId}, Question: ${questionName}, Month: ${monthValue}, Items:`, foodItems);
                
                if (monthValue && Array.isArray(foodItems)) {
                  updateReservations(panelId, questionName, foodItems, monthValue);
                  
                  // Refresh all panels to update reserved items display
                  const allPanels = parentQuestion?.panels || [];
                  allPanels.forEach((p: any) => {
                    if (p.id !== panelId) {
                      const foodItemsQ = p.getQuestionByName('food_items');
                      const categoryQ = p.getQuestionByName('food_category');
                      if (foodItemsQ && categoryQ?.value) {
                        // Trigger a refresh of the choices
                        const event = { name: 'food_category', value: categoryQ.value, panel: p, panelData: p.data, panelIndex: 0, question: categoryQ } as any;
                        surveyModel.onDynamicPanelItemValueChanged.fire(survey, event);
                      }
                    }
                  });
                }
              }
            });

            // Also handle when food_items question is rendered
            // Add handler to store selections before category changes
            surveyModel.onMatrixCellValueChanging.add((survey: Model, options: any) => {
              if (options.columnName === "food_category") {
                const panel = options.row;
                if (panel) {
                  const panelId = panel.id;
                  const foodItemsQuestion = panel.getQuestionByName("food_items");
                  const currentCategory = panel.getQuestionByName("food_category")?.value;
                  const currentSelections = foodItemsQuestion?.value || [];
                  
                  if (currentCategory && currentSelections.length > 0) {
                    console.log(`Storing selections before category change - ${currentCategory}:`, currentSelections);
                    panelFoodSelections.set(`${panelId}_${currentCategory}`, currentSelections);
                  }
                }
              }
            });
            
            surveyModel.onAfterRenderQuestion.add((survey: Model, options: any) => {
              if (options.question.name === "food_items") {
                console.log("food_items question rendered");
                
                const panel = options.question.parent;
                if (panel) {
                  const panelId = panel.id;
                  const categoryQuestion = panel.getQuestionByName("food_category");
                  const selectedCategory = categoryQuestion?.value;
                  
                  if (selectedCategory && options.question.choices.length === 0) {
                    console.log(`Setting choices for rendered food_items, category: ${selectedCategory}`);
                    
                    const categoryData = currentFoodDatabase.find(cat => cat.name === selectedCategory);
                    if (categoryData) {
                      // Get parent question name for reservation tracking
                      const parentQuestion = panel.parent;
                      const questionName = parentQuestion?.name || '';
                      
                      // Get reserved foods for this question type
                      const reservedFoods = getReservedFoods(questionName, panelId);
                      
                      const newChoices = categoryData.items.map(item => {
                        const reservedMonth = reservedFoods.get(item.value);
                        return {
                          value: item.value,
                          text: reservedMonth ? `${item.label} (Reserved for ${reservedMonth})` : item.label
                        };
                      });
                      
                      // Create a list of reserved items
                      const reservedItems = Array.from(reservedFoods.keys());
                      
                      // Use choicesEnableIf to disable reserved items
                      options.question.choicesEnableIf = `{item} notin [${reservedItems.map(item => `'${item}'`).join(', ')}]`;
                      
                      options.question.choices = newChoices;
                      console.log(`Set ${newChoices.length} choices on render`);
                    }
                  }
                }
              }
            });
            
            // Handle panel removal to clear reservations
            surveyModel.onDynamicPanelRemoved.add((survey: Model, options: any) => {
              const panel = options.panel;
              const panelId = panel.id;
              const parentQuestion = options.question;
              const questionName = parentQuestion?.name || '';
              
              // Clear reservations for removed panel
              updateReservations(panelId, questionName, [], '');
              
              // Clear stored selections for this panel
              Array.from(panelFoodSelections.keys())
                .filter(key => key.startsWith(`${panelId}_`))
                .forEach(key => panelFoodSelections.delete(key));
              
              // Refresh remaining panels
              const allPanels = parentQuestion?.panels || [];
              allPanels.forEach((p: any) => {
                const foodItemsQ = p.getQuestionByName('food_items');
                const categoryQ = p.getQuestionByName('food_category');
                if (foodItemsQ && categoryQ?.value) {
                  const event = { name: 'food_category', value: categoryQ.value, panel: p, panelData: p.data, panelIndex: 0, question: categoryQ } as any;
                  surveyModel.onDynamicPanelItemValueChanged.fire(survey, event);
                }
              });
            });

            surveyModel.onValueChanged.add((survey: Model, options: any) => {
              console.log(
                "Survey value changed:",
                options.name,
                "=",
                options.value
              );
              console.log("Current survey data:", survey.data);
              
              // Handle food_items changes directly
              if (options.name === "food_items" && options.question) {
                const panel = options.question.parent;
                if (panel && panel.getType() === "panel") {
                  const panelId = panel.id;
                  const parentQuestion = panel.parent;
                  const questionName = parentQuestion?.name || '';
                  const monthValue = panel.getQuestionByName('month')?.value || '';
                  const foodItems = options.value || [];
                  
                  console.log(`Direct food_items change - Panel: ${panelId}, Question: ${questionName}, Month: ${monthValue}, Items:`, foodItems);
                  
                  if (monthValue && Array.isArray(foodItems) && (questionName === 'food_plan_low_risk' || questionName === 'food_plan_high_risk')) {
                    updateReservations(panelId, questionName, foodItems, monthValue);
                    
                    // Refresh all other panels
                    const allPanels = parentQuestion?.panels || [];
                    allPanels.forEach((p: any) => {
                      if (p.id !== panelId) {
                        const foodItemsQ = p.getQuestionByName('food_items');
                        const categoryQ = p.getQuestionByName('food_category');
                        if (foodItemsQ && categoryQ?.value) {
                          const categoryData = currentFoodDatabase.find(cat => cat.name === categoryQ.value);
                          if (categoryData) {
                            const reservedFoods = getReservedFoods(questionName, p.id);
                            const newChoices = categoryData.items.map(item => {
                              const reservedMonth = reservedFoods.get(item.value);
                              return {
                                value: item.value,
                                text: reservedMonth ? `${item.label} (Reserved for ${reservedMonth})` : item.label
                              };
                            });
                            
                            // Create a list of reserved items
                            const reservedItems = Array.from(reservedFoods.keys());
                            
                            // Use choicesEnableIf to disable reserved items  
                            foodItemsQ.choicesEnableIf = `{item} notin [${reservedItems.map(item => `'${item}'`).join(', ')}]`;
                            foodItemsQ.choices = newChoices;
                          }
                        }
                      }
                    });
                  }
                }
              }
              
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
