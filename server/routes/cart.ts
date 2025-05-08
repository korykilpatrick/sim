import express from 'express';
import { products } from '../data';

const router = express.Router();

// Mock cart storage (in-memory)
const userCarts: Record<string, any[]> = {};

// Get user's cart
router.get('/', (req, res) => {
  const userId = (req as any).user.id;
  
  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }
  
  return res.json({ 
    items: userCarts[userId],
    total: calculateTotal(userCarts[userId]),
  });
});

// Add item to cart
router.post('/items', (req, res) => {
  const userId = (req as any).user.id;
  const { productId, quantity = 1, configurationDetails = {} } = req.body;
  
  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  // Check if product is already in cart
  const existingItemIndex = userCarts[userId].findIndex(item => 
    item.product.id === productId && 
    JSON.stringify(item.configurationDetails) === JSON.stringify(configurationDetails)
  );
  
  if (existingItemIndex > -1) {
    // Update quantity
    userCarts[userId][existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    userCarts[userId].push({ 
      product, 
      quantity, 
      configurationDetails 
    });
  }
  
  return res.status(201).json({ 
    items: userCarts[userId],
    total: calculateTotal(userCarts[userId]),
  });
});

// Update cart item
router.put('/items/:itemIndex', (req, res) => {
  const userId = (req as any).user.id;
  const { itemIndex } = req.params;
  const { quantity, configurationDetails } = req.body;
  
  if (!userCarts[userId] || !userCarts[userId][Number(itemIndex)]) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  
  if (quantity) {
    userCarts[userId][Number(itemIndex)].quantity = quantity;
  }
  
  if (configurationDetails) {
    userCarts[userId][Number(itemIndex)].configurationDetails = configurationDetails;
  }
  
  return res.json({ 
    items: userCarts[userId],
    total: calculateTotal(userCarts[userId]),
  });
});

// Remove item from cart
router.delete('/items/:itemIndex', (req, res) => {
  const userId = (req as any).user.id;
  const { itemIndex } = req.params;
  
  if (!userCarts[userId] || !userCarts[userId][Number(itemIndex)]) {
    return res.status(404).json({ message: 'Cart item not found' });
  }
  
  userCarts[userId].splice(Number(itemIndex), 1);
  
  return res.json({ 
    items: userCarts[userId],
    total: calculateTotal(userCarts[userId]),
  });
});

// Clear cart
router.delete('/', (req, res) => {
  const userId = (req as any).user.id;
  userCarts[userId] = [];
  
  return res.json({ 
    items: [],
    total: { price: 0, credits: 0 },
  });
});

// Helper function to calculate total price and credits
function calculateTotal(items: any[]) {
  return items.reduce(
    (total, item) => {
      return {
        price: total.price + (item.product.price * item.quantity),
        credits: total.credits + (item.product.creditCost * item.quantity),
      };
    },
    { price: 0, credits: 0 }
  );
}

export const cartRoutes = router;