import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock RFI storage (in-memory)
const userRfis: Record<string, any[]> = {};

// Get user's RFIs
router.get('/', (req, res) => {
  const userId = (req as any).user.id;
  
  if (!userRfis[userId]) {
    userRfis[userId] = [];
  }
  
  return res.json({ 
    rfis: userRfis[userId],
    total: userRfis[userId].length,
  });
});

// Get RFI by ID
router.get('/:id', (req, res) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  
  if (!userRfis[userId]) {
    return res.status(404).json({ message: 'RFI not found' });
  }
  
  const rfi = userRfis[userId].find(r => r.id === id);
  
  if (!rfi) {
    return res.status(404).json({ message: 'RFI not found' });
  }
  
  return res.json({ rfi });
});

// Create a new RFI
router.post('/', (req, res) => {
  const userId = (req as any).user.id;
  const { title, description, targetArea, dateRange, additionalDetails } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  
  const newRfi = {
    id: uuidv4(),
    userId,
    title,
    description,
    targetArea,
    dateRange,
    additionalDetails,
    status: 'submitted',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  if (!userRfis[userId]) {
    userRfis[userId] = [];
  }
  
  userRfis[userId].push(newRfi);
  
  return res.status(201).json({ rfi: newRfi });
});

// Update an RFI
router.put('/:id', (req, res) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  const { title, description, targetArea, dateRange, additionalDetails } = req.body;
  
  if (!userRfis[userId]) {
    return res.status(404).json({ message: 'RFI not found' });
  }
  
  const rfiIndex = userRfis[userId].findIndex(r => r.id === id);
  
  if (rfiIndex === -1) {
    return res.status(404).json({ message: 'RFI not found' });
  }
  
  // Only allow updates if RFI is not already processed
  if (userRfis[userId][rfiIndex].status === 'completed') {
    return res.status(400).json({ message: 'Cannot update a completed RFI' });
  }
  
  const updatedRfi = {
    ...userRfis[userId][rfiIndex],
    title: title || userRfis[userId][rfiIndex].title,
    description: description || userRfis[userId][rfiIndex].description,
    targetArea: targetArea || userRfis[userId][rfiIndex].targetArea,
    dateRange: dateRange || userRfis[userId][rfiIndex].dateRange,
    additionalDetails: additionalDetails || userRfis[userId][rfiIndex].additionalDetails,
    updatedAt: new Date().toISOString(),
  };
  
  userRfis[userId][rfiIndex] = updatedRfi;
  
  return res.json({ rfi: updatedRfi });
});

// Cancel an RFI
router.delete('/:id', (req, res) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  
  if (!userRfis[userId]) {
    return res.status(404).json({ message: 'RFI not found' });
  }
  
  const rfiIndex = userRfis[userId].findIndex(r => r.id === id);
  
  if (rfiIndex === -1) {
    return res.status(404).json({ message: 'RFI not found' });
  }
  
  // Only allow cancellation if RFI is not already processed
  if (userRfis[userId][rfiIndex].status === 'completed') {
    return res.status(400).json({ message: 'Cannot cancel a completed RFI' });
  }
  
  userRfis[userId][rfiIndex].status = 'cancelled';
  userRfis[userId][rfiIndex].updatedAt = new Date().toISOString();
  
  return res.json({ 
    success: true,
    rfi: userRfis[userId][rfiIndex]
  });
});

export const rfiRoutes = router;