
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  UserCog, 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Users,
  TrendingUp,
  Mail,
  Plus
} from "lucide-react";
import { FormHandlers, Employee } from '../../services/FormHandlers';

interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

interface PolicyDocument {
  id: number;
  title: string;
  category: string;
  lastUpdated: string;
  status: 'Active' | 'Draft' | 'Archived';
}

const HROperations = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [policies, setPolicies] = useState<PolicyDocument[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
    loadMockData();
  }, []);

  const loadEmployees = async () => {
    try {
      const employeeData = await FormHandlers.getEmployees();
      setEmployees(employeeData);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  };

  const loadMockData = () => {
    // Mock leave requests
    const mockLeaveRequests: LeaveRequest[] = [
      {
        id: 1,
        employeeId: 1,
        employeeName: "John Doe",
        leaveType: "Annual Leave",
        startDate: "2024-06-15",
        endDate: "2024-06-19",
        reason: "Family vacation",
        status: "Pending",
        appliedDate: "2024-06-01"
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: "Jane Smith",
        leaveType: "Sick Leave",
        startDate: "2024-06-10",
        endDate: "2024-06-12",
        reason: "Medical appointment",
        status: "Approved",
        appliedDate: "2024-06-08"
      }
    ];

    // Mock policies
    const mockPolicies: PolicyDocument[] = [
      {
        id: 1,
        title: "Remote Work Policy",
        category: "Work Arrangements",
        lastUpdated: "2024-05-15",
        status: "Active"
      },
      {
        id: 2,
        title: "Leave Policy",
        category: "Time Off",
        lastUpdated: "2024-04-20",
        status: "Active"
      },
      {
        id: 3,
        title: "Code of Conduct",
        category: "Ethics",
        lastUpdated: "2024-03-10",
        status: "Active"
      }
    ];

    setLeaveRequests(mockLeaveRequests);
    setPolicies(mockPolicies);
  };

  const handleLeaveApproval = (id: number, action: 'approve' | 'reject') => {
    setIsLoading(true);
    setTimeout(() => {
      setLeaveRequests(prev => 
        prev.map(request => 
          request.id === id 
            ? { ...request, status: action === 'approve' ? 'Approved' : 'Rejected' }
            : request
        )
      );
      setIsLoading(false);
    }, 500);
  };

  const pendingLeaves = leaveRequests.filter(req => req.status === 'Pending');
  const activePolicies = policies.filter(policy => policy.status === 'Active');

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
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">HR Operations</h1>
        <Button className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>New Request</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="dashboard" className="text-xs md:text-sm">Dashboard</TabsTrigger>
          <TabsTrigger value="leaves" className="text-xs md:text-sm">Leave Requests</TabsTrigger>
          <TabsTrigger value="policies" className="text-xs md:text-sm">Policies</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs md:text-sm">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">{employees.length}</p>
                  </div>
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
                    <p className="text-2xl md:text-3xl font-bold text-yellow-600">{pendingLeaves.length}</p>
                  </div>
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Policies</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-600">{activePolicies.length}</p>
                  </div>
                  <FileText className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month's Hires</p>
                    <p className="text-2xl md:text-3xl font-bold text-purple-600">3</p>
                  </div>
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Recent Leave Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaveRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <p className="font-medium">{request.employeeName}</p>
                        <p className="text-sm text-gray-600">{request.leaveType}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <UserCog className="mr-2 h-4 w-4" />
                    Employee Onboarding
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaves">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Leave Requests Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg space-y-4 lg:space-y-0">
                    <div className="flex-1 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                          <p className="text-sm text-gray-600">{request.leaveType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">From: {request.startDate}</p>
                          <p className="text-sm text-gray-600">To: {request.endDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    </div>
                    {request.status === 'Pending' && (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
                        <Button
                          size="sm"
                          onClick={() => handleLeaveApproval(request.id, 'approve')}
                          disabled={isLoading}
                          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleLeaveApproval(request.id, 'reject')}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg md:text-xl">Company Policies</CardTitle>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Policy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                      <Badge variant="default" className="ml-2">
                        {policy.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Category: {policy.category}</p>
                    <p className="text-xs text-gray-500 mb-3">Last updated: {policy.lastUpdated}</p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Employee Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Department Distribution</span>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>IT Department:</span>
                      <span className="font-medium">{employees.filter(e => e.department === 'IT').length} employees</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing:</span>
                      <span className="font-medium">{employees.filter(e => e.department === 'Marketing').length} employees</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HR:</span>
                      <span className="font-medium">{employees.filter(e => e.department === 'HR').length} employees</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Leave Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Monthly Leave Summary</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Requests:</span>
                      <span className="font-medium">{leaveRequests.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved:</span>
                      <span className="font-medium text-green-600">{leaveRequests.filter(l => l.status === 'Approved').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-medium text-yellow-600">{pendingLeaves.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HROperations;
