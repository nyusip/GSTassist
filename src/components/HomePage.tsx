import React, { useState } from 'react';
import { FilePenLine, Bell, Folder, MessageCircle, X, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onStartRegistration: () => void;
  onShowReminders: () => void;
  onShowDocumentRepository: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartRegistration, onShowReminders, onShowDocumentRepository }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { t } = useLanguage();

  const features = [
    {
      icon: <FilePenLine className="h-8 w-8 text-white" />,
      title: t('homepage.features.feature1_title'),
      description: t('homepage.features.feature1_desc'),
      action: onStartRegistration,
    },
    {
      icon: <Bell className="h-8 w-8 text-white" />,
      title: t('homepage.features.feature2_title'),
      description: t('homepage.features.feature2_desc'),
      action: onShowReminders,
    },
    {
      icon: <Folder className="h-8 w-8 text-white" />,
      title: t('homepage.features.feature3_title'),
      description: t('homepage.features.feature3_desc'),
      action: onShowDocumentRepository,
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      title: t('homepage.features.feature4_title'),
      description: t('homepage.features.feature4_desc'),
      action: () => setIsChatbotOpen(true),
    },
  ];

  const testimonials = [
    {
      quote: t('homepage.testimonials.testimonial1_quote'),
      name: t('homepage.testimonials.testimonial1_name'),
      title: t('homepage.testimonials.testimonial1_title'),
    },
    {
      quote: t('homepage.testimonials.testimonial2_quote'),
      name: t('homepage.testimonials.testimonial2_name'),
      title: t('homepage.testimonials.testimonial2_title'),
    },
     {
      quote: t('homepage.testimonials.testimonial3_quote'),
      name: t('homepage.testimonials.testimonial3_name'),
      title: t('homepage.testimonials.testimonial3_title'),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t('homepage.hero.title')}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            {t('homepage.hero.subtitle')}
          </p>
          <button
            onClick={onStartRegistration}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            {t('homepage.hero.cta')} <ArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{t('homepage.howItWorks.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{t('homepage.howItWorks.subtitle')}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="flex items-center flex-col text-center">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{t('homepage.howItWorks.step1_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">{t('homepage.howItWorks.step1_desc')}</p>
            </div>
            <div className="text-gray-400 hidden md:block">→</div>
            <div className="flex items-center flex-col text-center">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{t('homepage.howItWorks.step2_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">{t('homepage.howItWorks.step2_desc')}</p>
            </div>
            <div className="text-gray-400 hidden md:block">→</div>
            <div className="flex items-center flex-col text-center">
              <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{t('homepage.howItWorks.step3_title')}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">{t('homepage.howItWorks.step3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{t('homepage.features.title')}</h2>
             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{t('homepage.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center"
                onClick={feature.action}
              >
                <div className="bg-blue-700 rounded-full p-4 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{t('homepage.testimonials.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('homepage.finalCta.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            {t('homepage.finalCta.subtitle')}
          </p>
          <button
            onClick={onStartRegistration}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            {t('homepage.finalCta.cta')}
          </button>
        </div>
      </section>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg h-2/3 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('homepage.chatbot.title')}</h3>
              <button onClick={() => setIsChatbotOpen(false)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow">
              <iframe
                src="https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/01/08/20250901081839-TX2K5EY7.json"
                className="w-full h-full border-0"
                title={t('homepage.chatbot.title')}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
