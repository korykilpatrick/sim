import express from 'express';
import { products } from '../data';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  const typeFilter = req.query.type as string;
  const searchQuery = (req.query.search as string)?.toLowerCase();

  let filteredProducts = [...products];

  // Apply type filter if provided
  if (typeFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.type === typeFilter,
    );
  }

  // Apply search filter if provided
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.shortDescription.toLowerCase().includes(searchQuery) ||
        (product.tags &&
          product.tags.some((tag) => tag.toLowerCase().includes(searchQuery))),
    );
  }

  return res.json({
    products: filteredProducts,
    total: filteredProducts.length,
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json({ product });
});

export const productRoutes = router;
