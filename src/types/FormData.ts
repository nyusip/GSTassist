export interface FormData {
  // PAN Verification
  pan?: string;
  
  // Email & Mobile OTP
  email?: string;
  mobile?: string;
  emailOtp?: string;
  mobileOtp?: string;
  
  // Aadhaar Authentication
  aadhaar?: string;
  aadhaarOtp?: string;
  
  // Business Details
  legalName?: string;
  tradeName?: string;
  constitution?: string;
  
  // Principal Place of Business
  principalAddress?: {
    buildingNo?: string;
    street?: string;
    locality?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  
  // Additional Places of Business
  additionalPlaces?: Array<{
    type: string;
    address: string;
  }>;
  
  // Promoter/Partner Details
  promoters?: Array<{
    name: string;
    pan: string;
    designation: string;
  }>;
  
  // Authorized Signatory
  authorizedSignatory?: {
    name?: string;
    designation?: string;
    pan?: string;
    mobile?: string;
    email?: string;
  };
  
  // Bank Account Details
  bankDetails?: {
    accountNumber?: string;
    bankName?: string;
    branch?: string;
    ifscCode?: string;
  };
}