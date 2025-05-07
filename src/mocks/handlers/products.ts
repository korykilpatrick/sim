import { http, HttpResponse, delay } from 'msw';
import { products } from '../data';

export const productHandlers = [
  // Get all products
  http.get('/api/products', async ({ request }) => {
    await delay(500);
    
    const url = new URL(request.url);
    const typeFilter = url.searchParams.get('type');
    const searchQuery = url.searchParams.get('search')?.toLowerCase();
    
    let filteredProducts = [...products];
    
    // Apply type filter if provided
    if (typeFilter) {
      filteredProducts = filteredProducts.filter(product => product.type === typeFilter);
    }
    
    // Apply search filter if provided
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.shortDescription.toLowerCase().includes(searchQuery) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
      );
    }
    
    return HttpResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
    });
  }),
  
  // Get product by ID
  http.get('/api/products/:id', async ({ params }) => {
    await delay(300);
    
    const { id } = params;
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return new HttpResponse(
        JSON.stringify({ 
          message: 'Product not found' 
        }), 
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return HttpResponse.json({ product });
  }),
];