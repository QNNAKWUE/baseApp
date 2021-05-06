import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import Auth from '../middlewares/auth';
import ListController from '../controllers/ListController';

const router = Router();

router.post('/createList', Auth, Sanitize.listSanitizer, ListController.createListController);
router.get('/get', Auth, ListController.getAllList)

export default router;
