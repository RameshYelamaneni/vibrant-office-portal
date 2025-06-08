
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Target, FileText, TrendingUp, AlertCircle } from "lucide-react";

interface DashboardProps {
  userRole: string;
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
              <button className="w-full p-3 text-left rounded-lg border hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Add New Employee</p>
                <p className="text-sm text-gray-500">Quickly add a new team member</p>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Review Timesheets</p>
                <p className="text-sm text-gray-500">Check pending timesheet approvals</p>
              </button>
              <button className="w-full p-3 text-left rounded-lg border hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Upload Documents</p>
                <p className="text-sm text-gray-500">Add company documents</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
