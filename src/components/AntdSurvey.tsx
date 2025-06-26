import React, { useCallback, useEffect } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { message } from 'antd';
import { registerAntdQuestions } from './AntdSurveyQuestions';
import 'survey-core/survey-core.css';
import surveyJsonBase from '../survey-questions.json';

// Register Ant Design question types once
registerAntdQuestions();

// Convert some question types to use Ant Design components
const surveyJson = {
  ...surveyJsonBase,
  pages: surveyJsonBase.pages.map(page => ({
    ...page,
    elements: page.elements.map(element => {
      // Convert text inputs to antd-text
      if (element.type === 'text') {
        return { ...element, type: 'antd-text' };
      }
      // Convert dropdowns to antd-select
      if (element.type === 'dropdown') {
        return { ...element, type: 'antd-select' };
      }
      // Convert radiogroups to antd-radio
      if (element.type === 'radiogroup') {
        return { ...element, type: 'antd-radio' };
      }
      // Convert checkboxes to antd-checkbox
      if (element.type === 'checkbox') {
        return { ...element, type: 'antd-checkbox' };
      }
      return element;
    })
  })),
  completeText: "Submit Survey",
  completedHtml: "<div style='text-align: center; padding: 40px;'><h3>Thank you for completing the healthcare survey!</h3><p>Your responses will help improve complementary feeding practices.</p></div>"
};

export default function AntdSurveyComponent() {
  const survey = new Model(surveyJson);
  
  const saveSurveyResults = useCallback((survey: Model) => {
    const results = survey.data;
    console.log("Survey results:", results);
    
    // Show success message using Ant Design
    message.success('Survey submitted successfully!');
    
    // In a real application, you would send this to your server:
    // saveSurveyResults("https://your-api.com/surveys", results);
  }, []);

  survey.onComplete.add(saveSurveyResults);

  return (
    <div className="antd-survey-container">
      <Survey model={survey} />
    </div>
  );
}