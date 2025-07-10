import React from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from '../ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'survey.steps.demographics',
  'survey.steps.feeding_practices',
  'survey.steps.food_plans',
  'survey.steps.review'
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { t } = useTranslation();
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center flex-1"
            >
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold mb-2
                ${isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isActive 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }
              `}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span className={`
                text-xs text-center max-w-20 leading-tight
                ${isActive 
                  ? 'text-blue-600 font-semibold' 
                  : isCompleted 
                    ? 'text-green-600 font-semibold' 
                    : 'text-gray-500'
                }
              `}>
                {t(label)}
              </span>
            </div>
          );
        })}
      </div>
      
      <Progress value={percentage} className="h-2" />
    </div>
  );
}