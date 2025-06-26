import React from "react";
import ReactDOM from "react-dom/client";
import { CustomWidgetCollection } from "survey-core";
import DragDropTimeline from "./DragDropTimeline";

// Custom widget for SurveyJS integration
const dragDropTimelineWidget = {
  name: "drag-drop-timeline",
  title: "Drag & Drop Timeline",
  iconName: "icon-timeline",
  widgetIsLoaded: function () {
    return true;
  },
  isFit: function (question: any) {
    // This widget will be used for any question with type "drag-drop-timeline"
    return question.getType() === "drag-drop-timeline";
  },
  htmlTemplate: "<div class='sv-drag-drop-timeline-root'></div>",
  afterRender: function (question: any, el: HTMLElement) {
    const rootElement = el.querySelector(".sv-drag-drop-timeline-root");
    if (!rootElement) return;

    // Get custom data from the question's panel parent
    const panel = question.parent;
    const customData = panel?.customData || {};

    const {
      source_list_title = "Advice",
      food_groups = [],
      target_lists = [],
    } = customData;

    // Create React root and render the component
    const root = ReactDOM.createRoot(rootElement);

    const handleChange = (result: any) => {
      // Store the result in the question value
      question.value = result;
    };

    // Get current survey data for conditional logic
    const surveyData = question.survey?.data || {};

    root.render(
      React.createElement(DragDropTimeline, {
        foodGroups: food_groups,
        targetLists: target_lists,
        sourceListTitle: source_list_title,
        onChange: handleChange,
        value: question.value || {},
        surveyData: surveyData,
      })
    );

    // Store the root for cleanup
    (question as any)._reactRoot = root;
  },
  willUnmount: function (question: any, el: HTMLElement) {
    // Cleanup React root
    if ((question as any)._reactRoot) {
      (question as any)._reactRoot.unmount();
      delete (question as any)._reactRoot;
    }
  },
};

// Register the widget
export function registerDragDropTimelineWidget() {
  if (typeof window !== "undefined") {
    CustomWidgetCollection.Instance.addCustomWidget(
      dragDropTimelineWidget,
      "customtype"
    );
  }
}

export default dragDropTimelineWidget;
