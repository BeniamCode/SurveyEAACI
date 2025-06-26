import { useEffect, useState } from "react";
import { Model, settings } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.min.css";
import surveyJson from "../survey-questions.json";
import { registerDragDropTimelineWidget } from "./DragDropTimelineWidget";

export default function SurveyComponent() {
  const [survey, setSurvey] = useState<Model | null>(null);

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

        // Add value change listener to force panel visibility when q10/q11 change
        surveyModel.onValueChanged.add((sender, options) => {
          if (options.name === "q10" || options.name === "q11") {
            const panel = sender.getPanelByName("food-picker-panel");
            if (panel) {
              // Force visibility calculation
              const q10IsYes = sender.data.q10 === "yes";
              const q11IsYes = sender.data.q11 === "yes";
              const shouldBeVisible = q10IsYes || q11IsYes;
              
              if (shouldBeVisible) {
                // Override the visibility logic
                panel.visible = true;
                
                // Also make sure the child elements are visible
                panel.elements.forEach(element => {
                  element.visible = true;
                });
                
                // Force UI update
                setTimeout(() => {
                  sender.render();
                }, 100);
              }
            }
          }
        });

        const saveSurveyResults = (survey: Model) => {
          const results = survey.data;
          console.log("Survey results:", results);

          // Display results in a simple alert for this healthcare survey
          alert("Survey completed! Check the console for detailed results.");
        };

        surveyModel.onComplete.add(saveSurveyResults);
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

  return <Survey model={survey} />;
}
