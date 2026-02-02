#!/bin/bash

# Ankur Foundation - Project Runner Script
# This script manages the entire project (frontend, backend, database)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Ankur Foundation"
VERSION="1.0.0"

# Helper functions
print_header() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  $1"
    echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

show_help() {
    cat << 'HELP'
Ankur Foundation - Project Runner

Usage: ./run.sh [COMMAND] [OPTIONS]

COMMANDS:
  dev              Start development environment (live reload enabled)
  prod             Start production environment
  build            Build Docker images for production
  stop             Stop all running containers
  logs             Show logs from all services
  logs-frontend    Show frontend service logs
  logs-backend     Show backend service logs
  db-studio        Open Prisma Studio for database management
  db-migrate       Run database migrations
  db-seed          Seed database with initial data
  clean            Remove containers and volumes
  help             Show this help message

EXAMPLES:
  ./run.sh dev                 # Start development with live reload
  ./run.sh prod                # Start production server
  ./run.sh build               # Build Docker images
  ./run.sh logs                # View all logs
  ./run.sh db-studio           # Open database GUI
  ./run.sh stop                # Stop all services

HELP
}

# Main commands
start_dev() {
    print_header "🚀 Starting Development Mode (Live Reload)"
    print_info "Frontend will auto-refresh on code changes"
    print_info "Access frontend: http://localhost:8080"
    print_info "Access backend: http://localhost:3001"
    echo ""
    docker-compose -f docker-compose.dev.yml up
}

start_prod() {
    print_header "🚀 Starting Production Mode"
    print_info "Access frontend: http://localhost:8080"
    echo ""
    docker-compose up -d
    print_success "Services started in background"
    echo ""
    sleep 2
    docker-compose ps
}

build_images() {
    print_header "🔨 Building Docker Images"
    docker-compose build --no-cache
    print_success "Docker images built successfully"
}

stop_services() {
    print_header "⏹️  Stopping Services"
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    print_success "All services stopped"
}

show_logs() {
    print_header "📋 Showing All Logs"
    docker-compose logs -f
}

show_frontend_logs() {
    print_header "📋 Frontend Logs"
    docker-compose logs -f frontend
}

show_backend_logs() {
    print_header "📋 Backend Logs"
    docker-compose logs -f backend
}

open_db_studio() {
    print_header "📊 Opening Prisma Studio"
    print_info "Prisma Studio will open on: http://localhost:5555"
    cd backend
    npx prisma studio
}

run_migrations() {
    print_header "🔄 Running Database Migrations"
    cd backend
    npx prisma migrate dev
    print_success "Migrations completed"
}

seed_database() {
    print_header "🌱 Seeding Database"
    cd backend
    npm run db:seed
    print_success "Database seeded successfully"
}

clean_all() {
    print_header "🧹 Cleaning Up"
    print_info "Removing containers and volumes..."
    docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
    docker-compose down -v 2>/dev/null || true
    print_success "Cleanup completed"
}

show_status() {
    print_header "📊 Service Status"
    docker-compose ps 2>/dev/null || echo "No services running"
}

# Check for Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
}

# Main script logic
main() {
    check_docker
    
    COMMAND="${1:-help}"
    
    case $COMMAND in
        dev)
            start_dev
            ;;
        prod)
            start_prod
            ;;
        build)
            build_images
            ;;
        stop)
            stop_services
            ;;
        logs)
            show_logs
            ;;
        logs-frontend)
            show_frontend_logs
            ;;
        logs-backend)
            show_backend_logs
            ;;
        status)
            show_status
            ;;
        db-studio)
            open_db_studio
            ;;
        db-migrate)
            run_migrations
            ;;
        db-seed)
            seed_database
            ;;
        clean)
            clean_all
            ;;
        help)
            show_help
            ;;
        *)
            print_error "Unknown command: $COMMAND"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
