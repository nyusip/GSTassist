import * as React from 'react';
import { Lightbulb, Zap, ShieldCheck, HelpCircle } from 'lucide-react';

interface AIPoweredGuidanceProps {
  activeField: string | null;
}

const guidanceContent: { [key: string]: { title: string; points: string[] } } = {
  userType: {
    title: 'I am a… (Applicant Type)',
    points: [
      'Select whether you are a taxpayer, GST practitioner, or other category.',
      'Choose the correct type based on your role, e.g. Proprietor / Partnership / Company.',
    ],
  },
  state: {
    title: 'State/UT',
    points: [
      'Select the state where your business is registered.',
      'Ensure it matches your business address proof (electricity bill, rent agreement, etc.).',
    ],
  },
  district: {
    title: 'District',
    points: [
      'Enter your business district correctly.',
      'This will decide your GST jurisdiction.',
    ],
  },
  businessName: {
    title: 'Legal Name of Business (As per PAN)',
    points: [
      'Enter the exact name as per your PAN card.',
      'Don’t use short forms or nicknames.',
      'Mismatch with PAN will cause rejection.',
    ],
  },
  pan: {
    title: 'Permanent Account Number (PAN)',
    points: [
      'Enter your 10-character PAN.',
      'Format should be: ABCDE1234F',
      'Must be valid and active.',
    ],
  },
  email: {
    title: 'Email Address',
    points: [
      'Enter an active email ID.',
      'OTP for verification will be sent here.',
      'Avoid using personal email for business registration.',
    ],
  },
  mobile: {
    title: 'Mobile Number',
    points: [
      'Enter your personal or business mobile number.',
      'OTP will be sent here too.',
      'Make sure it’s active and linked to your Aadhaar if required.',
    ],
  },
  proceed: {
    title: 'Proceed to OTP Verification',
    points: [
      'After filling all fields, click to receive OTP.',
      'OTP will be sent on both Email & Mobile.',
    ],
  },
};

const DefaultGuidance: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    <div className="flex items-center mb-4">
      <Lightbulb className="h-8 w-8 text-yellow-500 mr-3" />
      <h3 className="text-2xl font-bold text-gray-800">AI-Powered Guidance</h3>
    </div>
    <p className="text-gray-600 mb-5 text-base">
      Focus on a form field to get specific, real-time guidance.
    </p>
  </div>
);

const FieldGuidance: React.FC<{ content: { title: string; points: string[] } }> = ({ content }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    <div className="flex items-center mb-4">
      <HelpCircle className="h-8 w-8 text-blue-500 mr-3" />
      <h3 className="text-2xl font-bold text-gray-800">{content.title}</h3>
    </div>
    <ul className="space-y-3">
      {content.points.map((item, index) => (
        <li key={index} className="flex items-start">
          <Zap className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const NeedHelpCard: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
    <h3 className="text-xl font-bold text-gray-800 mb-2">Need Help?</h3>
    <p className="text-gray-600 mb-5">Our AI assistant is here to guide you through each step.</p>
    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
      <ShieldCheck className="h-5 w-5 mr-2" />
      Chat with our AI
    </button>
  </div>
);

const AIPoweredGuidance: React.FC<AIPoweredGuidanceProps> = ({ activeField }) => {
  const content = activeField ? guidanceContent[activeField] : null;

  return (
    <div className="space-y-8">
      {content ? <FieldGuidance content={content} /> : <DefaultGuidance />}
      <NeedHelpCard />
    </div>
  );
};

export default AIPoweredGuidance;
