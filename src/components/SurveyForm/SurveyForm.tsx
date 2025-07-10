import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { surveySchema, type SurveyData, type FormStep } from '../../types/survey';
import { useTranslation } from 'react-i18next';
import { useFoodReservationStore } from '../../stores/foodReservationStore';
import { useMutation } from 'convex/react';
import { convex, generateParticipantId, getSessionMetadata } from '../../lib/convex';
import DemographicsStep from './DemographicsStep';
import FeedingPracticesStep from './FeedingPracticesStep';
import FoodPlansStep from './FoodPlansStep';
import ReviewStep from './ReviewStep';
import ProgressBar from './ProgressBar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const steps: FormStep[] = ['demographics', 'feeding-practices', 'food-plans', 'review'];

export default function SurveyForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('demographics');
  const [participantId] = useState(() => generateParticipantId());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();
  const { clearAllReservations } = useFoodReservationStore();
  
  const submitSurveyResponse = useMutation("surveyResponses:submitSurveyResponse" as any);
  
  const methods = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    mode: 'onChange',
    defaultValues: {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q5a: [],
      q6: '',
      q7a: '',
      q7b: '',
      q7c: '',
      q8: [],
      q9a_main: '',
      q9a_elaborate: [],
      q9b_main: '',
      q9b_elaborate: [],
      q10: '',
      q11: '',
      q12: '',
      q14: [],
      q15: '',
      q16: '',
      q17: '',
      q18: '',
      food_plan_low_risk: [],
      food_plan_high_risk: [],
    }
  });
  
  const { handleSubmit, trigger } = methods;
  
  const currentStepIndex = steps.indexOf(currentStep);
  
  const handleNext = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 'demographics':
        isValid = await trigger(['q1', 'q2', 'q3', 'q4', 'q5', 'q6']);
        break;
      case 'feeding-practices':
        isValid = await trigger([
          'q7a', 'q7b', 'q7c',
          'q8', 'q9a_main', 'q9b_main', 'q10',
          'q11', 'q15', 'q16', 'q17', 'q18'
        ]);
        // If valid, check if we should skip food-plans step
        if (isValid) {
          const formData = methods.getValues();
          const q10Value = formData.q10;
          const q11Value = formData.q11;
          
          // If neither Q10 nor Q11 is "yes", skip food-plans step and go directly to review
          if (q10Value !== 'yes' && q11Value !== 'yes') {
            setCurrentStep('review');
            return;
          }
        }
        break;
      case 'food-plans':
        isValid = true; // Food plans are optional
        break;
    }
    
    if (isValid && currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep === 'review') {
      const formData = methods.getValues();
      const q10Value = formData.q10;
      const q11Value = formData.q11;
      
      // If neither Q10 nor Q11 is "yes", go back to feeding-practices instead of food-plans
      if (q10Value !== 'yes' && q11Value !== 'yes') {
        setCurrentStep('feeding-practices');
        return;
      }
    }
    
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };
  
  const onSubmit = async (data: SurveyData) => {
    setIsSubmitting(true);
    try {
      const responseId = await submitSurveyResponse({
        participantId,
        surveyData: data,
        isComplete: true,
        metadata: {
          ...getSessionMetadata(),
          language: i18n.language,
        }
      });
      
      console.log("Survey submitted with ID:", responseId);
      clearAllReservations();
      
      alert(t('survey.completed', { participantId, responseId }));
      
      // Reset form
      methods.reset();
      setCurrentStep('demographics');
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert(t('survey.error'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 'demographics':
        return <DemographicsStep />;
      case 'feeding-practices':
        return <FeedingPracticesStep />;
      case 'food-plans':
        return <FoodPlansStep />;
      case 'review':
        return <ReviewStep />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <ProgressBar currentStep={currentStepIndex + 1} totalSteps={steps.length} />
                
                <div className="mt-8">
                  {renderStep()}
                </div>
                
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  {currentStepIndex > 0 ? (
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handlePrevious}
                      size="lg"
                    >
                      {t('survey.previous')}
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  {currentStepIndex < steps.length - 1 ? (
                    <Button 
                      type="button"
                      onClick={handleNext} 
                      size="lg"
                    >
                      {t('survey.next')}
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : t('survey.submit')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}