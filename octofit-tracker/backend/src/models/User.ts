import { Schema, model, models } from 'mongoose';

export interface UserRecord {
  username: string;
  displayName: string;
  email: string;
  teamName: string;
  profileImage: string;
  joinedAt: Date;
}

const userSchema = new Schema<UserRecord>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    profileImage: { type: String, required: true, trim: true },
    joinedAt: { type: Date, required: true },
  },
  { collection: 'users', timestamps: true }
);

export const User = models.User || model<UserRecord>('User', userSchema);
