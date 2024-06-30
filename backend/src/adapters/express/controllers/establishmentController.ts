import express, { Request, Response } from 'express';
import { EstablishmentService } from '../../../core/services/establishmentService';

const establishmentService = new EstablishmentService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, address, category, description} = req.body;
  try {
    const newEstablishment = await establishmentService.createEstablishment(name, address, category, description);
    res.status(201).json(newEstablishment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create establishment' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await establishmentService.getEstablishment(id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Establishment not found');
  }
});

export default router;
