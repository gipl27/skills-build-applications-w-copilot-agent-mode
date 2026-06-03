import { Router } from 'express';
import { offlineDataMode } from '../config/runtime';
import { sampleActivities } from '../data/sampleData';
import { Activity } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    if (offlineDataMode) {
      res.json(sampleActivities);
      return;
    }

    const activities = await Activity.find().sort({ activityDate: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default router;
