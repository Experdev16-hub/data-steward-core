import React, { useState } from 'react';
import { mockDevices, Device } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye, Search, Filter } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Device Management</CardTitle>
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
      </CardContent>
    </Card>
  );
}