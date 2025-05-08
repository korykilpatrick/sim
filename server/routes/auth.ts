import express from 'express';
import { users, tokens } from '../data';

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email } = req.body;

  // In a real app, you would validate the credentials against a database
  // For this mock backend, we do a naive check:
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Return user data and token
  const token = tokens[user.id];

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits,
    },
    token,
  });
});

// Register route
router.post('/register', (req, res) => {
  const { email } = req.body;

  // If the user already exists
  if (users.some((u) => u.email === email)) {
    // Return that user
    const existingUser = users.find((u) => u.email === email);
    if (!existingUser) {
      return res.status(400).json({ message: 'Something unexpected happened' });
    }
    return res.status(201).json({
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        credits: existingUser.credits,
      },
      token: tokens[existingUser.id],
    });
  }

  // Otherwise, create a new user with ID=2 or next ID
  // For simplicity, just handle ID=2 if not in array
  const newUserId = '2';
  const user2 = users.find((u) => u.id === newUserId);
  if (user2 && user2.email === 'newuser@somewhere.com') {
    // Return user2 as if newly registered
    return res.status(201).json({
      user: {
        id: user2.id,
        name: user2.name,
        email: user2.email,
        credits: user2.credits,
      },
      token: tokens[user2.id],
    });
  }

  // If trying to register something else, just fail for now
  return res.status(400).json({
    message: 'Only newuser@somewhere.com can be newly registered in this mock.',
  });
});

// Get current user
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Find which user has this token
  const userId = Object.keys(tokens).find((id) => tokens[id] === token);
  if (!userId) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits,
    },
  });
});

export const authRoutes = router;
