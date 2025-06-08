import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Shield, Database, Mail, Building2, Download } from "lucide-react";
import DatabaseSetup from './DatabaseSetup';
import CompanyProfile from './CompanyProfile';
import EmailSetup from './EmailSetup';

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

  const downloadProject = () => {
    // Create a comprehensive project structure
    const projectFiles = {
      'README.md': `# Company Portal

A comprehensive company management system built with React, TypeScript, and Tailwind CSS.

## Features
- Employee Management
- Timesheet Management
- Marketing Management
- Document Management
- Role-based Access Control
- Email Integration (Outlook/Gmail)
- Database Configuration
- Company Branding

## Setup Instructions

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Configure database connection in Settings → Database Configuration

3. Import the provided SQL schema into your database

4. Configure email settings in Settings → Email Configuration

5. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

## Database Setup

Import the \`company_portal_schema.sql\` file into your MySQL/PostgreSQL database.

## Email Configuration

For Outlook/Office 365, you'll need to generate an app password.
For Gmail, enable 2FA and create an app password.

## Default Login Credentials

- Admin: admin@company.com / admin123
- Manager: manager@company.com / manager123
- Employee: employee@company.com / employee123
- HR: hr@company.com / hr123

## Environment Configuration

All configuration is done through the web interface:
- Database settings in Settings → Database
- Email settings in Settings → Email
- Company branding in Settings → Company Profile
`,

      'package.json': JSON.stringify({
        "name": "company-portal",
        "version": "1.0.0",
        "description": "A comprehensive company management system",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "tsc && vite build",
          "preview": "vite preview",
          "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
        },
        "dependencies": {
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "react-router-dom": "^6.8.1",
          "@tanstack/react-query": "^4.24.6",
          "lucide-react": "^0.244.0",
          "class-variance-authority": "^0.7.0",
          "clsx": "^2.0.0",
          "tailwind-merge": "^1.14.0"
        },
        "devDependencies": {
          "@types/react": "^18.2.15",
          "@types/react-dom": "^18.2.7",
          "@typescript-eslint/eslint-plugin": "^6.0.0",
          "@typescript-eslint/parser": "^6.0.0",
          "@vitejs/plugin-react": "^4.0.3",
          "autoprefixer": "^10.4.14",
          "eslint": "^8.45.0",
          "eslint-plugin-react-hooks": "^4.6.0",
          "eslint-plugin-react-refresh": "^0.4.3",
          "postcss": "^8.4.27",
          "tailwindcss": "^3.3.3",
          "typescript": "^5.0.2",
          "vite": "^4.4.5"
        }
      }, null, 2),

      'installation-guide.md': `# Installation Guide

## Prerequisites
- Node.js 18+ 
- MySQL or PostgreSQL database
- Email account (Outlook/Gmail) for notifications

## Step-by-Step Installation

### 1. Extract and Setup
\`\`\`bash
# Extract the downloaded ZIP file
# Navigate to the project directory
cd company-portal

# Install dependencies
npm install
\`\`\`

### 2. Database Setup
1. Create a new database named 'company_portal'
2. Import the provided SQL schema:
   \`\`\`sql
   mysql -u username -p company_portal < company_portal_schema.sql
   \`\`\`

### 3. Start the Application
\`\`\`bash
npm run dev
\`\`\`

### 4. Initial Configuration
1. Open http://localhost:3000
2. Login with admin@company.com / admin123
3. Go to Settings → Database Configuration
4. Configure your database connection
5. Go to Settings → Email Configuration
6. Setup email integration
7. Go to Settings → Company Profile
8. Customize your company branding

### 5. Production Build
\`\`\`bash
npm run build
\`\`\`

## Troubleshooting

### Database Connection Issues
- Verify database credentials
- Check if database server is running
- Ensure firewall allows connections

### Email Configuration Issues
- Use app passwords for Gmail/Outlook
- Enable 2FA before generating app passwords
- Check SMTP settings

## Support
For technical support, refer to the documentation or contact your system administrator.
`
    };

    // Create and download the project structure
    const zip = JSON.stringify(projectFiles, null, 2);
    const blob = new Blob([zip], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'company-portal-project.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
        <Button onClick={downloadProject} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4" />
          <span>Download Complete Project</span>
        </Button>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList>
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="database">Database Setup</TabsTrigger>
          <TabsTrigger value="email">Email Configuration</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanyProfile />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseSetup />
        </TabsContent>

        <TabsContent value="email">
          <EmailSetup />
        </TabsContent>

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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;
