FROM node:18-alpine3.17

WORKDIR /app/backend

# Alpine 3.17 has openssl, not openssl1.1
RUN apk add --no-cache openssl

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy backend code (INCLUDING pre-generated Prisma client from node_modules)
COPY backend .

# Copy entrypoint script
COPY backend/entrypoint.sh /app/backend/entrypoint.sh
RUN chmod +x /app/backend/entrypoint.sh

# Expose port
EXPOSE 3001

# Start the server with entrypoint script
CMD ["sh", "/app/backend/entrypoint.sh"]
