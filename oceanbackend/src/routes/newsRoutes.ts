import { Router } from 'express';
import { getNewsArticles, createNewsArticle } from '../controllers/newsController';

const router = Router();

router.get('/', getNewsArticles);
router.post('/', createNewsArticle);

export default router;

