"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const runtime_1 = require("../config/runtime");
const sampleData_1 = require("../data/sampleData");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        if (runtime_1.offlineDataMode) {
            res.json(sampleData_1.sampleActivities);
            return;
        }
        const activities = await Activity_1.Activity.find().sort({ activityDate: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
exports.default = router;
