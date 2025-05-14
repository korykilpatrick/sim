import express, { Request, Response } from 'express';
import { users, tokens } from '../data';
import type { User } from '@shared-types/user';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@shared-types/auth';

const router = express.Router();

// Login route
router.post(
  '/login',
  (
    req: Request<{}, AuthResponse | { message: string }, LoginRequest>,
    res: Response<AuthResponse | { message: string }>,
  ) => {
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
  },
);

// Register route
router.post(
  '/register',
  (
    req: Request<{}, AuthResponse | { message: string }, RegisterRequest>,
    res: Response<AuthResponse | { message: string }>,
  ) => {
    const { email, name, password: _password } = req.body;

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Generate a new user ID
    // Find the maximum numeric part of existing IDs and increment
    let maxId = 0;
    users.forEach(user => {
      const numericId = parseInt(user.id, 10);
      if (!isNaN(numericId) && numericId > maxId) {
        maxId = numericId;
      }
    });
    const newUserId = (maxId + 1).toString();

    // Create new user
    const newUser: User = {
      id: newUserId,
      email,
      name: name || 'New User', // Use provided name or default
      credits: 50, // Default credits for new user
    };

    // Add to in-memory store
    users.push(newUser);

    // Generate and store mock token
    const newMockToken = `mock-jwt-token-for-user-${newUserId}`;
    tokens[newUserId] = newMockToken;

    // Return success response
    return res.status(201).json({
      user: newUser,
      token: newMockToken,
    });
  },
);

// Get current user
router.get(
  '/me',
  (req: Request, res: Response<{ user: User } | { message: string }>) => {
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
  },
);

export const authRoutes = router;
