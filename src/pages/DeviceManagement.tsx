import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { DeviceList } from "@/components/devices/DeviceList";
import { DeviceDrawer } from "@/components/devices/DeviceDrawer";
import { Device } from "@/data/mockData";

const DeviceManagement = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedDevice(null);
  };

  return (
    <AppLayout title="Device Management">
      <DeviceList onDeviceSelect={handleDeviceSelect} />
      <DeviceDrawer 
        device={selectedDevice}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </AppLayout>
  );
};

export default DeviceManagement;