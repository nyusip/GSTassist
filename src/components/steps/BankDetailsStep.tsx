import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const BankDetailsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [bankDetails, setBankDetails] = useState(formData.bankDetails || {
    accountNumber: '',
    bankName: '',
    branch: '',
    ifscCode: ''
  });

  const handleBankDetailsChange = (field: string, value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateFormData({ bankDetails });
    onNext();
  };

  const isValid = bankDetails.accountNumber && bankDetails.bankName && 
                 bankDetails.branch && bankDetails.ifscCode.length === 11;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Bank Account Details</h2>
        </div>
        <p className="text-gray-600">
          Provide your primary business bank account details for GST refunds and transactions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Bank Account Number *
          </label>
          <input
            type="text"
            id="accountNumber"
            value={bankDetails.accountNumber}
            onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
            placeholder="Enter account number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name *
          </label>
          <input
            type="text"
            id="bankName"
            value={bankDetails.bankName}
            onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
            placeholder="Enter bank name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
            Branch Name *
          </label>
          <input
            type="text"
            id="branch"
            value={bankDetails.branch}
            onChange={(e) => handleBankDetailsChange('branch', e.target.value)}
            placeholder="Enter branch name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
            IFSC Code *
          </label>
          <input
            type="text"
            id="ifscCode"
            value={bankDetails.ifscCode}
            onChange={(e) => handleBankDetailsChange('ifscCode', e.target.value.toUpperCase())}
            placeholder="ABCD0123456"
            maxLength={11}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          />
          <p className="text-sm text-gray-500 mt-1">
            11-character IFSC code (4 letters + 1 zero + 6 characters)
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-blue-800 mb-2">Bank Account Requirements</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Account must be in the name of the business entity</li>
          <li>• Current account is preferred over savings account</li>
          <li>• Account should be operational and active</li>
          <li>• Required for GST refund processing</li>
          <li>• You can add multiple accounts later if needed</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-yellow-800 mb-2">Documents Required</h4>
        <p className="text-sm text-yellow-700">
          Bank account proof such as cancelled cheque, bank statement, or account opening 
          certificate will be required during final submission.
        </p>
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

export default BankDetailsStep;