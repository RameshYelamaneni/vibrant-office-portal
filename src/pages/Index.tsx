
import React, { useState, useEffect } from 'react';
import LoginPage from '../components/auth/LoginPage';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Dashboard from '../components/modules/Dashboard';
import EmployeeManagement from '../components/modules/EmployeeManagement';
import TimesheetManagement from '../components/modules/TimesheetManagement';
import MarketingManagement from '../components/modules/MarketingManagement';
import CompanyDocuments from '../components/modules/CompanyDocuments';
import SettingsModule from '../components/modules/Settings';

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setActiveModule('dashboard');
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard userRole={user?.role} />;
      case 'employees':
        return <EmployeeManagement />;
      case 'timesheet':
        return <TimesheetManagement />;
      case 'marketing':
        return <MarketingManagement />;
      case 'documents':
        return <CompanyDocuments />;
      case 'hr':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">HR Operations</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Coming Soon</h2>
              <p className="text-blue-700">
                Complete HR management module including recruitment, onboarding, performance reviews, 
                benefits management, and employee relations will be available soon.
              </p>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Email Management</h1>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Email Integration</h2>
              <p className="text-green-700">
                Connect with Outlook or configure custom email service. Email management features 
                including templates, bulk sending, and integration with other modules coming soon.
              </p>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Internal Chat</h1>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">Team Communication</h2>
              <p className="text-purple-700">
                Real-time internal messaging system for team communication, file sharing, 
                and collaboration features will be available soon.
              </p>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard userRole={user?.role} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        userRole={user.role}
      />
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
