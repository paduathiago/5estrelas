import express, { Request, Response } from 'express';
import { UserService } from '../../../core/services/userService';
import { KEY, getUserId } from '../../../utils/authentication';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = new UserService();

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (user) {
    const success = await bcrypt.compare(password, user.password)

    if (success) {
      const token = jwt.sign(user.id, KEY);
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        token
      })
    } else {
      res.json({ detail: 'Wrong password' })
    }

    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/signup', async (req, res) => {
  const { email, password, name, image } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(`${password}`, salt)
  try {
    const user = await userService.createUser(name, email, hashedPassword, image)

    const token = jwt.sign(user.id, KEY);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      token
    });
  } catch (error) {
    if (error) {
      res.status(500).send(error);
    }
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUser(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/favorite-establishment/:establishmentId', async (req: Request, res: Response) => {
  const { establishmentId } = req.params;
  const userId = getUserId(req);
  if (userId) {
    await userService.addEstablishmentToFavorites(userId, establishmentId);
    res.status(200);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/favorites', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (userId) {
    const establishments = await userService.getFavoriteEstablishments(userId);
    res.json(establishments);
  } else {
    res.status(404).send('User not found');
  }
});

router.get('/establishments', async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (userId) {
    // TODO: fazer o getUserEstablishments, que deve retornar os estabelecimentos que o usuário é dono
    /* const establishments = await userService.getUserEstablishments(userId); */
    res.json({});
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
