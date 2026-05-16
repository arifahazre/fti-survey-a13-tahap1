require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path    = require('path');
const app     = express();

// ── Template Engine ───────────────────────────────────────────
// Pakai EJS untuk render halaman HTML
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Middleware Global ─────────────────────────────────────────
// Baca data dari form HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File statis (CSS, JS, gambar)
app.use(express.static(path.join(__dirname, 'public')));

// ── Session ───────────────────────────────────────────────────
// Menyimpan data login user di server
app.use(session({
  secret:            process.env.SESSION_SECRET || 'ftisurvey2026',
  resave:            false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 2 } // sesi aktif 2 jam
}));

// ── Kirim Data User ke Semua Views ───────────────────────────
// Supaya semua halaman bisa akses data user yang login
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ── Routes ────────────────────────────────────────────────────
const authRoute   = require('./routes/auth');
const surveyRoute = require('./routes/survey');
const adminRoute  = require('./routes/admin');

app.use('/', authRoute);
app.use('/survey', surveyRoute);
app.use('/admin', adminRoute);

// ── Halaman 404 ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Halaman tidak ditemukan',
    status: 404
  });
});

module.exports = app;
