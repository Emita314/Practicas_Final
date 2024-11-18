const express = require('express');
const { requestVacation, getVacationHistory, approveVacation, rejectVacation } = require('../controllers/vacationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/request', authMiddleware, requestVacation);
router.get('/history', authMiddleware, getVacationHistory);
router.put('/approve/:id', authMiddleware, approveVacation); // Admin only
router.put('/reject/:id', authMiddleware, rejectVacation);  // Admin only

module.exports = router;
