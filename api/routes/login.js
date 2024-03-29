import express from 'express';
import { Authenticator } from '../controllers/login.js';

const router = express.Router();

router.post('/login', Authenticator);

export default router;