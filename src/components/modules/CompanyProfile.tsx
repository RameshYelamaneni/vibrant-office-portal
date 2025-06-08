
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Upload, Save, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompanyProfile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [companySettings, setCompanySettings] = useState({
    companyName: "Company Portal",
    companyLogo: "/placeholder.svg",
    primaryColor: "#3B82F6",
    secondaryColor: "#1F2937",
    accentColor: "#10B981",
    headerBg: "#FFFFFF",
    sidebarBg: "#1F2937"
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCompanySettings({...companySettings, companyLogo: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('companySettings', JSON.stringify(companySettings));
    
    // Apply theme changes to document
    const root = document.documentElement;
    root.style.setProperty('--primary', companySettings.primaryColor);
    root.style.setProperty('--secondary', companySettings.secondaryColor);
    root.style.setProperty('--accent', companySettings.accentColor);
    
    toast({
      title: "Settings Saved",
      description: "Company profile settings have been saved successfully",
    });
  };

  const resetToDefault = () => {
    setCompanySettings({
      companyName: "Company Portal",
      companyLogo: "/placeholder.svg",
      primaryColor: "#3B82F6",
      secondaryColor: "#1F2937",
      accentColor: "#10B981",
      headerBg: "#FFFFFF",
      sidebarBg: "#1F2937"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={companySettings.companyLogo} alt="Company Logo" />
                    <AvatarFallback className="text-2xl">CP</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companySettings.companyName}
                onChange={(e) => setCompanySettings({...companySettings, companyName: e.target.value})}
                placeholder="Enter company name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Theme Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={companySettings.primaryColor}
                    onChange={(e) => setCompanySettings({...companySettings, primaryColor: e.target.value})}
                    className="w-16 h-10"
                  />
                  <Input
                    value={companySettings.primaryColor}
                    onChange={(e) => setCompanySettings({...companySettings, primaryColor: e.target.value})}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={companySettings.secondaryColor}
                    onChange={(e) => setCompanySettings({...companySettings, secondaryColor: e.target.value})}
                    className="w-16 h-10"
                  />
                  <Input
                    value={companySettings.secondaryColor}
                    onChange={(e) => setCompanySettings({...companySettings, secondaryColor: e.target.value})}
                    placeholder="#1F2937"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={companySettings.accentColor}
                    onChange={(e) => setCompanySettings({...companySettings, accentColor: e.target.value})}
                    className="w-16 h-10"
                  />
                  <Input
                    value={companySettings.accentColor}
                    onChange={(e) => setCompanySettings({...companySettings, accentColor: e.target.value})}
                    placeholder="#10B981"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Preview</h3>
                <div className="space-y-2">
                  <div 
                    className="h-8 rounded flex items-center px-3 text-white text-sm"
                    style={{ backgroundColor: companySettings.primaryColor }}
                  >
                    Primary Color
                  </div>
                  <div 
                    className="h-8 rounded flex items-center px-3 text-white text-sm"
                    style={{ backgroundColor: companySettings.secondaryColor }}
                  >
                    Secondary Color
                  </div>
                  <div 
                    className="h-8 rounded flex items-center px-3 text-white text-sm"
                    style={{ backgroundColor: companySettings.accentColor }}
                  >
                    Accent Color
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button onClick={saveSettings} className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
        <Button onClick={resetToDefault} variant="outline">
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default CompanyProfile;
