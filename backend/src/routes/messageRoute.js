import express from 'express';
import { sendDirectMessage, sendGrouptMessage } from "../controllers/messageController.js"
import { checkFriendship } from '../middlewares/friendMiddleware.js';

const router = express.Router();

router.post('/direct', checkFriendship, sendDirectMessage);
router.post('/group', sendGrouptMessage);

export default router