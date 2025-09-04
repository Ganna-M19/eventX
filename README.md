# EventX Full Stack Project

## Overview
EventX is a full-stack event management platform built with React (frontend) and Node.js/Express (backend). It allows users to browse, book, and manage event tickets, while admins can create and analyze events.

---

## Features
- **User Authentication:** Register, login, and secure access.
- **Event Browsing:** Search, filter, and view event details.
- **Ticket Booking:** Reserve seats, view QR codes, and manage tickets.
- **Admin Dashboard:** Create events, view analytics, and manage users.
- **Responsive UI:** Modern design with Tailwind CSS and React components.

---

## Project Structure
```
EventX-full-stack-maim/
├── Back/        # Node.js/Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── React/       # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js
- npm

### Backend Setup
1. Open a terminal in the `Back` folder.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
   The backend runs on `http://localhost:3000` by default.

### Frontend Setup
1. Open a terminal in the `React` folder.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

---

## API Endpoints

### Auth
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/signin` — Login

### Events
- `GET /api/events` — List all events
- `GET /api/events/:id` — Get event details
- `POST /api/events` — Create event (admin)
- `PUT /api/events/:id` — Update event (admin)
- `DELETE /api/events/:id` — Delete event (admin)

### Tickets
- `POST /api/tickets/reserve` — Book a ticket
- `GET /api/tickets/mine` — Get user's tickets

### Analytics
- `GET /api/analytics/dashboard` — Admin dashboard stats

---

## Environment Variables
Create a `.env` file in the `Back` folder with:
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## Technologies Used
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt

---

## Customization & Extending
- Add new event fields in `Back/models/Event.js` and update frontend accordingly.
- Extend authentication logic in `Back/controllers/authController.js`.
- Add new pages/components in `React/src/pages` and `React/src/components`.

---

## License
MIT

---

## Author
Created by Ganna Mohamed.
