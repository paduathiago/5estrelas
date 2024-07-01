import express, { Request, Response } from 'express';
import { UserService } from '../../../core/services/userService';
import { KEY, getUserId } from '../../../utils/authentication';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const userService = new UserService();

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

router.get('/favorite-establishment/:establishmentId/:fav', async (req: Request, res: Response) => {
  const { establishmentId, fav } = req.params;
  const userId = getUserId(req);
  if (userId) {
    if (fav === 'true') {
      await userService.addEstablishmentToFavorites(userId, establishmentId);
    }
    else {
      await userService.removeEstablishmentFromFavorites(userId, establishmentId);
    }

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
  const token = req.headers['authorization'];
  if (userId) {
    const establishments = await userService.getUserEstablishments(userId);
    res.json(establishments);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
