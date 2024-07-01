import express, { Request, Response } from 'express';
import { EstablishmentService } from '../../../core/services/establishmentService';
import { getUserId } from '../../../utils/authentication';

export const establishmentService = new EstablishmentService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, address, category, description, images, mainImage, workingHours, daysOpen, phone} = req.body;
  const userId = getUserId(req);
  if (!userId) {
    res.status(404).send('User not found');
    return;
  }
  try {
    const newEstablishment = await establishmentService.createEstablishment(userId, name, address, category, description, images, mainImage, workingHours, daysOpen, phone);
    res.status(201).json(newEstablishment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create establishment' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = getUserId(req);
  const establishment = await establishmentService.getEstablishment(id, userId);

  if (establishment) {
    res.json(establishment);
  } else {
    res.status(404).send('Establishment not found');
  }
});

router.get('/', async (req: Request, res: Response) => {

  const userId = getUserId(req);
  const establishments = await establishmentService.getEstablishments(userId);


  if (establishments) {
    res.json(establishments);
  } else {
    res.status(404).send('Establishment not found');
  }
});

export default router;
