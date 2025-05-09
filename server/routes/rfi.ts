import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  RFI,
  RFIStatus,
  RFITimeRange as _RFITimeRange,
  RFIAdditionalDetails as _RFIAdditionalDetails,
  UpdateRfiRequestBody,
  CreateRfiRequestBody,
} from '@shared-types/rfi'; // Reverted to @shared-types/rfi

const router = express.Router();

// Mock RFI storage (in-memory)
const userRfis: Record<string, RFI[]> = {}; // Use RFI[]

// Get user's RFIs
router.get('/', (req, res) => {
  const userId = req.user!.id; // Updated

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
  const userId = req.user!.id; // Updated
  const { id } = req.params;

  if (!userRfis[userId]) {
    return res.status(404).json({ message: 'RFI not found' });
  }

  const rfi = userRfis[userId].find((r) => r.id === id);

  if (!rfi) {
    return res.status(404).json({ message: 'RFI not found' });
  }

  return res.json({ rfi });
});

// Create a new RFI
router.post('/', (req, res) => {
  const userId = req.user!.id; // Updated
  const { title, description, targetArea, dateRange, additionalDetails } =
    req.body as CreateRfiRequestBody;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: 'Title and description are required' });
  }

  const newRfi: RFI = {
    // Typed as RFI
    id: uuidv4(),
    userId,
    title,
    description,
    targetArea,
    dateRange,
    additionalDetails,
    status: 'submitted' as RFIStatus, // Type assertion
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
  const userId = req.user!.id; // Updated
  const { id } = req.params;
  const {
    title,
    description,
    targetArea,
    dateRange,
    additionalDetails,
    status, // Include status if it can be updated via PUT
  } = req.body as UpdateRfiRequestBody;

  if (!userRfis[userId]) {
    return res.status(404).json({ message: 'RFI not found' });
  }

  const rfiIndex = userRfis[userId].findIndex((r) => r.id === id);

  if (rfiIndex === -1) {
    return res.status(404).json({ message: 'RFI not found' });
  }

  const existingRfi = userRfis[userId][rfiIndex];

  // Example: Prevent updates on already completed or cancelled RFIs
  if (
    existingRfi.status === 'completed' ||
    existingRfi.status === 'cancelled'
  ) {
    return res
      .status(400)
      .json({ message: `Cannot update RFI in '${existingRfi.status}' status` });
  }

  const updatedRfi: RFI = {
    // Typed as RFI
    ...existingRfi,
    title: title !== undefined ? title : existingRfi.title,
    description:
      description !== undefined ? description : existingRfi.description,
    targetArea: targetArea !== undefined ? targetArea : existingRfi.targetArea,
    dateRange: dateRange !== undefined ? dateRange : existingRfi.dateRange,
    additionalDetails:
      additionalDetails !== undefined
        ? additionalDetails
        : existingRfi.additionalDetails,
    status: status !== undefined ? status : existingRfi.status, // Update status if provided
    updatedAt: new Date().toISOString(),
  };

  userRfis[userId][rfiIndex] = updatedRfi;

  return res.json({ rfi: updatedRfi });
});

// Cancel an RFI
router.delete('/:id', (req, res) => {
  const userId = req.user!.id; // This is the correct, updated line
  const { id } = req.params;

  if (!userRfis[userId]) {
    return res.status(404).json({ message: 'RFI not found' });
  }

  const rfiIndex = userRfis[userId].findIndex((r) => r.id === id);

  if (rfiIndex === -1) {
    return res.status(404).json({ message: 'RFI not found' });
  }

  // Only allow cancellation if RFI is not already processed
  if (userRfis[userId][rfiIndex].status === 'completed') {
    return res.status(400).json({ message: 'Cannot cancel a completed RFI' });
  }

  userRfis[userId][rfiIndex].status = 'cancelled' as RFIStatus; // Type assertion for status
  userRfis[userId][rfiIndex].updatedAt = new Date().toISOString();

  return res.json({
    success: true,
    rfi: userRfis[userId][rfiIndex],
  });
});

export const rfiRoutes = router;
