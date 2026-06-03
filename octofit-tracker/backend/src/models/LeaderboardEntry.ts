import { Schema, model, models } from 'mongoose';

export interface LeaderboardEntryRecord {
  rank: number;
  username: string;
  displayName: string;
  teamName: string;
  points: number;
  totalMinutes: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryRecord>(
  {
    rank: { type: Number, required: true, min: 1 },
    username: { type: String, required: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    totalMinutes: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true }
);

export const LeaderboardEntry =
  models.LeaderboardEntry || model<LeaderboardEntryRecord>('LeaderboardEntry', leaderboardEntrySchema);
