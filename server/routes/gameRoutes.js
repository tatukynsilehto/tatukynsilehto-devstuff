const express = require('express');
const { saveGameState, getGameState } = require('../controllers/gameController');
const router = express.Router();

router.post('/save', saveGameState);
router.get('/:userId', getGameState);

module.exports = router;