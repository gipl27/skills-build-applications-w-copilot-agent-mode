import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;
