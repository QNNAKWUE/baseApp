import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import Auth from '../middlewares/auth';
import ListController from '../controllers/ListController';

const router = Router();

router.post('/api/v1/auth/createList', Auth, Sanitize.listSanitizer, ListController.createListController);

export default router;
