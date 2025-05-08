import { BaseProduct, MaritimeAlertProduct } from '../../src/types/product';
import { User } from '../../src/types/user';
import { AlertNotification } from '../../src/types/alert';
import { CreditTransaction } from '../../src/types/credits';

// Products
export const products: BaseProduct[] = [
  {
    id: '1',
    name: 'Vessel Tracking Service',
    shortDescription: 'Track vessel movements worldwide',
    longDescription:
      'The Vessel Tracking Service (VTS) provides comprehensive monitoring of vessel activities globally. Set up alerts based on vessel behavior, position, and other criteria.',
    type: 'VTS',
    price: 199.99,
    creditCost: 20,
    imageUrl: 'https://placehold.co/400x300?text=VTS',
    tags: ['vessel', 'tracking', 'maritime'],
  },
  {
    id: '2',
    name: 'Area Monitoring Service',
    shortDescription: 'Monitor specific maritime areas',
    longDescription:
      'The Area Monitoring Service (AMS) allows you to define custom areas of interest and receive notifications about vessel activities within those areas.',
    type: 'AMS',
    price: 299.99,
    creditCost: 30,
    imageUrl: 'https://placehold.co/400x300?text=AMS',
    tags: ['area', 'monitoring', 'maritime'],
  },
  {
    id: '3',
    name: 'Fleet Tracking Service',
    shortDescription: 'Track your entire fleet in real-time',
    longDescription:
      'The Fleet Tracking Service (FTS) offers comprehensive monitoring of your entire fleet. Get detailed insights into vessel performance, location, and activities.',
    type: 'FTS',
    price: 499.99,
    creditCost: 50,
    imageUrl: 'https://placehold.co/400x300?text=FTS',
    tags: ['fleet', 'tracking', 'maritime'],
  },
  {
    id: '4',
    name: 'Vessel Compliance Report',
    shortDescription: 'Detailed vessel compliance analysis',
    longDescription:
      "Our Vessel Compliance Report provides a comprehensive analysis of a vessel's compliance with international regulations and standards.",
    type: 'REPORT_COMPLIANCE',
    price: 149.99,
    creditCost: 15,
    imageUrl: 'https://placehold.co/400x300?text=Compliance',
    tags: ['report', 'compliance', 'vessel'],
  },
  {
    id: '5',
    name: 'Vessel Chronology Report',
    shortDescription: 'Historical vessel movement record',
    longDescription:
      'The Vessel Chronology Report offers a detailed historical record of vessel movements, port calls, and activities over a specified time period.',
    type: 'REPORT_CHRONOLOGY',
    price: 129.99,
    creditCost: 12,
    imageUrl: 'https://placehold.co/400x300?text=Chronology',
    tags: ['report', 'chronology', 'vessel'],
  },
  {
    id: '6',
    name: 'Maritime Investigations',
    shortDescription: 'Detailed maritime incident investigation',
    longDescription:
      'Our Maritime Investigations service provides thorough analysis and investigation of maritime incidents, anomalies, or suspicious activities.',
    type: 'INVESTIGATION',
    price: 799.99,
    creditCost: 80,
    imageUrl: 'https://placehold.co/400x300?text=Investigation',
    tags: ['investigation', 'maritime', 'incident'],
  },
  {
    id: '7',
    name: 'Maritime Alert',
    shortDescription: 'Custom maritime alert configuration',
    longDescription:
      'Configure custom alerts for various maritime events. Choose between ship-based alerts, area-based alerts, or combined monitoring.',
    type: 'MARITIME_ALERT',
    price: 249.99,
    creditCost: 25,
    imageUrl: 'https://placehold.co/400x300?text=Alert',
    tags: ['alert', 'maritime', 'tracking'],
  } as MaritimeAlertProduct,
];

// Users
export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Test User',
    credits: 100,
  },
  {
    id: '2',
    email: 'newuser@somewhere.com',
    name: 'New User',
    credits: 50,
  },
];

// Auth tokens (in a real app, these would be JWTs)
export const tokens: Record<string, string> = {
  '1': 'mock-jwt-token-for-user-1',
  '2': 'mock-jwt-token-for-new-user',
};

// Credit transactions
export const creditTransactions: Record<string, CreditTransaction[]> = {
  '1': [
    {
      id: '1',
      amount: 100,
      description: 'Initial credit purchase',
      timestamp: '2023-06-01T12:00:00Z',
    },
    {
      id: '2',
      amount: -20,
      description: 'Vessel Tracking Service purchase',
      timestamp: '2023-06-05T15:30:00Z',
      orderId: '1001',
      productId: '1',
    },
  ],
  '2': [
    {
      id: '3',
      amount: 50,
      description: 'Gifted credits',
      timestamp: '2023-06-10T11:00:00Z',
    },
  ],
};

// Alert notifications
export const alertNotifications: Record<string, AlertNotification[]> = {
  '1': [
    {
      id: '1',
      timestamp: '2023-06-10T08:15:00Z',
      title: 'Vessel XYZ entered monitored area',
      summary:
        'The vessel with IMO 9876543 has entered your monitored area in the Gulf of Mexico.',
      read: false,
      linkToDetails: '/protected/ams/2?eventId=123',
      severity: 'info',
    },
    {
      id: '2',
      timestamp: '2023-06-09T19:45:00Z',
      title: 'Vessel ABC reporting gap detected',
      summary:
        'The vessel with IMO 1234567 has not reported its position for more than 6 hours.',
      read: true,
      linkToDetails: '/protected/vts/1?eventId=456',
      severity: 'warning',
    },
  ],
  '2': [
    {
      id: '3',
      timestamp: '2023-06-11T10:00:00Z',
      title: 'Test Vessel Entered Your Zone',
      summary: 'IMO 3456789 entered your custom zone. Check it out!',
      read: false,
      severity: 'info',
    },
  ],
};

// Orders (purchases)
export const orders: Record<string, any[]> = {
  '1': [
    {
      id: '1001',
      userId: '1',
      items: [
        {
          product: products[0],
          quantity: 1,
          configurationDetails: {
            trackingDurationDays: 30,
            selectedCriteria: ['AIS_REPORTING_6HR', 'DARK_EVENT'],
            vesselIMOs: ['9876543'],
          },
        },
      ],
      totalAmount: 199.99,
      totalCredits: 20,
      paymentMethod: 'credits',
      status: 'completed',
      purchaseDate: '2023-06-05T15:30:00Z',
    },
  ],
  '2': [
    {
      id: '2001',
      userId: '2',
      items: [
        {
          product: products[1],
          quantity: 1,
          configurationDetails: {
            monitoringDurationDays: 60,
            updateFrequencyHours: 12,
            selectedCriteria: ['VESSEL_ENTRY', 'VESSEL_EXIT'],
            areaName: 'Gulf of Mexico',
          },
        },
      ],
      totalAmount: 299.99,
      totalCredits: 30,
      paymentMethod: 'credits',
      status: 'completed',
      purchaseDate: '2023-06-12T09:00:00Z',
    },
  ],
};

// Purchased products (user's active products)
export const userProducts: Record<string, any[]> = {
  '1': [
    {
      id: '1001-1',
      productId: '1',
      name: 'Vessel Tracking Service',
      type: 'VTS',
      purchaseDate: '2023-06-05T15:30:00Z',
      expiryDate: '2023-07-05T15:30:00Z',
      status: 'active',
      configuration: {
        trackingDurationDays: 30,
        selectedCriteria: ['AIS_REPORTING_6HR', 'DARK_EVENT'],
        vesselIMOs: ['9876543'],
      },
    },
  ],
  '2': [
    {
      id: '2001-2',
      productId: '2',
      name: 'Area Monitoring Service',
      type: 'AMS',
      purchaseDate: '2023-06-12T09:00:00Z',
      expiryDate: '2023-08-11T09:00:00Z',
      status: 'active',
      configuration: {
        monitoringDurationDays: 60,
        updateFrequencyHours: 12,
        selectedCriteria: ['VESSEL_ENTRY', 'VESSEL_EXIT'],
        areaName: 'Gulf of Mexico',
      },
    },
  ],
};
