
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Shield, Database, Mail } from "lucide-react";

const SettingsModule = () => {
  const [roles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: {
        employees: { view: true, add: true, edit: true, delete: true },
        timesheet: { view: true, add: true, edit: true, delete: true },
        marketing: { view: true, add: true, edit: true, delete: true },
        documents: { view: true, add: true, edit: true, delete: true },
        hr: { view: true, add: true, edit: true, delete: true },
        settings: { view: true, add: true, edit: true, delete: true }
      },
      userCount: 2
    },
    {
      id: 2,
      name: "Manager",
      permissions: {
        employees: { view: true, add: true, edit: true, delete: false },
        timesheet: { view: true, add: false, edit: true, delete: false },
        marketing: { view: true, add: true, edit: true, delete: false },
        documents: { view: true, add: true, edit: false, delete: false },
        hr: { view: false, add: false, edit: false, delete: false },
        settings: { view: false, add: false, edit: false, delete: false }
      },
      userCount: 5
    },
    {
      id: 3,
      name: "Employee",
      permissions: {
        employees: { view: false, add: false, edit: false, delete: false },
        timesheet: { view: true, add: true, edit: true, delete: false },
        marketing: { view: false, add: false, edit: false, delete: false },
        documents: { view: true, add: false, edit: false, delete: false },
        hr: { view: false, add: false, edit: false, delete: false },
        settings: { view: false, add: false, edit: false, delete: false }
      },
      userCount: 45
    },
    {
      id: 4,
      name: "HR",
      permissions: {
        employees: { view: true, add: true, edit: true, delete: false },
        timesheet: { view: true, add: false, edit: false, delete: false },
        marketing: { view: false, add: false, edit: false, delete: false },
        documents: { view: true, add: true, edit: true, delete: false },
        hr: { view: true, add: true, edit: true, delete: true },
        settings: { view: false, add: false, edit: false, delete: false }
      },
      userCount: 3
    },
    {
      id: 5,
      name: "Marketing Associate",
      permissions: {
        employees: { view: false, add: false, edit: false, delete: false },
        timesheet: { view: true, add: true, edit: true, delete: false },
        marketing: { view: true, add: true, edit: true, delete: false },
        documents: { view: true, add: false, edit: false, delete: false },
        hr: { view: false, add: false, edit: false, delete: false },
        settings: { view: false, add: false, edit: false, delete: false }
      },
      userCount: 8
    }
  ]);

  const [dbConfig, setDbConfig] = useState({
    host: "localhost",
    port: "5432",
    database: "company_portal",
    username: "admin",
    password: "********"
  });

  const modules = [
    { key: 'employees', label: 'Employee Management' },
    { key: 'timesheet', label: 'Timesheet Management' },
    { key: 'marketing', label: 'Marketing Management' },
    { key: 'documents', label: 'Company Documents' },
    { key: 'hr', label: 'HR Operations' },
    { key: 'settings', label: 'Settings' }
  ];

  const permissionTypes = [
    { key: 'view', label: 'View' },
    { key: 'add', label: 'Add' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Roles & Settings</h1>
        <Button className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Add New Role</span>
        </Button>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="database">Database Configuration</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Role Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {roles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg text-center">
                      <h3 className="font-semibold text-lg">{role.name}</h3>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{role.userCount}</p>
                      <p className="text-sm text-gray-600">users</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Module</th>
                        {roles.map((role) => (
                          <th key={role.id} className="text-center p-3 font-semibold">
                            {role.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map((module) => (
                        <tr key={module.key} className="border-b">
                          <td className="p-3 font-medium">{module.label}</td>
                          {roles.map((role) => (
                            <td key={role.id} className="p-3 text-center">
                              <div className="space-y-1">
                                {permissionTypes.map((perm) => {
                                  const hasPermission = role.permissions[module.key]?.[perm.key];
                                  return (
                                    <Badge
                                      key={perm.key}
                                      variant={hasPermission ? "default" : "secondary"}
                                      className={`text-xs mr-1 ${
                                        hasPermission 
                                          ? "bg-green-100 text-green-800" 
                                          : "bg-gray-100 text-gray-500"
                                      }`}
                                    >
                                      {perm.label}
                                    </Badge>
                                  );
                                })}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dbHost">Database Host</Label>
                    <Input
                      id="dbHost"
                      value={dbConfig.host}
                      onChange={(e) => setDbConfig({...dbConfig, host: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbPort">Port</Label>
                    <Input
                      id="dbPort"
                      value={dbConfig.port}
                      onChange={(e) => setDbConfig({...dbConfig, port: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbName">Database Name</Label>
                    <Input
                      id="dbName"
                      value={dbConfig.database}
                      onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbUser">Username</Label>
                    <Input
                      id="dbUser"
                      value={dbConfig.username}
                      onChange={(e) => setDbConfig({...dbConfig, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbPassword">Password</Label>
                    <Input
                      id="dbPassword"
                      type="password"
                      value={dbConfig.password}
                      onChange={(e) => setDbConfig({...dbConfig, password: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Table Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employees Table</Label>
                      <Input value="employees" placeholder="Table name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Timesheets Table</Label>
                      <Input value="timesheets" placeholder="Table name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Marketing Candidates Table</Label>
                      <Input value="marketing_candidates" placeholder="Table name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Documents Table</Label>
                      <Input value="documents" placeholder="Table name" />
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button>Test Connection</Button>
                  <Button variant="outline">Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailProvider">Email Provider</Label>
                    <select id="emailProvider" className="w-full px-3 py-2 border rounded-md">
                      <option value="outlook">Microsoft Outlook</option>
                      <option value="gmail">Gmail</option>
                      <option value="smtp">Custom SMTP</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input id="smtpHost" placeholder="smtp.office365.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input id="smtpPort" placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailUser">Email Username</Label>
                    <Input id="emailUser" placeholder="your-email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailPassword">Email Password</Label>
                    <Input id="emailPassword" type="password" placeholder="Password or App Password" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>New Employee Notifications</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Timesheet Approval Notifications</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Marketing Updates</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Document Upload Notifications</span>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button>Test Email</Button>
                  <Button variant="outline">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">General Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Maintenance Mode</span>
                        <p className="text-sm text-gray-600">Enable to restrict access during updates</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Auto Backup</span>
                        <p className="text-sm text-gray-600">Automatically backup data daily</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Two-Factor Authentication</span>
                        <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Export & Import</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Database className="h-6 w-6 mb-2" />
                      Export Database
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      Export User Data
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Download Complete Project</h3>
                  <p className="text-sm text-gray-600">
                    Download the complete portal with source code, database schema, and documentation.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Download Project Package
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;
