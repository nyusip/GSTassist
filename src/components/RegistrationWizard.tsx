import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import ProgressBar from './ProgressBar';
import StepNavigation from './StepNavigation';
import AITipsSidebar from './AITipsSidebar';
import PanVerificationStep from './steps/PanVerificationStep';
import OTPVerificationStep from './steps/OTPVerificationStep';
import AadhaarAuthStep from './steps/AadhaarAuthStep';
import BusinessDetailsStep from './steps/BusinessDetailsStep';
import PrincipalPlaceStep from './steps/PrincipalPlaceStep';
import AdditionalPlacesStep from './steps/AdditionalPlacesStep';
import PromoterDetailsStep from './steps/PromoterDetailsStep';
import AuthorizedSignatoryStep from './steps/AuthorizedSignatoryStep';
import BankDetailsStep from './steps/BankDetailsStep';
import VerificationSubmitStep from './steps/VerificationSubmitStep';
import { FormData } from '../types/FormData';

interface RegistrationWizardProps {
  onBackToHome: () => void;
}

const steps = [
  'PAN Verification',
  'Email & Mobile OTP',
  'Aadhaar Authentication',
  'Business Details',
  'Principal Place of Business',
  'Additional Places of Business',
  'Promoter/Partner Details',
  'Authorized Signatory',
  'Bank Account Details',
  'Verification & Submit'
];

const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.registrationData) {
      const { registrationData } = location.state;
      setFormData(prev => ({
        ...prev,
        pan: registrationData.pan,
        email: registrationData.email,
        mobile: registrationData.mobile,
        businessName: registrationData.businessName,
        state: registrationData.state,
        district: registrationData.district,
      }));
    }
  }, [location.state]);

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === steps.length - 1
    };

    switch (currentStep) {
      case 0: return <PanVerificationStep {...stepProps} />;
      case 1: return <OTPVerificationStep {...stepProps} />;
      case 2: return <AadhaarAuthStep {...stepProps} />;
      case 3: return <BusinessDetailsStep {...stepProps} />;
      case 4: return <PrincipalPlaceStep {...stepProps} />;
      case 5: return <AdditionalPlacesStep {...stepProps} />;
      case 6: return <PromoterDetailsStep {...stepProps} />;
      case 7: return <AuthorizedSignatoryStep {...stepProps} />;
      case 8: return <BankDetailsStep {...stepProps} />;
      case 9: return <VerificationSubmitStep {...stepProps} />;
      default: return <PanVerificationStep {...stepProps} />;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col pt-16">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToHome}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-xl font-semibold text-gray-900">GST Registration</h1>
              <div></div> {/* Placeholder for alignment */}
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Sidebar - Step Navigation */}
          <div className="hidden lg:block w-64 bg-white border-r">
            <StepNavigation
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Center Content - Form */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-3xl mx-auto">
              {renderCurrentStep()}
            </div>
          </div>

          {/* Right Sidebar - AI Tips */}
          <div className="hidden xl:block w-80">
            <AITipsSidebar currentStep={currentStep} onChatClick={() => setIsChatbotOpen(true)} />
          </div>
        </div>
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg h-2/3 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Startup Queries Chatbot</h3>
              <button onClick={() => setIsChatbotOpen(false)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow">
              <iframe
                src="https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/01/08/20250901081839-TX2K5EY7.json"
                className="w-full h-full border-0"
                title="Startup Queries Chatbot"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationWizard;
