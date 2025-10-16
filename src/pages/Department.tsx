import { useState, useEffect } from "react";
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
import { getFilesByDepartment, deleteFile, clearAuth } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) {
    return <FileText className="w-6 h-6 text-red-400" />;
  } else if (type.includes('sheet') || type.includes('excel')) {
    return <FileSpreadsheet className="w-6 h-6 text-green-400" />;
  } else if (type.includes('image')) {
    return <ImageIcon className="w-6 h-6 text-blue-400" />;
  }
  return <File className="w-6 h-6 text-gray-400" />;
};

const Department = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<any[]>([]);

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

  useEffect(() => {
    loadFiles();
  }, [id]);

  const loadFiles = async () => {
    if (id) {
      const departmentFiles = await getFilesByDepartment(id);
      setFiles(departmentFiles);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    await clearAuth();
    navigate("/login");
  };

  const handleDownload = async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      const url = URL.createObjectURL(file.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = async (fileId: string) => {
    await deleteFile(fileId);
    toast({
      title: "File deleted",
      description: "The file has been removed successfully",
    });
    loadFiles();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
                <p className="text-sm text-muted-foreground mt-1">{files.length} documents</p>
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
          {files.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
              <p className="text-muted-foreground">Upload files from the dashboard to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {files.map((file) => (
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
                          {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-primary/10 hover:text-primary"
                        onClick={() => handleDownload(file.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(file.id)}
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Department;
