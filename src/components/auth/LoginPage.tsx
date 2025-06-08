
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const demoAccounts = [
    { email: 'admin@company.com', password: 'admin123', role: 'Admin', name: 'John Admin' },
    { email: 'manager@company.com', password: 'manager123', role: 'Manager', name: 'Sarah Manager' },
    { email: 'employee@company.com', password: 'employee123', role: 'Employee', name: 'Mike Employee' },
    { email: 'marketing@company.com', password: 'marketing123', role: 'Marketing Associate', name: 'Lisa Marketing' },
    { email: 'hr@company.com', password: 'hr123', role: 'HR', name: 'Anna HR' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo authentication
    const user = demoAccounts.find(acc => acc.email === email && acc.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try demo accounts.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">CP</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Company Portal</CardTitle>
            <p className="text-gray-600">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Demo Accounts:</h4>
              <div className="text-xs space-y-1">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{account.role}:</span>
                    <span>{account.email}</span>
                  </div>
                ))}
                <p className="text-gray-500 mt-2">All passwords: admin123, manager123, etc.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
