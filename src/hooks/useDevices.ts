import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Device, mockDevices } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // For now, we'll use mock data with a simulated Firebase connection
    // In production, this would connect to actual Firebase
    const simulateFirebaseConnection = () => {
      try {
        // Simulate loading time
        setTimeout(() => {
          setDevices(mockDevices);
          setLoading(false);
          console.log('✅ Devices loaded from Firebase (simulated)');
        }, 1000);

        // Uncomment below for actual Firebase implementation:
        /*
        const devicesRef = collection(db, 'devices');
        const q = query(devicesRef, orderBy('lastCheckIn', 'desc'));
        
        const unsubscribe = onSnapshot(q, 
          (snapshot) => {
            const devicesData: Device[] = [];
            snapshot.forEach((doc) => {
              devicesData.push({ id: doc.id, ...doc.data() } as Device);
            });
            setDevices(devicesData);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching devices:', error);
            setError(error.message);
            setLoading(false);
            toast({
              title: "Error loading devices",
              description: "Failed to load device data from Firebase",
              variant: "destructive",
            });
          }
        );

        return unsubscribe;
        */
      } catch (err) {
        console.error('Firebase connection error:', err);
        setError('Failed to connect to Firebase');
        setLoading(false);
        // Fallback to mock data
        setDevices(mockDevices);
      }
    };

    simulateFirebaseConnection();
  }, [toast]);

  return { devices, loading, error };
}

export function useDeviceStats() {
  const { devices } = useDevices();
  
  const stats = {
    totalActiveDevices: devices.filter(d => d.status === 'online').length,
    totalMediaAssets: devices.reduce((acc, device) => acc + device.mediaUploads.length, 0),
    complianceStatus: Math.round((devices.filter(d => d.status === 'online').length / devices.length) * 100) || 95,
    offlineDevices: devices.filter(d => d.status === 'offline').length
  };

  return stats;
}