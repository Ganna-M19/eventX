import express from 'express';
import { addEvent, fetchEvents, fetchEventById, modifyEvent, removeEvent } from '../controllers/eventController.js';
import authenticateUser from '../middleware/auth.js';
import requireRole from '../middleware/role.js';

const router = express.Router();
router.get('/', fetchEvents);
router.get('/:id', fetchEventById);
router.post('/', authenticateUser, requireRole('admin'), addEvent);
router.put('/:id', authenticateUser, requireRole('admin'), modifyEvent);
router.delete('/:id', authenticateUser, requireRole('admin'), removeEvent);

export default router;
