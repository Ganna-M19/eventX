import express from 'express';
import { reserveTicket, fetchUserTickets } from '../controllers/ticketController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();
router.post('/reserve', authenticateUser, reserveTicket);
router.get('/mine', authenticateUser, fetchUserTickets);

export default router;
