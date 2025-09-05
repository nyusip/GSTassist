import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const BusinessDetailsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [legalName, setLegalName] = useState(formData.legalName || '');
  const [tradeName, setTradeName] = useState(formData.tradeName || '');
  const [constitution, setConstitution] = useState(formData.constitution || '');

  const constitutionOptions = [
    'Proprietorship',
    'Partnership',
    'Company',
    'LLP',
    'Trust',
    'Society',
    'HUF'
  ];

  const handleNext = () => {
    updateFormData({ legalName, tradeName, constitution });
    onNext();
  };

  const isValid = legalName.trim() && constitution;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Building2 className="h-8 w-8 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Business Details</h2>
        </div>
        <p className="text-gray-600">
          Provide your business information as per your incorporation documents.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="legalName" className="block text-sm font-medium text-gray-700 mb-2">
            Legal Name of Business *
          </label>
          <input
            type="text"
            id="legalName"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            placeholder="Enter legal name as per incorporation documents"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            This should match exactly with your certificate of incorporation
          </p>
        </div>

        <div>
          <label htmlFor="tradeName" className="block text-sm font-medium text-gray-700 mb-2">
            Trade Name (Optional)
          </label>
          <input
            type="text"
            id="tradeName"
            value={tradeName}
            onChange={(e) => setTradeName(e.target.value)}
            placeholder="Enter trade/brand name if different from legal name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            The name by which your business is commonly known
          </p>
        </div>

        <div>
          <label htmlFor="constitution" className="block text-sm font-medium text-gray-700 mb-2">
            Constitution of Business *
          </label>
          <select
            id="constitution"
            value={constitution}
            onChange={(e) => setConstitution(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select constitution type</option>
            {constitutionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Choose the legal structure of your business entity
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-blue-800 mb-2">Important Note</h4>
        <p className="text-sm text-blue-700">
          Ensure all details match your official business documents. Any discrepancy may lead to 
          registration delays or rejection.
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

export default BusinessDetailsStep;