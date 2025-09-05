import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const AuthorizedSignatoryStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [signatory, setSignatory] = useState(formData.authorizedSignatory || {
    name: '',
    designation: '',
    pan: '',
    mobile: '',
    email: ''
  });

  const designations = [
    'Proprietor',
    'Partner',
    'Director',
    'Manager',
    'Authorized Representative',
    'Company Secretary'
  ];

  const handleSignatoryChange = (field: string, value: string) => {
    setSignatory(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateFormData({ authorizedSignatory: signatory });
    onNext();
  };

  const isValid = signatory.name && signatory.designation && signatory.pan.length === 10 && 
                 signatory.mobile.length === 10 && signatory.email;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <UserCheck className="h-8 w-8 text-emerald-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Authorized Signatory</h2>
        </div>
        <p className="text-gray-600">
          Designate a person who will be authorized to sign documents and handle GST compliance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={signatory.name}
            onChange={(e) => handleSignatoryChange('name', e.target.value)}
            placeholder="Enter full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
            Designation *
          </label>
          <select
            id="designation"
            value={signatory.designation}
            onChange={(e) => handleSignatoryChange('designation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select designation</option>
            {designations.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-2">
            PAN Number *
          </label>
          <input
            type="text"
            id="pan"
            value={signatory.pan}
            onChange={(e) => handleSignatoryChange('pan', e.target.value.toUpperCase())}
            placeholder="ABCDE1234F"
            maxLength={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobile"
            value={signatory.mobile}
            onChange={(e) => handleSignatoryChange('mobile', e.target.value.replace(/\D/g, ''))}
            placeholder="9876543210"
            maxLength={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={signatory.email}
            onChange={(e) => handleSignatoryChange('email', e.target.value)}
            placeholder="signatory@company.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-emerald-800 mb-2">Authorized Signatory Responsibilities</h4>
        <ul className="text-sm text-emerald-700 space-y-1">
          <li>• File GST returns and handle tax compliance</li>
          <li>• Respond to GST department notices and queries</li>
          <li>• Sign and submit various GST forms and documents</li>
          <li>• Represent the business in GST-related matters</li>
          <li>• Ensure timely payment of GST liabilities</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-yellow-800 mb-2">Important Note</h4>
        <p className="text-sm text-yellow-700">
          The authorized signatory should be someone with good knowledge of GST laws and 
          business operations. This person will receive all GST-related communications.
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

export default AuthorizedSignatoryStep;