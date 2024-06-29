import express, { Request, Response } from 'express';
import { CommentService } from '../../../core/services/commentService';

const commentService = new CommentService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { reviewId, comment, timestamp} = req.body;
  try {
    const newComment = await commentService.createComment(reviewId, comment, timestamp);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await commentService.getComment(id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

export default router;
