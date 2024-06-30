import express, { Request, Response } from 'express';
import { CommentService } from '../../../core/services/commentService';

const commentService = new CommentService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { reviewId, comment} = req.body;
  try {
    const newComment = await commentService.createComment(reviewId, comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
});

export default router;
