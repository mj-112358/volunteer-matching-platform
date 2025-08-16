# Volunteer Matching Platform

A modern volunteer matching platform built with React, TypeScript, and Node.js that connects volunteers with NGOs based on skills, interests, and location.

## Features

- **Volunteer Registration**: Easy signup process for volunteers with skill and interest profiling
- **NGO Management**: Platform for NGOs to register and post volunteer opportunities
- **Smart Matching**: AI-powered matching system using MongoDB Vector Search
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Real-time Updates**: Live updates for volunteer opportunities and matches

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Spline** for 3D graphics and animations

### Backend
- **Node.js** with Express
- **MongoDB** with Vector Search capabilities
- **CORS** enabled for cross-origin requests
- **OpenAI API** for embeddings and matching

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-7
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm start
```

This will start both the backend server (port 4000) and frontend development server (port 5175).

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm start` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## API Endpoints

- `POST /api/profile/upsert` - Create or update volunteer/NGO profile
- `POST /api/recommend/volunteers` - Get volunteer recommendations for NGOs
- `POST /api/recommend/ngos` - Get NGO recommendations for volunteers
- `POST /api/semantic-search` - Semantic search across profiles
- `GET /api/profiles` - Get all profiles
- `POST /api/seed` - Seed database with sample data

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Footer.tsx
│   │   ├── GetInvolved.tsx
│   │   ├── Hero.tsx
│   │   ├── Impact.tsx
│   │   ├── Navigation.tsx
│   │   ├── Programs.tsx
│   │   └── VolunteerMatching.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── server.cjs
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
