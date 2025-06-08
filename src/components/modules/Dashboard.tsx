
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Target, FileText, TrendingUp, AlertCircle, Plus, Eye, Upload } from "lucide-react";

interface DashboardProps {
  userRole: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  module: string;
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const stats = [
    { title: "Total Employees", value: "124", icon: Users, color: "bg-blue-500" },
    { title: "Pending Timesheets", value: "18", icon: Clock, color: "bg-yellow-500" },
    { title: "Marketing Candidates", value: "45", icon: Target, color: "bg-green-500" },
    { title: "Documents", value: "89", icon: FileText, color: "bg-purple-500" },
  ];

  const recentActivities = [
    { type: "Employee", message: "New employee John Doe added", time: "2 hours ago" },
    { type: "Timesheet", message: "Timesheet approved for Sarah Wilson", time: "4 hours ago" },
    { type: "Marketing", message: "Interview scheduled for candidate Alex Brown", time: "6 hours ago" },
    { type: "Document", message: "Company policy updated", time: "1 day ago" },
  ];

  const handleModuleNavigation = (module: string) => {
    // Trigger module change by dispatching a custom event
    const event = new CustomEvent('moduleChange', { detail: module });
    window.dispatchEvent(event);
  };

  const quickActions: QuickAction[] = [
    {
      title: "Add New Employee",
      description: "Quickly add a new team member",
      icon: Plus,
      action: () => handleModuleNavigation('employees'),
      module: 'employees'
    },
    {
      title: "Create Timesheet",
      description: "Add a new timesheet entry",
      icon: Clock,
      action: () => handleModuleNavigation('timesheet'),
      module: 'timesheet'
    },
    {
      title: "Review Applications",
      description: "Check pending marketing applications",
      icon: Eye,
      action: () => handleModuleNavigation('marketing'),
      module: 'marketing'
    },
    {
      title: "Upload Documents",
      description: "Add company documents",
      icon: Upload,
      action: () => handleModuleNavigation('documents'),
      module: 'documents'
    }
  ];

  const hasAccess = (module: string): boolean => {
    const permissions = {
      'Admin': ['employees', 'timesheet', 'marketing', 'documents'],
      'Manager': ['employees', 'timesheet', 'marketing', 'documents'],
      'Employee': ['timesheet'],
      'HR': ['employees', 'timesheet', 'documents'],
      'Marketing Associate': ['timesheet', 'marketing']
    };

    return permissions[userRole as keyof typeof permissions]?.includes(module) || false;
  };

  const accessibleActions = quickActions.filter(action => hasAccess(action.module));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {userRole}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accessibleActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-4 h-auto justify-start hover:bg-gray-50 transition-colors"
                    onClick={action.action}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
