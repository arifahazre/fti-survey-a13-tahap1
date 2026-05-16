/**
 * Controller Survey
 * Tahap 1: Placeholder saja
 * Fitur lengkap akan diimplementasi di Tahap 2
 */

// Tampil halaman daftar survey untuk pengguna
exports.tampilSurvey = (req, res) => {
  res.render('survey/index', {
    user: req.session.user
  });
};
