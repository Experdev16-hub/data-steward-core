import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockActivityLog } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";

export function ActivityLog() {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'error': return 'destructive';
      case 'warning': return 'warning';
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

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockActivityLog.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-xl">{getSeverityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <Badge variant={getSeverityVariant(activity.severity) as any} className="text-xs">
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