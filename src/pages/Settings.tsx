import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Bell, 
  Database, 
  Users, 
  Settings as SettingsIcon,
  Download,
  AlertTriangle
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* System Configuration */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sync-interval">Data Sync Interval (minutes)</Label>
              <Input id="sync-interval" type="number" defaultValue="30" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retention-days">Data Retention Period (days)</Label>
              <Input id="retention-days" type="number" defaultValue="30" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-sync Devices</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync device data
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button className="w-full bg-gradient-primary text-white">
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Rest of settings content... */}
      </div>
    </div>
  );
};

export default Settings;