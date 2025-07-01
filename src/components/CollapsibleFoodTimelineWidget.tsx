import React from "react";
import ReactDOM from "react-dom/client";
import { CustomWidgetCollection, Question, ElementFactory } from "survey-core";
import CollapsibleFoodTimeline from "./CollapsibleFoodTimeline";

// Custom widget for SurveyJS integration
const collapsibleFoodTimelineWidget = {
  name: "collapsible-food-timeline",
  title: "Collapsible Food Timeline",
  iconName: "icon-timeline",
  widgetIsLoaded: function () {
    console.log("CollapsibleFoodTimeline widget isLoaded called");
    return true;
  },
  isFit: function (question: any) {
    const questionType = question.getType();
    const result = questionType === "collapsible-food-timeline";
    console.log("CollapsibleFoodTimeline widget isFit called for type:", questionType, "result:", result);
    return result;
  },
  htmlTemplate: "<div class='sv-collapsible-food-timeline-root'></div>",
  afterRender: function (question: any, el: HTMLElement) {
    console.log("CollapsibleFoodTimeline widget afterRender called for question:", question.name);
    const rootElement = el.querySelector(".sv-collapsible-food-timeline-root");
    if (!rootElement) {
      console.error("Root element not found!");
      return;
    }

    // Function to render the component
    const renderComponent = () => {
      // Get question properties
      const title = question.title || "Food Introduction Timeline";
      const description = question.description || "Select the foods you recommend introducing at each month.";
      const riskLevel = question.riskLevel || 'low';

      // Only create root once
      if (!(question as any)._reactRoot) {
        (question as any)._reactRoot = ReactDOM.createRoot(rootElement);
      }

      const handleChange = (result: any) => {
        console.log("Timeline data changed:", result);
        // Store the result in the question value
        question.value = result;
      };

      (question as any)._reactRoot.render(
        React.createElement(CollapsibleFoodTimeline, {
          title: title,
          description: description,
          riskLevel: riskLevel,
          onChange: handleChange,
          value: question.value || {},
        })
      );
    };

    // Initial render
    renderComponent();

    // Re-render when question properties change
    const onPropertyChanged = () => {
      renderComponent();
    };

    // Add event listener for property changes
    question.onPropertyChanged.add(onPropertyChanged);

    // Store cleanup function
    (question as any)._cleanup = () => {
      question.onPropertyChanged.remove(onPropertyChanged);
    };
  },
  willUnmount: function (question: any) {
    console.log("CollapsibleFoodTimeline widget willUnmount called for question:", question.name);
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
class CollapsibleFoodTimelineQuestion extends Question {
  getType() {
    return "collapsible-food-timeline";
  }
  
  get riskLevel() {
    return this.getPropertyValue("riskLevel");
  }
  set riskLevel(val: string) {
    this.setPropertyValue("riskLevel", val);
  }
}

// Register the widget
export function registerCollapsibleFoodTimelineWidget() {
  if (typeof window !== "undefined") {
    console.log("Registering collapsible-food-timeline widget");
    try {
      // Register the question type
      ElementFactory.Instance.registerElement("collapsible-food-timeline", (name: string) => {
        console.log("Creating CollapsibleFoodTimelineQuestion with name:", name);
        return new CollapsibleFoodTimelineQuestion(name);
      });

      // Add property definitions
      (CollapsibleFoodTimelineQuestion as any).prototype.getPropertyValue = function(name: string) {
        return this[name];
      };
      
      (CollapsibleFoodTimelineQuestion as any).prototype.setPropertyValue = function(name: string, value: any) {
        this[name] = value;
      };

      // Add the custom widget
      CustomWidgetCollection.Instance.addCustomWidget(
        collapsibleFoodTimelineWidget,
        "customtype"
      );
      console.log("CollapsibleFoodTimeline widget registered successfully");
      console.log("Available widgets:", CustomWidgetCollection.Instance.widgets.map(w => w.name));
    } catch (error) {
      console.error("Error registering CollapsibleFoodTimeline widget:", error);
    }
  }
}

export default collapsibleFoodTimelineWidget;