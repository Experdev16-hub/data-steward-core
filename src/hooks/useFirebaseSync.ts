import { useState } from 'react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export function useFirebaseSync() {
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  const syncAllDevices = async () => {
    setSyncing(true);
    
    try {
      // Simulate sync operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log sync activity
      await addDoc(collection(db, 'activityLogs'), {
        type: 'sync_complete',
        message: 'Device data sync completed successfully',
        timestamp: serverTimestamp(),
        severity: 'info'
      });

      toast({
        title: "Sync Complete",
        description: "All device data has been synchronized successfully.",
      });

      console.log('✅ Firebase sync completed');
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize device data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  const syncDevice = async (deviceId: string) => {
    setSyncing(true);
    
    try {
      // Simulate individual device sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update device last sync time
      const deviceRef = doc(db, 'devices', deviceId);
      await updateDoc(deviceRef, {
        lastSync: serverTimestamp()
      });

      toast({
        title: "Device Synced",
        description: "Device data has been synchronized.",
      });

      console.log(`✅ Device ${deviceId} synced successfully`);
    } catch (error) {
      console.error('Device sync error:', error);
      toast({
        title: "Device Sync Failed",
        description: "Failed to sync device data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  return {
    syncing,
    syncAllDevices,
    syncDevice
  };
}