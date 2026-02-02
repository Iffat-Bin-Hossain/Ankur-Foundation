FROM node:18-alpine

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend code
COPY frontend .

# Generate Prisma client (for types if needed)
# RUN npm run db:generate 2>/dev/null || true

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]
