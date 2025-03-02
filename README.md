# Globetrotter - Frontend

Globetrotter is an interactive geography quiz game built using **React**. Players answer multiple-choice questions to test their knowledge of global locations. The game features a leaderboard to track top scores and user authentication for personalized gameplay.

## Features

- 🎮 **Engaging Gameplay**: Answer 10 geography-related questions per game.
- 🔥 **Leaderboard**: Displays the top 10 players with the highest scores.
- 🔐 **User Authentication**: Signup/Login with JWT-based authentication.
- 🚀 **Smooth Animations**: Uses **Framer Motion** for UI animations.
- 🍞 **Notifications**: Uses **React Toastify** for instant feedback.
- 📊 **Dynamic Score Updates**: CountUp animations for real-time scoring.

---

## Tech Stack

- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Toastify** - Notifications
- **Axios** - API communication

---

## Installation

### Prerequisites
Make sure you have **Node.js** and **npm** installed.

### Clone the Repository
```sh
git clone https://github.com/yourusername/globetrotter-frontend.git
cd globetrotter-frontend
```

### Install Dependencies
```sh
npm install
```

### Run the App
```sh
npm start
```

The app will be available at `http://localhost:3000/`.

---

## Environment Variables
Create a `.env` file in the root directory and configure the backend API:
```sh
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Folder Structure
```
📂 globetrotter-frontend
├── 📁 src
│   ├── 📁 components     # Reusable UI components
│   ├── 📁 pages          # Main app pages (GamePage, Login, Signup, etc.)
│   ├── 📁 context        # Auth & Game context
│   ├── 📁 utils          # Utility functions
│   ├── 📁 assets         # Images & icons
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── routes.js        # Route definitions
├── .env                 # Environment variables
├── package.json         # Dependencies & scripts
└── README.md            # Documentation
```

---

## API Endpoints

Ensure your backend is running and exposes the following endpoints:

### **Authentication**
- `POST /api/signup` → Register a new user
- `POST /api/login` → Authenticate user & return token
- `GET /api/user` → Get current user details (requires authentication)

### **Game & Leaderboard**
- `GET /api/questions` → Fetch quiz questions
- `POST /api/submit` → Submit answers & update score
- `GET /api/leaderboard` → Fetch top 10 players

---

## Contribution
1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

---

## License
This project is licensed under the **MIT License**.

