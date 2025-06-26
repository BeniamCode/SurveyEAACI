import React, { useCallback } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/survey-core.css';

const surveyJson = {
  title: "Product Feedback Survey",
  description: "Please help us improve our products with your feedback",
  pages: [{
    name: "page1",
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
      isRequired: true
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
      isRequired: true
    }, {
      name: "Email",
      title: "Your email:",
      type: "text",
      inputType: "email",
      isRequired: true,
      validators: [{
        type: "email"
      }]
    }]
  }, {
    name: "page2",
    elements: [{
      name: "Satisfaction",
      title: "How satisfied are you with our product?",
      type: "radiogroup",
      choices: [
        "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very Dissatisfied"
      ],
      isRequired: true
    }, {
      name: "Recommendation",
      title: "How likely are you to recommend our product to a friend?",
      type: "rating",
      rateMin: 0,
      rateMax: 10,
      minRateDescription: "Not at all likely",
      maxRateDescription: "Extremely likely"
    }, {
      name: "Comments",
      title: "Please share any additional comments:",
      type: "comment",
      rows: 4
    }]
  }],
  showProgressBar: "top",
  showQuestionNumbers: "on"
};

export default function SurveyComponent() {
  const survey = new Model(surveyJson);
  
  const saveSurveyResults = useCallback((survey: Model) => {
    const results = survey.data;
    console.log("Survey results:", results);
    
    // Display results in a formatted alert
    const resultText = `
Survey Completed!

Name: ${results.FirstName} ${results.LastName}
Email: ${results.Email}
Satisfaction: ${results.Satisfaction || 'Not specified'}
Recommendation Score: ${results.Recommendation || 'Not specified'}
Comments: ${results.Comments || 'No comments'}

Thank you for your feedback!
    `;
    
    alert(resultText.trim());
    
    // In a real application, you would send this to your server:
    // saveSurveyResults("https://your-api.com/surveys", results);
  }, []);

  survey.onComplete.add(saveSurveyResults);

  return <Survey model={survey} />;
}