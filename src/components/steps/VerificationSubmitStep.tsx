import React from 'react';
import { CheckCircle, ExternalLink, FileText } from 'lucide-react';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const VerificationSubmitStep: React.FC<StepProps> = ({
  formData,
  onBack,
  isFirstStep
}) => {
  const handleFinish = () => {
    // In a real app, this would redirect to the GST portal
    window.open('https://www.gst.gov.in', '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Registration Summary</h2>
        </div>
        <p className="text-gray-600">
          Review your information before proceeding to the official GST portal for final submission.
        </p>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Business Information</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>PAN:</strong> {formData.pan || 'Not provided'}</p>
              <p><strong>Legal Name:</strong> {formData.legalName || 'Not provided'}</p>
              <p><strong>Trade Name:</strong> {formData.tradeName || 'Not provided'}</p>
              <p><strong>Constitution:</strong> {formData.constitution || 'Not provided'}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Contact Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
              <p><strong>Mobile:</strong> {formData.mobile || 'Not provided'}</p>
              <p><strong>Aadhaar:</strong> {formData.aadhaar ? '****-****-' + formData.aadhaar.slice(-4) : 'Not provided'}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Principal Address</h3>
            <div className="text-sm text-gray-600">
              {formData.principalAddress ? (
                <p>
                  {formData.principalAddress.buildingNo}, {formData.principalAddress.street}<br />
                  {formData.principalAddress.locality}<br />
                  {formData.principalAddress.city}, {formData.principalAddress.state}<br />
                  PIN: {formData.principalAddress.pincode}
                </p>
              ) : (
                <p>Not provided</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Bank Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Account:</strong> {formData.bankDetails?.accountNumber ? '****' + formData.bankDetails.accountNumber.slice(-4) : 'Not provided'}</p>
              <p><strong>Bank:</strong> {formData.bankDetails?.bankName || 'Not provided'}</p>
              <p><strong>IFSC:</strong> {formData.bankDetails?.ifscCode || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><strong>Additional Places:</strong> {formData.additionalPlaces?.length || 0} locations</p>
              <p><strong>Promoters:</strong> {formData.promoters?.length || 0} persons</p>
            </div>
            <div>
              <p><strong>Authorized Signatory:</strong> {formData.authorizedSignatory?.name || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-green-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">1.</span>
                  <span>Click "Finish & Go to GST Portal" to access the official government portal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">2.</span>
                  <span>Upload required documents (PAN card, address proof, bank certificate, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">3.</span>
                  <span>Pay the GST registration fees (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">4.</span>
                  <span>Submit your application and wait for verification (3-7 working days)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">5.</span>
                  <span>Receive your GSTIN (GST Identification Number) upon approval</span>
                </li>
              </ul>
            </div>
          </div>
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
          onClick={handleFinish}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 font-semibold"
        >
          Finish & Go to GST Portal
          <ExternalLink className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default VerificationSubmitStep;