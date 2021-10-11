const { Router } = require('express');
const router = Router();

const citiesCtrl = require('../controllers/cities.controller');

// /server/cities
router.get('/getcities', citiesCtrl.getCities);

module.exports = router;