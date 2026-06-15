import {Router} from 'express';
import { deleteHistoryConfig, extractTailwindConfig, getUserThemes, saveTailwindConfig } from '../controller/extractController';
import { userAuthGuard } from '../middleware/authMiddleware';


const router = Router();


router.post('/extract', extractTailwindConfig);
// router.post('/save',userAuthGuard, saveTailwindConfig);a
router.post('/save',userAuthGuard, saveTailwindConfig );



router.get('/history',userAuthGuard, getUserThemes);
router.delete('/history/:id', userAuthGuard, deleteHistoryConfig);

export default router;