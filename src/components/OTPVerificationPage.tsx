import * as React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [trn, setTrn] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP verification
    const generatedTrn = `TRN${Math.random().toString().slice(2, 12)}`;
    setTrn(generatedTrn);
  };

  const handleProceedToLogin = () => {
    navigate('/trn-login');
  };

  if (trn) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">TRN Generated Successfully</h2>
          <p className="text-gray-700 mb-4">Your TRN is <span className="font-bold">{trn}</span>.</p>
          <p className="text-gray-600 mb-6">Please use this to continue registration within 15 days.</p>
          <button 
            onClick={handleProceedToLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Proceed to TRN Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
