#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Database configuration
DB_NAME="learn_to_scode"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_PORT="5432"
CONTAINER_NAME="learn-to-scode-db"

# Derived connection string
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}"

echo -e "${BLUE}🚀 Starting Learn to Scode Database Setup${NC}"
echo -e "${BLUE}==========================================${NC}"

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Docker is running${NC}"
}

# Function to check if container exists and is running
check_container() {
    if docker ps -q -f name=${CONTAINER_NAME} | grep -q .; then
        echo -e "${YELLOW}⚠️  Container '${CONTAINER_NAME}' is already running${NC}"
        return 0
    elif docker ps -aq -f name=${CONTAINER_NAME} | grep -q .; then
        echo -e "${YELLOW}⚠️  Container '${CONTAINER_NAME}' exists but is stopped. Starting it...${NC}"
        docker start ${CONTAINER_NAME}
        return 0
    else
        return 1
    fi
}

# Function to create and start PostgreSQL container
start_postgres() {
    echo -e "${BLUE}🐘 Creating PostgreSQL container...${NC}"
    
    docker run -d \
        --name ${CONTAINER_NAME} \
        -e POSTGRES_DB=${DB_NAME} \
        -e POSTGRES_USER=${DB_USER} \
        -e POSTGRES_PASSWORD=${DB_PASSWORD} \
        -p ${DB_PORT}:5432 \
        -v learn-to-scode-db-data:/var/lib/postgresql/data \
        postgres:15-alpine
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ PostgreSQL container created successfully${NC}"
    else
        echo -e "${RED}❌ Failed to create PostgreSQL container${NC}"
        exit 1
    fi
}

# Function to wait for PostgreSQL to be ready
wait_for_postgres() {
    echo -e "${BLUE}⏳ Waiting for PostgreSQL to be ready...${NC}"
    
    for i in {1..30}; do
        if docker exec ${CONTAINER_NAME} pg_isready -U ${DB_USER} -d ${DB_NAME} > /dev/null 2>&1; then
            echo -e "${GREEN}✅ PostgreSQL is ready!${NC}"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    
    echo -e "${RED}❌ PostgreSQL failed to start within 30 seconds${NC}"
    exit 1
}

# Function to run database migrations
run_migrations() {
    echo -e "${BLUE}🔄 Running database migrations...${NC}"
    
    # Set the DATABASE_URL environment variable for this session
    export DATABASE_URL="${DATABASE_URL}"
    
    if pnpm db:migrate; then
        echo -e "${GREEN}✅ Database migrations completed successfully${NC}"
    else
        echo -e "${RED}❌ Database migrations failed${NC}"
        echo -e "${YELLOW}💡 You can run migrations manually later with: pnpm db:migrate${NC}"
    fi
}

# Function to seed the database
seed_database() {
    echo -e "${BLUE}🌱 Seeding database...${NC}"
    
    # Set the DATABASE_URL environment variable for this session
    export DATABASE_URL="${DATABASE_URL}"
    
    if pnpm db:seed; then
        echo -e "${GREEN}✅ Database seeded successfully${NC}"
    else
        echo -e "${RED}❌ Database seeding failed${NC}"
        echo -e "${YELLOW}💡 You can seed the database manually later with: pnpm db:seed${NC}"
    fi
}

# Function to create .env file
create_env_file() {
    echo -e "${BLUE}📊 Database Connection String:${NC}"
    echo -e "${GREEN}DATABASE_URL=\"${DATABASE_URL}\"${NC}"
    echo ""
    
    if [ ! -f .env ]; then
        echo -e "${BLUE}📝 Creating .env file...${NC}"
        cat > .env << EOF
# Database Configuration
DATABASE_URL="${DATABASE_URL}"

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# GitHub OAuth (optional - for authentication)
# Get these from: https://github.com/settings/developers
# GITHUB_CLIENT_ID=your-github-client-id
# GITHUB_CLIENT_SECRET=your-github-client-secret

# Judge0 API (optional - for code execution)
# JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
# JUDGE0_API_KEY=your-rapidapi-key
EOF
        echo -e "${GREEN}✅ .env file created${NC}"
        echo -e "${BLUE}💡 Remember to update NEXTAUTH_SECRET and add your GitHub OAuth credentials${NC}"
    else
        echo -e "${YELLOW}⚠️  .env already exists${NC}"
        
        # Check if DATABASE_URL exists in the file
        if grep -q "DATABASE_URL.*localhost" .env; then
            echo -e "${GREEN}✅ Local DATABASE_URL found in .env${NC}"
        else
            echo -e "${YELLOW}⚠️  Local DATABASE_URL not found in .env${NC}"
            echo -e "${BLUE}💡 Add this line to your .env for local development:${NC}"
            echo -e "${GREEN}DATABASE_URL=\"${DATABASE_URL}\"${NC}"
            echo -e "${BLUE}💡 You can comment out your production DATABASE_URL or use a different name${NC}"
        fi
    fi
}

# Function to display connection info
display_connection_info() {
    echo -e "${BLUE}📊 Database Connection Information${NC}"
    echo -e "${BLUE}==================================${NC}"
    echo -e "${GREEN}Database URL: ${DATABASE_URL}${NC}"
    echo -e "${GREEN}Host: localhost${NC}"
    echo -e "${GREEN}Port: ${DB_PORT}${NC}"
    echo -e "${GREEN}Database: ${DB_NAME}${NC}"
    echo -e "${GREEN}Username: ${DB_USER}${NC}"
    echo -e "${GREEN}Password: ${DB_PASSWORD}${NC}"
    echo -e "${GREEN}Container: ${CONTAINER_NAME}${NC}"
    echo ""
    echo -e "${BLUE}🔧 Useful Commands:${NC}"
    echo -e "${YELLOW}  Stop database:    docker stop ${CONTAINER_NAME}${NC}"
    echo -e "${YELLOW}  Start database:   docker start ${CONTAINER_NAME}${NC}"
    echo -e "${YELLOW}  Remove database:  docker rm -f ${CONTAINER_NAME}${NC}"
    echo -e "${YELLOW}  Connect to DB:    docker exec -it ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME}${NC}"
    echo -e "${YELLOW}  View logs:        docker logs ${CONTAINER_NAME}${NC}"
    echo -e "${YELLOW}  Run migrations:   pnpm db:migrate${NC}"
    echo -e "${YELLOW}  Seed database:    pnpm db:seed${NC}"
    echo -e "${YELLOW}  Open DB studio:   pnpm db:studio${NC}"
}

# Main execution
main() {
    check_docker
    
    if check_container; then
        echo -e "${GREEN}✅ Database container is running${NC}"
    else
        start_postgres
        wait_for_postgres
    fi
    
    create_env_file
    
    # Ask user if they want to run migrations and seeding
    echo ""
    read -p "$(echo -e ${BLUE}🔄 Run database migrations? [Y/n]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        run_migrations
    fi
    
    echo ""
    read -p "$(echo -e ${BLUE}🌱 Seed the database? [Y/n]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        seed_database
    fi
    
    echo ""
    display_connection_info
    
    echo ""
    echo -e "${GREEN}🎉 Database setup complete! Your PostgreSQL database is ready to use.${NC}"
}

# Run main function
main 