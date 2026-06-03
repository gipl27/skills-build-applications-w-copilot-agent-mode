import { Schema, model, models } from 'mongoose';

export interface ActivityRecord {
  username: string;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceMiles: number;
  activityDate: Date;
}

const activitySchema = new Schema<ActivityRecord>(
  {
    username: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceMiles: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { collection: 'activities', timestamps: true }
);

export const Activity = models.Activity || model<ActivityRecord>('Activity', activitySchema);
