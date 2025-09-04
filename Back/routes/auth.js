import express from 'express';
import { createUser, signIn } from '../controllers/authController.js';

const router = express.Router();
router.post('/signup', createUser);
router.post('/signin', signIn);

export default router;
