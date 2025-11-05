# Todo App - Full Stack Application

A full-stack todo application with user authentication, built with React and Express.js.

## Features

- **User Authentication**: Register, login, logout functionality with JWT tokens
- **Task Management**: Create, read, update, delete tasks
- **Task Filtering**: Filter tasks by status (all, pending, completed)
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Automatic UI updates with React Query
- **Secure API**: Protected routes and input validation

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **CSS Modules** - Component-scoped styling

### Backend
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **PostgreSQL** - Database

## Project Structure

```
todo-test/
├── backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication & validation middleware
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── scripts/           # Database setup scripts
│   └── server.js          # Main server file
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # React components
│   │   │   ├── Auth/      # Authentication components
│   │   │   ├── Navbar/    # Navigation component
│   │   │   ├── Tasks/     # Task management components
│   │   │   └── Modal/     # Modal component
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-jwt-key
JWT_EXPIRES_IN=7d
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_app
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DIALECT=postgres
FRONTEND_URL=http://localhost:5173
```

4. Set up the database (this will create the database and tables automatically):
```bash
npm run setup
```

**Note**: The setup script will:
- Connect to PostgreSQL using your credentials
- Create the database specified in `DB_NAME` if it doesn't exist
- Create all necessary tables (users, tasks) using Sequelize migrations

6. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

### Running the Application

1. Make sure PostgreSQL is running
2. Start the backend server: `cd backend && npm run dev`
3. Start the frontend: `cd frontend && npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get all tasks (with optional status filter)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run setup` - Initialize database

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
