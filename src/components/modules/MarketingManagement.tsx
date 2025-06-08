
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Target, Calendar, TrendingUp, Users, Phone, Mail } from "lucide-react";
import { FormHandlers, MarketingCandidate } from '../../services/FormHandlers';

const MarketingManagement = () => {
  const [candidates, setCandidates] = useState<MarketingCandidate[]>([]);
  const [activeTab, setActiveTab] = useState("candidates");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    source: '',
    status: 'First Contact'
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const candidateData = await FormHandlers.getMarketingCandidates();
      setCandidates(candidateData);
    } catch (error) {
      console.error('Failed to load candidates:', error);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newCandidate = await FormHandlers.addMarketingCandidate(formData);
      setCandidates(prev => [...prev, newCandidate]);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        source: '',
        status: 'First Contact'
      });
      
      setActiveTab("candidates");
      console.log('Candidate added successfully:', newCandidate);
    } catch (error) {
      console.error('Failed to add candidate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (candidateId: number, newStatus: string) => {
    try {
      const updatedCandidates = candidates.map(candidate =>
        candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
      );
      setCandidates(updatedCandidates);
      
      // Save to localStorage
      localStorage.setItem('marketing_candidates_data', JSON.stringify(updatedCandidates));
      
      console.log(`Candidate ${candidateId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update candidate status:', error);
    }
  };

  const handleSendEmail = async (email: string, name: string) => {
    try {
      await FormHandlers.sendEmail(
        email,
        'Follow-up from Marketing Team',
        `Dear ${name}, we wanted to follow up on your application...`
      );
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const dailyStats = {
    todaySubmissions: candidates.filter(c => c.lastContact === new Date().toISOString().split('T')[0]).length,
    scheduledInterviews: candidates.filter(c => c.status === 'Interview Scheduled').length,
    pendingFeedback: candidates.filter(c => c.status === 'Feedback Pending').length,
    newCandidates: candidates.filter(c => c.status === 'First Contact').length
  };

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
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setActiveTab("add")}
        >
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                {candidates.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No candidates found. Add your first candidate to get started.</p>
                  </div>
                ) : (
                  candidates.map((candidate) => (
                    <div key={candidate.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-sm text-gray-600">{candidate.position}</p>
                              <p className="text-xs text-gray-500">Source: {candidate.source}</p>
                              <p className="text-xs text-gray-500">Email: {candidate.email}</p>
                              <p className="text-xs text-gray-500">Phone: {candidate.phone}</p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(candidate.status)}
                              <p className="text-xs text-gray-500 mt-1">Last Contact: {candidate.lastContact}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="p-1"
                                onClick={() => handleSendEmail(candidate.email, candidate.name)}
                              >
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="p-1">
                                <Phone className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <select
                              value={candidate.status}
                              onChange={(e) => handleUpdateStatus(candidate.id!, e.target.value)}
                              className="px-3 py-1 text-sm border rounded"
                            >
                              <option value="First Contact">First Contact</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Feedback Pending">Feedback Pending</option>
                              <option value="Hired">Hired</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
              <form onSubmit={handleAddCandidate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidateName">Full Name</Label>
                    <Input 
                      id="candidateName" 
                      placeholder="Enter candidate name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Target Position</Label>
                    <Input 
                      id="position" 
                      placeholder="Enter target position"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Input 
                      id="source" 
                      placeholder="e.g., LinkedIn, Job Board, Referral"
                      value={formData.source}
                      onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Initial Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="First Contact">First Contact</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Feedback Pending">Feedback Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Candidate'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("candidates")}
                  >
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
