import React, { useState } from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const PanVerificationStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [pan, setPan] = useState(formData.pan || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    if (pan.length !== 10) return;
    
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      updateFormData({ pan });
    }, 2000);
  };

  const handleNext = () => {
    if (isVerified) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">PAN Verification</h2>
        </div>
        <p className="text-gray-600">
          Enter your Permanent Account Number (PAN) to begin the GST registration process.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-2">
            PAN Number *
          </label>
          <input
            type="text"
            id="pan"
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            placeholder="ABCDE1234F"
            maxLength={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
          />
          <p className="text-sm text-gray-500 mt-1">
            Format: AAAAA1234A (5 letters, 4 numbers, 1 letter)
          </p>
        </div>

        {pan.length === 10 && !isVerified && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
              <p className="text-sm text-yellow-800">
                Please verify your PAN before proceeding to the next step.
              </p>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="h-5 w-5 bg-green-400 rounded-full mr-2 flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
              <p className="text-sm text-green-800">
                PAN verified successfully! You can proceed to the next step.
              </p>
            </div>
          </div>
        )}

        {pan.length === 10 && !isVerified && (
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </>
            ) : (
              'Verify PAN'
            )}
          </button>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={isFirstStep}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isVerified}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PanVerificationStep;