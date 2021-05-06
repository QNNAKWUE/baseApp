import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import Auth from '../middlewares/Auth';
import ListController from '../controllers/ListController';

const router = Router();

router.post('/createList', Auth, Sanitize.listSanitizer, ListController.createListController);

export default router;