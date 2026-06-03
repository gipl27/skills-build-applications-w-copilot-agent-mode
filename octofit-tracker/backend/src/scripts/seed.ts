import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

dotenv.config();

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.insertMany([
    {
      name: 'OctoFit Trailblazers',
      description: 'Morning runners and hikers focused on steady weekly gains.',
      captainUsername: 'maya_stride',
      memberUsernames: ['maya_stride', 'noah_lifts', 'riley_rows'],
      weeklyGoalMinutes: 900,
    },
    {
      name: 'Core Crushers',
      description: 'Strength and conditioning team building consistent habits.',
      captainUsername: 'sam_sprints',
      memberUsernames: ['sam_sprints', 'avery_flow'],
      weeklyGoalMinutes: 650,
    },
  ]);

  const users = await User.insertMany([
    {
      username: 'maya_stride',
      displayName: 'Maya Chen',
      email: 'maya.chen@example.com',
      teamName: teams[0].name,
      profileImage: '/profiles/maya.png',
      joinedAt: new Date('2026-01-12T09:00:00.000Z'),
    },
    {
      username: 'noah_lifts',
      displayName: 'Noah Patel',
      email: 'noah.patel@example.com',
      teamName: teams[0].name,
      profileImage: '/profiles/noah.png',
      joinedAt: new Date('2026-02-03T10:30:00.000Z'),
    },
    {
      username: 'riley_rows',
      displayName: 'Riley Morgan',
      email: 'riley.morgan@example.com',
      teamName: teams[0].name,
      profileImage: '/profiles/riley.png',
      joinedAt: new Date('2026-02-18T14:15:00.000Z'),
    },
    {
      username: 'sam_sprints',
      displayName: 'Sam Rivera',
      email: 'sam.rivera@example.com',
      teamName: teams[1].name,
      profileImage: '/profiles/sam.png',
      joinedAt: new Date('2026-03-01T08:45:00.000Z'),
    },
    {
      username: 'avery_flow',
      displayName: 'Avery Brooks',
      email: 'avery.brooks@example.com',
      teamName: teams[1].name,
      profileImage: '/profiles/avery.png',
      joinedAt: new Date('2026-03-10T16:20:00.000Z'),
    },
  ]);

  await Activity.insertMany([
    {
      username: users[0].username,
      activityType: 'run',
      durationMinutes: 42,
      caloriesBurned: 410,
      distanceMiles: 4.8,
      activityDate: new Date('2026-06-01T12:30:00.000Z'),
    },
    {
      username: users[1].username,
      activityType: 'strength training',
      durationMinutes: 55,
      caloriesBurned: 360,
      distanceMiles: 0,
      activityDate: new Date('2026-06-01T18:00:00.000Z'),
    },
    {
      username: users[2].username,
      activityType: 'rowing',
      durationMinutes: 38,
      caloriesBurned: 330,
      distanceMiles: 3.2,
      activityDate: new Date('2026-06-02T11:15:00.000Z'),
    },
    {
      username: users[3].username,
      activityType: 'interval sprints',
      durationMinutes: 28,
      caloriesBurned: 295,
      distanceMiles: 2.5,
      activityDate: new Date('2026-06-02T13:45:00.000Z'),
    },
    {
      username: users[4].username,
      activityType: 'yoga',
      durationMinutes: 50,
      caloriesBurned: 180,
      distanceMiles: 0,
      activityDate: new Date('2026-06-03T07:30:00.000Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      rank: 1,
      username: 'maya_stride',
      displayName: 'Maya Chen',
      teamName: 'OctoFit Trailblazers',
      points: 1480,
      totalMinutes: 235,
    },
    {
      rank: 2,
      username: 'sam_sprints',
      displayName: 'Sam Rivera',
      teamName: 'Core Crushers',
      points: 1325,
      totalMinutes: 205,
    },
    {
      rank: 3,
      username: 'noah_lifts',
      displayName: 'Noah Patel',
      teamName: 'OctoFit Trailblazers',
      points: 1190,
      totalMinutes: 190,
    },
    {
      rank: 4,
      username: 'riley_rows',
      displayName: 'Riley Morgan',
      teamName: 'OctoFit Trailblazers',
      points: 1040,
      totalMinutes: 172,
    },
    {
      rank: 5,
      username: 'avery_flow',
      displayName: 'Avery Brooks',
      teamName: 'Core Crushers',
      points: 960,
      totalMinutes: 165,
    },
  ]);

  await Workout.insertMany([
    {
      name: 'Starter Cardio Circuit',
      category: 'cardio',
      level: 'beginner',
      durationMinutes: 25,
      exercises: ['jumping jacks', 'brisk walk', 'bodyweight squats', 'cooldown stretch'],
      recommendedFor: ['new members', 'low-impact conditioning'],
    },
    {
      name: 'Trail Runner Tempo',
      category: 'running',
      level: 'intermediate',
      durationMinutes: 40,
      exercises: ['easy warmup jog', 'tempo intervals', 'hill strides', 'mobility cooldown'],
      recommendedFor: ['distance runners', 'team cardio challenge'],
    },
    {
      name: 'Full Body Strength Builder',
      category: 'strength',
      level: 'intermediate',
      durationMinutes: 45,
      exercises: ['goblet squats', 'pushups', 'dumbbell rows', 'plank holds'],
      recommendedFor: ['strength baseline', 'cross-training'],
    },
    {
      name: 'Recovery Flow',
      category: 'mobility',
      level: 'beginner',
      durationMinutes: 30,
      exercises: ['cat cow', 'hip openers', 'hamstring stretch', 'box breathing'],
      recommendedFor: ['rest day', 'post-run recovery'],
    },
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts created.');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
