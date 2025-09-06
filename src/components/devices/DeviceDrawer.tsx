import React, { useState } from 'react';
import { Device } from '@/data/mockData';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Smartphone, 
  MapPin, 
  RefreshCw, 
  Image as ImageIcon, 
  MessageSquare, 
  Users, 
  Clock,
  AlertCircle,
  Shield
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceDrawerProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'online': return 'secondary';
    case 'warning': return 'destructive';
    case 'offline': return 'destructive';
    default: return 'secondary';
  }
};

export function DeviceDrawer({ device, isOpen, onClose }: DeviceDrawerProps) {
  if (!device) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-3">
            <Smartphone className="h-5 w-5" />
            {device.deviceModel} - {device.employeeName}
          </SheetTitle>
          <SheetDescription>
            Device monitoring and compliance overview
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Device Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employee:</span>
                      <span className="font-medium">{device.employeeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{device.employeeEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device Model:</span>
                      <span className="font-medium">{device.deviceModel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={getStatusVariant(device.status)}>
                        {device.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="font-medium">{device.networkType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery Level:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              device.batteryLevel > 50 ? 'bg-success' : 
                              device.batteryLevel > 20 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${device.batteryLevel}%` }}
                          />
                        </div>
                        <span className="font-medium">{device.batteryLevel}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Check-in:</span>
                      <span className="font-medium">
                        {formatDistanceToNow(new Date(device.lastCheckIn))} ago
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{device.location.address}</p>
                      <div className="text-xs text-muted-foreground">
                        <p>Coordinates: {device.location.lat}, {device.location.lng}</p>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button className="gap-2 bg-gradient-primary text-white">
                  <RefreshCw className="h-4 w-4" />
                  Request Device Sync
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Security Audit
                </Button>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Uploaded Media ({device.mediaUploads.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {device.mediaUploads.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No media uploads found</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {device.mediaUploads.map((media) => (
                        <Card key={media.id} className="overflow-hidden">
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <CardContent className="p-3">
                            <p className="font-medium text-sm truncate">{media.filename}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(media.uploadDate))} ago
                            </p>
                            <p className="text-xs text-muted-foreground">{media.metadata.fileSize}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communications Tab */}
            <TabsContent value="communications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Communications Audit
                  </CardTitle>
                  <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded border-l-4 border-warning">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    Audit data shown is automatically flagged by company DLP policies only. 
                    Access is logged and subject to compliance review.
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="whatsapp" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                      <TabsTrigger value="telegram">Telegram</TabsTrigger>
                    </TabsList>
                    <TabsContent value="whatsapp" className="space-y-4">
                      {device.communications.filter(c => c.app === 'whatsapp').map((comm) => (
                        <Card key={comm.id} className={comm.flagged ? 'border-destructive' : ''}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium">{comm.contact}</p>
                              {comm.flagged && (
                                <Badge variant="destructive">Flagged</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{comm.lastMessage}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(comm.timestamp))} ago
                            </p>
                            {comm.flagged && comm.reason && (
                              <p className="text-xs text-destructive mt-2">Reason: {comm.reason}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    <TabsContent value="telegram" className="space-y-4">
                      {device.communications.filter(c => c.app === 'telegram').map((comm) => (
                        <Card key={comm.id} className={comm.flagged ? 'border-destructive' : ''}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium">{comm.contact}</p>
                              {comm.flagged && (
                                <Badge variant="destructive">Flagged</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{comm.lastMessage}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(comm.timestamp))} ago
                            </p>
                            {comm.flagged && comm.reason && (
                              <p className="text-xs text-destructive mt-2">Reason: {comm.reason}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Device Contacts ({device.contacts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {device.contacts.map((contact) => (
                      <div key={contact.id} className="flex justify-between items-center p-3 border border-border rounded">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.phoneNumber}</p>
                          {contact.email && (
                            <p className="text-xs text-muted-foreground">{contact.email}</p>
                          )}
                        </div>
                        <Badge variant="secondary">{contact.category}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location History Tab */}
            <TabsContent value="location" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Location History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {device.locationHistory.map((location) => (
                      <div key={location.id} className="flex justify-between items-start p-4 border border-border rounded">
                        <div>
                          <p className="font-medium">{location.location.address}</p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {location.duration} minutes
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(location.timestamp))} ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}