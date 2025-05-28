# SmartHealth Tracker

A full-stack health tracking web app that allows users to monitor personal health metrics like blood pressure, medication schedules, sleep, and physical activity. Designed for individuals who want to take control of their health using data.

## Features

- User authentication with JWT
- Input and track health metrics
- Dashboard with visual analytics (charts, graphs)
- Daily health reminders via email (optional)
- Responsive mobile-friendly design

## Tech Stack

**Frontend:** React, Axios, Chart.js, TailwindCSS  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT  
**Email:** Nodemailer (or SendGrid)  
**Deployment:** Vercel (Frontend) + Render/Heroku (Backend)

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smarthealth-tracker.git
cd smarthealth-tracker
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Start the development servers:
```bash
# Start backend server (from server directory)
npm run server

# Start frontend dev server (from root directory)
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
smarthealth-tracker/
├── src/                       # Frontend source code
│   ├── components/           # Reusable React components
│   ├── contexts/            # React context providers
│   ├── pages/               # Page components
│   └── config.ts            # Frontend configuration
│
├── server/                   # Backend source code
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   └── index.js            # Server entry point
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update user preferences

### Health Metrics
- `GET /api/bloodpressure` - Get all blood pressure readings
- `POST /api/bloodpressure` - Add new reading
- `PUT /api/bloodpressure/:id` - Update reading
- `DELETE /api/bloodpressure/:id` - Delete reading

### Medications
- `GET /api/medications` - Get all medications
- `GET /api/medications/today` - Get today's medications
- `POST /api/medications` - Add new medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)