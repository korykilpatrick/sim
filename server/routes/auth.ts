import express from 'express';
import { users, tokens } from '../data';

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, you would validate the credentials against a database
  // For this mock backend, we'll accept any login with a valid email
  const user = users.find(u => u.email === email);
  
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
  const { name, email, password } = req.body;
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }
  
  // In a real app, you would hash the password and store the user in a database
  // For this mock backend, we'll just pretend it worked
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    credits: 100, // Give new users some credits
  };
  
  return res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      credits: newUser.credits,
    },
    token: 'mock-jwt-token-for-new-user',
  });
});

// Get current user
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // In a real app, you would validate the token and get the user ID
  // For this mock backend, we'll assume token is valid and belongs to user 1
  const user = users.find(u => u.id === '1');
  
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