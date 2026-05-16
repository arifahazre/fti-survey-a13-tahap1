const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/adminController');
const isLoggedIn = require('../middleware/auth');
const authorize  = require('../middleware/acl');

// Hanya user yang sudah login dan punya role 'admin' yang bisa akses
router.get('/dashboard', isLoggedIn, authorize('admin'), controller.dashboard);

module.exports = router;
