import express, { Request, Response } from 'express';
import { EstablishmentService } from '../../../core/services/establishmentService';
import { getUserId } from '../../../utils/authentication';

const establishmentService = new EstablishmentService();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, address, category, description, images, mainImage} = req.body;
  const userId = getUserId(req);
  if(!userId) return;
  try {
    const newEstablishment = await establishmentService.createEstablishment(userId, name, address, category, description, images, mainImage);
    res.status(201).json(newEstablishment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create establishment' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const establishment = await establishmentService.getEstablishment(id);

  if (establishment) {
    res.json(establishment);
  } else {
    res.status(404).send('Establishment not found');
  }
});

router.get('/', async (req: Request, res: Response) => {

  const userId = getUserId(req);

  // TODO: adicionar userId aqui no getEstablishments para conseguir listar os estabelecimentos com o "favorito" marcado
  const establishments = await establishmentService.getEstablishments();

  

  


  if (establishments) {
    res.json(establishments);
  } else {
    res.status(404).send('Establishment not found');
  }
});

export default router;
