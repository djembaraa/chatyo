# 💬 Chatyo – Fullstack Real-time Chatting App

> **A Discord-like messaging platform with paid community groups, real-time interactions, and a creator revenue system.**

[![React](https://img.shields.io/badge/Frontend-React%2019-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Backend-Express.js-black?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-green?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🚀 About The Project

**Chatyo** is a modern Fullstack Single Page Application (SPA) designed to mimic the functionality of platforms like Discord. It goes beyond simple messaging by integrating a **business model for community creators**. Users can join free groups or pay to access premium communities, while group owners can track revenue and withdraw funds.

Built as a capstone project for *Develop Your Skills: Full Stack JavaScript 2025*, this application demonstrates end-to-end development skills, from database schema design to real-time client-state management.

### ✨ Key Features

* **🔐 Secure Authentication:** JWT-based Sign Up, Sign In, and Forgot Password (via email).
* **👥 Group Management:** Create groups, upload assets, and manage communities.
* **💬 Real-time Messaging:** Powered by **Pusher** for instant group chats and private DMs.
* **💳 Paid Communities:** Integration with **Midtrans Payment Gateway** allowing users to pay for premium group access.
* **💰 Creator Economy:** Group owners have a dashboard to view revenue, history, and request withdrawals.
* **🛡️ Admin Dashboard:** Admin panel to approve withdrawal requests and monitor transactions.
* **📁 Media Sharing:** Gallery feature to upload and view images within chats.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
* **Core:** React 19, Vite, TypeScript
* **State & Fetching:** @tanstack/react-query, Axios
* **Styling:** Tailwind CSS v4
* **Forms & Validation:** React Hook Form, Zod
* **Routing:** React Router v7
* **Visualization:** Chart.js (for revenue analytics)

### Backend (`/backend`)
* **Core:** Node.js, Express.js
* **Database:** PostgreSQL, Prisma ORM
* **Services:**
    * **Pusher** (Websockets/Real-time)
    * **Midtrans** (Payment Gateway)
    * **Mailtrap** (Email Testing)

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v18 or higher)
* **PostgreSQL** (running locally or cloud)
* **Package Manager:** npm, pnpm, or yarn

You will also need API keys from:
* [Midtrans](https://midtrans.com/) (Payment)
* [Pusher](https://pusher.com/) (Real-time)
* [Mailtrap](https://mailtrap.io/) (Email Testing)

---

## 🚀 Getting Started

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
