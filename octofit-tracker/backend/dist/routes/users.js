"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const runtime_1 = require("../config/runtime");
const sampleData_1 = require("../data/sampleData");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        if (runtime_1.offlineDataMode) {
            res.json(sampleData_1.sampleUsers);
            return;
        }
        const users = await User_1.User.find().sort({ username: 1 }).lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
exports.default = router;
