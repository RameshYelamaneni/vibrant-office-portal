
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FormHandlers, Timesheet, Employee } from '../../services/FormHandlers';
import { Save, X, Clock } from "lucide-react";

interface AddTimesheetFormProps {
  onSuccess?: (timesheet: Timesheet) => void;
  onCancel?: () => void;
}

const AddTimesheetForm = ({ onSuccess, onCancel }: AddTimesheetFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    breakDuration: 60,
    notes: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timesheetData = {
        ...formData,
        employeeId: parseInt(formData.employeeId),
        status: 'Draft' as const
      };

      const newTimesheet = await FormHandlers.addTimesheet(timesheetData);
      
      toast({
        title: "Timesheet Added",
        description: "Timesheet has been created successfully",
      });

      onSuccess?.(newTimesheet);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add timesheet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Add New Timesheet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee *</Label>
              <select
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select an employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} - {emp.position}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
              <Input
                id="breakDuration"
                type="number"
                value={formData.breakDuration}
                onChange={(e) => handleInputChange('breakDuration', parseInt(e.target.value) || 0)}
                placeholder="60"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              placeholder="Any additional notes..."
            />
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Adding...' : 'Add Timesheet'}
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

export default AddTimesheetForm;
