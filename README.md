# RouteDNS Admin Panel

A modern, production-ready admin panel for managing RouteDNS infrastructure.

## Features

- 📊 Dashboard with real-time metrics
- 👥 Tenant management
- 📱 Device management and blocking
- 📋 Comprehensive logging
- ⚙️ Settings management
- 🔒 Secure authentication
- 📈 Real-time charts and statistics

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
VITE_API_URL=http://localhost:8404
VITE_PROMETHEUS_URL=http://localhost:9090
VITE_HAPROXY_URL=http://localhost:8404
```

## Docker

```bash
docker build -t routedns-admin-panel .
docker run -p 3000:3000 routedns-admin-panel
```

## Project Structure

```
src/
├── components/      # React components
├── pages/          # Page components
├── services/       # API services
├── store/          # Zustand state management
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Technologies

- React 18
- Vite
- Tailwind CSS
- Recharts
- Axios
- Zustand
- React Router

## License

MIT
