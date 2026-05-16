const db     = require('../config/db');
const bcrypt = require('bcrypt');

// ── Tampil Halaman Login ──────────────────────────────────────
exports.tampilLogin = (req, res) => {
  // Kalau sudah login, langsung redirect sesuai role
  if (req.session.user) {
    const roles = req.session.user.roles;
    return roles.includes('admin')
      ? res.redirect('/admin/dashboard')
      : res.redirect('/survey');
  }

  // Ambil pesan error dari query string kalau ada
  const pesan = req.query.error || null;
  res.render('auth/login', { pesan });
};

// ── Proses Login ──────────────────────────────────────────────
exports.prosesLogin = (req, res) => {
  const { email, password } = req.body;

  // Validasi: pastikan email dan password tidak kosong
  if (!email || !password) {
    return res.redirect('/login?error=empty');
  }

  // Cari user berdasarkan email di database
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err)                  return res.redirect('/login?error=server');
      if (results.length === 0) return res.redirect('/login?error=notfound');

      const user = results[0];

      // Cocokkan password yang diinput dengan hash di database
      // bcrypt.compare() mencocokkan plain text dengan hash
      const cocok = await bcrypt.compare(password, user.password);
      if (!cocok) return res.redirect('/login?error=wrongpass');

      // Ambil semua role user dari tabel model_has_roles
      // Satu user bisa punya banyak role (many-to-many)
      db.query(
        `SELECT r.name FROM roles r
         JOIN model_has_roles mhr ON r.id = mhr.role_id
         WHERE mhr.model_id = ? AND mhr.model_type = 'users'`,
        [user.id],
        (err, roles) => {
          if (err) return res.redirect('/login?error=server');

          // Simpan data user ke session
          // roles disimpan sebagai array karena bisa lebih dari satu
          req.session.user = {
            id:    user.id,
            name:  user.name,
            email: user.email,
            roles: roles.map(r => r.name) // contoh: ['admin', 'dosen']
          };

          // Redirect sesuai role
          const userRoles = req.session.user.roles;
          return userRoles.includes('admin')
            ? res.redirect('/admin/dashboard')
            : res.redirect('/survey');
        }
      );
    }
  );
};

// ── Logout ────────────────────────────────────────────────────
exports.logout = (req, res) => {
  // Hapus semua data session → user dianggap sudah logout
  req.session.destroy(() => res.redirect('/login'));
};
