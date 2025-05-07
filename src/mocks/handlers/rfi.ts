import { http, HttpResponse, delay } from 'msw';
import { v4 as uuidv4 } from 'uuid';

export const rfiHandlers = [
  // Submit Request for Intelligence (RFI)
  http.post('/api/investigations/rfi', async ({ request }) => {
    await delay(1000);
    
    const body = await request.json();
    
    // In a real app, this would extract user ID from token
    const userId = '1'; // Hardcoded for demo
    
    // Validate required fields
    if (!body.investigationType) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Investigation type is required' 
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Generate a request ID
    const requestId = uuidv4();
    
    return HttpResponse.json({
      success: true,
      requestId,
      message: 'Your investigation request has been submitted successfully. Our team will review it and get back to you within 24-48 hours.',
      estimatedResponse: '24-48 hours',
      submittedAt: new Date().toISOString(),
    });
  }),
];