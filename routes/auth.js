const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/authController');

// Redirect root ke login
router.get('/', (req, res) => res.redirect('/login'));

// Halaman login
router.get('/login',  controller.tampilLogin);
router.post('/login', controller.prosesLogin);

// Logout
router.get('/logout', controller.logout);

module.exports = router;
