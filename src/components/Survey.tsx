import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/survey-core.css';
import surveyJson from '../survey-questions.json';

export default function SurveyComponent() {
  const survey = new Model(surveyJson);
  
  const saveSurveyResults = useCallback((survey: Model) => {
    const results = survey.data;
    console.log("Survey results:", results);
    
    // Display results in a simple alert for this healthcare survey
    alert('Survey completed! Check the console for detailed results.');
    
    // In a real application, you would send this to your server:
    // saveSurveyResults("https://your-api.com/surveys", results);
  }, []);

  survey.onComplete.add(saveSurveyResults);

  return <Survey model={survey} />;
}