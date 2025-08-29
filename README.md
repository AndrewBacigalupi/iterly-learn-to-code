# 🚀 Iterly: Learn to Code

**A modern coding education platform built with Next.js, featuring interactive puzzles, coding problems, and real-time code execution.**

Perfect for computer science students, coding bootcamp participants, and anyone looking to improve their programming skills through hands-on practice.

---

## 📚 Table of Contents

- [🎯 What is Iterly?](#-what-is-iterly)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [🐳 Database Setup](#-database-setup)
- [🔧 Development](#-development)
- [🤝 Contributing](#-contributing)
- [📖 Learning Resources](#-learning-resources)
- [🆘 Troubleshooting](#-troubleshooting)

---

## 🎯 What is Iterly?

Iterly is an interactive coding platform designed to help students learn programming through:

- **🧩 Coding Puzzles**: Logic-based challenges that teach problem-solving
- **📊 Progress Tracking**: Monitor your learning journey with detailed statistics
- **👥 Community Features**: Submit your own problems and puzzles for others to solve

## ✨ Features

### For Students
- 🎮 **Interactive Learning**: Solve puzzles with instant feedback
- 📈 **Progress Tracking**: See your improvement over time with detailed stats
- 📱 **Responsive Design**: Learn on any device - desktop, tablet, or mobile

### For Contributors
- ✍️ **Content Creation**: Submit your own coding problems and puzzles
- 👨‍💼 **Admin Dashboard**: Review and manage community submissions
- 🔍 **Quality Control**: Built-in review system for maintaining content quality

### Technical Features
- ⚡ **Fast Performance**: Built with Next.js 15 and React 19
- 🔐 **Secure Authentication**: GitHub OAuth integration
- 🗄️ **Robust Database**: PostgreSQL with Drizzle ORM
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS and shadcn/ui
- 🐳 **Easy Setup**: One-command database setup with Docker

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components

### Backend & Database
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database toolkit
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js

### Development Tools
- **[Docker](https://www.docker.com/)** - Containerization for easy database setup
- **[npm](https://www.npmjs.com/)/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and formatting

---

## 📋 Prerequisites

Before you start, make sure you have these installed on your computer:

### Required Software

1. **Node.js (v18 or higher)**
   - Download from [nodejs.org](https://nodejs.org/)
   - Check installation: `node --version`
   - 📖 [Learn more about Node.js](https://nodejs.org/en/learn/)

2. **npm (Package Manager)**
   - Install: `npm install -g pnpm`
   - Check installation: `npm --version`
   - 📖 [Why npm?](https://www.npmjs.com/))

3. **Git (Version Control)**
   - Download from [git-scm.com](https://git-scm.com/)
   - Check installation: `git --version`
   - 📖 [Git Tutorial for Beginners](https://www.atlassian.com/git/tutorials)

4. **Docker (For Database)**
   - Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - Check installation: `docker --version`
   - 📖 [What is Docker?](https://docs.docker.com/get-started/overview/)

### Optional but Recommended

5. **VS Code (Code Editor)**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Recommended extensions:
     - ES7+ React/Redux/React-Native snippets
     - Tailwind CSS IntelliSense
     - TypeScript Importer
     - GitLens

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/iterly-learn-to-code.git

# Or using SSH (if you have SSH keys set up)
git clone git@github.com:yourusername/iterly-learn-to-code.git

# Navigate to the project directory
cd iterly-learn-to-code
```

> 📖 **New to Git?** Check out [GitHub's Git Tutorial](https://try.github.io/)

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install
```

This will install all the packages listed in `package.json`. It might take a few minutes the first time.

### 3. Set Up the Database

We use Docker to run PostgreSQL locally. This is much easier than installing PostgreSQL directly!

```bash
# Make the database script executable and run it
chmod +x start-database.sh
./start-database.sh
```

This script will:
- 🐳 Create a Docker PostgreSQL container
- 📊 Set up the database schema (tables, relationships)
- 🌱 Add sample data (puzzles to try)
- 📝 Create your `.env` file with database connection info

> 📖 **New to Docker?** Read [Docker's Getting Started Guide](https://docs.docker.com/get-started/)

### 4. Configure Environment Variables (Optional)

The database script creates a `.env` file with basic configuration. You may want to customize it:

```bash
# Edit the .env file to add GitHub OAuth
nano .env  # or use your preferred editor
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app! 🎉

---

## 🐳 Database Setup (Detailed)

### Understanding Docker

Docker is like a virtual machine, but lighter. It lets us run PostgreSQL in a "container" without installing it directly on your computer. Think of it as a box that contains everything needed to run PostgreSQL.

### What the Database Script Does

The `start-database.sh` script automates several steps:

1. **Checks Docker**: Makes sure Docker is running
2. **Creates Container**: Sets up PostgreSQL in a Docker container
3. **Waits for Ready**: Ensures the database is fully started
4. **Runs Migrations**: Creates all the tables and relationships
5. **Seeds Data**: Adds sample puzzles and problems
6. **Creates Config**: Sets up your `.env` file

### Manual Database Commands

If you need to manage the database manually:

```bash
# Start the database container
docker start iterly-learn-to-code-db

# Stop the database container
docker stop iterly-learn-to-code-db

# View database logs
docker logs iterly-learn-to-code-db

# Connect to the database directly
docker exec -it iterly-learn-to-code-db psql -U postgres -d iterly-learn-to-code

# Run migrations manually
npm db:migrate

# Seed the database manually
npm db:seed

# Open database studio (visual interface)
npm db:studio
```

### Database Schema Overview

Our database has several main tables:

- **`users`** - User accounts and profiles
- **`puzzles`** - Logic puzzles and brain teasers
- **`puzzleSubmissions`** - User solutions to puzzles
- **`accounts`** - OAuth account connections (GitHub)
- **`sessions`** - User login sessions

### Database with Drizzle ORM

**[Drizzle ORM](https://orm.drizzle.team/)** is a TypeScript-first database toolkit that makes working with databases much easier and safer.

**What is an ORM?**
An Object-Relational Mapping (ORM) tool lets you work with your database using your programming language instead of writing raw SQL. Think of it as a translator between your TypeScript code and your PostgreSQL database.

**Why Drizzle is great:**
- **Type Safety**: Catch database errors at compile time, not runtime
- **Auto-completion**: Your editor knows your database schema
- **Migration Management**: Track and apply database changes safely
- **Performance**: Generates efficient SQL queries
- **Developer Experience**: Write less code, make fewer mistakes

```typescript
// Define schema with full TypeScript support
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Type-safe queries with auto-completion
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, userId));
```

**Working with Drizzle:**

```bash
# Generate migration files when you change schema
npx drizzle-kit generate

# Apply migrations to your database
npx drizzle-kit migrate

# ⚠️ Don't use push in production - it can lose data!
# npx drizzle-kit push  # Only for rapid prototyping
```

### Available Scripts

```bash
# Development
npm dev              # Start development server
npm build            # Build for production
npm start            # Start production server
npm lint             # Check code quality

# Database
npm db:generate      # Generate migration files
npm db:migrate       # Apply migrations to database
npm db:push          # Push schema changes (development)
npm db:studio        # Open database visual interface
npm db:seed          # Add sample data
```

### Environment Variables

Your `.env` file contains all configuration needed for the application:

```bash
# Database Configuration (Required)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/learn_to_scode

# Next.js Authentication (Required)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# GitHub OAuth (Optional - for user authentication)
# Get these from: https://github.com/settings/developers
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

```

#### Why `.env` instead of `.env.local`?

We use `.env` instead of `.env.local` because:
- **Drizzle Kit Compatibility**: Drizzle's migration and studio tools read from `.env` by default
- **Consistent Configuration**: All database tools (migrate, seed, studio) use the same environment
- **Development Simplicity**: One file for all local development configuration

#### Environment Variable Details

**Required Variables:**

- **`DATABASE_URL`**: PostgreSQL connection string for your database
  - Automatically set by `start-database.sh` for local development
  - Format: `postgresql://username:password@host:port/database`

- **`NEXTAUTH_URL`**: Base URL for NextAuth.js authentication
  - Set to `http://localhost:3000` for local development
  - Must match your actual domain in production

- **`NEXTAUTH_SECRET`**: Secret key for JWT token encryption
  - Generate a secure random string (32+ characters)
  - **Critical**: Change this in production!
  - Generate one: `openssl rand -base64 32`

**Optional Variables:**

- **`GITHUB_CLIENT_ID`** & **`GITHUB_CLIENT_SECRET`**: GitHub OAuth credentials
  - Required only if you want GitHub login functionality
  - Create a GitHub OAuth app at [GitHub Developer Settings](https://github.com/settings/developers)
  - Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`

- **`JUDGE0_API_KEY`**: Code execution service
  - Required only for running code in problems/puzzles
  - Sign up at [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
  - Free tier available with rate limits

> ⚠️ **Important**: Never commit `.env` to Git! It contains secrets and is already in `.gitignore`.

---

## 🔧 Development

### Project Structure

```
iterly-learn-to-code/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── problems/          # Coding problems pages
│   ├── puzzles/           # Puzzle pages
│   └── profile/           # User profile
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions and configurations
│   ├── db/               # Database schema and utilities
│   └── auth.ts           # Authentication configuration
├── public/               # Static assets
└── start-database.sh     # Database setup script
```

### Key Concepts for Beginners

#### Next.js App Router
- **Pages**: Files in the `app/` directory become routes
- **Server Components**: Run on the server, great for data fetching
- **Client Components**: Run in the browser, needed for interactivity
- 📖 [Next.js App Router Tutorial](https://nextjs.org/docs/app)

#### React Server Components vs Client Components
```typescript
// Server Component (default) - runs on server
export default async function ServerPage() {
  const data = await fetchData(); // Can directly access database
  return <div>{data}</div>;
}

// Client Component - runs in browser
"use client";
export default function ClientPage() {
  const [count, setCount] = useState(0); // Can use hooks
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### Database with Drizzle ORM

**[Drizzle ORM](https://orm.drizzle.team/)** is a TypeScript-first database toolkit that makes working with databases much easier and safer.

**What is an ORM?**
An Object-Relational Mapping (ORM) tool lets you work with your database using your programming language instead of writing raw SQL. Think of it as a translator between your TypeScript code and your PostgreSQL database.

**Why Drizzle is great:**
- **Type Safety**: Catch database errors at compile time, not runtime
- **Auto-completion**: Your editor knows your database schema
- **Migration Management**: Track and apply database changes safely
- **Performance**: Generates efficient SQL queries
- **Developer Experience**: Write less code, make fewer mistakes

```typescript
// Define schema with full TypeScript support
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Type-safe queries with auto-completion
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, userId));
```

**Working with Drizzle:**

```bash
# Generate migration files when you change schema
npx drizzle-kit generate

# Apply migrations to your database
npx drizzle-kit migrate

# ⚠️ Don't use push in production - it can lose data!
# npx drizzle-kit push  # Only for rapid prototyping
```

---

## 🤝 Contributing

We love contributions from students and developers of all skill levels!

### Types of Contributions

1. **🐛 Bug Reports**: Found something broken? Let us know!
2. **✨ Feature Requests**: Have an idea? We'd love to hear it!
3. **📝 Code Contributions**: Fix bugs or add features
4. **📚 Documentation**: Help improve our guides and tutorials
5. **🧩 Content**: Submit new coding puzzles

### Getting Started with Contributions

#### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy of the project.

📖 **New to Forking?** Read [GitHub's Fork Guide](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

#### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

#### 3. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

#### 4. Commit Your Changes

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "Add: new feature description"

# Or for bug fixes
git commit -m "Fix: bug description"
```

#### 5. Push and Create Pull Request

```bash
# Push your branch to your fork
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub!

### Code Style Guidelines

- **TypeScript**: Use TypeScript for type safety
- **Components**: Use functional components with hooks
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Explain complex logic and business rules
- **Formatting**: We use Prettier (run `pnpm lint` to check)

### Submitting Content (Problems/Puzzles)

1. **Use the Web Interface**: Go to `/contribute` when logged in
2. **Follow Templates**: Use the provided formats for consistency
3. **Test Thoroughly**: Make sure your test cases are correct
4. **Clear Instructions**: Write clear problem descriptions
5. **Appropriate Difficulty**: Tag difficulty levels accurately

---

## 📖 Learning Resources

### For Beginners

#### Web Development Fundamentals
- 📚 [MDN Web Docs](https://developer.mozilla.org/) - Complete web development reference
- 🎥 [freeCodeCamp](https://www.freecodecamp.org/) - Free coding bootcamp
- 📖 [The Odin Project](https://www.theodinproject.com/) - Full-stack curriculum

#### JavaScript & TypeScript
- 📚 [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Official TypeScript guide
- 🎥 [JavaScript30](https://javascript30.com/) - 30 vanilla JS projects

#### React & Next.js
- 📚 [React Official Tutorial](https://react.dev/learn) - Learn React from scratch
- 📖 [Next.js Learn Course](https://nextjs.org/learn) - Interactive Next.js tutorial

### For Intermediate Developers

#### Database & Backend
- 📚 [PostgreSQL Tutorial](https://www.postgresqltutorial.com/) - Complete PostgreSQL guide
- 📖 [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview) - Type-safe database toolkit

#### DevOps & Deployment
- 📚 [Docker Getting Started](https://docs.docker.com/get-started/) - Containerization basics
- 📖 [Vercel Deployment Guide](https://vercel.com/docs) - Deploy Next.js apps

### Coding Practice Platforms
- 🏆 [LeetCode](https://leetcode.com/) - Algorithmic problems
- 🧩 [HackerRank](https://www.hackerrank.com/) - Programming challenges
- 💻 [Codewars](https://www.codewars.com/) - Coding kata

---

## 🆘 Troubleshooting

### Common Issues

#### Docker Issues

**Problem**: `Docker is not running`
```bash
# Solution: Start Docker Desktop application
# On macOS: Open Docker Desktop from Applications
# On Windows: Start Docker Desktop from Start Menu
```

**Problem**: `Port 5432 already in use`
```bash
# Solution: Stop existing PostgreSQL services
# Check what's using the port
lsof -i :5432
```

#### Database Issues

**Problem**: `Connection refused` or `ECONNREFUSED`
```bash
# Solution: Make sure database container is running
docker ps  # Check if learn-to-scode-db is running
docker start learn-to-scode-db  # Start if stopped
```

**Problem**: `Migration failed`
```bash
# Solution: Reset database and try again
docker rm -f learn-to-scode-db  # Remove container
./start-database.sh  # Run setup script again
```

#### Development Issues

**Problem**: `Module not found` errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

**Problem**: `Environment variables not loading`
```bash
# Solution: Make sure you're using .env (not .env.local)
# Drizzle tools read from .env by default
ls -la .env  # Check if file exists
cat .env     # Verify DATABASE_URL is set
```

### Getting Help

1. **Check the Issues**: Look at GitHub Issues for similar problems
2. **Create an Issue**: If you can't find a solution, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Your operating system and versions
   - Error messages (if any)

---

## 🚀 What's Next?

Ready to start coding? Here's your roadmap:

1. ✅ **Set up the project** (you're here!)
2. 🔍 **Explore the codebase** - Look around, understand the structure
3. 🧩 **Try solving some problems** - Test the platform as a user
4. 🛠️ **Make your first contribution** - Fix a bug or add a small feature
5. 📚 **Keep learning** - Check out the resources above
6. 🤝 **Help others** - Answer questions, review PRs, share knowledge

**Happy coding! 🎉**

---

*Made with ❤️ by students, for students. Let's learn to code together!*
