import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  FileText, 
  File, 
  Image as ImageIcon,
  FileSpreadsheet,
  Download,
  Trash2,
  Upload
} from "lucide-react";

// Sample files for demonstration
const sampleFiles = [
  { id: "1", name: "Q4_Report_2024.pdf", type: "pdf", size: "2.4 MB", date: "2024-03-15" },
  { id: "2", name: "Budget_Analysis.xlsx", type: "excel", size: "1.8 MB", date: "2024-03-14" },
  { id: "3", name: "Team_Photo.jpg", type: "image", size: "856 KB", date: "2024-03-13" },
  { id: "4", name: "Policy_Document.docx", type: "doc", size: "524 KB", date: "2024-03-12" },
  { id: "5", name: "Presentation.pptx", type: "ppt", size: "3.2 MB", date: "2024-03-11" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-8 h-8 text-red-500" />;
    case "excel":
      return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
    case "image":
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    default:
      return <File className="w-8 h-8 text-gray-500" />;
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

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-soft)' }}>
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{departmentName}</h1>
              <p className="text-sm text-muted-foreground">{sampleFiles.length} files</p>
            </div>
          </div>
          <Button 
            className="gap-2 font-semibold"
            style={{ 
              background: 'var(--gradient-primary)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-3">
          {sampleFiles.map((file) => (
            <Card
              key={file.id}
              className="transition-all duration-300 hover:shadow-lg group"
              style={{ 
                boxShadow: 'var(--shadow-card)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sampleFiles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <File className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No files yet</h3>
            <p className="text-muted-foreground mb-6">Upload your first document to get started</p>
            <Button
              style={{ 
                background: 'var(--gradient-primary)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Department;
