import { Schema, model, models } from 'mongoose';

export interface TeamRecord {
  name: string;
  description: string;
  captainUsername: string;
  memberUsernames: string[];
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<TeamRecord>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    captainUsername: { type: String, required: true, trim: true },
    memberUsernames: [{ type: String, required: true, trim: true }],
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { collection: 'teams', timestamps: true }
);

export const Team = models.Team || model<TeamRecord>('Team', teamSchema);
