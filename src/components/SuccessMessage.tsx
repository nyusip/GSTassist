import * as React from 'react';
// import { useState } from 'react';

interface SuccessMessageProps {
  trn: string | null;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ trn }) => {
  if (!trn) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p className="font-bold">Generating TRN...</p>
      </div>
    );
  }

  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
      <p className="font-bold">Success!</p>
      <p>Your Temporary Reference Number (TRN) is {trn}. Use this to complete Part B within 15 days.</p>
    </div>
  );
};

export default SuccessMessage;
