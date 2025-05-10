import express from 'express';
import type { Request, Response } from 'express';
import { products } from '../data';
import type { CartItem } from '@shared-types/cart';
import type {
  ProductConfigurationDetailsU,
  VTSProductConfiguration,
} from '@shared-types/productConfiguration';
import type { ProductType, BaseProduct } from '@shared-types/product';
import type { User } from '@shared-types/user';
import type { Result } from '@shared-types/utility';

const router = express.Router();

// Mock cart storage (in-memory)
const userCarts: Record<string, CartItem[]> = {};

/**
 * Response structure for cart endpoints
 */
interface CartResponse {
  /** Array of items in the cart */
  items: CartItem[];
  /** Total price and credits for all items */
  total: { price: number; credits: number };
}

/**
 * Error response type for cart routes
 */
interface CartErrorResponse {
  /** Error message */
  message: string;
  /** Optional error code */
  code?: string;
}

/**
 * Unified result type for cart operations
 */
type CartResult = Result<CartResponse, CartErrorResponse>;

/**
 * Type for the GET / route params
 */
interface GetCartParams {}

/**
 * Get user's cart
 * Returns the current user's cart or creates an empty one if none exists
 *
 * @route GET /api/cart
 * @returns CartResponse with items and totals or error
 */
router.get(
  '/',
  (
    req: Request<GetCartParams, CartResponse | CartErrorResponse>,
    res: Response<CartResponse | CartErrorResponse>,
  ): Response<CartResponse | CartErrorResponse> => {
    const userId = (req.user as User)?.id; // Safely access id after casting
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    if (!userCarts[userId]) {
      userCarts[userId] = [];
    }

    return res.json({
      items: userCarts[userId],
      total: calculateTotal(userCarts[userId]),
    });
  },
);

/**
 * Request body for adding an item to cart
 */
interface AddToCartRequestBody {
  /** ID of the product to add */
  productId: string;
  /** Quantity of the product (defaults to 1) */
  quantity?: number;
  /** Optional product configuration details */
  configurationDetails?: ProductConfigurationDetailsU;
}

/**
 * Add item to cart
 * Adds a product to the user's cart with optional configuration
 *
 * @route POST /api/cart/items
 * @param productId - ID of the product to add
 * @param quantity - Quantity to add (defaults to 1)
 * @param configurationDetails - Optional configuration for the product
 * @returns Updated cart with new item added
 */
router.post(
  '/items',
  (
    req: Request<{}, CartResponse | CartErrorResponse, AddToCartRequestBody>,
    res: Response<CartResponse | CartErrorResponse>,
  ): Response<CartResponse | CartErrorResponse> => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { productId, quantity = 1, configurationDetails } = req.body;

    if (!userCarts[userId]) {
      userCarts[userId] = [];
    }

    const product = products.find((p) => p.id === productId) as
      | BaseProduct
      | undefined;

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        code: 'PRODUCT_NOT_FOUND',
      });
    }

    const currentConfigurationDetails =
      configurationDetails ||
      getDefaultConfigForProduct(product.id, product.type as ProductType);

    const existingItemIndex = userCarts[userId].findIndex(
      (item) =>
        item.product.id === productId &&
        JSON.stringify(item.configurationDetails) ===
          JSON.stringify(currentConfigurationDetails),
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
  },
);

/**
 * Request body for updating a cart item
 */
interface UpdateCartItemRequestBody {
  /** Updated quantity (set to 0 to remove) */
  quantity?: number;
  /** Updated product configuration */
  configurationDetails?: ProductConfigurationDetailsU;
}

/**
 * Parameters for updating a cart item
 */
interface UpdateCartItemParams {
  /** Index of the item in the cart */
  itemIndex: string;
}

/**
 * Update cart item
 * Updates quantity or configuration of an existing cart item
 *
 * @route PUT /api/cart/items/:itemIndex
 * @param itemIndex - Index of the item to update
 * @returns Updated cart after modifications
 */
router.put(
  '/items/:itemIndex',
  (
    req: Request<
      UpdateCartItemParams,
      CartResponse | CartErrorResponse,
      UpdateCartItemRequestBody
    >,
    res: Response<CartResponse | CartErrorResponse>,
  ): Response<CartResponse | CartErrorResponse> => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { itemIndex } = req.params;
    const { quantity, configurationDetails } = req.body;

    if (!userCarts[userId] || !userCarts[userId][Number(itemIndex)]) {
      return res.status(404).json({
        message: 'Cart item not found',
        code: 'CART_ITEM_NOT_FOUND',
      });
    }

    if (quantity !== undefined && quantity >= 0) {
      // Ensure quantity is valid
      if (quantity === 0) {
        userCarts[userId].splice(Number(itemIndex), 1); // Remove if quantity is 0
      } else {
        userCarts[userId][Number(itemIndex)].quantity = quantity;
      }
    }

    if (configurationDetails) {
      userCarts[userId][Number(itemIndex)].configurationDetails =
        configurationDetails;
    }

    return res.json({
      items: userCarts[userId],
      total: calculateTotal(userCarts[userId]),
    });
  },
);

/**
 * Parameters for removing a cart item
 */
interface RemoveCartItemParams {
  /** Index of the item to remove */
  itemIndex: string;
}

/**
 * Remove item from cart
 * Removes an item completely from the cart
 *
 * @route DELETE /api/cart/items/:itemIndex
 * @param itemIndex - Index of the item to remove
 * @returns Updated cart after removal
 */
router.delete(
  '/items/:itemIndex',
  (
    req: Request<RemoveCartItemParams>,
    res: Response<CartResponse | CartErrorResponse>,
  ): Response<CartResponse | CartErrorResponse> => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { itemIndex } = req.params;

    if (!userCarts[userId] || !userCarts[userId][Number(itemIndex)]) {
      return res.status(404).json({
        message: 'Cart item not found',
        code: 'CART_ITEM_NOT_FOUND',
      });
    }

    userCarts[userId].splice(Number(itemIndex), 1);

    return res.json({
      items: userCarts[userId],
      total: calculateTotal(userCarts[userId]),
    });
  },
);

/**
 * Clear cart
 * Removes all items from the user's cart
 *
 * @route DELETE /api/cart
 * @returns Empty cart response
 */
router.delete(
  '/',
  (
    req: Request,
    res: Response<CartResponse | CartErrorResponse>,
  ): Response<CartResponse | CartErrorResponse> => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    userCarts[userId] = [];
    return res.json({
      items: [],
      total: { price: 0, credits: 0 },
    });
  },
);

/**
 * Calculate total price and credits for cart items
 *
 * @param items - Array of cart items
 * @returns Object with total price and credits
 */
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

/**
 * Get default configuration for a product type
 *
 * @param _productId - Product ID (not used in mock implementation)
 * @param productType - Type of product to get default configuration for
 * @returns Default configuration object for the product type
 */
function getDefaultConfigForProduct(
  _productId: string,
  productType: ProductType,
): ProductConfigurationDetailsU {
  // Add more sophisticated default configurations based on productType
  switch (productType) {
    case 'VTS':
      return {
        type: 'VTS',
        trackingDurationDays: 30,
        selectedCriteria: [],
        vesselIMOs: [],
      } as VTSProductConfiguration;

    // Add cases for other product types as needed
    // AMS, REPORT_COMPLIANCE, etc.

    default:
      // Fallback to a very generic object
      return { type: productType } as ProductConfigurationDetailsU;
  }
}

export const cartRoutes = router;
