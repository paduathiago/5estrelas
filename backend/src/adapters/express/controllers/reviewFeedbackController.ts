import express, { Request, Response } from 'express';
import { ReviewFeedbackService } from '../../../core/services/reviewFeedbackService';

const reviewService = new ReviewFeedbackService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId, reviewId, feedback} = req.body;
  try {
    const newReviewFeedback = await reviewService.createReviewFeedback(userId, reviewId, feedback);
    res.status(201).json(newReviewFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review feedback' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { userId, reviewId } = req.params;
  const review = await reviewService.getReviewFeedback(userId, reviewId);

  if (review) {
    res.json(review);
  } else {
    res.status(404).send('Review feedback not found');
  }
});

export default router;