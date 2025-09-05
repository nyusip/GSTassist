import React, { useState } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Promoter {
  name: string;
  pan: string;
  designation: string;
}

const PromoterDetailsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [promoters, setPromoters] = useState<Promoter[]>(
    formData.promoters || [{ name: '', pan: '', designation: '' }]
  );

  const designations = [
    'Director',
    'Partner',
    'Proprietor',
    'Managing Director',
    'CEO',
    'Authorized Representative'
  ];

  const addPromoter = () => {
    setPromoters([...promoters, { name: '', pan: '', designation: '' }]);
  };

  const removePromoter = (index: number) => {
    if (promoters.length > 1) {
      setPromoters(promoters.filter((_, i) => i !== index));
    }
  };

  const updatePromoter = (index: number, field: keyof Promoter, value: string) => {
    const updatedPromoters = promoters.map((promoter, i) => 
      i === index ? { ...promoter, [field]: value } : promoter
    );
    setPromoters(updatedPromoters);
  };

  const handleNext = () => {
    updateFormData({ promoters });
    onNext();
  };

  const isValid = promoters.every(promoter => 
    promoter.name.trim() && promoter.pan.length === 10 && promoter.designation
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Users className="h-8 w-8 text-teal-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Promoter/Partner Details</h2>
        </div>
        <p className="text-gray-600">
          Provide details of all promoters, directors, or partners associated with the business.
        </p>
      </div>

      <div className="space-y-6">
        {promoters.map((promoter, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {index === 0 ? 'Primary Promoter' : `Promoter ${index + 1}`}
              </h3>
              {promoters.length > 1 && (
                <button
                  onClick={() => removePromoter(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={promoter.name}
                  onChange={(e) => updatePromoter(index, 'name', e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number *
                </label>
                <input
                  type="text"
                  value={promoter.pan}
                  onChange={(e) => updatePromoter(index, 'pan', e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <select
                  value={promoter.designation}
                  onChange={(e) => updatePromoter(index, 'designation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select designation</option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={addPromoter}
            className="inline-flex items-center px-6 py-3 border-2 border-dashed border-teal-300 text-teal-600 rounded-lg hover:border-teal-400 hover:bg-teal-50"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Another Promoter
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-amber-800 mb-2">Important Information</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• All promoters/directors must have valid PAN numbers</li>
          <li>• Names should match exactly with PAN card details</li>
          <li>• At least one promoter is mandatory for registration</li>
          <li>• DIN (Director Identification Number) may be required for company directors</li>
        </ul>
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

export default PromoterDetailsStep;