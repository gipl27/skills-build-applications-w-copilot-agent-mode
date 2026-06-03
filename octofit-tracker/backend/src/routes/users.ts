import { Router } from 'express';
import { offlineDataMode } from '../config/runtime';
import { sampleUsers } from '../data/sampleData';
import { User } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    if (offlineDataMode) {
      res.json(sampleUsers);
      return;
    }

    const users = await User.find().sort({ username: 1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default router;
