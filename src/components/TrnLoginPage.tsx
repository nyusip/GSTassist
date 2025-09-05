import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrnLoginPage: React.FC = () => {
  const [trn, setTrn] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation
    if (trn && otp) {
      navigate('/wizard');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">TRN Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="trn" className="block text-gray-700 font-bold mb-2">Temporary Reference Number (TRN)</label>
            <input
              type="text"
              id="trn"
              value={trn}
              onChange={(e) => setTrn(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">OTP</label>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrnLoginPage;
