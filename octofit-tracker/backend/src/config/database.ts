import mongoose from 'mongoose';

export const databaseName = 'octofit_db';
export const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${databaseName}`;

export async function connectToDatabase() {
  await mongoose.connect(mongoUri, { dbName: databaseName });
}
