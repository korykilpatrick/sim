import express from 'express';
import cors from 'cors';
import { productRoutes } from './routes/products';
import { authRoutes } from './routes/auth';
import { cartRoutes } from './routes/cart';
import { orderRoutes } from './routes/orders';
import { alertRoutes } from './routes/alerts';
import { creditRoutes } from './routes/credits';
import { rfiRoutes } from './routes/rfi';
import { users, tokens } from './data';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Add artificial delay to simulate network latency (optional)
app.use((req, res, next) => {
  setTimeout(next, 300);
});

// JWT Authentication Middleware
const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Check if token matches any known token
  const userId = Object.keys(tokens).find((id) => tokens[id] === token);

  if (!userId) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Set the user property on the request
  (req as express.Request & { user: typeof user }).user = user;
  next();
};

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', authenticateToken, cartRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/alerts', authenticateToken, alertRoutes);
app.use('/api/credits', authenticateToken, creditRoutes);
app.use('/api/rfi', authenticateToken, rfiRoutes);

// Error handler middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  },
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
