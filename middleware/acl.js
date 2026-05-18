/**
 * Middleware Authorization (ACL - Access Control List)
 * Cek apakah user punya role yang diizinkan
 * 
 * Pakai RBAC (Role Based Access Control) sesuai materi kuliah:
 * - Satu user bisa punya banyak role
 * - Satu role bisa dimiliki banyak user
 * - Role disimpan sebagai array di session
 */

/**
 * Cek apakah user punya salah satu role yang diizinkan
 * Contoh pakai: authorize('admin') atau authorize('admin', 'dosen')
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {

    // Kalau belum login sama sekali → 401 redirect login
    if (!req.session.user) {
      return res.redirect('/login');
    }

    // Cek apakah role user ada di daftar role yang diizinkan
    // user.roles adalah array, misal: ['admin', 'dosen']
    const punyaAkses = req.session.user.roles.some(
      role => allowedRoles.includes(role)
    );

    if (punyaAkses) {
      // Role cocok → boleh lanjut
      next();
    } else {
      // Sudah login tapi role tidak cocok → 403 forbidden
      res.status(403).render('error', {
        message: 'Anda tidak punya akses ke halaman ini',
        status: 403
      });
    }
  };
};

module.exports = authorize;
