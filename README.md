# Notes App

A minimal, classy personal notes app built with **React** (frontend) and a **REST API** backend hosted on Render. Capture, search, edit, and delete your notes with a clean dark-luxury UI.

---

## ✨ Features

- 🔐 **Authentication** — Sign up and log in with JWT-based auth
- 📝 **Create Notes** — Add notes with a title and content
- 🔍 **Search Notes** — Instantly search by keyword across all your notes
- ✏️ **Edit in Place** — Click any note card to edit it inline
- 🗑️ **Delete Notes** — Remove notes with a single click
- 💅 **Classy Dark UI** — Playfair Display serif + gold accents aesthetic
- 📱 **Responsive** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Styling | Plain CSS (custom design system) |
| HTTP | Axios |
| Notifications | React Toastify |
| Backend | Spring Boot 3 |
| Auth | JWT |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hasnain-hafiz/notes-frontend.git
cd notes-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Authentication.jsx   # Login / Sign up page
│   └── Notes.jsx            # Main notes dashboard
├── component/
│   ├── Login.jsx            # Login form
│   ├── SignUp.jsx           # Sign up form
│   ├── AddNote.jsx          # New note input card
│   ├── AllNotes.jsx         # Notes grid container
│   └── NoteCard.jsx         # Individual note card (with edit mode)
├── context/
│   └── AuthContext.jsx      # JWT auth context & token management
├── utils/
│   └── Api.js               # Axios API helper (apiRequest)
└── App.css                  # Global design system & styles
```

---

## 🔌 API Reference

All requests go to `https://notes-qpy7.onrender.com/api` with a `Bearer` token in the `Authorization` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/login` | Login, returns JWT token |
| `GET` | `/notes` | Fetch all notes for the user |
| `POST` | `/notes/add` | Create a new note |
| `PUT` | `/notes/update/:id` | Update a note by ID |
| `DELETE` | `/notes/delete/:id` | Delete a note by ID |
| `GET` | `/notes/search?keyword=` | Search notes by keyword |

---

## ⚙️ Environment

The backend is hosted on Render's free tier — it may spin down after inactivity. The app sends a **warmup request** on load and shows a toast notification while the server wakes up (usually under 30 seconds).

If you want to run your own backend, update the base URL in `src/utils/Api.js`.

---

## 🎨 Design

The UI follows a **dark luxury editorial** aesthetic:

- **Display font:** Playfair Display (serif)
- **Body font:** DM Sans
- **Accent color:** Warm gold `#c9a84c`
- **Background:** Deep charcoal `#0e0e12`

All styles live in `src/App.css` as a single-file design system using CSS custom properties.

---

## 📸 Screenshots


| Auth Page | Notes Dashboard |
|-----------|----------------|
| <img width="1920" height="874" alt="Screenshot 2026-04-22 125200" src="https://github.com/user-attachments/assets/c1e042c8-ae46-4a33-8a9c-cb3316887bd3" /> |<img width="1920" height="851" alt="Screenshot 2026-04-22 125951" src="https://github.com/user-attachments/assets/f785fcd0-06b7-4f1e-acc2-167b4bd690d5" />

---

## 📄 License

MIT — free to use and modify.

---

