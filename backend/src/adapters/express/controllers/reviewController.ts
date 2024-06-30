import express, { Request, Response } from 'express';
import { ReviewService } from '../../../core/services/reviewService';

const reviewService = new ReviewService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  // TODO: substituir aqui o userId pelo getUserId
  const { userId, establishmentId, rating, comment} = req.body;
  try {
    const newReview = await reviewService.createReview(userId, establishmentId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review' });
  }
});

router.post('/:id/delete', async (req: Request, res: Response) => {
  // TODO: substituir aqui o userId pelo getUserId
  const { id, userId } = req.body;
  try {
    await reviewService.deleteReview(id, userId);
    res.status(201).send(); 
  } catch (error: any) {
    console.error('Error deleting review:', error.message);
    res.status(500).send('Error deleting review');
  }
});

router.post('/:establishmentId/reviews', async (req: Request, res: Response) => {
  // TODO: substituir aqui o userId pelo getUserId
  const { userId } = req.body;
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
