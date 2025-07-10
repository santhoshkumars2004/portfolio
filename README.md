# Personal Portfolio Website

A modern, responsive portfolio website built with React and Node.js to showcase my work and skills as a full-stack developer.

## Features

- Home
- About me
- Projects
- Achievements
- Education
- Certificates
- Contact 

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Styling: Tailwind CSS
- Animation: Framer Motion
- Icons: React Icons

## Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── pages/        # Page components
│       ├── assets/       # Images and other assets
│       └── styles/       # CSS files
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   └── models/           # Database models
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd portfolio
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd ../server
npm install
```

4. Start the development servers

Frontend:
```bash
cd client
npm start
```

Backend:
```bash
cd server
npm run dev
```

## Contributing

This is a personal portfolio project. Feel free to fork and modify for your own use.

## License

MIT License 