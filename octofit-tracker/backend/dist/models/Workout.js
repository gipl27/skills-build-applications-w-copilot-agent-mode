"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: [{ type: String, required: true, trim: true }],
    recommendedFor: [{ type: String, required: true, trim: true }],
}, { collection: 'workouts', timestamps: true });
exports.Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
