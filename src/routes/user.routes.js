const { Router } = require('express');
const router = Router();

const userCtrl = require('../controllers/user.controller');

// /server/user
router.get('/getusers', userCtrl.getUsers);

module.exports = router;