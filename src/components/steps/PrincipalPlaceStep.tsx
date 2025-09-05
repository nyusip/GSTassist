import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const PrincipalPlaceStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [address, setAddress] = useState(formData.principalAddress || {
    buildingNo: '',
    street: '',
    locality: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateFormData({ principalAddress: address });
    onNext();
  };

  const isValid = address.buildingNo && address.street && address.city && 
                 address.state && address.pincode && address.pincode.length === 6;

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-8 w-8 text-red-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Principal Place of Business</h2>
        </div>
        <p className="text-gray-600">
          Enter the address of your main business location where books and records are maintained.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="buildingNo" className="block text-sm font-medium text-gray-700 mb-2">
            Building No./Flat No. *
          </label>
          <input
            type="text"
            id="buildingNo"
            value={address.buildingNo}
            onChange={(e) => handleAddressChange('buildingNo', e.target.value)}
            placeholder="Building/Flat number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
            Street/Road *
          </label>
          <input
            type="text"
            id="street"
            value={address.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            placeholder="Street/Road name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-2">
            Locality/Area
          </label>
          <input
            type="text"
            id="locality"
            value={address.locality}
            onChange={(e) => handleAddressChange('locality', e.target.value)}
            placeholder="Locality/Area"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            placeholder="City"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            id="state"
            value={address.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            id="pincode"
            value={address.pincode}
            onChange={(e) => handleAddressChange('pincode', e.target.value.replace(/\D/g, ''))}
            placeholder="123456"
            maxLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-yellow-800 mb-2">Address Proof Required</h4>
        <p className="text-sm text-yellow-700">
          You will need to upload address proof documents like electricity bill, property documents, 
          or rent agreement during the application submission.
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

export default PrincipalPlaceStep;