import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import Auth from '../middlewares/auth';
import ListController from '../controllers/ListController';

const router = Router();

router.post('/createList', Auth, Sanitize.listSanitizer, ListController.createListController);
router.get('/getLists', Auth, ListController.getAllList);
router.get('getList/:id', ListController.getListById);

export default router;
