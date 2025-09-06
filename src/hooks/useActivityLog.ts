import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ActivityLog, mockActivityLog } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function useActivityLog() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate Firebase connection for now
    const simulateFirebaseConnection = () => {
      try {
        setTimeout(() => {
          setActivities(mockActivityLog);
          setLoading(false);
          console.log('✅ Activity log loaded from Firebase (simulated)');
        }, 800);

        // Uncomment below for actual Firebase implementation:
        /*
        const activitiesRef = collection(db, 'activityLogs');
        const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(50));
        
        const unsubscribe = onSnapshot(q, 
          (snapshot) => {
            const activitiesData: ActivityLog[] = [];
            snapshot.forEach((doc) => {
              activitiesData.push({ id: doc.id, ...doc.data() } as ActivityLog);
            });
            setActivities(activitiesData);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching activity log:', error);
            setError(error.message);
            setLoading(false);
            toast({
              title: "Error loading activity log",
              description: "Failed to load activity data from Firebase",
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
        setActivities(mockActivityLog);
      }
    };

    simulateFirebaseConnection();
  }, [toast]);

  return { activities, loading, error };
}