import express, { Request, Response } from 'express';
import { users, tokens } from '../data';
import type { User } from '@shared-types/user';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@shared-types/auth';

const router = express.Router();

// Login route
router.post('/login', (req: Request<{}, AuthResponse | { message: string }, LoginRequest>, res: Response<AuthResponse | { message: string }>) => {
  const { email, password: _password } = req.body;

  // In a real app, you would validate the credentials against a database
  // For this mock backend, we do a naive check (password is not used in mock):
  const userMatch = users.find((u) => u.email === email);

  if (!userMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Ensure the found user conforms to the User type structure for the response
  const responseUser: User = {
    id: userMatch.id,
    name: userMatch.name,
    email: userMatch.email,
    credits: userMatch.credits,
  };

  const token = tokens[userMatch.id];

  return res.json({
    user: responseUser,
    token,
  });
});

// Register route
router.post('/register', (req: Request<{}, AuthResponse | { message: string }, RegisterRequest>, res: Response<AuthResponse | { message: string }>) => {
  const { email, name: _name, password: _password } = req.body;

  if (users.some((u) => u.email === email)) {
    const existingUser = users.find((u) => u.email === email);
    if (!existingUser) {
      return res.status(400).json({ message: 'Something unexpected happened' });
    }
    const responseUser: User = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        credits: existingUser.credits,
    };
    return res.status(201).json({
      user: responseUser,
      token: tokens[existingUser.id],
    });
  }

  const newUserId = '2'; // Mock logic
  const user2 = users.find((u) => u.id === newUserId);
  if (user2 && email === 'newuser@somewhere.com') { // Simplified mock condition
    const responseUser: User = {
        id: user2.id,
        name: user2.name || 'New User', // Ensure name is present if User type expects it
        email: user2.email,
        credits: user2.credits,
    };
    return res.status(201).json({
      user: responseUser,
      token: tokens[user2.id],
    });
  }

  return res.status(400).json({
    message: 'Only newuser@somewhere.com can be newly registered in this mock.',
  });
});

// Get current user
router.get('/me', (req: Request, res: Response<{ user: User } | { message: string }>) => {
  const authHeader = req.headers['authorization'];
  const tokenValue = authHeader && authHeader.split(' ')[1]; // Renamed to avoid conflict with tokens object

  if (!tokenValue) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = Object.keys(tokens).find((id) => tokens[id] === tokenValue);
  if (!userId) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }

  const userMatch = users.find((u) => u.id === userId);
  if (!userMatch) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const responseUser: User = {
    id: userMatch.id,
    name: userMatch.name,
    email: userMatch.email,
    credits: userMatch.credits,
  };

  return res.json({ user: responseUser });
});

export const authRoutes = router;
