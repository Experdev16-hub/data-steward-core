export interface Device {
  id: string;
  employeeName: string;
  employeeEmail: string;
  deviceModel: string;
  status: 'online' | 'offline' | 'syncing' | 'warning';
  lastCheckIn: string;
  batteryLevel: number;
  networkType: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  mediaUploads: MediaUpload[];
  communications: Communication[];
  contacts: Contact[];
  locationHistory: LocationHistory[];
}

export interface MediaUpload {
  id: string;
  filename: string;
  type: 'image' | 'video';
  uploadDate: string;
  location: {
    lat: number;
    lng: number;
  };
  metadata: {
    camera: string;
    timestamp: string;
    fileSize: string;
  };
  thumbnailUrl: string;
}

export interface Communication {
  id: string;
  app: 'whatsapp' | 'telegram';
  contact: string;
  lastMessage: string;
  timestamp: string;
  flagged: boolean;
  reason?: string;
}

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  category: 'work' | 'personal' | 'client';
}

export interface LocationHistory {
  id: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  duration: number; // minutes spent at location
}

export interface ActivityLog {
  id: string;
  type: 'device_checkin' | 'media_upload' | 'policy_flag' | 'sync_complete';
  deviceId: string;
  employeeName: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}

// Mock Devices Data
export const mockDevices: Device[] = [
  {
    id: 'device-001',
    employeeName: 'John Anderson',
    employeeEmail: 'j.anderson@company.com',
    deviceModel: 'Google Pixel 7',
    status: 'online',
    lastCheckIn: '2024-01-15T14:30:00Z',
    batteryLevel: 87,
    networkType: '5G',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: 'Times Square Office, New York, NY'
    },
    mediaUploads: [
      {
        id: 'media-001',
        filename: 'site_inspection_001.jpg',
        type: 'image',
        uploadDate: '2024-01-15T12:15:00Z',
        location: { lat: 40.7589, lng: -73.9851 },
        metadata: {
          camera: 'Pixel 7 Main Camera',
          timestamp: '2024-01-15T12:15:00Z',
          fileSize: '2.4 MB'
        },
        thumbnailUrl: 'https://picsum.photos/400/300?random=1'
      }
    ],
    communications: [
      {
        id: 'comm-001',
        app: 'whatsapp',
        contact: 'Mike Johnson',
        lastMessage: 'Meeting confirmed for 3 PM',
        timestamp: '2024-01-15T13:45:00Z',
        flagged: false
      }
    ],
    contacts: [
      {
        id: 'contact-001',
        name: 'Mike Johnson',
        phoneNumber: '+1-555-0123',
        email: 'm.johnson@client.com',
        category: 'client'
      }
    ],
    locationHistory: [
      {
        id: 'loc-001',
        timestamp: '2024-01-15T09:00:00Z',
        location: {
          lat: 40.7589,
          lng: -73.9851,
          address: 'Times Square Office, New York, NY'
        },
        duration: 480
      }
    ]
  },
  {
    id: 'device-002',
    employeeName: 'Sarah Chen',
    employeeEmail: 's.chen@company.com',
    deviceModel: 'Samsung Galaxy S23',
    status: 'warning',
    lastCheckIn: '2024-01-15T14:25:00Z',
    batteryLevel: 23,
    networkType: '4G',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Downtown LA Office, Los Angeles, CA'
    },
    mediaUploads: [
      {
        id: 'media-002',
        filename: 'client_meeting_photos.jpg',
        type: 'image',
        uploadDate: '2024-01-15T11:30:00Z',
        location: { lat: 34.0522, lng: -118.2437 },
        metadata: {
          camera: 'Galaxy S23 Ultra',
          timestamp: '2024-01-15T11:30:00Z',
          fileSize: '3.1 MB'
        },
        thumbnailUrl: 'https://picsum.photos/400/300?random=2'
      }
    ],
    communications: [
      {
        id: 'comm-002',
        app: 'telegram',
        contact: 'David Wilson',
        lastMessage: 'Project timeline updated',
        timestamp: '2024-01-15T14:00:00Z',
        flagged: true,
        reason: 'Contains potential client confidential information'
      }
    ],
    contacts: [
      {
        id: 'contact-002',
        name: 'David Wilson',
        phoneNumber: '+1-555-0124',
        category: 'work'
      }
    ],
    locationHistory: [
      {
        id: 'loc-002',
        timestamp: '2024-01-15T08:30:00Z',
        location: {
          lat: 34.0522,
          lng: -118.2437,
          address: 'Downtown LA Office, Los Angeles, CA'
        },
        duration: 360
      }
    ]
  },
  {
    id: 'device-003',
    employeeName: 'Robert Taylor',
    employeeEmail: 'r.taylor@company.com',
    deviceModel: 'OnePlus 11',
    status: 'offline',
    lastCheckIn: '2024-01-15T11:45:00Z',
    batteryLevel: 0,
    networkType: 'Offline',
    location: {
      lat: 41.8781,
      lng: -87.6298,
      address: 'Chicago Branch Office, Chicago, IL'
    },
    mediaUploads: [],
    communications: [],
    contacts: [],
    locationHistory: []
  }
];

// Mock Activity Log
export const mockActivityLog: ActivityLog[] = [
  {
    id: 'activity-001',
    type: 'device_checkin',
    deviceId: 'device-001',
    employeeName: 'John Anderson',
    message: 'Device Pixel 7 is online',
    timestamp: '2024-01-15T14:30:00Z',
    severity: 'info'
  },
  {
    id: 'activity-002',
    type: 'media_upload',
    deviceId: 'device-001',
    employeeName: 'John Anderson',
    message: 'Uploaded 3 photos from client site inspection',
    timestamp: '2024-01-15T12:15:00Z',
    severity: 'info'
  },
  {
    id: 'activity-003',
    type: 'policy_flag',
    deviceId: 'device-002',
    employeeName: 'Sarah Chen',
    message: 'Message on Samsung S23 triggered DLP rule review',
    timestamp: '2024-01-15T14:00:00Z',
    severity: 'warning'
  },
  {
    id: 'activity-004',
    type: 'sync_complete',
    deviceId: 'device-002',
    employeeName: 'Sarah Chen',
    message: 'Device data sync completed successfully',
    timestamp: '2024-01-15T13:45:00Z',
    severity: 'info'
  }
];

// Stats
export const mockStats = {
  totalActiveDevices: 145,
  totalMediaAssets: 2847,
  complianceStatus: 95,
  offlineDevices: 8
};