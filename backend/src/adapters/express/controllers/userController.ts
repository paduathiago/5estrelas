import express, { Request, Response } from 'express';
import { UserService } from '../../../core/services/userService';

const userService = new UserService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, email, password} = req.body;
  try {
    const newUser = await userService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUser(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
