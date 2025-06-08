
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  Target, 
  FileText, 
  UserCog, 
  Mail, 
  MessageCircle, 
  Settings,
  LayoutDashboard
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  userRole: string;
}

const Sidebar = ({ activeModule, onModuleChange, userRole }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Manager', 'Employee', 'HR', 'Marketing Associate'] },
    { id: 'employees', label: 'Employee Management', icon: Users, roles: ['Admin', 'Manager', 'HR'] },
    { id: 'timesheet', label: 'Timesheet Management', icon: Clock, roles: ['Admin', 'Manager', 'Employee', 'HR'] },
    { id: 'marketing', label: 'Marketing Management', icon: Target, roles: ['Admin', 'Manager', 'Marketing Associate'] },
    { id: 'documents', label: 'Company Documents', icon: FileText, roles: ['Admin', 'Manager', 'HR'] },
    { id: 'hr', label: 'HR Operations', icon: UserCog, roles: ['Admin', 'HR'] },
    { id: 'email', label: 'Email Management', icon: Mail, roles: ['Admin', 'Manager', 'HR', 'Marketing Associate'] },
    { id: 'chat', label: 'Internal Chat', icon: MessageCircle, roles: ['Admin', 'Manager', 'Employee', 'HR', 'Marketing Associate'] },
    { id: 'settings', label: 'Roles & Settings', icon: Settings, roles: ['Admin'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-full md:w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-3 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Navigation</h2>
        <nav className="space-y-1 md:space-y-2">
          {filteredItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeModule === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left text-xs md:text-sm p-2 md:p-3 ${
                  activeModule === item.id 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => onModuleChange(item.id)}
              >
                <IconComponent className="mr-2 md:mr-3 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
