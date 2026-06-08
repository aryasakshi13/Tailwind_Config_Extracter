import {Router} from 'express';
import { extractTailwindConfig, getUserThemes, saveTailwindConfig } from '../controller/extractController';
// import { userAuthGuard } from '../middleware/authMiddleware';

const router = Router();

router.post('/extract', extractTailwindConfig);
// router.post('/save',userAuthGuard, saveTailwindConfig);
router.post('/save', saveTailwindConfig );

router.get('/history', getUserThemes);

export default router;