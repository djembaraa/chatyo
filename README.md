# Chatyo – Fullstack Chatting App (Bikin Web Like Discord)

Repositori ini adalah project **Chatyo**, aplikasi chatting modern berbasis grup dan user yang dibangun sebagai bagian dari kelas:

> **Develop Your Skills – Bikin Web Like Discord: Full Stack JavaScript 2025**

Di project ini kamu akan membangun aplikasi chatting **end-to-end**:

- Backend API dengan Express + Prisma + PostgreSQL
- Frontend SPA dengan React + Vite
- Real-time chat menggunakan Pusher
- Integrasi pembayaran menggunakan Midtrans
- Fitur revenue & withdraw untuk pemilik grup

---

## ✨ Fitur Utama

- 🔐 **Authentication**

  - Sign Up, Sign In, Forgot Password / Reset Password
  - JWT-based auth

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
- **React Hook Form** + **Zod** – form dan validasi
- **Tailwind CSS** – styling
- **React Chart (Chart.js)** – visualisasi data (revenue, aktivitas user)

Cuplikan `package.json`:

```json
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
```

Backend – bwa-backend-ticket

Express.js

Prisma + PostgreSQL

JWT (jsonwebtoken) – auth

bcrypt – hash password

Multer – upload file

Pusher – real-time messaging

Mailtrap – testing email (forgot password)

Zod – validasi input

TypeScript

Cuplikan package.json:
{
"name": "bwa-backend-ticket",
"version": "1.0.0",
"main": "dist/index.js",
"scripts": {
"build": "npx tsc",
"start": "node dist/index.js",
"dev": "nodemon src/index.ts"
},
"dependencies": {
"@prisma/client": "^5.22.0",
"bcrypt": "^6.0.0",
"body-parser": "^2.2.0",
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.19.2",
"jsonwebtoken": "^9.0.2",
"mailtrap": "^3.4.0",
"multer": "^2.0.2",
"prisma": "^5.22.0",
"pusher": "^5.2.0",
"zod": "^4.1.12"
}
}

📁 Struktur Project (Saran)

Jika frontend & backend disatukan dalam satu repo, struktur yang disarankan:

.
├── backend/ # bwa-backend-ticket (Express + Prisma)
│ ├── src/
│ ├── prisma/
│ ├── package.json
│ └── ...
└── frontend/ # chatyo (React + Vite)
├── src/
├── index.html
├── package.json
└── ...

Kalau kamu pisah ke dua repo, cukup sesuaikan path frontend & backend saat menjalankan.

⚙️ Prasyarat

Sebelum mulai:

Node.js (disarankan v18+)

npm / pnpm / yarn

PostgreSQL terinstall & berjalan

Akun:

Midtrans

Pusher

Mailtrap
(optional, untuk testing email reset password)

🔑 Setup Environment Variable
Backend (backend/.env)

Contoh:

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

Sesuaikan nama variabel dengan file konfigurasi di folder src/ jika berbeda.

Frontend (frontend/.env)

Contoh:

VITE_API_BASE_URL="http://localhost:5000/api"
VITE_PUSHER_KEY="your-pusher-key"
VITE_PUSHER_CLUSTER="ap1"
VITE_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"

🛠️ Menjalankan Backend
cd backend

# Install dependencies

npm install

# Setup Prisma & database

npx prisma migrate dev

# (opsional) seed data awal (role, dll)

npx prisma db seed

# Development

npm run dev

# Production build

npm run build
npm start

Secara default backend akan berjalan di http://localhost:5000.

🖥️ Menjalankan Frontend
cd frontend

# Install dependencies

npm install

# Development

npm run dev

# Production build

npm run build
npm run preview

Default Vite akan jalan di http://localhost:5173 (atau port lain jika sudah terpakai).

📚 Breakdown Materi Kelas (Ringkasan)

Struktur lesson di kelas ini kurang lebih mengikuti alur berikut:

Setup Backend

Install DB & tools

Desain ERD

Setup Express & Prisma

Backend – Authentication

Seed roles

API Sign Up (multi part)

API Sign In

Forgot Password (get reset link, update password)

Backend – Group & Chat

CRUD group (create, update, asset)

Discover group & people

Join group (termasuk payment)

Room & messages

Integrasi Pusher untuk real-time chat

Backend – Revenue

Get revenue, balance

History payout

Create withdraw

Frontend – Setup & Auth

Setup project React + Vite

Slicing landing page

Slicing & integrasi Sign Up / Sign In / Forgot Password

Validasi dengan React Hook Form + Zod

Frontend – Discover & Payment

Slicing discover page & detail group

Integrasi API discover, detail group

Success payment page + integrasi detail transaksi

Frontend – Chatting

Slicing chat page

Integrasi get rooms & send message

Group info modal, gallery modal

Personal chat & profile

Frontend – Settings & Revenue

General/account/groups settings

Create & update group (slicing + integrasi)

Revenue page + Chart

Withdraw & history withdraw

Frontend – Admin

Integrasi Sign In admin

Dashboard admin

Approval & update withdraw

🎯 Tujuan Belajar

Dengan menyelesaikan project ini, kamu akan:

Punya 1 portfolio project fullstack yang siap dipamerkan

Mengerti alur membangun aplikasi chat berbasis real-world business (paid groups & revenue)

Terbiasa dengan stack modern:

React, Vite, Tailwind, TanStack Query

Express, Prisma, PostgreSQL

Pusher, Midtrans, JWT, Zod

Punya pondasi kuat untuk menjadi Full-stack JavaScript Developer

📝 License

Project ini dibuat sebagai bagian dari program belajar.
Penggunaan ulang / modifikasi dipersilakan untuk keperluan belajar & portofolio.

Happy coding & selamat membangun Chatyo! 🚀
