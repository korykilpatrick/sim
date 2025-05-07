import { http, HttpResponse, delay } from 'msw';
import { users, creditTransactions } from '../data';
import { v4 as uuidv4 } from 'uuid';

export const creditHandlers = [
  // Get user's credit balance
  http.get('/api/user/credits', async () => {
    await delay(300);
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'User not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return HttpResponse.json({
      credits: user.credits,
    });
  }),
  
  // Get user's credit transactions
  http.get('/api/user/credits/transactions', async () => {
    await delay(500);
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    const transactions = creditTransactions[userId] || [];
    
    return HttpResponse.json({
      transactions,
    });
  }),
  
  // Purchase credits (unused in initial implementation, but included for completeness)
  http.post('/api/credits/purchase', async ({ request }) => {
    await delay(1000);
    
    const { amount, paymentDetails } = await request.json();
    
    // In a real app, this would extract user ID from token and process payment
    const userId = '1'; // Hardcoded for demo
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'User not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Add credits to user
    user.credits += amount;
    
    // Add transaction record
    if (!creditTransactions[userId]) {
      creditTransactions[userId] = [];
    }
    
    const transaction = {
      id: uuidv4(),
      amount,
      description: 'Credit purchase',
      timestamp: new Date().toISOString(),
    };
    
    creditTransactions[userId].push(transaction);
    
    return HttpResponse.json({
      success: true,
      transaction,
      newBalance: user.credits,
    });
  }),
];