import React from 'react';
import { mockDevices } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

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
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Device Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDevices.map((device) => (
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
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Offline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}