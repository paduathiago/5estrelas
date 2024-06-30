import express, { Request, Response } from 'express';
import { ReviewService } from '../../../core/services/reviewService';

const reviewService = new ReviewService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId, establishmentId, rating, comment } = req.body;
  try {
    const newReview = await reviewService.createReview(userId, establishmentId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await reviewService.getReview(id);

  if (review) {
    res.json(review);
  } else {
    res.status(404).send('Review not found');
  }
});

export default router;
