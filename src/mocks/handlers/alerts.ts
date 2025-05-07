import { http, HttpResponse, delay } from 'msw';
import { alertNotifications, userProducts } from '../data';
import { v4 as uuidv4 } from 'uuid';

export const alertHandlers = [
  // Get user's alerts
  http.get('/api/user/alerts', async () => {
    await delay(500);
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    const userAlerts = alertNotifications[userId] || [];
    
    return HttpResponse.json({
      alerts: userAlerts,
    });
  }),
  
  // Create a new alert configuration
  http.post('/api/alerts', async ({ request }) => {
    await delay(700);
    
    const { productId, alertType, configuration } = await request.json();
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    // Simulate storing the alert configuration
    const now = new Date().toISOString();
    const alertId = uuidv4();
    
    // Add to user's products (simulating purchase of an alert product)
    if (!userProducts[userId]) {
      userProducts[userId] = [];
    }
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (configuration.monitoringDurationDays || 30));
    
    userProducts[userId].push({
      id: alertId,
      productId,
      name: `${alertType} Alert`,
      type: 'MARITIME_ALERT',
      purchaseDate: now,
      expiryDate: expiryDate.toISOString(),
      status: 'active',
      configuration,
    });
    
    return HttpResponse.json({
      success: true,
      alert: {
        id: alertId,
        productId,
        alertType,
        configuration,
        createdAt: now,
        status: 'active',
      },
    });
  }),
  
  // Get alert details
  http.get('/api/alerts/:alertId', async ({ params }) => {
    await delay(300);
    
    const { alertId } = params;
    
    // In a real app, this would check authorization and fetch from database
    const userId = '1'; // Hardcoded for demo
    
    const userProduct = (userProducts[userId] || []).find(p => p.id === alertId);
    
    if (!userProduct) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Alert not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return HttpResponse.json({
      alert: {
        id: alertId,
        productId: userProduct.productId,
        name: userProduct.name,
        configuration: userProduct.configuration,
        createdAt: userProduct.purchaseDate,
        expiryDate: userProduct.expiryDate,
        status: userProduct.status,
      },
    });
  }),
  
  // Mark alert notification as read
  http.put('/api/user/alerts/:notificationId', async ({ params }) => {
    await delay(300);
    
    const { notificationId } = params;
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    if (!alertNotifications[userId]) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Notification not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          }, 
        }
      );
    }
    
    const notification = alertNotifications[userId].find(n => n.id === notificationId);
    
    if (!notification) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Notification not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Mark as read
    notification.read = true;
    
    return HttpResponse.json({
      success: true,
      notification,
    });
  }),
];