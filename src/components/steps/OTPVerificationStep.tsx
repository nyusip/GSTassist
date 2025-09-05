import React, { useState } from 'react';
import { Mail, Phone, Shield } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const OTPVerificationStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [email, setEmail] = useState(formData.email || '');
  const [mobile, setMobile] = useState(formData.mobile || '');
  const [emailOtp, setEmailOtp] = useState(formData.emailOtp || '');
  const [mobileOtp, setMobileOtp] = useState(formData.mobileOtp || '');
  const [emailSent, setEmailSent] = useState(false);
  const [mobileSent, setMobileSent] = useState(false);

  const sendEmailOtp = () => {
    if (email) {
      setEmailSent(true);
      // Simulate sending OTP
    }
  };

  const sendMobileOtp = () => {
    if (mobile) {
      setMobileSent(true);
      // Simulate sending OTP
    }
  };

  const handleNext = () => {
    updateFormData({ email, mobile, emailOtp, mobileOtp });
    onNext();
  };

  const isValid = email && mobile && emailOtp.length === 6 && mobileOtp.length === 6;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Email & Mobile Verification</h2>
        </div>
        <p className="text-gray-600">
          Verify your email and mobile number to secure your GST registration account.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Email Verification */}
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <Mail className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Email Verification</h3>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={sendEmailOtp}
            disabled={!email || emailSent}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {emailSent ? 'OTP Sent' : 'Send Email OTP'}
          </button>

          {emailSent && (
            <div>
              <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-700 mb-2">
                Email OTP *
              </label>
              <input
                type="text"
                id="emailOtp"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg"
              />
            </div>
          )}
        </div>

        {/* Mobile Verification */}
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <Phone className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Mobile Verification</h3>
          </div>
          
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={sendMobileOtp}
            disabled={!mobile || mobileSent}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mobileSent ? 'OTP Sent' : 'Send Mobile OTP'}
          </button>

          {mobileSent && (
            <div>
              <label htmlFor="mobileOtp" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile OTP *
              </label>
              <input
                type="text"
                id="mobileOtp"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center font-mono text-lg"
              />
            </div>
          )}
        </div>
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

export default OTPVerificationStep;