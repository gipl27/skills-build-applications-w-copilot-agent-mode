import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ username: 1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default router;
