import {Router} from 'express';
import { extractTailwindConfig, saveTailwindConfig } from '../controller/extractController';
import { userAuthGuard } from '../middleware/authMiddleware';

const router = Router();

router.post('/extract', extractTailwindConfig);
router.post('/save',userAuthGuard, saveTailwindConfig);

export default router;