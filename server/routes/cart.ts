import express, { Request, Response } from 'express';
import { products } from '../data'; // Assuming products in data.ts are compatible with BaseProduct
import type { CartItem } from '@shared-types/cart';
import type { ProductConfigurationDetailsU } from '@shared-types/productConfiguration';
import type { ProductType, BaseProduct } from '@shared-types/product';
import type { User } from '@shared-types/user';

const router = express.Router();

// Mock cart storage (in-memory)
const userCarts: Record<string, CartItem[]> = {};

interface CartResponse {
  items: CartItem[];
  total: { price: number; credits: number };
}

// Get user's cart
router.get('/', (req: Request, res: Response<CartResponse>) => {
  const userId = (req.user as User)?.id; // Safely access id after casting
  if (!userId) return res.status(401).json({ message: 'Unauthorized' } as any); // Type assertion for error response

  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }
  return res.json({
    items: userCarts[userId],
    total: calculateTotal(userCarts[userId]),
  });
});

interface AddToCartRequestBody {
  productId: string;
  quantity?: number;
  configurationDetails?: ProductConfigurationDetailsU;
}

// Add item to cart
router.post('/items', (req: Request<{}, CartResponse | { message: string }, AddToCartRequestBody>, res: Response<CartResponse | { message: string }>) => {
  const userId = (req.user as User)?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { productId, quantity = 1, configurationDetails } = req.body;

  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }

  const product = products.find((p) => p.id === productId) as BaseProduct | undefined;

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const currentConfigurationDetails =
    configurationDetails || getDefaultConfigForProduct(product.id, product.type as ProductType);

  const existingItemIndex = userCarts[userId].findIndex(
    (item) =>
      item.product.id === productId &&
      JSON.stringify(item.configurationDetails) === JSON.stringify(currentConfigurationDetails)
  );

  if (existingItemIndex > -1) {
    userCarts[userId][existingItemIndex].quantity += quantity;
  } else {
    const newCartItem: CartItem = {
      itemId: Math.random().toString(36).substring(2, 15), // mock ID
      product,
      quantity,
      configurationDetails: currentConfigurationDetails,
    };
    userCarts[userId].push(newCartItem);
  }

  return res.status(201).json({
    items: userCarts[userId],
    total: calculateTotal(userCarts[userId]),
  });
});

interface UpdateCartItemRequestBody {
  quantity?: number;
  configurationDetails?: ProductConfigurationDetailsU;
}

// Update cart item
router.put('/items/:itemIndex', (req: Request<{ itemIndex: string }, CartResponse | { message: string }, UpdateCartItemRequestBody>, res: Response<CartResponse | { message: string }>) => {
  const userId = (req.user as User)?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { itemIndex } = req.params;
  const { quantity, configurationDetails } = req.body;

  if (!userCarts[userId] || !userCarts[userId][Number(itemIndex)]) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  if (quantity !== undefined && quantity >= 0) { // Ensure quantity is valid
    if (quantity === 0) {
      userCarts[userId].splice(Number(itemIndex), 1); // Remove if quantity is 0
    } else {
      userCarts[userId][Number(itemIndex)].quantity = quantity;
    }
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
router.delete('/items/:itemIndex', (req: Request<{ itemIndex: string }>, res: Response<CartResponse | { message: string }>) => {
  const userId = (req.user as User)?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

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
router.delete('/', (req: Request, res: Response<CartResponse>) => {
  const userId = (req.user as User)?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' } as any);

  userCarts[userId] = [];
  return res.json({
    items: [],
    total: { price: 0, credits: 0 },
  });
});

function calculateTotal(items: CartItem[]): { price: number; credits: number } {
  return items.reduce(
    (acc, item) => {
      const price = item.configuredPrice ?? item.product.price;
      const creditCost = item.configuredCreditCost ?? item.product.creditCost;
      acc.price += price * item.quantity;
      acc.credits += creditCost * item.quantity;
      return acc;
    },
    { price: 0, credits: 0 },
  );
}

function getDefaultConfigForProduct(
  _productId: string, // Mark as unused if not needed for basic mock
  productType: ProductType,
): ProductConfigurationDetailsU {
  // console.warn(
  //   `getDefaultConfigForProduct called for ${_productId} (${productType}), returning basic object. IMPLEMENT DEFAULTS.`,
  // );
  // Add more sophisticated default configurations based on productType
  switch (productType) {
    case 'VTS':
      return {
        type: 'VTS',
        trackingDurationDays: 30,
        selectedCriteria: [],
        vesselIMOs: [],
      };
    // Add cases for other product types as needed
    // AMS, REPORT_COMPLIANCE, etc.
    default:
      // console.error(`No default config implemented for product type: ${productType}`);
      // Fallback to a very generic object, or throw error
      return { type: productType } as unknown as ProductConfigurationDetailsU;
  }
}

export const cartRoutes = router;
