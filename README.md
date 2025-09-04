
# EventX Full Stack Project Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Backend](#backend)
   - [Structure](#backend-structure)
   - [Controllers](#controllers)
   - [Middleware](#middleware)
   - [Models](#models)
   - [Routes](#routes)
   - [Server](#server)
   - [Database](#database)
- [Frontend](#frontend)
   - [Structure](#frontend-structure)
   - [Pages](#pages)
   - [Components](#components)
   - [Hooks & Lib](#hooks--lib)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Setup & Running](#setup--running)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

EventX is a full-stack event management platform. Users can browse, book, and manage event tickets. Admins can create events and view analytics. The project uses React (frontend), Node.js/Express (backend), and MongoDB (database).

---

## Architecture

- **Frontend:** React + TypeScript + Tailwind CSS (Vite)
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Database:** MongoDB (cloud/local)
- **Authentication:** JWT, bcrypt
- **API:** RESTful endpoints

---

## Backend

### Backend Structure

```
Back/
├── controllers/
│   ├── analyticsController.js
│   ├── authController.js
│   ├── eventController.js
│   └── ticketController.js
├── middleware/
│   ├── auth.js
│   └── role.js
├── models/
│   ├── Event.js
│   ├── Ticket.js
│   └── User.js
├── routes/
│   ├── analytics.js
│   ├── auth.js
│   ├── events.js
│   └── tickets.js
├── server.js
├── package.json
└── .env
```

### Controllers

- **authController.js:** Handles user registration and login, password hashing, JWT token creation.
- **eventController.js:** CRUD operations for events (create, read, update, delete).
- **ticketController.js:** Ticket booking, QR code generation, user ticket retrieval.
- **analyticsController.js:** Aggregates data for admin dashboard (event count, tickets sold, revenue, demographics).

### Middleware

- **auth.js:** Verifies JWT token, attaches user info to requests.
- **role.js:** Checks user role for protected admin routes.

### Models

- **Event.js:** Event schema (name, details, date, time, location, cost, seats, status).
- **Ticket.js:** Ticket schema (attendee, eventRef, seatNumber, qrData, reservedAt, status).
- **User.js:** User schema (fullName, emailAddress, passHash, accountType, yearsOld, genderIdentity, hobbies, city).

### Routes

- **auth.js:** `/api/auth/signup`, `/api/auth/signin`
- **events.js:** `/api/events`, `/api/events/:id`, `/api/events` (admin CRUD)
- **tickets.js:** `/api/tickets/reserve`, `/api/tickets/mine`
- **analytics.js:** `/api/analytics/dashboard` (admin)

### Server

- **server.js:** Main Express app, connects to MongoDB, sets up middleware, routes, error handling, and starts the server.

### Database

- **MongoDB:** Stores users, events, tickets. Connection string in `.env` (`MONGODB_URI`). Uses Mongoose for schema and queries.

---

## Frontend

### Frontend Structure

```
React/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Events.tsx
│   │   ├── EventDetails.tsx
│   │   ├── MyTickets.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── admin/
│   │   └── auth/
│   │       ├── Login.tsx
│   │       └── Register.tsx
│   └── main.tsx
├── public/
├── package.json
└── ...
```

### Pages

- **Events.tsx:** Lists all events, search/filter/sort UI.
- **EventDetails.tsx:** Shows details for a single event, allows booking.
- **MyTickets.tsx:** Shows tickets booked by the user.
- **Index.tsx:** Landing page.
- **Login.tsx/Register.tsx:** Auth forms.
- **Admin pages:** Dashboard, event management, analytics.

### Components

- **Navbar.tsx/Footer.tsx:** Layout components.
- **UI components:** Buttons, cards, badges, forms, etc.

### Hooks & Lib

- **hooks/**: Custom React hooks (e.g., useToast, useMobile).
- **lib/**: Utility functions, API helpers, Supabase config (if used).

---

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register user
- `POST /api/auth/signin` — Login

### Events
- `GET /api/events` — List events
- `GET /api/events/:id` — Event details
- `POST /api/events` — Create event (admin)
- `PUT /api/events/:id` — Update event (admin)
- `DELETE /api/events/:id` — Delete event (admin)

### Tickets
- `POST /api/tickets/reserve` — Book ticket
- `GET /api/tickets/mine` — User's tickets

### Analytics
- `GET /api/analytics/dashboard` — Admin dashboard

---

## Environment Variables

Create a `.env` file in `Back/`:

```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## Setup & Running

### Backend

```powershell
cd Back
npm install
node server.js
```
- Runs on `http://localhost:3000`

### Frontend

```powershell
cd React
npm install
npm run dev
```
- Runs on `http://localhost:5173`

---

## Customization

- **Add event fields:** Update `Back/models/Event.js` and frontend event types.
- **Extend auth:** Add social login, password reset, etc.
- **Add new pages/components:** Create new React pages or backend routes as needed.

---

## Troubleshooting

- **Failed to fetch:** Check backend is running, CORS is enabled, and API URLs are correct.
- **Module not found:** Run `npm install` in both `Back` and `React`.
- **Database errors:** Check MongoDB connection string and server status.

---

## License

MIT

---

## Author

Created by Ganna Mohamed.

