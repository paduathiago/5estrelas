import express, { Request, Response } from 'express';
import { ReviewService } from '../../../core/services/reviewService';
import { getUserId } from '../../../utils/authentication';
import { establishmentService } from './establishmentController';

const reviewService = new ReviewService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) {
    res.status(500).send('No user in header');
    return;
  }

  const { establishmentId, rating, comment } = req.body;
  try {
    // TODO: Fazer o updateRating usando abaixo, e também atualizando o number of reviews

    // establishmentService.updateRating()
    const newReview = await reviewService.createReview(userId, establishmentId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review' });
  }
});

router.post('/:id/delete', async (req: Request, res: Response) => {
  const { id } = req.body;
  const userId = getUserId(req);
  if (!userId) {
    res.status(500).send('No user in header');
    return;
  }
  try {
    await reviewService.deleteReview(id, userId);
    res.status(201).send();
  } catch (error: any) {
    console.error('Error deleting review:', error.message);
    res.status(500).send('Error deleting review');
  }
});

router.get('/:establishmentId', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { establishmentId } = req.params;
  try {
    const reviews = await reviewService.getReviewsFromEstablishment(establishmentId, userId);
    res.json(reviews);
  } catch (error: any) {
    console.error('Error fetching reviews by establishmentId:', error.message);
    res.status(500).send('Error fetching reviews');
  }
});



export default router;
