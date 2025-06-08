
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle, Plus, Calendar } from "lucide-react";

const TimesheetManagement = () => {
  const [pendingTimesheets] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      department: "IT",
      weekEnding: "2024-01-12",
      totalHours: 40,
      status: "Pending",
      submittedDate: "2024-01-13"
    },
    {
      id: 2,
      employeeName: "Sarah Wilson",
      department: "Marketing",
      weekEnding: "2024-01-12",
      totalHours: 38,
      status: "Pending",
      submittedDate: "2024-01-13"
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      department: "HR",
      weekEnding: "2024-01-12",
      totalHours: 42,
      status: "Pending",
      submittedDate: "2024-01-12"
    }
  ]);

  const [allTimesheets] = useState([
    {
      id: 4,
      employeeName: "John Doe",
      department: "IT",
      weekEnding: "2024-01-05",
      totalHours: 40,
      status: "Approved",
      approvedBy: "Manager Smith",
      approvedDate: "2024-01-08"
    },
    {
      id: 5,
      employeeName: "Sarah Wilson",
      department: "Marketing",
      weekEnding: "2024-01-05",
      totalHours: 39,
      status: "Approved",
      approvedBy: "Manager Smith",
      approvedDate: "2024-01-08"
    },
    {
      id: 6,
      employeeName: "Alex Brown",
      department: "Sales",
      weekEnding: "2024-01-05",
      totalHours: 35,
      status: "Rejected",
      rejectedBy: "Manager Smith",
      rejectedDate: "2024-01-08",
      reason: "Missing project details"
    }
  ]);

  const handleApprove = (id: number) => {
    console.log(`Approving timesheet ${id}`);
  };

  const handleReject = (id: number) => {
    console.log(`Rejecting timesheet ${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Timesheet Management</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Timesheet</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingTimesheets.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week's Submissions</p>
                <p className="text-3xl font-bold text-blue-600">15</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Hours/Week</p>
                <p className="text-3xl font-bold text-green-600">39.5</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals ({pendingTimesheets.length})</TabsTrigger>
          <TabsTrigger value="all">All Timesheets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Timesheets Awaiting Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTimesheets.map((timesheet) => (
                  <div key={timesheet.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{timesheet.employeeName}</h3>
                          <p className="text-sm text-gray-600">{timesheet.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Week Ending: {timesheet.weekEnding}</p>
                          <p className="text-sm text-gray-600">Total Hours: {timesheet.totalHours}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Submitted: {timesheet.submittedDate}</p>
                          {getStatusBadge(timesheet.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(timesheet.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(timesheet.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Timesheets History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allTimesheets.map((timesheet) => (
                  <div key={timesheet.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{timesheet.employeeName}</h3>
                          <p className="text-sm text-gray-600">{timesheet.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Week Ending: {timesheet.weekEnding}</p>
                          <p className="text-sm text-gray-600">Total Hours: {timesheet.totalHours}</p>
                        </div>
                        <div>
                          {timesheet.status === 'Approved' && (
                            <p className="text-sm text-gray-600">Approved by: {timesheet.approvedBy}</p>
                          )}
                          {timesheet.status === 'Rejected' && (
                            <p className="text-sm text-gray-600">Reason: {timesheet.reason}</p>
                          )}
                          {getStatusBadge(timesheet.status)}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Timesheet Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
