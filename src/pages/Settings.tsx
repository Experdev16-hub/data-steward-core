import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <AppLayout title="Settings">
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

          {/* Security Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>DLP Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Data Loss Prevention alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Location Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track device locations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Communication Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor messaging applications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button variant="destructive" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Security Audit
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Device Offline Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when devices go offline
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Policy Violations</Label>
                  <p className="text-sm text-muted-foreground">
                    Immediate alerts for policy flags
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Battery Warnings</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert when battery below 20%
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-notifications">Notification Email</Label>
                <Input 
                  id="email-notifications" 
                  type="email" 
                  placeholder="admin@company.com" 
                  defaultValue="admin@company.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Device Data
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Compliance Report
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Activity Logs
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <Button variant="destructive" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Purge Old Data
                </Button>
                <p className="text-xs text-muted-foreground">
                  This will permanently delete data older than the retention period.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Users */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Administrator Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded">
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-sm text-muted-foreground">admin@company.com</p>
                  <p className="text-xs text-muted-foreground">Full Access • Last login: 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded">
                <div>
                  <p className="font-medium">IT Manager</p>
                  <p className="text-sm text-muted-foreground">it.manager@company.com</p>
                  <p className="text-xs text-muted-foreground">Device Management • Last login: 1 day ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>

              <Button className="w-full bg-gradient-secondary">
                <Users className="h-4 w-4 mr-2" />
                Add Administrator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;