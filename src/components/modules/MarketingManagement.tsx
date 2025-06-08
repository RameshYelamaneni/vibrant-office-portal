
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Target, Calendar, TrendingUp, Users, Phone, Mail } from "lucide-react";

const MarketingManagement = () => {
  const [candidates] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      position: "Software Engineer",
      source: "LinkedIn",
      status: "Interview Scheduled",
      submissions: 5,
      interviews: 2,
      lastContact: "2024-01-10",
      email: "alex.thompson@email.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Emily Chen",
      position: "Product Manager",
      source: "Job Board",
      status: "First Contact",
      submissions: 3,
      interviews: 0,
      lastContact: "2024-01-12",
      email: "emily.chen@email.com",
      phone: "+1 (555) 987-6543"
    },
    {
      id: 3,
      name: "David Rodriguez",
      position: "Marketing Specialist",
      source: "Referral",
      status: "Feedback Pending",
      submissions: 8,
      interviews: 3,
      lastContact: "2024-01-08",
      email: "david.rodriguez@email.com",
      phone: "+1 (555) 456-7890"
    }
  ]);

  const [dailyStats] = useState({
    todaySubmissions: 12,
    scheduledInterviews: 4,
    pendingFeedback: 6,
    newCandidates: 8
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'First Contact':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">First Contact</Badge>;
      case 'Interview Scheduled':
        return <Badge variant="default" className="bg-green-100 text-green-800">Interview Scheduled</Badge>;
      case 'Feedback Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Feedback Pending</Badge>;
      case 'Hired':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Hired</Badge>;
      case 'Rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Marketing Management</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Candidate</span>
        </Button>
      </div>

      {/* Daily Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Submissions</p>
                <p className="text-3xl font-bold text-blue-600">{dailyStats.todaySubmissions}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled Interviews</p>
                <p className="text-3xl font-bold text-green-600">{dailyStats.scheduledInterviews}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Feedback</p>
                <p className="text-3xl font-bold text-yellow-600">{dailyStats.pendingFeedback}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Candidates</p>
                <p className="text-3xl font-bold text-purple-600">{dailyStats.newCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="candidates" className="w-full">
        <TabsList>
          <TabsTrigger value="candidates">Marketing Candidates</TabsTrigger>
          <TabsTrigger value="add">Add New Candidate</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Candidates List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                            <p className="text-sm text-gray-600">{candidate.position}</p>
                            <p className="text-xs text-gray-500">Source: {candidate.source}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(candidate.status)}
                            <p className="text-xs text-gray-500 mt-1">Last Contact: {candidate.lastContact}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-xs font-medium text-blue-600">Submissions</p>
                            <p className="text-xl font-bold text-blue-800">{candidate.submissions}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded">
                            <p className="text-xs font-medium text-green-600">Interviews</p>
                            <p className="text-xl font-bold text-green-800">{candidate.interviews}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs font-medium text-gray-600">Contact Info</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Button size="sm" variant="ghost" className="p-1">
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="p-1">
                                <Phone className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Marketing Candidate</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidateName">Full Name</Label>
                    <Input id="candidateName" placeholder="Enter candidate name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Target Position</Label>
                    <Input id="position" placeholder="Enter target position" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Input id="source" placeholder="e.g., LinkedIn, Job Board, Referral" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Initial Status</Label>
                    <Input id="status" placeholder="e.g., First Contact" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Candidate</Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Submission Success Rate</span>
                    <span className="font-bold text-green-600">68%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Interview Conversion Rate</span>
                    <span className="font-bold text-blue-600">42%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Hire Success Rate</span>
                    <span className="font-bold text-purple-600">28%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Average Time to Hire</span>
                    <span className="font-bold text-orange-600">21 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>LinkedIn</span>
                    <span className="font-bold">45 candidates</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Job Boards</span>
                    <span className="font-bold">32 candidates</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Referrals</span>
                    <span className="font-bold">18 candidates</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Direct Applications</span>
                    <span className="font-bold">12 candidates</span>
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

export default MarketingManagement;
