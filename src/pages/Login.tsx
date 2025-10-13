import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText } from "lucide-react";

const Login = () => {
  const [ashaId, setAshaId] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [userType, setUserType] = useState("user");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm mb-6">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Document Portal</h1>
          <p className="text-muted-foreground text-lg">
            Access your medical documents
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-8 border border-border shadow-[var(--shadow-card)]">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ashaId" className="text-sm font-medium">ASHA ID</Label>
              <Input
                id="ashaId"
                type="text"
                placeholder="Enter your ASHA ID"
                value={ashaId}
                onChange={(e) => setAshaId(e.target.value)}
                required
                className="h-12 bg-secondary border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-secondary border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Role</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="flex gap-4">
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
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
