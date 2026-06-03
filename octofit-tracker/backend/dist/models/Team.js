"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    captainUsername: { type: String, required: true, trim: true },
    memberUsernames: [{ type: String, required: true, trim: true }],
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
}, { collection: 'teams', timestamps: true });
exports.Team = mongoose_1.models.Team || (0, mongoose_1.model)('Team', teamSchema);
