import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  FileText, 
  File, 
  Image as ImageIcon,
  FileSpreadsheet,
  Download,
  Trash2,
  Upload,
  Home,
  FolderOpen,
  Settings,
  LogOut,
  MoreVertical
} from "lucide-react";

const sampleFiles = [
  { id: "1", name: "Q4_Report_2024.pdf", type: "pdf", size: "2.4 MB", date: "2024-03-15" },
  { id: "2", name: "Budget_Analysis.xlsx", type: "excel", size: "1.8 MB", date: "2024-03-14" },
  { id: "3", name: "Team_Photo.jpg", type: "image", size: "856 KB", date: "2024-03-13" },
  { id: "4", name: "Policy_Document.docx", type: "doc", size: "524 KB", date: "2024-03-12" },
  { id: "5", name: "Presentation.pptx", type: "ppt", size: "3.2 MB", date: "2024-03-11" },
  { id: "6", name: "Annual_Review.pdf", type: "pdf", size: "1.9 MB", date: "2024-03-10" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-6 h-6 text-red-400" />;
    case "excel":
      return <FileSpreadsheet className="w-6 h-6 text-green-400" />;
    case "image":
      return <ImageIcon className="w-6 h-6 text-blue-400" />;
    default:
      return <File className="w-6 h-6 text-gray-400" />;
  }
};

const Department = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const departmentNames: Record<string, string> = {
    cardiology: "Cardiology",
    pathology: "Pathology",
    dental: "Dental",
    oncology: "Oncology",
    ophthalmology: "Ophthalmology",
    neurology: "Neurology",
    dermatology: "Dermatology",
  };

  const departmentName = id ? departmentNames[id] || "Unknown" : "Unknown";

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
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
            onClick={() => navigate("/dashboard")}
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
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{departmentName}</h1>
                <p className="text-sm text-muted-foreground mt-1">{sampleFiles.length} documents</p>
              </div>
            </div>
            <Button 
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover:shadow-[var(--shadow-glow)]"
            >
              <Upload className="w-4 h-4" />
              Upload
            </Button>
          </div>
        </header>

        {/* Files Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 gap-3">
            {sampleFiles.map((file) => (
              <Card
                key={file.id}
                className="group transition-all duration-200 hover:bg-card/80 bg-card border-border cursor-pointer"
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate text-foreground">{file.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {file.size} • {file.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-secondary"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Department;
