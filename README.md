# Tugas Besar Pemrograman Web
## Modul A13 — Pengisian Survey (Tahap 1)

Fakultas Teknologi Informasi, Universitas Andalas
Semester Genap 2025/2026

---

## Deskripsi

Sistem survey internal FTI Unand untuk memfasilitasi pengisian survey oleh civitas akademika. Pengguna yang terdaftar dapat mengisi survey yang telah dipublikasikan oleh admin. Sistem bersifat internal — akun dikelola oleh admin, tidak ada registrasi mandiri.

Repositori ini merupakan Tahap 1 yang mencakup implementasi autentikasi dan access control.

---

## Teknologi

- Backend: ExpressJS (Node.js)
- Database: MySQL dengan library mysql2 (tanpa ORM)
- Template Engine: EJS
- Styling: Basecoat UI
- Version Control: Git dan GitHub

---

## Instalasi

1. Clone repository

git clone https://github.com/arifahazre/fti-survey-a13-tahap1.git
cd fti-survey-a13-tahap1

2. Install dependencies

npm install

3. Setup database

Buka phpMyAdmin, buat database baru bernama fti_survey, lalu import file docs/database_dummy.sql.
Database yang digunakan saat ini adalah dummy sementara, menunggu database resmi dari dosen.

4. Konfigurasi environment

Salin file .env.example menjadi .env lalu sesuaikan isinya:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fti_survey
SESSION_SECRET=ftisurvey2026
PORT=3000

5. Jalankan aplikasi

npm run dev

Akses di browser: http://localhost:3000
Saat pertama kali dijalankan, aplikasi akan otomatis membuat user default ke database.

---

## Akun Default

| Email | Password | Role |
|---|---|---|
| admin@fti.unand.ac.id | admin123 | admin |
| arifah@students.unand.ac.id | 2411521003 | mahasiswa |
| aqila@students.unand.ac.id | 2411522003 | mahasiswa |

---

## Pembagian Tugas

| Nama | NIM | Kontribusi |
|---|---|---|
| Arifah Huwaina Azre | 2411521003 | Inisialisasi project, routing, halaman login, halaman survey, middleware autentikasi, logic login dan logout |
| Aqila Higena Taufik | 2411522003 | Koneksi database dengan seeder otomatis, middleware ACL, halaman dashboard admin, dokumentasi |

---

## Progress Pengembangan

### Tahap 1 — Autentikasi dan ACL (selesai)

- Inisialisasi project menggunakan Express Generator
- Implementasi login dan logout dengan enkripsi password bcrypt
- Manajemen sesi pengguna menggunakan express-session
- Middleware autentikasi untuk memproteksi halaman
- Middleware ACL berbasis role (RBAC) — satu pengguna dapat memiliki lebih dari satu role
- Koneksi database MySQL menggunakan mysql2 dengan seeder otomatis
- Halaman login, halaman survey (placeholder), dan dashboard admin (placeholder)

### Tahap 2 — Fitur Utama (akan datang)

- Pengguna dapat melihat daftar survey yang dipublikasikan
- Pengguna dapat mengisi dan mengirim jawaban survey
- Validasi jawaban dan notifikasi konfirmasi pengiriman
- Admin dapat melihat rekap hasil survey dan data responden
- Export data hasil survey dalam format CSV dan PDF
- REST API endpoint untuk data survey

---

## Struktur Folder

fti-survey-a13-tahap1/
├── bin/www
├── config/db.js
├── controllers/
│   ├── authController.js
│   ├── surveyController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   └── acl.js
├── routes/
│   ├── auth.js
│   ├── survey.js
│   └── admin.js
├── views/
│   ├── auth/login.ejs
│   ├── survey/index.ejs
│   ├── admin/dashboard.ejs
│   └── error.ejs
├── public/css/style.css
├── docs/database_dummy.sql
├── exports/
├── .env.example
├── .gitignore
├── package.json
└── README.md

---

## Catatan

Database resmi akan diberikan oleh dosen dan akan disesuaikan pada tahap berikutnya.