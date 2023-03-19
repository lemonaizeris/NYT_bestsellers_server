import { Router } from 'express';
import { GetBestsellersLists, GetBestsellersTop10, GetReviewsByISBN } from '../controllers/books';

const router = Router();

router.get('/', GetBestsellersLists);
router.get('/:listCode', GetBestsellersTop10);
router.get('/reviews/:isbn', GetReviewsByISBN);

export default router;