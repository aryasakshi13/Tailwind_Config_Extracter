import {Router} from 'express';
import { extractTailwindConfig } from '../controller/extractController';

const router = Router();

router.post('/extract', extractTailwindConfig);

export default router;