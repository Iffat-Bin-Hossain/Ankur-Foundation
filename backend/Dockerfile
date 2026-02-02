FROM node:18-alpine

WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy backend code (prisma, database configs)
COPY backend .

# Generate Prisma client
RUN npm run db:generate

# Expose port (for future API server)
EXPOSE 3001

# Keep container running
CMD ["tail", "-f", "/dev/null"]
