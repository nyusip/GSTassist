import React from 'react';
import { Check } from 'lucide-react';

interface StepNavigationProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Registration Steps</h3>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => onStepClick(index)}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
              index === currentStep
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : index < currentStep
                ? 'bg-green-50 text-green-800 hover:bg-green-100'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              index < currentStep
                ? 'bg-green-600 text-white'
                : index === currentStep
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {index < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span className="text-sm font-medium">{step}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default StepNavigation;