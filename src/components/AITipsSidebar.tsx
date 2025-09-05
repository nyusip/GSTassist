import React from 'react';
import { Lightbulb, Zap, ShieldCheck } from 'lucide-react';

interface AITipsSidebarProps {
  currentStep: number;
  onChatClick: () => void;
}

const tips = [
  {
    content: 'Ensure your PAN card is active and the details match your official documents.',
    points: [
      'Use the same name as on your PAN card.',
      'Date of birth should be in DD/MM/YYYY format.',
      'Double-check the PAN number before submitting.'
    ]
  },
  {
    content: 'You will receive separate OTPs on your registered email and mobile number.',
    points: [
      'Keep your phone and email accessible.',
      'OTPs are valid for a limited time (usually 10 minutes).',
      'Check your spam folder if you don\'t receive the email.'
    ]
  },
  {
    content: 'Aadhaar authentication is mandatory for all Indian citizens.',
    points: [
      'Ensure your mobile number is linked to your Aadhaar.',
      'You can authenticate using OTP or biometrics.',
      'e-KYC details from Aadhaar will be pre-filled.'
    ]
  },
  {
    content: 'Provide the legal name and trade name (if any) for your business.',
    points: [
      'Select the correct business constitution type.',
      'State and central jurisdictions are important.',
      'Upload a clear photo of your place of business.'
    ]
  },
  {
    content: 'This is the primary location where your business operations are conducted.',
    points: [
      'Provide a complete address with PIN code.',
      'Upload proof of address (e.g., electricity bill, rent agreement).',
      'Specify the nature of business activity conducted.'
    ]
  },
  {
    content: 'If you have other places of business, you must declare them here.',
    points: [
      'This includes warehouses, godowns, or other offices.',
      'Provide the address and proof for each additional location.',
      'Not applicable if you only operate from one place.'
    ]
  },
  {
    content: 'Details of proprietors, partners, directors, or karta of the business.',
    points: [
      'Provide PAN, Aadhaar, and address details for each person.',
      'Upload a photograph of each promoter.',
      'Ensure all details are accurate and match official records.'
    ]
  },
  {
    content: 'The person authorized to sign GST returns and make other compliances.',
    points: [
      'This can be one of the promoters or another designated person.',
      'A letter of authorization is required.',
      'Provide their Aadhaar and PAN details.'
    ]
  },
  {
    content: 'Provide the bank account details for your business.',
    points: [
      'The account can be a current or savings account.',
      'Upload a cancelled cheque or bank statement as proof.',
      'The account should be in the name of the business or proprietor.'
    ]
  },
  {
    content: 'Review all the details carefully before the final submission.',
    points: [
      'You can edit information before submitting.',
      'Once submitted, changes may be difficult.',
      'After submission, you will receive an Application Reference Number (ARN).'
    ]
  }
];

const AITipsSidebar: React.FC<AITipsSidebarProps> = ({ currentStep, onChatClick }) => {
  const currentTip = tips[currentStep] || tips[0];

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-800/20 border-l border-gray-200 dark:border-gray-700 p-6">
      <div className="sticky top-28">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Lightbulb className="h-6 w-6 mr-3 text-yellow-400" />
          AI-Powered Guidance
        </h3>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {currentTip.content}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Key Considerations</h5>
            <ul className="space-y-2.5">
              {currentTip.points.map((point, index) => (
                <li key={index} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                  <Zap className="h-3.5 w-3.5 mr-2.5 mt-0.5 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Our AI assistant is here to guide you through each step.
          </p>
          <button 
            onClick={onChatClick}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <ShieldCheck className="h-5 w-5 mr-2" />
            Chat with our AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITipsSidebar;
