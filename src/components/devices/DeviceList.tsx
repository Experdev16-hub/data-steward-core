import React, { useState } from 'react';
import { useDevices } from '@/hooks/useDevices';
import { Device } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye, Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceListProps {
  onDeviceSelect: (device: Device) => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'online': return 'secondary';
    case 'warning': return 'destructive';
    case 'offline': return 'destructive';
    default: return 'secondary';
  }
};

export function DeviceList({ onDeviceSelect }: DeviceListProps) {
  const { devices, loading, error } = useDevices();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading Device Management...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
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
          <CardTitle className="text-foreground">Device Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <p>Error loading device data: {error}</p>
            <p className="text-sm mt-2">Please check your Firebase connection</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Device Management</CardTitle>
        <p className="text-sm text-muted-foreground">Real-time data from Firebase ({devices.length} devices)</p>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices, employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Device Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Check-in</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{device.employeeName}</div>
                    <div className="text-sm text-muted-foreground">{device.employeeEmail}</div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{device.deviceModel}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(device.status)}>
                    {device.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(device.lastCheckIn))} ago
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          device.batteryLevel > 50 ? 'bg-success' : 
                          device.batteryLevel > 20 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${device.batteryLevel}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{device.batteryLevel}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeviceSelect(device)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredDevices.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No devices found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}