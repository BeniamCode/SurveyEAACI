import React from 'react';
import { Progress } from '../ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-center items-center gap-8 mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          return (
            <div 
              key={index} 
              className="flex items-center"
            >
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                ${isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isActive 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }
              `}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              {index < totalSteps - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <Progress value={percentage} className="h-2" />
    </div>
  );
}