const mysql  = require('mysql2');
const bcrypt = require('bcrypt');

// Koneksi ke database MySQL
// Credentials diambil dari file .env
const db = mysql.createConnection({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'fti_survey'
});

db.connect(async (err) => {
  if (err) {
    console.error('❌ Gagal konek database:', err.message);
    return;
  }
  console.log('✅ Database terhubung!');

  // Cek apakah sudah ada user admin
  // Kalau belum ada → seed otomatis
  db.query(
    'SELECT id FROM users WHERE email = ?',
    ['admin@fti.unand.ac.id'],
    async (err, results) => {
      if (err || results.length > 0) return; // sudah ada, skip seeding

      console.log('⏳ Seeding user default...');

      // Data user default sistem internal
      // Password akan di-hash otomatis di komputer ini
      const users = [
        { name: 'Administrator',       email: 'admin@fti.unand.ac.id',         pass: 'admin123'   },
        { name: 'Arifah Huwaina Azre', email: 'arifah@students.unand.ac.id',   pass: '2411521003' },
        { name: 'Aqila Higena Taufik', email: 'aqila@students.unand.ac.id',    pass: '2411522003' },
      ];

      // Generate hash dan insert satu per satu
      for (const u of users) {
        const hash = await bcrypt.hash(u.pass, 10);
        db.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [u.name, u.email, hash]
        );
      }

      // Assign role setelah user ter-insert
      setTimeout(() => {
        db.query(`
          INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES
          (1, 'users', 1),
          (3, 'users', 2),
          (3, 'users', 3)
        `);
        console.log('✅ Seeding selesai! Silakan login.');
      }, 500);
    }
  );
});

module.exports = db;
