import React from 'react';
import { useDevices } from '@/hooks/useDevices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wifi, WifiOff, AlertTriangle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online': return <Wifi className="h-4 w-4 text-primary" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'offline': return <WifiOff className="h-4 w-4 text-destructive" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'secondary';
    case 'warning': return 'destructive';
    case 'offline': return 'destructive';
    default: return 'secondary';
  }
};

export function DeviceMap() {
  const { devices, loading, error } = useDevices();

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading Device Status...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
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
          <CardTitle className="text-foreground">Device Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <p>Error loading device data: {error}</p>
            <p className="text-sm mt-2">Displaying cached data if available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Device Status Overview</CardTitle>
        <p className="text-sm text-muted-foreground">Real-time data from Firebase</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:shadow-card transition-shadow">
              <div className="flex items-center gap-3">
                {getStatusIcon(device.status)}
                <div>
                  <h3 className="font-medium text-foreground">{device.employeeName}</h3>
                  <p className="text-sm text-muted-foreground">{device.deviceModel}</p>
                  <p className="text-xs text-muted-foreground">{device.location.address}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={getStatusColor(device.status)} className="mb-2">
                  {device.status}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  <p>Battery: {device.batteryLevel}%</p>
                  <p>{device.networkType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Online ({devices.filter(d => d.status === 'online').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground">Warning ({devices.filter(d => d.status === 'warning').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Offline ({devices.filter(d => d.status === 'offline').length})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}