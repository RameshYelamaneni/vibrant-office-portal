
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, Download, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DatabaseSetup = () => {
  const { toast } = useToast();
  const [dbConfig, setDbConfig] = useState({
    host: "localhost",
    port: "5432",
    database: "company_portal",
    username: "admin",
    password: "",
    ssl: false
  });

  const [tableMapping, setTableMapping] = useState({
    employees: "employees",
    timesheets: "timesheets",
    marketing_candidates: "marketing_candidates",
    documents: "documents",
    users: "users",
    roles: "roles"
  });

  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  const testConnection = async () => {
    setConnectionStatus("testing");
    // Simulate connection test
    setTimeout(() => {
      if (dbConfig.host && dbConfig.database && dbConfig.username) {
        setConnectionStatus("connected");
        toast({
          title: "Database Connected",
          description: "Successfully connected to the database",
        });
      } else {
        setConnectionStatus("error");
        toast({
          title: "Connection Failed",
          description: "Please check your database credentials",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const generateSchema = () => {
    const schema = `
-- Company Portal Database Schema
-- Execute this SQL to create the required tables

CREATE DATABASE ${dbConfig.database};
USE ${dbConfig.database};

-- Users table
CREATE TABLE ${tableMapping.users} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE ${tableMapping.employees} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(100),
    department VARCHAR(100),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    join_date DATE,
    profile_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Timesheets table
CREATE TABLE ${tableMapping.timesheets} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    break_duration INT DEFAULT 0,
    total_hours DECIMAL(4,2),
    status ENUM('Draft', 'Submitted', 'Approved', 'Rejected') DEFAULT 'Draft',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES ${tableMapping.employees}(id)
);

-- Marketing candidates table
CREATE TABLE ${tableMapping.marketing_candidates} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    position VARCHAR(100),
    source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'First Contact',
    submissions INT DEFAULT 0,
    interviews INT DEFAULT 0,
    last_contact DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE ${tableMapping.documents} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500),
    file_type VARCHAR(50),
    category VARCHAR(100),
    uploaded_by INT,
    file_size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES ${tableMapping.users}(id)
);

-- Company settings table
CREATE TABLE company_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) DEFAULT 'Company Portal',
    company_logo VARCHAR(500),
    theme_primary_color VARCHAR(7) DEFAULT '#3B82F6',
    theme_secondary_color VARCHAR(7) DEFAULT '#1F2937',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO ${tableMapping.users} (email, password_hash, name, role) VALUES
('admin@company.com', '$2b$10$hash', 'Admin User', 'Admin'),
('manager@company.com', '$2b$10$hash', 'Manager User', 'Manager'),
('employee@company.com', '$2b$10$hash', 'Employee User', 'Employee'),
('hr@company.com', '$2b$10$hash', 'HR User', 'HR');

INSERT INTO company_settings (company_name, company_logo) VALUES
('Company Portal', '/placeholder.svg');
`;

    const blob = new Blob([schema], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'company_portal_schema.sql';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Schema Downloaded",
      description: "Database schema file has been downloaded",
    });
  };

  const saveConfiguration = () => {
    localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
    localStorage.setItem('tableMapping', JSON.stringify(tableMapping));
    toast({
      title: "Configuration Saved",
      description: "Database configuration has been saved",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Database Connection
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">Database Host</Label>
              <Input
                id="host"
                value={dbConfig.host}
                onChange={(e) => setDbConfig({...dbConfig, host: e.target.value})}
                placeholder="localhost or IP address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input
                id="port"
                value={dbConfig.port}
                onChange={(e) => setDbConfig({...dbConfig, port: e.target.value})}
                placeholder="5432"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="database">Database Name</Label>
              <Input
                id="database"
                value={dbConfig.database}
                onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
                placeholder="company_portal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={dbConfig.username}
                onChange={(e) => setDbConfig({...dbConfig, username: e.target.value})}
                placeholder="database username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={dbConfig.password}
                onChange={(e) => setDbConfig({...dbConfig, password: e.target.value})}
                placeholder="database password"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button onClick={testConnection} disabled={connectionStatus === "testing"}>
              {connectionStatus === "testing" ? "Testing..." : "Test Connection"}
            </Button>
            <Button onClick={saveConfiguration} variant="outline">
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Table Mappings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(tableMapping).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} Table</Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => setTableMapping({...tableMapping, [key]: e.target.value})}
                  placeholder={`${key} table name`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Download the SQL schema file to create the required database tables with your configured names.
            </p>
            <div className="flex space-x-2">
              <Button onClick={generateSchema} className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Schema
              </Button>
              <Button variant="outline" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSetup;
