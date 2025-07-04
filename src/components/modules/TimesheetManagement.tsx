
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, Plus, Calendar } from "lucide-react";
import { FormHandlers, Timesheet } from '../../services/FormHandlers';
import AddTimesheetForm from '../forms/AddTimesheetForm';

const TimesheetManagement = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTimesheets();
  }, []);

  const loadTimesheets = async () => {
    try {
      const timesheetData = await FormHandlers.getTimesheets();
      setTimesheets(timesheetData);
    } catch (error) {
      console.error('Failed to load timesheets:', error);
    }
  };

  const pendingTimesheets = timesheets.filter(t => t.status === 'Submitted');
  const allTimesheets = timesheets;

  const handleApprove = async (id: number) => {
    setIsLoading(true);
    try {
      const updatedTimesheets = timesheets.map(t => 
        t.id === id ? { ...t, status: 'Approved' as const } : t
      );
      setTimesheets(updatedTimesheets);
      localStorage.setItem('timesheets_data', JSON.stringify(updatedTimesheets));
      console.log(`Timesheet ${id} approved successfully`);
    } catch (error) {
      console.error('Failed to approve timesheet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id: number) => {
    setIsLoading(true);
    try {
      const updatedTimesheets = timesheets.map(t => 
        t.id === id ? { ...t, status: 'Rejected' as const } : t
      );
      setTimesheets(updatedTimesheets);
      localStorage.setItem('timesheets_data', JSON.stringify(updatedTimesheets));
      console.log(`Timesheet ${id} rejected successfully`);
    } catch (error) {
      console.error('Failed to reject timesheet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimesheetAdded = (newTimesheet: Timesheet) => {
    setTimesheets(prev => [...prev, newTimesheet]);
    setActiveTab("pending");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Draft</Badge>;
      case 'Submitted':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Timesheet Management</h1>
        <Button 
          className="flex items-center space-x-2 w-full sm:w-auto"
          onClick={() => setActiveTab("add")}
        >
          <Plus className="h-4 w-4" />
          <span>New Timesheet</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600">{pendingTimesheets.length}</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Timesheets</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">{timesheets.length}</p>
              </div>
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved This Week</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">{timesheets.filter(t => t.status === 'Approved').length}</p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="pending" className="text-xs md:text-sm">Pending ({pendingTimesheets.length})</TabsTrigger>
          <TabsTrigger value="all" className="text-xs md:text-sm">All Timesheets</TabsTrigger>
          <TabsTrigger value="add" className="text-xs md:text-sm">Add New</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs md:text-sm">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Timesheets Awaiting Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTimesheets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending timesheets to review.</p>
                  </div>
                ) : (
                  pendingTimesheets.map((timesheet) => (
                    <div key={timesheet.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg space-y-4 lg:space-y-0">
                      <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Employee #{timesheet.employeeId}</h3>
                            <p className="text-sm text-gray-600">Date: {timesheet.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Hours: {timesheet.startTime} - {timesheet.endTime}</p>
                            <p className="text-sm text-gray-600">Break: {timesheet.breakDuration} minutes</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Notes: {timesheet.notes || 'No notes'}</p>
                            {getStatusBadge(timesheet.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(timesheet.id!)}
                          disabled={isLoading}
                          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(timesheet.id!)}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">All Timesheets History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allTimesheets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No timesheets found. Add your first timesheet to get started.</p>
                  </div>
                ) : (
                  allTimesheets.map((timesheet) => (
                    <div key={timesheet.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg space-y-4 lg:space-y-0">
                      <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Employee #{timesheet.employeeId}</h3>
                            <p className="text-sm text-gray-600">Date: {timesheet.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Hours: {timesheet.startTime} - {timesheet.endTime}</p>
                            <p className="text-sm text-gray-600">Break: {timesheet.breakDuration} minutes</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Notes: {timesheet.notes || 'No notes'}</p>
                            {getStatusBadge(timesheet.status)}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full lg:w-auto">
                        View Details
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <AddTimesheetForm 
            onSuccess={handleTimesheetAdded}
            onCancel={() => setActiveTab("pending")}
          />
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Timesheet Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Department Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>IT Department:</span>
                      <span className="font-medium">40.2 avg hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing:</span>
                      <span className="font-medium">38.5 avg hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HR:</span>
                      <span className="font-medium">39.8 avg hours</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Monthly Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Submissions:</span>
                      <span className="font-medium">124</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved:</span>
                      <span className="font-medium text-green-600">118</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rejected:</span>
                      <span className="font-medium text-red-600">6</span>
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

export default TimesheetManagement;
