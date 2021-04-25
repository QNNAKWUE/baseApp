import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/signupController', Sanitize.signupSanitizer, UserController.signupController);
router.post('/loginController', UserController.loginController);

export default router;
