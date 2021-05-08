import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import Auth from '../middlewares/auth';
import TaskController from '../controllers/TaskController';

const router = Router();

router.post('/api/v1/task', Auth, Sanitize.listSanitizer, TaskController.createTask);
