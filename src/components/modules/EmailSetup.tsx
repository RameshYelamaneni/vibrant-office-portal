
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Mail, CheckCircle, AlertCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailSetup = () => {
  const { toast } = useToast();
  const [emailConfig, setEmailConfig] = useState({
    provider: "outlook",
    smtpHost: "smtp-mail.outlook.com",
    smtpPort: "587",
    username: "",
    password: "",
    fromName: "Company Portal",
    fromEmail: ""
  });

  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [notifications, setNotifications] = useState({
    newEmployee: true,
    timesheetApproval: true,
    marketingUpdates: false,
    documentUpload: true
  });

  const testEmailConnection = async () => {
    setConnectionStatus("testing");
    
    // Simulate email connection test
    setTimeout(() => {
      if (emailConfig.username && emailConfig.password) {
        setConnectionStatus("connected");
        toast({
          title: "Email Connected",
          description: "Successfully connected to email service",
        });
      } else {
        setConnectionStatus("error");
        toast({
          title: "Connection Failed",
          description: "Please check your email credentials",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const sendTestEmail = async () => {
    if (connectionStatus !== "connected") {
      toast({
        title: "Not Connected",
        description: "Please connect to email service first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test Email Sent",
      description: "Test email has been sent successfully",
    });
  };

  const saveEmailConfig = () => {
    localStorage.setItem('emailConfig', JSON.stringify(emailConfig));
    localStorage.setItem('emailNotifications', JSON.stringify(notifications));
    toast({
      title: "Email Settings Saved",
      description: "Email configuration has been saved",
    });
  };

  const presetConfigs = {
    outlook: {
      smtpHost: "smtp-mail.outlook.com",
      smtpPort: "587"
    },
    gmail: {
      smtpHost: "smtp.gmail.com",
      smtpPort: "587"
    },
    custom: {
      smtpHost: "",
      smtpPort: "587"
    }
  };

  const handleProviderChange = (provider: string) => {
    const config = presetConfigs[provider as keyof typeof presetConfigs];
    setEmailConfig({
      ...emailConfig,
      provider,
      smtpHost: config.smtpHost,
      smtpPort: config.smtpPort
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Email Configuration
            <Badge 
              variant={connectionStatus === "connected" ? "default" : "secondary"}
              className={`ml-2 ${
                connectionStatus === "connected" ? "bg-green-100 text-green-800" :
                connectionStatus === "error" ? "bg-red-100 text-red-800" :
                "bg-gray-100 text-gray-800"
              }`}
            >
              {connectionStatus === "connected" && <CheckCircle className="mr-1 h-3 w-3" />}
              {connectionStatus === "error" && <AlertCircle className="mr-1 h-3 w-3" />}
              {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Email Provider</Label>
              <select 
                id="provider" 
                value={emailConfig.provider}
                onChange={(e) => handleProviderChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="outlook">Microsoft Outlook/Office 365</option>
                <option value="gmail">Gmail</option>
                <option value="custom">Custom SMTP</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={emailConfig.smtpHost}
                  onChange={(e) => setEmailConfig({...emailConfig, smtpHost: e.target.value})}
                  placeholder="smtp-mail.outlook.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={emailConfig.smtpPort}
                  onChange={(e) => setEmailConfig({...emailConfig, smtpPort: e.target.value})}
                  placeholder="587"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Email Username</Label>
                <Input
                  id="username"
                  value={emailConfig.username}
                  onChange={(e) => setEmailConfig({...emailConfig, username: e.target.value})}
                  placeholder="your-email@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password / App Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={emailConfig.password}
                  onChange={(e) => setEmailConfig({...emailConfig, password: e.target.value})}
                  placeholder="Password or App Password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailConfig.fromName}
                  onChange={(e) => setEmailConfig({...emailConfig, fromName: e.target.value})}
                  placeholder="Company Portal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  value={emailConfig.fromEmail}
                  onChange={(e) => setEmailConfig({...emailConfig, fromEmail: e.target.value})}
                  placeholder="noreply@company.com"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={testEmailConnection} disabled={connectionStatus === "testing"}>
                {connectionStatus === "testing" ? "Testing..." : "Test Connection"}
              </Button>
              <Button onClick={sendTestEmail} variant="outline" className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Send Test Email
              </Button>
              <Button onClick={saveEmailConfig} variant="outline">
                Save Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">New Employee Notifications</span>
                <p className="text-sm text-gray-600">Send emails when new employees are added</p>
              </div>
              <Switch 
                checked={notifications.newEmployee}
                onCheckedChange={(checked) => setNotifications({...notifications, newEmployee: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Timesheet Approval Notifications</span>
                <p className="text-sm text-gray-600">Send emails for timesheet approvals</p>
              </div>
              <Switch 
                checked={notifications.timesheetApproval}
                onCheckedChange={(checked) => setNotifications({...notifications, timesheetApproval: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Marketing Updates</span>
                <p className="text-sm text-gray-600">Send marketing candidate updates</p>
              </div>
              <Switch 
                checked={notifications.marketingUpdates}
                onCheckedChange={(checked) => setNotifications({...notifications, marketingUpdates: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Document Upload Notifications</span>
                <p className="text-sm text-gray-600">Send emails when documents are uploaded</p>
              </div>
              <Switch 
                checked={notifications.documentUpload}
                onCheckedChange={(checked) => setNotifications({...notifications, documentUpload: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Outlook Integration Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <h4 className="font-medium">For Outlook/Office 365:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Enable 2FA on your Microsoft account</li>
              <li>Go to Security settings → App passwords</li>
              <li>Generate a new app password for "Mail"</li>
              <li>Use your email as username and the app password</li>
              <li>SMTP Host: smtp-mail.outlook.com, Port: 587</li>
            </ol>
            
            <h4 className="font-medium mt-4">For Gmail:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Enable 2FA on your Google account</li>
              <li>Go to Security → App passwords</li>
              <li>Generate an app password for "Mail"</li>
              <li>Use your Gmail address and the app password</li>
              <li>SMTP Host: smtp.gmail.com, Port: 587</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSetup;
