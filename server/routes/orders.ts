import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orders, userProducts, users, products as allProducts } from '../data';
// Import specific shared types
import type {
  Order,
  OrderItem,
  OrderStatus as _OrderStatus,
  PaymentMethod as _PaymentMethod,
  CreateOrderRequestBody,
} from '@shared-types/order';
import type {
  UserProduct,
  UserProductStatus as _UserProductStatus,
} from '@shared-types/userProduct';
import type { PaymentGatewayDetails as _PaymentGatewayDetails } from '@shared-types/payment';
import type { User } from '@shared-types/user';
import type { BaseProduct } from '@shared-types/product';

const router = express.Router();

// Define expected response types
interface OrdersResponse {
  orders: Order[];
  total: number;
}
interface SingleOrderResponse {
  order: Order;
}
interface ErrorResponse {
  message: string;
}

// Get user's orders
router.get(
  '/',
  (req: Request, res: Response<OrdersResponse | ErrorResponse>) => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    if (!orders[userId]) {
      orders[userId] = [];
    }

    return res.json({
      orders: orders[userId],
      total: orders[userId].length,
    });
  },
);

// Get order by ID
router.get(
  '/:id',
  (
    req: Request<{ id: string }>,
    res: Response<SingleOrderResponse | ErrorResponse>,
  ) => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params;

    if (!orders[userId]) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orders[userId].find((o) => o.id === id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ order });
  },
);

// Create a new order
router.post(
  '/',
  (
    req: Request<
      {},
      SingleOrderResponse | ErrorResponse,
      CreateOrderRequestBody
    >,
    res: Response<SingleOrderResponse | ErrorResponse>,
  ) => {
    const userId = (req.user as User)?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { items, paymentMethod, paymentDetails } = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: 'Order must contain at least one item' });
    }

    let calculatedTotalAmount = 0;
    let calculatedTotalCredits = 0;
    const validatedOrderItems: OrderItem[] = [];

    for (const clientItem of items) {
      // Ensure clientItem.product has an id
      if (!clientItem?.product?.id) {
        return res
          .status(400)
          .json({ message: 'Invalid item data: product ID missing.' });
      }
      const product = allProducts.find(
        (p) => p.id === clientItem.product.id,
      ) as BaseProduct | undefined;
      if (!product) {
        return res.status(400).json({
          message: `Product with ID ${clientItem.product.id} not found.`,
        });
      }

      calculatedTotalAmount += product.price * clientItem.quantity;
      calculatedTotalCredits += product.creditCost * clientItem.quantity;
      // Create a new validated OrderItem using the found product
      validatedOrderItems.push({
        product: product, // Use the validated product from the server data
        quantity: clientItem.quantity,
        configurationDetails: clientItem.configurationDetails,
      });
    }

    if (paymentMethod === 'credits') {
      const user = users.find((u) => u.id === userId);
      if (!user || user.credits < calculatedTotalCredits) {
        return res.status(400).json({ message: 'Insufficient credits' });
      }
      if (user) {
        user.credits -= calculatedTotalCredits; // Modify mock data
      }
    }

    const orderId = uuidv4();
    const newOrder: Order = {
      id: orderId,
      userId,
      items: validatedOrderItems,
      totalAmount: calculatedTotalAmount,
      totalCredits: calculatedTotalCredits,
      paymentMethod,
      paymentDetails,
      status: 'completed', // Set explicit status
      purchaseDate: new Date().toISOString(),
    };

    if (!orders[userId]) {
      orders[userId] = [];
    }
    orders[userId].push(newOrder);

    if (!userProducts[userId]) {
      userProducts[userId] = [];
    }

    validatedOrderItems.forEach((item) => {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // Mock 30 day expiry

      const newUserProduct: UserProduct = {
        id: `${orderId}-${item.product.id}-${Math.random().toString(16).slice(2)}`, // More unique mock ID
        orderId: orderId,
        userId: userId,
        productId: item.product.id,
        name: item.product.name,
        type: item.product.type, // Already BaseProduct type
        purchaseDate: newOrder.purchaseDate,
        expiryDate: expiryDate.toISOString(),
        status: 'active', // Set explicit status
        configuration: item.configurationDetails,
        lastUpdated: new Date().toISOString(),
      };
      userProducts[userId].push(newUserProduct);
    });

    return res.status(201).json({ order: newOrder });
  },
);

export const orderRoutes = router;
