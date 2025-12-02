# Chatyo – Fullstack Chatting App (Bikin Web Like Discord)

Repositori ini adalah project **Chatyo**, aplikasi chatting modern berbasis grup dan user yang dibangun sebagai bagian dari kelas:

> **Develop Your Skills – Bikin Web Like Discord: Full Stack JavaScript 2025**

Di project ini kamu akan membangun aplikasi chatting **end-to-end**:

- Backend API dengan **Express + Prisma + PostgreSQL**
- Frontend SPA dengan **React + Vite**
- **Real-time chat** menggunakan **Pusher**
- Integrasi pembayaran menggunakan **Midtrans**
- Fitur **revenue & withdraw** untuk pemilik grup

---

## 📚 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
  - [Frontend – `chatyo`](#frontend--chatyo)
  - [Backend – `bwa-backend-ticket`](#backend--bwa-backend-ticket)
- [Struktur Project](#-struktur-project)
- [Prasyarat](#-prasyarat)
- [Setup Environment Variable](#-setup-environment-variable)
  - [Backend – `backend/.env`](#backend--backendenv)
  - [Frontend – `frontend/.env`](#frontend--frontendenv)
- [Menjalankan Project](#-menjalankan-project)
  - [Menjalankan Backend](#1-menjalankan-backend)
  - [Menjalankan Frontend](#2-menjalankan-frontend)
- [Breakdown Materi Kelas](#-breakdown-materi-kelas-ringkasan)
- [Tujuan Belajar](#-tujuan-belajar)
- [License](#-license)

---

## ✨ Fitur Utama

- 🔐 **Authentication**

  - Sign Up, Sign In, Forgot Password / Reset Password
  - JWT-based authentication

- 👥 **Manajemen Grup**

  - Buat grup (owner)
  - Edit grup & kelola aset (gambar, dsb)
  - Discover group & people
  - Join group (termasuk grup berbayar)

- 💬 **Real-time Chat**

  - Chat berbasis grup
  - Personal chat (room personal)
  - Integrasi Pusher untuk real-time message
  - Gallery (upload & tampilkan file / image)

- 💳 **Payment & Revenue**

  - Integrasi **Midtrans Payment Gateway** untuk pembayaran join group
  - Halaman revenue pemilik grup
  - History withdraw & balance
  - Fitur withdraw dana

- 🛠️ **Admin Panel**
  - Login admin
  - Approval & update status withdraw
  - Monitoring history withdraw

---

## 🧩 Tech Stack

### Frontend – `chatyo`

- **React** + **Vite**
- **TypeScript**
- **React Router**
- **@tanstack/react-query** – data fetching & caching
- **Axios** – HTTP client
- **React Hook Form** + **Zod** – form & validasi
- **Tailwind CSS** – styling
- **React Chart (Chart.js)** – visualisasi data (revenue, aktivitas user)

````json
{
  "name": "chatyo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.11",
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router": "^7.9.6",
    "tailwindcss": "^4.1.17",
    "zod": "^4.1.13"
  }
}
## ⚙️ Prasyarat

Sebelum menjalankan project, pastikan kamu sudah menyiapkan:

- **Node.js** versi **18 atau lebih baru**
- Salah satu package manager: **npm / pnpm / yarn**
- **PostgreSQL** terinstal dan dalam keadaan berjalan (running)
- Memiliki akun untuk layanan berikut:
  - **Midtrans** (payment gateway)
  - **Pusher** (real-time event / websocket)
  - **Mailtrap** (opsional, untuk testing email seperti reset password)

---

## 🔑 Setup Environment Variable

### 1. Backend – `backend/.env`

Buat file `.env` di folder `backend/` dan isi dengan konfigurasi environment yang diperlukan (lihat contoh pada bagian *Konfigurasi Environment* di atas).

# Konfigurasi Environment Project Chatyo

Repository ini menggunakan beberapa variabel environment untuk mengatur server, database, autentikasi, email, real-time event, dan pembayaran.
Semua konfigurasi didefinisikan di dalam file `.env`.

## Contoh File `.env`

```env
# Server
PORT=5000

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/chatyo_db?schema=public"

# JWT
JWT_SECRET="ganti-dengan-secret-yang-kuat"
JWT_EXPIRES_IN="7d"

# Email (Mailtrap)
MAILTRAP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_PORT=2525
MAILTRAP_USER="your-mailtrap-user"
MAILTRAP_PASS="your-mailtrap-pass"
MAIL_FROM="no-reply@chatyo.app"

# Pusher
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="ap1"

# Midtrans
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_IS_PRODUCTION=false

### 📝 Catatan Penting

- Sesuaikan nilai `DATABASE_URL` dengan **user**, **password**, dan **nama database lokal** yang kamu gunakan di PostgreSQL.
- Pastikan **nama setiap environment variable** sama persis dengan yang dipanggil di file konfigurasi pada folder `src/`
  (typo nama variabel bisa bikin aplikasi gagal jalan).


### 2. Frontend – `frontend/.env`

Buat file `.env` di folder `frontend/` dengan isi contoh berikut:

```env
VITE_API_BASE_URL="http://localhost:(sesuaikan dengan portmu)/api"
VITE_PUSHER_KEY="your-pusher-key"
VITE_PUSHER_CLUSTER="ap1"
VITE_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"


## 🛠️ Menjalankan Project

### 3. Backend

Masuk ke folder backend:

```bash
🔹 Masuk ke Folder Backend
cd backend-chatyo

🔹 Install dependencies
npm install

🔹 Setup Prisma & Database (migrasi schema)
npx prisma migrate dev

🔹 (Opsional) Seed data awal (role, dll)
npx prisma db seed

🔹 Jalankan dalam mode development (dengan nodemon)
npm run dev

🔹 Jalankan untuk production
npm run build
npm start


Secara default, backend akan berjalan di:

➡️ http://localhost:(sesuaikan dengan portmu)

### 4. Frontend

```bash
🔹 Masuk ke Folder Frontend
cd frontend

🔹 Install dependencies
npm install

🔹 Jalankan dalam mode development
npm run dev

🔹 Build untuk production
npm run build

🔹 Preview production build secara lokal
npm run preview


Secara default, Vite akan berjalan di:

➡️ http://localhost:5173
(atau port lain jika port default sudah terpakai).


## 📚 Fitur & Modul

### 1. Backend – Authentication

- Seed **roles** awal: `user`, `creator`, `admin`, dll.
- **API Sign Up**
  - Mendukung `multipart/form-data`
  - Termasuk upload avatar user
- **API Sign In**
- **Forgot Password**
  - Mengirim reset link via email (menggunakan Mailtrap untuk testing)
  - Update password menggunakan token reset yang valid

---

### 2. Backend – Group & Chat

#### 🧩 CRUD Group
- Membuat dan mengubah group
- Upload asset group:
  - Cover
  - Avatar
  - dan aset lain yang dibutuhkan

#### 🔍 Discover
- Discover group
- Discover people (user lain)

#### 👥 Join Group
- Integrasi dengan **Midtrans** untuk payment saat join group berbayar

#### 💬 Room & Messages
- Struktur **room / chat** (group & personal)
- Integrasi **Pusher** untuk:
  - Real-time group chat
  - Real-time personal chat

---

### 3. Backend – Revenue

- Mengambil data **revenue** & **balance** untuk creator
- Melihat **history payout**
- Membuat **withdraw request** (pengajuan pencairan saldo)

---

### 4. Frontend – Auth & Umum

- Setup project: **React + Vite + Tailwind**
- Slicing **landing page**
- Halaman:
  - Sign Up
  - Sign In
  - Forgot Password
- Validasi form menggunakan:
  - **React Hook Form**
  - **Zod** (schema validation)

---

### 5. Frontend – Discover & Payment

- Halaman **discover group** & **detail group**
- Integrasi API:
  - List discover group
  - Detail group
- Halaman **success payment** dengan:
  - Integrasi detail transaksi dari **Midtrans**

---

### 6. Frontend – Chatting

Halaman chat dengan fitur:

- List rooms (daftar chat)
- Mengirim pesan (send message)
- **Group info modal**
- **Gallery modal** (media / gambar)
- **Personal chat** & halaman profil

---

### 7. Frontend – Settings & Revenue

#### ⚙️ Settings
- Pengaturan:
  - General
  - Akun
  - Groups
- Create & update group:
  - UI
  - Integrasi API

#### 💰 Revenue
- Halaman revenue dengan tampilan **chart**
- Fitur **withdraw** dan melihat **history withdraw**

---

### 8. Frontend – Admin

- Halaman **Sign In Admin**
- **Dashboard admin**
- Fitur approval & update status **withdraw** creator

---

## 🎯 Tujuan Belajar

Dengan menyelesaikan project ini, kamu akan:

- Punya **1 portfolio project fullstack** yang layak dipamerkan di:
  - GitHub
  - LinkedIn
  - CV / Resume
- Memahami alur membangun aplikasi chat yang:
  - Berbasis **real-world business**
  - Mendukung **paid groups & revenue sharing**
- Terbiasa dengan **modern tech stack**:

  - **Frontend**: React, Vite, Tailwind, TanStack Query
  - **Backend**: Express, Prisma, PostgreSQL
  - **Supporting**: Pusher, Midtrans, JWT, Zod

- Memiliki pondasi kuat untuk berkarier sebagai:
  - **Full-stack JavaScript / TypeScript Developer**

---

## 📝 License

Project ini dibuat sebagai bagian dari program belajar.
Penggunaan ulang dan modifikasi **dipersilakan** untuk:

- Keperluan belajar
- Materi portofolio pribadi

Silakan cantumkan atribusi seperlunya jika kamu mempublikasikan ulang project ini.
####
````
