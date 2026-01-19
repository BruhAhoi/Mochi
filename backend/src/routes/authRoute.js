import express from 'express';
import { signUp, signIn, signOut, refreshToken, test } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', signIn);
router.post('/signout', signOut);
router.post('/refresh', refreshToken);
router.get('/test', test)
export default router;