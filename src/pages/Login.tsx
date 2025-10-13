import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Login = () => {
  const [ashaId, setAshaId] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [userType, setUserType] = useState("user");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to dashboard
    // TODO: Add authentication logic
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-soft)' }}>
      <Card className="w-full max-w-md shadow-[var(--shadow-soft)]">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Document Portal</CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to access your documents
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ashaId" className="text-sm font-semibold">ASHA ID</Label>
              <Input
                id="ashaId"
                type="text"
                placeholder="Enter your ASHA ID"
                value={ashaId}
                onChange={(e) => setAshaId(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold">Role</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="font-normal cursor-pointer">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="administration" id="administration" />
                  <Label htmlFor="administration" className="font-normal cursor-pointer">Administration</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="keepSignedIn"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
              />
              <Label htmlFor="keepSignedIn" className="text-sm font-normal cursor-pointer">
                Keep me signed in
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold"
              style={{ 
                background: 'var(--gradient-primary)',
                transition: 'var(--transition-smooth)'
              }}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
