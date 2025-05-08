import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orders, userProducts, users } from '../data';

const router = express.Router();

// Get user's orders
router.get('/', (req, res) => {
  const userId = (req as any).user.id;
  
  if (!orders[userId]) {
    orders[userId] = [];
  }
  
  return res.json({ 
    orders: orders[userId],
    total: orders[userId].length,
  });
});

// Get order by ID
router.get('/:id', (req, res) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  
  if (!orders[userId]) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  const order = orders[userId].find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  return res.json({ order });
});

// Create a new order
router.post('/', (req, res) => {
  const userId = (req as any).user.id;
  const { items, paymentMethod, paymentDetails } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item' });
  }
  
  // Calculate total
  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalCredits = items.reduce((sum, item) => sum + (item.product.creditCost * item.quantity), 0);
  
  // Check if user has enough credits if paying with credits
  if (paymentMethod === 'credits') {
    const user = users.find(u => u.id === userId);
    if (!user || user.credits < totalCredits) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }
    
    // Update user credits (in a real app, this would be a transaction)
    // This is a simplification for the mock backend
    if (user) {
      user.credits -= totalCredits;
    }
  }
  
  // Create new order
  const orderId = uuidv4();
  const newOrder = {
    id: orderId,
    userId,
    items,
    totalAmount,
    totalCredits,
    paymentMethod,
    paymentDetails,
    status: 'completed',
    purchaseDate: new Date().toISOString(),
  };
  
  // Add to orders
  if (!orders[userId]) {
    orders[userId] = [];
  }
  orders[userId].push(newOrder);
  
  // Add products to user's active products
  if (!userProducts[userId]) {
    userProducts[userId] = [];
  }
  
  items.forEach(item => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Default 30 days
    
    userProducts[userId].push({
      id: `${orderId}-${item.product.id}`,
      productId: item.product.id,
      name: item.product.name,
      type: item.product.type,
      purchaseDate: newOrder.purchaseDate,
      expiryDate: expiryDate.toISOString(),
      status: 'active',
      configuration: item.configurationDetails,
    });
  });
  
  return res.status(201).json({ order: newOrder });
});

export const orderRoutes = router;