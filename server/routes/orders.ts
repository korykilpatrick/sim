import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orders, userProducts, users, products as allProducts } from '../data';
import {
  Order,
  OrderItem,
  UserProduct,
  PaymentMethod,
  OrderStatus,
  UserProductStatus,
  PaymentGatewayDetails,
} from '@shared-types/index';

const router = express.Router();

// Get user's orders
router.get('/', (req, res) => {
  const userId = req.user!.id;

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
  const userId = req.user!.id;
  const { id } = req.params;

  if (!orders[userId]) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const order = orders[userId].find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.json({ order });
});

interface CreateOrderRequestBody {
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentGatewayDetails;
}

// Create a new order
router.post('/', (req, res) => {
  const userId = req.user!.id;
  const { items, paymentMethod, paymentDetails } =
    req.body as CreateOrderRequestBody;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Order must contain at least one item' });
  }

  let calculatedTotalAmount = 0;
  let calculatedTotalCredits = 0;
  const validatedOrderItems: OrderItem[] = [];

  for (const clientItem of items) {
    const product = allProducts.find((p) => p.id === clientItem.product.id);
    if (!product) {
      return res
        .status(400)
        .json({
          message: `Product with ID ${clientItem.product.id} not found.`,
        });
    }

    calculatedTotalAmount += product.price * clientItem.quantity;
    calculatedTotalCredits += product.creditCost * clientItem.quantity;
    validatedOrderItems.push({
      product: product,
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
      user.credits -= calculatedTotalCredits;
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
    status: 'completed' as OrderStatus,
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
    expiryDate.setDate(expiryDate.getDate() + 30);

    const newUserProduct: UserProduct = {
      id: `${orderId}-${item.product.id}`,
      orderId: orderId,
      userId: userId,
      productId: item.product.id,
      name: item.product.name,
      type: item.product.type,
      purchaseDate: newOrder.purchaseDate,
      expiryDate: expiryDate.toISOString(),
      status: 'active' as UserProductStatus,
      configuration: item.configurationDetails,
    };
    userProducts[userId].push(newUserProduct);
  });

  return res.status(201).json({ order: newOrder });
});

export const orderRoutes = router;
