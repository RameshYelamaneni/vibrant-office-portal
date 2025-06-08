
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Eye, Upload, Trash2 } from "lucide-react";
import { FormHandlers, Employee } from '../../services/FormHandlers';
import AddEmployeeForm from '../forms/AddEmployeeForm';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const employeeData = await FormHandlers.getEmployees();
      setEmployees(employeeData);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  };

  const handleAddEmployee = () => {
    setActiveTab("add");
  };

  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees(prev => [...prev, newEmployee]);
    setActiveTab("list");
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveTab("details");
  };

  const filteredEmployees = employees.filter(emp =>
    (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Employee Management</h1>
        <Button onClick={handleAddEmployee} className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Add New Employee</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="list" className="text-xs md:text-sm">Employee List</TabsTrigger>
          <TabsTrigger value="add" className="text-xs md:text-sm">Add New Employee</TabsTrigger>
          {selectedEmployee && <TabsTrigger value="details" className="text-xs md:text-sm">Employee Details</TabsTrigger>}
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle className="text-lg md:text-xl">All Employees ({employees.length})</CardTitle>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No employees found. Add your first employee to get started.</p>
                    <Button onClick={handleAddEmployee} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Employee
                    </Button>
                  </div>
                ) : (
                  filteredEmployees.map((employee) => (
                    <div key={employee.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-4 flex-1">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{employee.firstName} {employee.lastName}</h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                          <p className="text-xs text-gray-500 break-all">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 w-full md:w-auto">
                        <Badge variant="default">Active</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewEmployee(employee)}
                          className="w-full md:w-auto"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <AddEmployeeForm 
            onSuccess={handleEmployeeAdded}
            onCancel={() => setActiveTab("list")}
          />
        </TabsContent>

        {selectedEmployee && (
          <TabsContent value="details">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Personal Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                          {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                        <p className="text-gray-600">{selectedEmployee.position}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="mt-1 break-all">{selectedEmployee.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Department</Label>
                        <p className="mt-1">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Join Date</Label>
                        <p className="mt-1">{selectedEmployee.joinDate}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Status</Label>
                        <p className="mt-1">
                          <Badge variant="default">
                            Active
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span>Documents</span>
                    <Button size="sm" className="w-full sm:w-auto">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center py-4 text-gray-500">
                      No documents uploaded yet.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default EmployeeManagement;
