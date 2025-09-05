import React from 'react';
import { Bell, Calendar, CheckCircle } from 'lucide-react';

const RemindersPage: React.FC = () => {
  const upcomingReminders = [
    {
      id: 1,
      title: 'GSTR-3B Filing',
      dueDate: '20th Oct 2024',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'GSTR-1 Filing',
      dueDate: '11th Oct 2024',
      status: 'Filed',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      description: 'GSTR-1 for Sep 2024 filed successfully.',
      timestamp: '2 days ago',
    },
    {
      id: 2,
      description: 'Reminder for GSTR-3B for Sep 2024 sent.',
      timestamp: '3 days ago',
    },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tax & Compliance Reminders</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Stay on top of your GST obligations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upcoming Reminders */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calendar className="h-7 w-7 mr-3 text-blue-600" />
              Upcoming Deadlines
            </h2>
            <ul className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <li key={reminder.id} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{reminder.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {reminder.dueDate}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${reminder.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {reminder.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Bell className="h-7 w-7 mr-3 text-blue-600" />
              Recent Activity
            </h2>
            <ul className="space-y-4">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 dark:text-white">{activity.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;