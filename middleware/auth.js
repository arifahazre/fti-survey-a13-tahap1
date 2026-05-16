/**
 * Middleware Authentication
 * Cek apakah user sudah login atau belum
 * Kalau belum login → redirect ke halaman login (401)
 */
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    // User sudah login → lanjut ke halaman yang dituju
    next();
  } else {
    // User belum login → paksa ke halaman login
    res.redirect('/login');
  }
};

module.exports = isLoggedIn;
