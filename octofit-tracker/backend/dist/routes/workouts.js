"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ level: 1, name: 1 }).lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
exports.default = router;
