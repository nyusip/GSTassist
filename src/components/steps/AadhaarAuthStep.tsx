import React, { useState } from 'react';
import { Fingerprint } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const AadhaarAuthStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [aadhaar, setAadhaar] = useState(formData.aadhaar || '');
  const [aadhaarOtp, setAadhaarOtp] = useState(formData.aadhaarOtp || '');
  const [otpSent, setOtpSent] = useState(false);

  const sendAadhaarOtp = () => {
    if (aadhaar.length === 12) {
      setOtpSent(true);
    }
  };

  const handleNext = () => {
    updateFormData({ aadhaar, aadhaarOtp });
    onNext();
  };

  const isValid = aadhaar.length === 12 && aadhaarOtp.length === 6;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Fingerprint className="h-8 w-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Aadhaar Authentication</h2>
        </div>
        <p className="text-gray-600">
          Authenticate using your Aadhaar number for secure identity verification.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-2">
            Aadhaar Number *
          </label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
            placeholder="1234 5678 9012"
            maxLength={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center font-mono text-lg"
          />
          <p className="text-sm text-gray-500 mt-1 text-center">
            Enter your 12-digit Aadhaar number
          </p>
        </div>

        <button
          onClick={sendAadhaarOtp}
          disabled={aadhaar.length !== 12 || otpSent}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {otpSent ? 'OTP Sent to Registered Mobile' : 'Send Aadhaar OTP'}
        </button>

        {otpSent && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800 mb-4 text-center">
              OTP has been sent to your Aadhaar registered mobile number
            </p>
            
            <div>
              <label htmlFor="aadhaarOtp" className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar OTP *
              </label>
              <input
                type="text"
                id="aadhaarOtp"
                value={aadhaarOtp}
                onChange={(e) => setAadhaarOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center font-mono text-lg"
              />
            </div>
          </div>
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
          disabled={!isValid}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AadhaarAuthStep;