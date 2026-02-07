#!/bin/sh

# Initialize database if needed
echo "Initializing database..."
npm run db:push || true

# Start the application
echo "Starting application..."
npm start
