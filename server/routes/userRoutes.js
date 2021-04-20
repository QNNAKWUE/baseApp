import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/api/v1/auth/signup', Sanitize.signupSanitizer, UserController.signupController);

export default router;
