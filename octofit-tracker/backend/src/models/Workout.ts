import { Schema, model, models } from 'mongoose';

export interface WorkoutRecord {
  name: string;
  category: string;
  level: string;
  durationMinutes: number;
  exercises: string[];
  recommendedFor: string[];
}

const workoutSchema = new Schema<WorkoutRecord>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: [{ type: String, required: true, trim: true }],
    recommendedFor: [{ type: String, required: true, trim: true }],
  },
  { collection: 'workouts', timestamps: true }
);

export const Workout = models.Workout || model<WorkoutRecord>('Workout', workoutSchema);
