const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/surveyController');
const isLoggedIn = require('../middleware/auth');
const authorize  = require('../middleware/acl');

// Hanya user yang sudah login dan punya role 'mahasiswa' atau 'dosen' atau 'pegawai'
// yang bisa akses halaman survey
router.get('/', isLoggedIn, authorize('mahasiswa', 'dosen', 'pegawai', 'user'), controller.tampilSurvey);

module.exports = router;
