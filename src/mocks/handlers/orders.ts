import { http, HttpResponse, delay } from 'msw';
import { orders, userProducts, users, creditTransactions } from '../data';
import { v4 as uuidv4 } from 'uuid';

export const orderHandlers = [
  // Create order (checkout)
  http.post('/api/orders', async ({ request }) => {
    await delay(1000);
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Unauthorized' 
        }), 
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const { items, totalAmount, totalCredits, paymentMethod } = await request.json();
    
    // Simple validation
    if (!items || !items.length) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'No items in order' 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Mock user ID extraction from token (in a real app, this would be a JWT decode)
    const userId = '1'; // Hardcoded for demo
    const user = users.find(u => u.id === userId);
    
    // If paying with credits, check balance
    if (paymentMethod === 'credits' && user && user.credits < totalCredits) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Insufficient credits' 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Create new order
    const orderId = (Math.floor(Math.random() * 9000) + 1000).toString();
    const now = new Date().toISOString();
    
    const newOrder = {
      id: orderId,
      userId,
      items,
      totalAmount,
      totalCredits,
      paymentMethod,
      status: 'completed',
      purchaseDate: now,
    };
    
    // Add order to user's orders
    if (!orders[userId]) {
      orders[userId] = [];
    }
    orders[userId].push(newOrder);
    
    // Add purchased products to user's active products
    if (!userProducts[userId]) {
      userProducts[userId] = [];
    }
    
    items.forEach(item => {
      const expiryDate = new Date();
      // Default to 30 days expiry if not specified in configuration
      const durationDays = item.configurationDetails?.trackingDurationDays || 
                          item.configurationDetails?.monitoringDurationDays || 30;
      expiryDate.setDate(expiryDate.getDate() + durationDays);
      
      userProducts[userId].push({
        id: `${orderId}-${uuidv4().substring(0, 8)}`,
        productId: item.product.id,
        name: item.product.name,
        type: item.product.type,
        purchaseDate: now,
        expiryDate: expiryDate.toISOString(),
        status: 'active',
        configuration: item.configurationDetails || {},
      });
    });
    
    // If using credits, update user's credit balance
    if (paymentMethod === 'credits' && user) {
      user.credits -= totalCredits;
      
      // Add transaction record
      if (!creditTransactions[userId]) {
        creditTransactions[userId] = [];
      }
      
      creditTransactions[userId].push({
        id: uuidv4(),
        amount: -totalCredits,
        description: `Purchase: ${items.map(i => i.product.name).join(', ')}`,
        timestamp: now,
        orderId,
      });
    }
    
    return HttpResponse.json({
      success: true,
      order: newOrder,
    });
  }),
  
  // Get order details
  http.get('/api/orders/:orderId', async ({ params }) => {
    await delay(300);
    
    const { orderId } = params;
    
    // In a real app, this would check authorization
    const userId = '1'; // Hardcoded for demo
    
    const userOrders = orders[userId] || [];
    const order = userOrders.find(o => o.id === orderId);
    
    if (!order) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Order not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return HttpResponse.json({ order });
  }),
  
  // Get user's orders
  http.get('/api/user/orders', async () => {
    await delay(500);
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    const userOrders = orders[userId] || [];
    
    return HttpResponse.json({
      orders: userOrders,
    });
  }),
];