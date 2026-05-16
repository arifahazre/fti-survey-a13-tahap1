# FTI Survey A13 — Tahap 1

Aplikasi Survey Internal FTI Universitas Andalas  
**Modul A13: Pengisian Survey**  
**Tahap 1: Autentikasi & ACL**

---

## Deskripsi

Sistem survey internal FTI Unand yang memungkinkan pengguna (mahasiswa, dosen, pegawai) mengisi survey yang dipublikasikan admin. Tahap 1 mencakup implementasi autentikasi dan access control list (ACL).

Sistem ini bersifat **internal** — tidak ada fitur registrasi mandiri. Akun pengguna dikelola oleh admin sistem.

---

## Teknologi

- **Backend:** ExpressJS (Node.js)
- **Database:** MySQL (mysql2, tanpa ORM)
- **Template Engine:** EJS
- **Frontend:** Basecoat UI
- **Version Control:** Git & GitHub

---

## Cara Instalasi & Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/arifahazre/fti-survey-a13-tahap1.git
cd fti-survey-a13-tahap1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
- Buka Laragon → Start All (pastikan MySQL berjalan)
- Buka phpMyAdmin → `http://localhost/phpmyadmin`
- Buat database baru dengan nama `fti_survey`
- Import file `docs/database_dummy.sql`

> **Catatan:** Database sementara menggunakan struktur dummy yang mendekati ERD dosen. Akan disesuaikan setelah database resmi diberikan.

### 4. Setup File .env
Buat file `.env` di root folder (salin dari `.env.example`):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fti_survey
SESSION_SECRET=ftisurvey2026
PORT=3000
```

### 5. Jalankan Aplikasi
```bash
# Mode development (auto-restart)
npm run dev

# Mode production
npm start
```

Buka browser: `http://localhost:3000`

> **Catatan:** Saat pertama kali dijalankan, aplikasi akan otomatis melakukan seeding user default ke database.

---

## Akun Default untuk Testing

| Email | Password | Role |
|---|---|---|
| admin@fti.unand.ac.id | admin123 | admin |
| arifah@students.unand.ac.id | 2411521003 | mahasiswa |
| aqila@students.unand.ac.id | 2411522003 | mahasiswa |

---

## Pembagian Tugas

| Nama | NIM | Yang Dikerjakan |
|---|---|---|
| Arifah Huwaina Azre | 2411521003 | Inisialisasi project Express Generator, routing auth/survey/admin, halaman login (EJS), halaman survey (placeholder), styling CSS Basecoat UI, logic login/logout |
| Aqila Higena Taufik | 2411522003 | Koneksi database mysql2 dengan seeder otomatis, middleware auth (cek session login), middleware ACL (cek role RBAC), halaman dashboard admin (placeholder), dokumentasi README & .env.example |

---

## Struktur Folder

```
fti-survey-a13-tahap1/
├── bin/www                    # Entry point server
├── config/
│   └── db.js                  # Koneksi database + seeder otomatis
├── controllers/
│   ├── authController.js      # Logic login & logout
│   ├── surveyController.js    # Placeholder survey (Tahap 2)
│   └── adminController.js     # Placeholder admin (Tahap 2)
├── middleware/
│   ├── auth.js                # Cek session login (Authentication)
│   └── acl.js                 # Cek role RBAC (Authorization)
├── routes/
│   ├── auth.js                # Route login & logout
│   ├── survey.js              # Route halaman survey
│   └── admin.js               # Route halaman admin
├── views/
│   ├── auth/login.ejs         # Halaman login
│   ├── survey/index.ejs       # Placeholder halaman survey
│   ├── admin/dashboard.ejs    # Placeholder dashboard admin
│   └── error.ejs              # Halaman error
├── public/css/style.css       # Basecoat UI & custom CSS
├── docs/
│   └── database_dummy.sql     # Struktur database sementara
├── exports/                   # Tempat file CSV/PDF (Tahap 2)
├── .env.example               # Contoh konfigurasi .env
├── .gitignore
├── package.json
└── README.md
```

---

## Catatan

- Database resmi akan diberikan oleh dosen, struktur dummy akan disesuaikan
- Fitur utama (isi survey, rekap, export) akan diimplementasi di Tahap 2
- Setiap anggota memiliki kontribusi yang dapat dilihat melalui commit history di GitHub
