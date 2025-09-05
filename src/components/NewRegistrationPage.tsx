import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import OTPVerificationPage from './OTPVerificationPage';
import { useState, useEffect } from 'react';
import AIPoweredGuidance from './AIPoweredGuidance';

const NewRegistrationPage: React.FC = () => {
  const [registrationType, setRegistrationType] = useState('new');
  const [userType, setUserType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [pan, setPan] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationType === 'trn') {
      navigate('/trn-login');
    }
  }, [registrationType, navigate]);

  const userTypes = [
    'Taxpayer',
    'Tax Deductor',
    'Tax Collector (e-Commerce)',
    'GST Practitioner',
    'United Nation Body',
    'Consulate or Embassy of Foreign Country',
    'Other Notified Person',
    'Non-Resident Online Services Provider and/or Non-Resident Online Money Gaming Supplier',
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  const handleFocus = (fieldName: string) => setActiveField(fieldName);
  const handleBlur = () => setActiveField(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtp(true);
  };

  if (showOtp) {
    return <OTPVerificationPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left side: Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">GST Registration</h2>
          <p className="text-gray-500 mb-8">
            {registrationType === 'new' ? 'Part A: New Registration' : 'Temporary Reference Number (TRN)'}
          </p>

          <div className="flex items-center mb-8">
            <label className="flex items-center cursor-pointer mr-6">
              <input
                type="radio"
                name="registrationType"
                value="new"
                checked={registrationType === 'new'}
                onChange={(e) => setRegistrationType(e.target.value)}
                className="hidden"
              />
              <span className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${registrationType === 'new' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}>
                New Registration
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="registrationType"
                value="trn"
                checked={registrationType === 'trn'}
                onChange={(e) => setRegistrationType(e.target.value)}
                className="hidden"
              />
              <span className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${registrationType === 'trn' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'}`}>
                TRN Login
              </span>
            </label>
          </div>

          {registrationType === 'new' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                  <select
                    id="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    onFocus={() => handleFocus('userType')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  >
                    <option value="">Select</option>
                    {userTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/UT</label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    onFocus={() => handleFocus('state')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required>
                    <option value="">Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input
                  type="text"
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  onFocus={() => handleFocus('district')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Legal Name of the Business (As per PAN)</label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  onFocus={() => handleFocus('businessName')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">Permanent Account Number (PAN)</label>
                <input
                  type="text"
                  id="pan"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  onFocus={() => handleFocus('pan')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    onFocus={() => handleFocus('mobile')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                 <button 
                  type="submit"
                  onFocus={() => handleFocus('proceed')}
                  onBlur={handleBlur}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Proceed to OTP Verification
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right side: AI Guidance */}
        <div className="bg-blue-50 p-8 md:p-12 flex flex-col justify-center">
          <AIPoweredGuidance activeField={activeField} />
        </div>

      </div>
    </div>
  );
};

export default NewRegistrationPage;
