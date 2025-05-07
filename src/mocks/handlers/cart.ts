import { http, HttpResponse, delay } from 'msw';

// Since the cart is primarily managed client-side with localStorage,
// these handlers are placeholders for a real backend implementation
export const cartHandlers = [
  // Get cart (placeholder)
  http.get('/api/cart', async () => {
    await delay(300);
    
    // In a real backend, this would fetch the user's cart from the database
    return HttpResponse.json({
      items: [],
      totalAmount: 0,
      totalCredits: 0,
    });
  }),
  
  // Add item to cart (placeholder)
  http.post('/api/cart/items', async ({ request }) => {
    await delay(300);
    
    const body = await request.json();
    
    return HttpResponse.json({
      success: true,
      itemId: 'mock-item-id-' + Date.now(),
      ...body,
    });
  }),
  
  // Update cart item (placeholder)
  http.put('/api/cart/items/:itemId', async ({ params, request }) => {
    await delay(300);
    
    const { itemId } = params;
    const body = await request.json();
    
    return HttpResponse.json({
      success: true,
      itemId,
      ...body,
    });
  }),
  
  // Remove item from cart (placeholder)
  http.delete('/api/cart/items/:itemId', async ({ params }) => {
    await delay(300);
    
    const { itemId } = params;
    
    return HttpResponse.json({
      success: true,
      itemId,
    });
  }),
];