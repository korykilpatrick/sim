import express from 'express';
import { alertNotifications } from '../data';
// import { AlertNotification } from '../types/alertTypes'; // Assuming a type definition

const router = express.Router();

// Get user's alert notifications
router.get('/', (req, res) => {
  const userId = (req as any).user.id;

  if (!alertNotifications[userId]) {
    alertNotifications[userId] = [];
  }

  const unreadCount = alertNotifications[userId].filter(
    (alert) => !alert.read,
  ).length;

  return res.json({
    alerts: alertNotifications[userId],
    total: alertNotifications[userId].length,
    unreadCount,
  });
});

// Mark alert as read
router.put('/:id/read', (req, res) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  if (!alertNotifications[userId]) {
    return res.status(404).json({ message: 'Alert not found' });
  }

  const alertIndex = alertNotifications[userId].findIndex((a) => a.id === id);

  if (alertIndex === -1) {
    return res.status(404).json({ message: 'Alert not found' });
  }

  alertNotifications[userId][alertIndex].read = true;

  return res.json({
    alert: alertNotifications[userId][alertIndex],
  });
});

// Mark all alerts as read
router.put('/read-all', (req, res) => {
  const userId = (req as any).user.id;

  if (!alertNotifications[userId]) {
    alertNotifications[userId] = [];
  }

  alertNotifications[userId].forEach((alert) => {
    alert.read = true;
  });

  return res.json({
    success: true,
    unreadCount: 0,
  });
});

export const alertRoutes = router;
