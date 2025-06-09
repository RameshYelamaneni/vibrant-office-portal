
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Dashboard from '../components/modules/Dashboard';
import EmployeeManagement from '../components/modules/EmployeeManagement';
import TimesheetManagement from '../components/modules/TimesheetManagement';
import MarketingManagement from '../components/modules/MarketingManagement';
import CompanyDocuments from '../components/modules/CompanyDocuments';
import HROperations from '../components/modules/HROperations';
import EmailSetup from '../components/modules/EmailSetup';
import Settings from '../components/modules/Settings';
import LoginPage from '../components/auth/LoginPage';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setActiveModule('dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">CP</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard userRole={currentUser.role} />;
      case 'employees':
        return <EmployeeManagement />;
      case 'timesheet':
        return <TimesheetManagement />;
      case 'marketing':
        return <MarketingManagement />;
      case 'documents':
        return <CompanyDocuments />;
      case 'hr':
        return <HROperations />;
      case 'email':
        return <EmailSetup />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard userRole={currentUser.role} />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 md:z-auto
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:block
      `}>
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={(module) => {
            setActiveModule(module);
            setSidebarOpen(false); // Close mobile sidebar when item is selected
          }}
          userRole={currentUser.role}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header with hamburger */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">Office Portal</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Desktop header */}
        <div className="hidden md:block">
          <Header user={currentUser} onLogout={handleLogout} />
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
