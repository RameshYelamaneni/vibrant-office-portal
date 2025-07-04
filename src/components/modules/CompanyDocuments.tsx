
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Eye, Download, Trash2, Search, Folder } from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  access: string;
}

const CompanyDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "Employee Handbook 2024",
      type: "PDF",
      category: "HR Policies",
      size: "2.4 MB",
      uploadedBy: "HR Manager",
      uploadDate: "2024-01-10",
      lastModified: "2024-01-15",
      access: "All Employees"
    },
    {
      id: 2,
      name: "Company Safety Guidelines",
      type: "PDF",
      category: "Safety",
      size: "1.8 MB",
      uploadedBy: "Safety Officer",
      uploadDate: "2024-01-08",
      lastModified: "2024-01-08",
      access: "All Employees"
    },
    {
      id: 3,
      name: "Financial Report Q4 2023",
      type: "Excel",
      category: "Financial",
      size: "3.2 MB",
      uploadedBy: "Finance Director",
      uploadDate: "2024-01-05",
      lastModified: "2024-01-12",
      access: "Management Only"
    },
    {
      id: 4,
      name: "IT Security Policy",
      type: "PDF",
      category: "IT Policies",
      size: "1.5 MB",
      uploadedBy: "IT Manager",
      uploadDate: "2024-01-03",
      lastModified: "2024-01-03",
      access: "All Employees"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("browse");
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: '',
    access: 'All Employees',
    description: ''
  });

  const categories = ["All", "HR Policies", "Safety", "Financial", "IT Policies", "Legal", "Operations"];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDocument = (docId: number) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      console.log(`Viewing document: ${doc.name}`);
      // In a real app, this would open the document
      alert(`Opening ${doc.name} for viewing`);
    }
  };

  const handleDownloadDocument = (docId: number) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      console.log(`Downloading document: ${doc.name}`);
      // In a real app, this would trigger the download
      alert(`Downloading ${doc.name}`);
    }
  };

  const handleDeleteDocument = (docId: number) => {
    const doc = documents.find(d => d.id === docId);
    if (doc && confirm(`Are you sure you want to delete "${doc.name}"?`)) {
      setDocuments(prev => prev.filter(d => d.id !== docId));
      console.log(`Document ${doc.name} deleted`);
    }
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.name || !uploadForm.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newDocument: Document = {
      id: Math.max(...documents.map(d => d.id)) + 1,
      name: uploadForm.name,
      type: "PDF", // Default type
      category: uploadForm.category,
      size: "Unknown", // Would be calculated from actual file
      uploadedBy: "Current User",
      uploadDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      access: uploadForm.access
    };

    setDocuments(prev => [...prev, newDocument]);
    
    // Reset form
    setUploadForm({
      name: '',
      category: '',
      access: 'All Employees',
      description: ''
    });
    
    setActiveTab("browse");
    console.log('Document uploaded successfully:', newDocument);
  };

  const handleFileSelection = () => {
    // In a real app, this would open file picker
    const fileName = prompt("Enter document name (simulating file upload):");
    if (fileName) {
      setUploadForm(prev => ({ ...prev, name: fileName }));
    }
  };

  const downloadCompleteProject = () => {
    // Create a comprehensive project structure
    const projectStructure = {
      name: "Company Portal - Complete Project",
      version: "1.0.0",
      description: "Full-featured company management portal with employee management, timesheets, marketing, and document management",
      files: {
        "README.md": `# Company Portal

A comprehensive company management system built with React, TypeScript, and Tailwind CSS.

## Features
- Employee Management
- Timesheet Management
- Marketing Candidate Management
- Document Management
- Role-based Access Control
- Email Integration
- Dashboard Analytics

## Installation
1. npm install
2. npm run dev

## Usage
Login with predefined credentials or create new users through the admin panel.
`,
        "package.json": {
          name: "company-portal",
          version: "1.0.0",
          type: "module",
          scripts: {
            dev: "vite",
            build: "tsc && vite build",
            preview: "vite preview"
          },
          dependencies: {
            react: "^18.3.1",
            "react-dom": "^18.3.1",
            "react-router-dom": "^6.26.2",
            "@tanstack/react-query": "^5.56.2",
            "lucide-react": "^0.462.0",
            "tailwindcss": "^3.4.0"
          }
        },
        "src/": {
          "components/": "All React components including forms, modules, and UI components",
          "services/": "FormHandlers.ts and other service files",
          "pages/": "Page components and routing",
          "hooks/": "Custom React hooks",
          "lib/": "Utility functions",
          "styles/": "CSS and styling files"
        }
      },
      setup: {
        database: "Local Storage (can be replaced with Supabase)",
        authentication: "Built-in user management",
        styling: "Tailwind CSS with Shadcn/UI components",
        icons: "Lucide React icons",
        routing: "React Router DOM"
      },
      features: {
        "Employee Management": "Add, view, and manage employees",
        "Timesheet Management": "Track and approve employee timesheets",
        "Marketing Management": "Manage job candidates and recruitment",
        "Document Management": "Upload and organize company documents",
        "Dashboard": "Overview with quick actions and analytics",
        "Settings": "Company profile and system configuration"
      }
    };

    const dataStr = JSON.stringify(projectStructure, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'company-portal-complete-project.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('Complete project structure downloaded');
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  const getAccessBadge = (access: string) => {
    if (access === "All Employees") {
      return <Badge variant="default" className="bg-green-100 text-green-800">All Employees</Badge>;
    }
    return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{access}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Company Documents</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={downloadCompleteProject}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            <span>Download Complete Project</span>
          </Button>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => setActiveTab("upload")}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-3xl font-bold text-blue-600">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-green-600">{categories.length - 1}</p>
              </div>
              <Folder className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Uploads</p>
                <p className="text-3xl font-bold text-purple-600">{documents.filter(d => d.uploadDate === new Date().toISOString().split('T')[0]).length}</p>
              </div>
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Access</p>
                <p className="text-3xl font-bold text-orange-600">{documents.filter(d => d.access === "All Employees").length}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="browse">Browse Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
          <TabsTrigger value="manage">Manage Access</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Document Library</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getTypeIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600">{doc.category}</p>
                          <p className="text-sm text-gray-600">{doc.size}</p>
                          <p className="text-sm text-gray-600">Uploaded by {doc.uploadedBy}</p>
                          <p className="text-sm text-gray-600">{doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getAccessBadge(doc.access)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleViewDocument(doc.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDownloadDocument(doc.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadDocument} className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Document</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
                  <Button type="button" onClick={handleFileSelection}>Choose File</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Document Name</label>
                    <Input 
                      placeholder="Enter document name" 
                      value={uploadForm.name}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Access Level</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={uploadForm.access}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, access: e.target.value }))}
                    >
                      <option value="All Employees">All Employees</option>
                      <option value="Management Only">Management Only</option>
                      <option value="HR Only">HR Only</option>
                      <option value="IT Only">IT Only</option>
                      <option value="Custom">Custom Access</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <Input 
                      placeholder="Brief description (optional)" 
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit">Upload Document</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("browse")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Access Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">All Employees Access</h3>
                    <p className="text-sm text-gray-600 mb-2">Documents accessible to all staff members</p>
                    <p className="text-2xl font-bold text-blue-600">{documents.filter(d => d.access === "All Employees").length}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Management Only</h3>
                    <p className="text-sm text-gray-600 mb-2">Restricted to management team</p>
                    <p className="text-2xl font-bold text-orange-600">{documents.filter(d => d.access === "Management Only").length}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Department Specific</h3>
                    <p className="text-sm text-gray-600 mb-2">Limited to specific departments</p>
                    <p className="text-2xl font-bold text-green-600">0</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Access Changes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Employee Handbook 2024 - Access changed to "All Employees"</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Financial Report Q4 2023 - Access restricted to "Management Only"</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDocuments;
