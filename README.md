# 🚀 Learn to Scode

**A modern coding education platform built with Next.js, featuring interactive puzzles, coding problems, and real-time code execution.**

Perfect for computer science students, coding bootcamp participants, and anyone looking to improve their programming skills through hands-on practice.

---

## 📚 Table of Contents

- [🎯 What is Learn to Scode?](#-what-is-learn-to-scode)
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

## 🎯 What is Learn to Scode?

Learn to Scode is an interactive coding platform designed to help students learn programming through:

- **🧩 Coding Puzzles**: Logic-based challenges that teach problem-solving
- **💻 Programming Problems**: LeetCode-style algorithmic challenges
- **🏃‍♂️ Real-time Execution**: Test your code instantly with multiple programming languages
- **📊 Progress Tracking**: Monitor your learning journey with detailed statistics
- **👥 Community Features**: Submit your own problems and puzzles for others to solve

---

## ✨ Features

### For Students
- 🎮 **Interactive Learning**: Solve puzzles and problems with instant feedback
- 📈 **Progress Tracking**: See your improvement over time with detailed stats
- 🏆 **Achievement System**: Track your coding streaks and favorite languages
- 🔄 **Multiple Languages**: Support for Python, JavaScript, Java, C++, and more
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
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and formatting

---

## 📋 Prerequisites

Before you start, make sure you have these installed on your computer:

### Required Software

1. **Node.js (v18 or higher)**
   - Download from [nodejs.org](https://nodejs.org/)
   - Check installation: `node --version`
   - 📖 [Learn more about Node.js](https://nodejs.org/en/learn/)

2. **pnpm (Package Manager)**
   - Install: `npm install -g pnpm`
   - Check installation: `pnpm --version`
   - 📖 [Why pnpm?](https://pnpm.io/motivation)

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
git clone https://github.com/yourusername/learn-to-scode.git

# Or using SSH (if you have SSH keys set up)
git clone git@github.com:yourusername/learn-to-scode.git

# Navigate to the project directory
cd learn-to-scode
```

> 📖 **New to Git?** Check out [GitHub's Git Tutorial](https://try.github.io/)

### 2. Install Dependencies

```bash
# Install all project dependencies
pnpm install
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
- 🌱 Add sample data (puzzles and problems to try)
- 📝 Create your `.env.local` file with database connection info

> 📖 **New to Docker?** Read [Docker's Getting Started Guide](https://docs.docker.com/get-started/)

### 4. Start the Development Server

```bash
pnpm dev
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
6. **Creates Config**: Sets up your `.env.local` file

### Manual Database Commands

If you need to manage the database manually:

```bash
# Start the database container
docker start learn-to-scode-db

# Stop the database container
docker stop learn-to-scode-db

# View database logs
docker logs learn-to-scode-db

# Connect to the database directly
docker exec -it learn-to-scode-db psql -U postgres -d learn_to_scode

# Run migrations manually
pnpm db:migrate

# Seed the database manually
pnpm db:seed

# Open database studio (visual interface)
pnpm db:studio
```

### Database Schema Overview

Our database has several main tables:

- **`users`** - User accounts and profiles
- **`problems`** - Coding problems (like LeetCode)
- **`puzzles`** - Logic puzzles and brain teasers
- **`problemSubmissions`** - User solutions to problems
- **`puzzleSubmissions`** - User solutions to puzzles
- **`accounts`** - OAuth account connections (GitHub)
- **`sessions`** - User login sessions

---

## 🔧 Development

### Project Structure

```
learn-to-scode/
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
```typescript
// Define schema
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
});

// Query database
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, userId));
```

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Check code quality

# Database
pnpm db:generate      # Generate migration files
pnpm db:migrate       # Apply migrations to database
pnpm db:push          # Push schema changes (development)
pnpm db:studio        # Open database visual interface
pnpm db:seed          # Add sample data
```

### Environment Variables

Your `.env.local` file contains sensitive configuration:

```bash
# Database - automatically set by start-database.sh
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/learn_to_scode

# Authentication - required for login
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# GitHub OAuth - optional, for GitHub login
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

> ⚠️ **Important**: Never commit `.env.local` to Git! It contains secrets.

---

## 🤝 Contributing

We love contributions from students and developers of all skill levels!

### Types of Contributions

1. **🐛 Bug Reports**: Found something broken? Let us know!
2. **✨ Feature Requests**: Have an idea? We'd love to hear it!
3. **📝 Code Contributions**: Fix bugs or add features
4. **📚 Documentation**: Help improve our guides and tutorials
5. **🧩 Content**: Submit new coding problems or puzzles

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
