import React from 'react';
import { Info, Target, Users, Award, Zap, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Info className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About GST Registration Assistant</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simplifying GST registration and compliance for businesses across India with AI-powered guidance and automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              To democratize GST compliance by making it accessible, understandable, and efficient for businesses of all sizes. 
              We believe that tax compliance should not be a barrier to business growth.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Vision 2025</h3>
              <p className="text-sm text-blue-700">
                Empowering 10 million+ Indian businesses with seamless GST compliance through innovative technology.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Built by a team of experienced tax professionals, software engineers, and AI specialists 
              who understand the challenges faced by Indian businesses in GST compliance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Tax Experts</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">25+</div>
                <div className="text-sm text-gray-600">Engineers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">
                Complete your GST registration in under 30 minutes with our streamlined process.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-600 text-sm">
                Bank-grade security with end-to-end encryption for all your sensitive business data.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Approved</h3>
              <p className="text-gray-600 text-sm">
                Developed in consultation with chartered accountants and tax professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-8">Trusted by Businesses Nationwide</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Registrations Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.8%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-blue-100">User Rating</div>
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

export default AboutPage;