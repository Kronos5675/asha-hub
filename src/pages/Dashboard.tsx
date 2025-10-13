import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Heart, 
  Microscope, 
  Smile, 
  Activity, 
  Eye, 
  Brain, 
  Sparkles,
  LogOut
} from "lucide-react";

const departments = [
  { id: "cardiology", name: "Cardiology", icon: Heart, color: "hsl(0 85% 60%)" },
  { id: "pathology", name: "Pathology", icon: Microscope, color: "hsl(280 80% 60%)" },
  { id: "dental", name: "Dental", icon: Smile, color: "hsl(200 90% 55%)" },
  { id: "oncology", name: "Oncology", icon: Activity, color: "hsl(340 85% 58%)" },
  { id: "ophthalmology", name: "Ophthalmology", icon: Eye, color: "hsl(260 85% 62%)" },
  { id: "neurology", name: "Neurology", icon: Brain, color: "hsl(250 95% 63%)" },
  { id: "dermatology", name: "Dermatology", icon: Sparkles, color: "hsl(290 85% 62%)" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    // TODO: Handle file upload
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Handle file upload
    console.log("Files selected:", e.target.files);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleDepartmentClick = (departmentId: string) => {
    navigate(`/department/${departmentId}`);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-soft)' }}>
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <Upload className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Document Portal</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Upload Widget */}
        <Card 
          className={`border-2 border-dashed transition-all duration-300 ${
            isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border'
          }`}
          style={{ boxShadow: 'var(--shadow-card)' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Drag and drop your files here, or click the button below to browse
            </p>
            <label htmlFor="file-upload">
              <Button 
                type="button"
                size="lg"
                className="font-semibold"
                style={{ 
                  background: 'var(--gradient-primary)',
                  transition: 'var(--transition-smooth)'
                }}
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
          </CardContent>
        </Card>

        {/* Departments Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <Card
                  key={dept.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  style={{ 
                    boxShadow: 'var(--shadow-card)',
                    transition: 'var(--transition-smooth)'
                  }}
                  onClick={() => handleDepartmentClick(dept.id)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: dept.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{dept.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
