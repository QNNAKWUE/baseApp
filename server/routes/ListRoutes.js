import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import Auth from '../middlewares/auth';
import ListController from '../controllers/ListController';

const router = Router();

router.post('/api/v1/list', Sanitize.listSanitizer, ListController.createListController);
router.get('/api/v1/list', Auth, ListController.getAllList);
router.get('/api/v1/list/:id', ListController.getListById);
router.patch('/api/v1/list/:id', Auth, ListController.updateList);
router.delete('/api/v1/list/:id', Auth, ListController.deleteList);

export default router;