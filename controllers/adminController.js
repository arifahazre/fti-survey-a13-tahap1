/**
 * Controller Admin
 * Tahap 1: Placeholder saja
 * Fitur lengkap akan diimplementasi di Tahap 2
 */

// Tampil dashboard admin
exports.dashboard = (req, res) => {
  res.render('admin/dashboard', {
    user: req.session.user
  });
};
