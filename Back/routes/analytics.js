import express from 'express';
import { dashboardStats } from '../controllers/analyticsController.js';
import authenticateUser from '../middleware/auth.js';
import requireRole from '../middleware/role.js';

const router = express.Router();
router.get('/dashboard', authenticateUser, requireRole('admin'), dashboardStats);

export default router;
