const { Router } = require('express');
const router = Router();

const sportsCtrl = require('../controllers/sports.controller');

// /server/sports
router.get('/getsports', sportsCtrl.getSports);

module.exports = router;