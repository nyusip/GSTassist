import React from 'react';
import { FilePenLine, Bot, Newspaper, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageProps {
  onStartRegistration: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartRegistration }) => {
  const { t } = useLanguage();

  const announcements = [
    { id: 1, text: "CBIC introduces new electronic verification system for GST returns.", date: "2 days ago" },
    { id: 2, text: "Deadline for filing GSTR-3B for the month of July extended to August 25th.", date: "1 week ago" },
    { id: 3, text: "New guidelines issued for claiming input tax credit (ITC).", date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen pt-26 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              {t('landing.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {t('landing.subtitle')}
            </p>
            <button
              onClick={onStartRegistration}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 text-lg inline-flex items-center shadow-lg hover:shadow-xl"
            >
              <FilePenLine className="h-5 w-5 mr-3" />
              Start New Registration
            </button>
          </div>
        </section>

        {/* Key Services & Announcements */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">

              {/* Key Services */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Key Services</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                    <FilePenLine className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Digital GST Registration</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">A streamlined digital process for new GST registration and return filing.</p>
                    <button 
                      onClick={onStartRegistration}
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      Start Now <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                    <Bot className="h-10 w-10 text-green-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Chat Assistant</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">24/7 AI-powered assistance for your GST-related questions and guidance.</p>
                    <button 
                      onClick={() => {
                        window.open('https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/01/08/20250901081839-TX2K5EY7.json', '_blank', 'width=400,height=600');
                      }}
                      className="font-semibold text-green-600 dark:text-green-400 hover:underline flex items-center"
                    >
                      Ask a Question <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Newspaper className="h-6 w-6 mr-3 text-orange-500" />
                  Announcements
                </h2>
                <ul className="space-y-4">
                  {announcements.map(ann => (
                    <li key={ann.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-200">{ann.text}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{ann.date}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">View all</button>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">&copy; 2025 GST Registration Portal, Government of India. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-sm text-gray-500 hover:underline">About</a>
            <a href="#" className="text-sm text-gray-500 hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;