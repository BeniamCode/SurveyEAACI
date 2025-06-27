import React from "react";
import ReactDOM from "react-dom/client";
import { CustomWidgetCollection, Question, Serializer, ElementFactory } from "survey-core";
import DragDropTimeline from "./DragDropTimeline";

// Custom widget for SurveyJS integration
const dragDropTimelineWidget = {
  name: "drag-drop-timeline",
  title: "Drag & Drop Timeline",
  iconName: "icon-timeline",
  widgetIsLoaded: function () {
    console.log("Widget isLoaded called");
    return true;
  },
  isFit: function (question: any) {
    // This widget will be used for any question with type "drag-drop-timeline"
    const result = question.getType() === "drag-drop-timeline";
    console.log("Widget isFit called for type:", question.getType(), "result:", result);
    return result;
  },
  htmlTemplate: "<div class='sv-drag-drop-timeline-root'></div>",
  afterRender: function (question: any, el: HTMLElement) {
    console.log("Widget afterRender called for question:", question.name);
    const rootElement = el.querySelector(".sv-drag-drop-timeline-root");
    if (!rootElement) {
      console.error("Root element not found!");
      return;
    }

    // Function to render the component
    const renderComponent = () => {
      // Get custom data from the question's panel parent
      const panel = question.parent;
      // Access the customData from the panel's JSON definition
      const panelJson = panel?.getOriginalJson?.() || panel?.jsonObj || {};
      const customData = panelJson.customData || panel?.customData || {};

      let {
        source_list_title = "Advice",
        food_categories = [],
        timeline_months = [],
      } = customData;

      // Fallback data for testing
      if (!food_categories || food_categories.length === 0) {
        food_categories = [
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
          },
          {
            "name": "MEAT",
            "items": [
              {"label": "Chicken", "value": "chicken"},
              {"label": "Beef", "value": "beef"},
              {"label": "Fish", "value": "fish"}
            ]
          }
        ];
      }

      console.log("Custom data:", customData);
      console.log("Food categories:", food_categories);

      // Get current survey data for conditional logic
      const surveyData = question.survey?.data || {};

      // No filtering needed for the simplified timeline

      // Only create root once
      if (!(question as any)._reactRoot) {
        (question as any)._reactRoot = ReactDOM.createRoot(rootElement);
      }

      const handleChange = (result: any) => {
        // Store the result in the question value
        question.value = result;
      };

      (question as any)._reactRoot.render(
        React.createElement(
          "div",
          {
            style: {
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
            },
          },
          React.createElement(DragDropTimeline, {
            foodGroups: food_categories,
            targetLists: [],
            sourceListTitle: source_list_title,
            onChange: handleChange,
            value: question.value || {},
            surveyData: surveyData,
          })
        )
      );
    };

    // Initial render
    renderComponent();

    // Re-render when survey values change
    const onValueChanged = (_sender: any, options: any) => {
      if (options.name === "q10" || options.name === "q11") {
        renderComponent();
      }
    };

    // Add event listener
    question.survey.onValueChanged.add(onValueChanged);

    // Store cleanup function
    (question as any)._cleanup = () => {
      question.survey.onValueChanged.remove(onValueChanged);
    };
  },
  willUnmount: function (question: any) {
    // Cleanup event listener
    if ((question as any)._cleanup) {
      (question as any)._cleanup();
      delete (question as any)._cleanup;
    }
    // Cleanup React root
    if ((question as any)._reactRoot) {
      (question as any)._reactRoot.unmount();
      delete (question as any)._reactRoot;
    }
  },
};

// Define custom question type
class DragDropTimelineQuestion extends Question {
  getType() {
    return "drag-drop-timeline";
  }
}

// Register the widget
export function registerDragDropTimelineWidget() {
  if (typeof window !== "undefined") {
    console.log("Registering drag-drop-timeline widget");
    try {
      // Register the question type
      ElementFactory.Instance.registerElement("drag-drop-timeline", (name: string) => {
        console.log("Creating DragDropTimelineQuestion with name:", name);
        return new DragDropTimelineQuestion(name);
      });

      // Add the custom widget
      CustomWidgetCollection.Instance.addCustomWidget(
        dragDropTimelineWidget,
        "customtype"
      );
      console.log("Widget registered successfully");
      console.log("Available widgets:", CustomWidgetCollection.Instance.widgets.map(w => w.name));
    } catch (error) {
      console.error("Error registering widget:", error);
    }
  }
}

export default dragDropTimelineWidget;
