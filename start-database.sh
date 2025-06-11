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

# Function to create .env.local file
create_env_file() {
    if [ ! -f .env.local ]; then
        echo -e "${BLUE}📝 Creating .env.local file...${NC}"
        cat > .env.local << EOF
# Database
DATABASE_URL="${DATABASE_URL}"

# Add your other environment variables here
# NEXTAUTH_SECRET=your-secret-here
# NEXTAUTH_URL=http://localhost:3000
# GITHUB_CLIENT_ID=your-github-client-id
# GITHUB_CLIENT_SECRET=your-github-client-secret
EOF
        echo -e "${GREEN}✅ .env.local file created${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.local already exists, skipping creation${NC}"
        echo -e "${BLUE}💡 Make sure your .env.local contains: DATABASE_URL=\"${DATABASE_URL}\"${NC}"
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