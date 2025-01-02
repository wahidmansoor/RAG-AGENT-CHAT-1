import { Router } from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController';

const router = Router();

router.post('/chat', sendMessage);
router.get('/history', getChatHistory);

export default router;
