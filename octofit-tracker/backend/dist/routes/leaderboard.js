"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const entries = await LeaderboardEntry_1.LeaderboardEntry.find().sort({ rank: 1 }).lean();
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
exports.default = router;
