import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivityLog } from "@/hooks/useActivityLog";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, AlertCircle } from "lucide-react";

export function ActivityLog() {
  const { activities, loading, error } = useActivityLog();

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'error': return 'destructive';
      case 'warning': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'device_checkin': return '🔗';
      case 'media_upload': return '📸';
      case 'policy_flag': return '⚠️';
      case 'sync_complete': return '✅';
      default: return 'ℹ️';
    }
  };

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading Activity...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <p>Error loading activity log</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Live updates from Firebase</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-xl">{getSeverityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <Badge variant={getSeverityVariant(activity.severity)} className="text-xs">
                      {activity.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.employeeName} • {formatDistanceToNow(new Date(activity.timestamp))} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}