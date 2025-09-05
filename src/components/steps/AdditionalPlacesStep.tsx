import React, { useState } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface AdditionalPlace {
  type: string;
  address: string;
}

const AdditionalPlacesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep
}) => {
  const [places, setPlaces] = useState<AdditionalPlace[]>(
    formData.additionalPlaces || []
  );

  const placeTypes = [
    'Branch Office',
    'Warehouse',
    'Factory/Manufacturing Unit',
    'Sales Office',
    'Godown',
    'Service Center'
  ];

  const addPlace = () => {
    setPlaces([...places, { type: '', address: '' }]);
  };

  const removePlace = (index: number) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  const updatePlace = (index: number, field: keyof AdditionalPlace, value: string) => {
    const updatedPlaces = places.map((place, i) => 
      i === index ? { ...place, [field]: value } : place
    );
    setPlaces(updatedPlaces);
  };

  const handleNext = () => {
    updateFormData({ additionalPlaces: places });
    onNext();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-8 w-8 text-orange-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Additional Places of Business</h2>
        </div>
        <p className="text-gray-600">
          Add any additional business locations like branch offices, warehouses, or manufacturing units.
        </p>
      </div>

      {places.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Additional Places Added</h3>
          <p className="text-gray-500 mb-4">
            Add branch offices, warehouses, or other business locations if applicable.
          </p>
          <button
            onClick={addPlace}
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Place
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {places.map((place, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Additional Place {index + 1}
                </h3>
                <button
                  onClick={() => removePlace(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place Type *
                  </label>
                  <select
                    value={place.type}
                    onChange={(e) => updatePlace(index, 'type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {placeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <textarea
                    value={place.address}
                    onChange={(e) => updatePlace(index, 'address', e.target.value)}
                    placeholder="Enter complete address with pincode"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addPlace}
              className="inline-flex items-center px-6 py-3 border-2 border-dashed border-orange-300 text-orange-600 rounded-lg hover:border-orange-400 hover:bg-orange-50"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Place
            </button>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-blue-800 mb-2">Note</h4>
        <p className="text-sm text-blue-700">
          You can skip this step if you don't have additional business places. 
          These can be added later through GST portal amendments if needed.
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalPlacesStep;