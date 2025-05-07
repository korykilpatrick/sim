import { http, HttpResponse, delay } from 'msw';
import { users, tokens } from '../data';

export const authHandlers = [
  // Login
  http.post('/api/auth/login', async ({ request }) => {
    // Add artificial delay to simulate network request
    await delay(500);
    
    const { email, password } = await request.json();
    
    // Find user by email (in a real app, would also check password)
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Invalid credentials' 
        }), 
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Return successful login response
    return HttpResponse.json({
      user,
      token: tokens[user.id],
    });
  }),
  
  // Register
  http.post('/api/auth/register', async ({ request }) => {
    await delay(500);
    
    const { email, password, name } = await request.json();
    
    // Check if user with email already exists
    if (users.find(u => u.email === email)) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'User with this email already exists' 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Create a new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      name: name || email.split('@')[0],
      credits: 0,
    };
    
    users.push(newUser);
    tokens[newUser.id] = `mock-jwt-token-for-user-${newUser.id}`;
    
    return HttpResponse.json({
      user: newUser,
      token: tokens[newUser.id],
    });
  }),
  
  // Get user profile
  http.get('/api/auth/me', async ({ request }) => {
    await delay(300);
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Unauthorized' 
        }), 
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const userId = Object.keys(tokens).find(id => tokens[id] === token);
    
    if (!userId) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Invalid token' 
        }), 
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const user = users.find(u => u.id === userId);
    
    return HttpResponse.json({ user });
  }),
];