FROM node:18-alpine

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend code
COPY frontend .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]
