
const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    leaderboardPosition: { type: Number, required: true },
    badges: [{
        badgeName: { type: String },
        dateAwarded: { type: Date, default: Date.now }
    }],
    challengesCompleted: { type: Number, default: 0 },
    rewards: [{
        rewardType: { type: String },
        value: { type: Number },
        dateAwarded: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);