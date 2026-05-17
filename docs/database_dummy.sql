-- =============================================
-- FTI Survey A13 — Dummy Database
-- Menunggu database resmi dari dosen
-- Sistem internal Unand, tidak ada register
-- =============================================

CREATE DATABASE IF NOT EXISTS fti_survey
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE fti_survey;

-- =============================================
-- STRUKTUR TABEL (sesuai ERD dosen)
-- =============================================

-- Tabel users: data pengguna sistem internal Unand
CREATE TABLE IF NOT EXISTS users (
  id                        INT AUTO_INCREMENT PRIMARY KEY,
  name                      VARCHAR(100) NOT NULL,
  email                     VARCHAR(100) NOT NULL UNIQUE,
  password                  VARCHAR(255) NOT NULL,
  email_verified_at         DATETIME DEFAULT NULL,
  remember_token            VARCHAR(100) DEFAULT NULL,
  two_factor_secret         TEXT DEFAULT NULL,
  two_factor_recovery_codes TEXT DEFAULT NULL,
  two_factor_confirmed_at   DATETIME DEFAULT NULL,
  updated_at                DATETIME DEFAULT NULL,
  created_at                DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel roles: daftar role yang tersedia
-- Hanya pakai id & name sesuai instruksi dosen
-- (abaikan guard_name, created_at, updated_at)
CREATE TABLE IF NOT EXISTS roles (
  id   BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Tabel model_has_roles: relasi many-to-many user <-> role
-- Satu user bisa punya banyak role
-- Satu role bisa dimiliki banyak user
CREATE TABLE IF NOT EXISTS model_has_roles (
  role_id    BIGINT NOT NULL,
  model_type VARCHAR(100) NOT NULL DEFAULT 'users',
  model_id   INT NOT NULL,
  PRIMARY KEY (role_id, model_type, model_id)
);

-- =============================================
-- SEEDER ROLES
-- =============================================

INSERT INTO roles (id, name) VALUES
  (1, 'admin'),
  (2, 'dosen'),
  (3, 'mahasiswa'),
  (4, 'pegawai');

-- =============================================
-- SEEDER USERS
-- Data dari pihak Unand, tidak ada register mandiri
-- Password di-hash menggunakan bcrypt (Node.js)
-- Cara generate hash: 
--   const bcrypt = require('bcrypt');
--   bcrypt.hash('password123', 10).then(h => console.log(h));
-- =============================================

INSERT INTO users (id, name, email, password) VALUES
  -- Admin sistem (password: admin123)
  (1, 'Administrator', 'admin@fti.unand.ac.id',
   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),

  -- Contoh dosen (password: dosen123)
  (2, 'Dr. Budi Santoso', 'budi@fti.unand.ac.id',
   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),

  -- Contoh dosen yang juga admin (punya 2 role)
  (3, 'Prof. Sari Dewi', 'sari@fti.unand.ac.id',
   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),

  -- Contoh mahasiswa (password: NIM masing-masing)
  (4, 'Arifah Huwaina Azre', 'arifah@students.unand.ac.id',
   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),

  (5, 'Aqila Higena Taufik', 'aqila@students.unand.ac.id',
   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- =============================================
-- SEEDER MODEL_HAS_ROLES
-- Assign role ke masing-masing user
-- =============================================

INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES
  -- Admin → role admin
  (1, 'users', 1),

  -- Pak Budi → role dosen saja
  (2, 'users', 2),

  -- Bu Sari → role dosen + admin (contoh user dengan 2 role)
  (2, 'users', 3),
  (1, 'users', 3),

  -- Mahasiswa
  (3, 'users', 4),
  (3, 'users', 5);

-- =============================================
-- CATATAN PENTING
-- Hash password di atas adalah hash sementara untuk testing
-- Sebelum presentasi, generate ulang hash dengan:
--
-- const bcrypt = require('bcrypt');
-- const passwords = ['admin123', 'dosen123', 'mahasiswa123'];
-- passwords.forEach(async p => {
--   const hash = await bcrypt.hash(p, 10);
--   console.log(`${p} → ${hash}`);
-- });
--
-- Lalu update kolom password di tabel users
-- =============================================
