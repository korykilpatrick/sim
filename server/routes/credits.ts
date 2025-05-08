import express from 'express';
import { creditTransactions, users } from '../data';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get user's credit balance
router.get('/balance', (req, res) => {
  const userId = (req as any).user.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    credits: user.credits,
  });
});

// Get user's credit transactions
router.get('/transactions', (req, res) => {
  const userId = (req as any).user.id;

  if (!creditTransactions[userId]) {
    creditTransactions[userId] = [];
  }

  return res.json({
    transactions: creditTransactions[userId],
    total: creditTransactions[userId].length,
  });
});

// Purchase credits
router.post('/purchase', (req, res) => {
  const userId = (req as any).user.id;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid credit amount' });
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user credits
  user.credits += amount;

  // Record transaction
  if (!creditTransactions[userId]) {
    creditTransactions[userId] = [];
  }

  const transaction = {
    id: uuidv4(),
    amount,
    description: `Credit purchase: ${amount} credits`,
    timestamp: new Date().toISOString(),
  };

  creditTransactions[userId].push(transaction);

  return res.status(201).json({
    transaction,
    newBalance: user.credits,
  });
});

export const creditRoutes = router;
