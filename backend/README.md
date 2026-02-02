# Ankur Foundation - Backend

Backend database and API configuration for Ankur Foundation.

## 🚀 Quick Start

### Development
```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
```

### Prisma Studio (Visual Database Manager)
```bash
npm run db:studio
```
Opens interactive database editor at [http://localhost:5555](http://localhost:5555)

## 📁 Structure

```
prisma/
├── schema.prisma       # Database schema
└── dev.db             # SQLite database (local)
database/
├── migrations/        # Database migration files
└── seeds/            # Database seeding scripts
api/
├── posts/            # Posts API route
└── users/            # Users API route
package.json          # Dependencies
```

## 🔧 Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Sync schema with database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Populate database with seed data
- `npm run db:reset` - Reset database and reseed

## 📦 Dependencies

- **Prisma**: ^5.7.1 - ORM
- **@prisma/client**: ^5.7.1 - Database client

## 🗄️ Database

### SQLite
- File-based: `/app/backend/prisma/dev.db`
- Lightweight and serverless
- Perfect for development and small deployments

### Schema
Current models:
- **User** - Application users
- **Post** - Blog posts/content

See `prisma/schema.prisma` for full schema definition.

## 🔗 Environment Variables

```env
DATABASE_URL=file:/app/backend/prisma/dev.db
NODE_ENV=development
```

## 🐳 Docker

### Build
```bash
docker build -f Dockerfile -t ankur-backend:latest .
```

### Run
```bash
docker run -p 3001:3001 \
  -e DATABASE_URL=file:/app/backend/prisma/dev.db \
  ankur-backend:latest
```

## 📝 Common Tasks

### Create New Migration
```bash
npm run db:migrate -- --name add_new_field
```

### Add New Model
1. Edit `prisma/schema.prisma`
2. Run: `npm run db:migrate -- --name name_of_change`
3. Update seed if needed: `npm run db:seed`

### View Database
```bash
npm run db:studio
```

### Reset Database
```bash
npm run db:reset
```

## 🔐 Data Persistence

- Database file stored in Docker volume `ankur-db-data`
- Data persists across container restarts
- In development, data stays local in `prisma/dev.db`

## 📚 Learn More

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Studio Guide](https://www.prisma.io/studio)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
