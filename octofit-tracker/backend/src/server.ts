import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase, databaseName, mongoUri } from './config/database';
import { enableOfflineDataMode, offlineDataMode } from './config/runtime';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    baseUrl,
    mongoDatabase: databaseName,
    offlineDataMode,
  });
});

async function startServer() {
  try {
    await connectToDatabase();
    console.log(`MongoDB connected: ${mongoUri}`);
  } catch (error) {
    enableOfflineDataMode();
    console.warn(`MongoDB unavailable at ${mongoUri}; using in-memory sample data.`);
    console.warn(error);
  }

  app.listen(PORT, () => {
    console.log(`Backend running on ${baseUrl}`);
  });
}

void startServer();
