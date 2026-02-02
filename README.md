# Ankur Foundation - NGO Website

Professional NGO website with Next.js frontend, Node.js backend, and containerized Docker deployment.

## ⚡ Quick Start

```bash
# Start development (live reload)
./run.sh dev

# Start production
./run.sh prod

# Stop services
./run.sh stop

# Show all commands
./run.sh help
```

## 🎯 Available Commands

```bash
./run.sh dev              # Development mode with live reload
./run.sh prod             # Production mode (background)
./run.sh build            # Build Docker images
./run.sh stop             # Stop all services
./run.sh logs             # View all logs
./run.sh logs-frontend    # Frontend logs only
./run.sh logs-backend     # Backend logs only
./run.sh status           # Service status
./run.sh db-studio        # Open database GUI
./run.sh db-migrate       # Run database migrations
./run.sh db-seed          # Seed database
./run.sh clean            # Remove containers & volumes
./run.sh help             # Show this help
```

## 📊 Services & Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | **8080** | http://localhost:8080 |
| Backend | **3001** | http://localhost:3001 |
| Database GUI | 5555 | http://localhost:5555 |

## ✨ What We've Accomplished

### 🧹 Code Cleanup
- Removed redundant `/src` directory (duplicate files)
- Deleted unnecessary root-level Dockerfiles
- Removed obsolete documentation files
- Cleaned monorepo structure

### 📦 Dependencies Fixed
- Installed `tailwindcss-animate`
- Installed `class-variance-authority`
- Installed `clsx` and `tailwind-merge`
- All packages locked in package-lock.json

### 🐳 Docker Optimization
- Updated frontend Dockerfile context
- Configured volume mounts for live reload
- Fixed node_modules build issues
- Optimized docker-compose files

### 🔧 Port Configuration
- Frontend: 3000 → **8080**
- Backend: **3001** (fixed)
- All configs updated automatically

### ✅ Status
- All services running ✓
- No compilation errors ✓
- Live reload working ✓
- Database ready ✓

## 📁 Project Structure

```
Ankur/
├── frontend/              # Next.js UI (port 8080)
│   ├── src/
│   │   ├── app/          # Pages & layouts
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities
│   │   ├── hooks/        # Custom hooks
│   │   └── types/        # TypeScript types
│   ├── public/           # Static assets
│   ├── Dockerfile        # Production image
│   └── Dockerfile.dev    # Development image
│
├── backend/               # Node.js API (port 3001)
│   ├── prisma/           # Database schema
│   ├── api/              # API routes
│   ├── database/         # Seeds & migrations
│   └── Dockerfile        # Backend image
│
├── run.sh                # 🚀 Main script (all commands)
├── docker-compose.yml    # Production orchestration
├── docker-compose.dev.yml # Development orchestration
└── .gitignore            # Git configuration
```

## 📦 Technology Stack

**Frontend**
- Next.js 14 + TypeScript
- Tailwind CSS + Radix UI
- Lucide React (icons)
- PWA Support

**Backend**
- Node.js 18
- Prisma ORM
- SQLite Database

**DevOps**
- Docker & Docker Compose
- Live Reload (HMR)

## 🚀 Development

### Start Developing
```bash
./run.sh dev
# Frontend auto-refreshes on code changes
# Open http://localhost:8080
# Backend API at http://localhost:3001
```

### Database Management
```bash
./run.sh db-studio   # Open Prisma Studio
./run.sh db-migrate  # Run migrations
./run.sh db-seed     # Populate database
```

### Troubleshooting
```bash
./run.sh logs        # View all logs
./run.sh stop        # Stop services
./run.sh clean       # Reset & restart
./run.sh dev         # Start fresh
```

## 📝 Key Features

✨ **Modern Stack** - Latest Next.js 14, React 18, TypeScript  
🔄 **Live Reload** - Code changes auto-refresh in browser  
🐳 **Containerized** - Docker for consistent environments  
⚡ **Fast** - Optimized for performance  
🔒 **Secure** - Environment variables & isolated services  
📱 **Responsive** - Mobile-friendly UI  
♿ **Accessible** - Built with accessibility standards  

## 🔗 Documentation

- Frontend: `frontend/README.md`
- Backend: `backend/README.md`
- API Routes: `backend/api/`

## 📋 Environment

| Variable | Value |
|----------|-------|
| NODE_ENV | development / production |
| DATABASE_URL | file:/app/backend/prisma/dev.db |
| Frontend Port | 8080 |
| Backend Port | 3001 |

## ✅ Checklist

- [x] Clean codebase (no redundancy)
- [x] All dependencies installed
- [x] Docker configured
- [x] Ports optimized (8080, 3001)
- [x] run.sh script functional
- [x] Live reload working
- [x] Database ready
- [x] Production ready

## 🎯 Next Steps

1. Run: `./run.sh dev`
2. Visit: http://localhost:8080
3. Start building!

---

**Status:** ✅ Ready for Development | Version 1.0.0 | Last Updated: Feb 3, 2026
````

# Make changes
# Auto-reload in browser

# Commit when ready
git add .
git commit -m "feat: Add new feature"
git push
```

## 🎯 Next Steps

1. ✅ Start development: `./run.sh dev`
2. ✅ Open browser: http://localhost:3000
3. ✅ Make changes and see live updates
4. ✅ Deploy when ready: `./run.sh prod`

## 📞 Support

For detailed information, see:
- **[PROGRESS.md](PROGRESS.md)** - Project progress & milestones
- **[frontend/README.md](frontend/README.md)** - Frontend-specific help
- **[backend/README.md](backend/README.md)** - Backend-specific help

## 📄 License

MIT License - Built with ❤️ for Ankur Foundation

---

**Last Updated:** February 2, 2026  
**Status:** ✅ Active Development  
**Version:** 1.0.0
