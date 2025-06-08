
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FormHandlers, Employee } from '../../services/FormHandlers';
import { Upload, Save, X } from "lucide-react";

interface AddEmployeeFormProps {
  onSuccess?: (employee: Employee) => void;
  onCancel?: () => void;
}

const AddEmployeeForm = ({ onSuccess, onCancel }: AddEmployeeFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newEmployee = await FormHandlers.addEmployee(formData);
      
      toast({
        title: "Employee Added",
        description: `${newEmployee.firstName} ${newEmployee.lastName} has been added successfully`,
      });

      // Send notification email
      await FormHandlers.sendEmail(
        formData.email,
        'Welcome to the Company',
        `Dear ${formData.firstName}, welcome to our company! Your account has been created.`
      );

      onSuccess?.(newEmployee);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Enter position"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Enter department"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date *</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) => handleInputChange('joinDate', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Adding...' : 'Add Employee'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex items-center">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEmployeeForm;
