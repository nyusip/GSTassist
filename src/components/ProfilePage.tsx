import React, { useState } from 'react';
import { User, Edit3, Save, X, Building, Mail, Phone, MapPin } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    company: 'Kumar Enterprises Pvt Ltd',
    designation: 'Managing Director',
    address: 'Mumbai, Maharashtra',
    gstNumber: 'Not Registered',
    registrationDate: 'N/A'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Profile</h1>
          <p className="text-xl text-gray-600">
            Manage your account information and GST registration details
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-blue-100">{profile.designation}</p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-green-600" />
                  Business Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.company}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.designation}
                        onChange={(e) => handleChange('designation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{profile.designation}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* GST Status */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">GST Registration Status</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-medium text-yellow-800 mb-2">Current Status</h4>
                  <p className="text-2xl font-bold text-yellow-600 mb-2">{profile.gstNumber}</p>
                  <p className="text-sm text-yellow-700">
                    Complete your registration to get your GSTIN
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-medium text-blue-800 mb-2">Registration Date</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{profile.registrationDate}</p>
                  <p className="text-sm text-blue-700">
                    Date when GST registration was completed
                  </p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Actions</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Download Certificate
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                  View Returns
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2025 GST Registration Assistant. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;