import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Monitor, Download, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Install Document Portal</h1>
          <p className="text-muted-foreground text-lg">
            Install the app on your device for quick access and offline use
          </p>
        </div>

        {/* Features */}
        <Card className="p-8 bg-card border-border">
          <h2 className="text-2xl font-semibold mb-6">Why Install?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Offline Access</h3>
              <p className="text-sm text-muted-foreground">
                Access all your documents even without internet
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Native Experience</h3>
              <p className="text-sm text-muted-foreground">
                Works like a native app on your device
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Quick Launch</h3>
              <p className="text-sm text-muted-foreground">
                Access directly from your home screen
              </p>
            </div>
          </div>
        </Card>

        {/* Installation Instructions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">On Mobile</h3>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-2">iPhone (Safari):</p>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>Tap the Share button (square with arrow)</li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Android (Chrome):</p>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>Tap the menu button (three dots)</li>
                  <li>Tap "Add to Home screen" or "Install app"</li>
                  <li>Tap "Add" or "Install" to confirm</li>
                </ol>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">On Desktop</h3>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-2">Chrome / Edge:</p>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  <li>Click the install icon in the address bar</li>
                  <li>Or click menu → "Install Document Portal"</li>
                  <li>Click "Install" to confirm</li>
                </ol>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-xs text-primary">
                  The app will open in its own window and work offline
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Continue to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Install;
