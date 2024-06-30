import express, { Request, Response } from 'express';
import { ReviewService } from '../../../core/services/reviewService';

const reviewService = new ReviewService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId, establishmentId, rating, comment, timestamp} = req.body;
  try {
    const newReview = await reviewService.createReview(userId, establishmentId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review' });
  }
});

router.post('/:id/delete', async (req: Request, res: Response) => {
  const { id, userId } = req.body;
  try {
    await reviewService.deleteReview(id, userId);
    res.status(201).send(); 
  } catch (error: any) {
    console.error('Error deleting review:', error.message);
    res.status(500).send('Error deleting review');
  }
});

export default router;
