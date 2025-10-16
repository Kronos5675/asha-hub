import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  Heart, 
  Microscope, 
  Smile, 
  Activity, 
  Eye, 
  Brain, 
  Sparkles,
  LogOut,
  Home,
  FolderOpen,
  Settings
} from "lucide-react";
import { addFile, clearAuth, getAuth } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";

const departments = [
  { id: "cardiology", name: "Cardiology", icon: Heart, color: "hsl(0 85% 60%)" },
  { id: "pathology", name: "Pathology", icon: Microscope, color: "hsl(280 80% 60%)" },
  { id: "dental", name: "Dental", icon: Smile, color: "hsl(200 90% 55%)" },
  { id: "oncology", name: "Oncology", icon: Activity, color: "hsl(340 85% 58%)" },
  { id: "ophthalmology", name: "Ophthalmology", icon: Eye, color: "hsl(260 85% 62%)" },
  { id: "neurology", name: "Neurology", icon: Brain, color: "hsl(174 72% 56%)" },
  { id: "dermatology", name: "Dermatology", icon: Sparkles, color: "hsl(290 85% 62%)" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("cardiology");
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    getAuth().then((auth) => {
      if (!auth) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    for (const file of files) {
      await addFile(file, selectedDepartment);
    }
    
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) saved to ${selectedDepartment}`,
    });
  };

  const handleLogout = async () => {
    await clearAuth();
    toast({
      title: "Logged out",
      description: "You have been signed out successfully",
    });
    navigate("/login");
  };

  const handleDepartmentClick = (departmentId: string) => {
    navigate(`/department/${departmentId}`);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Spotify style */}
      <aside className="w-64 bg-black p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Portal</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-10 text-foreground/90 hover:text-foreground"
          >
            <Home className="w-5 h-5" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-10 text-foreground/60 hover:text-foreground"
          >
            <FolderOpen className="w-5 h-5" />
            All Files
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-10 text-foreground/60 hover:text-foreground"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Button>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="w-full justify-start gap-3 h-10 text-foreground/60 hover:text-foreground"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Upload Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Upload Documents</h2>
            
            {/* Department Selector */}
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Select Department
              </label>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <Button
                    key={dept.id}
                    variant={selectedDepartment === dept.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={selectedDepartment === dept.id ? "bg-primary text-primary-foreground" : ""}
                  >
                    {dept.name}
                  </Button>
                ))}
              </div>
            </div>

            <Card 
              className={`border-2 border-dashed transition-all duration-300 bg-card/50 backdrop-blur-sm ${
                isDragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drop files to upload</h3>
                <p className="text-muted-foreground mb-6">or click to browse</p>
                <label htmlFor="file-upload">
                  <Button 
                    type="button"
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover:shadow-[var(--shadow-glow)] transition-all"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            </Card>
          </section>

          {/* Departments Section - Netflix style grid */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Departments</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <Card
                    key={dept.id}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-card)] bg-card border-border overflow-hidden relative"
                    onClick={() => handleDepartmentClick(dept.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="aspect-video flex flex-col items-center justify-center p-6 relative z-10">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: dept.color }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-center">{dept.name}</h3>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
