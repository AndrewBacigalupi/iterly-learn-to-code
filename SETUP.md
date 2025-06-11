# Quick Setup Guide

## For Testing the Application

Since you now have database-driven problems and Judge0 integration, here's how to get everything working:

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Database (Required)
DATABASE_URL="your_neon_database_url_here"

# Auth.js (Required for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_random_secret_here"

# GitHub OAuth (Optional - for sign in)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Judge0 API (Optional - for code execution)
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JUDGE0_API_KEY="your_rapidapi_key_here"
```

### 2. Database Setup

```bash
# Push the schema to your database
pnpm db:push

# Seed the database with problems
pnpm db:seed
```

### 3. Run the App

```bash
pnpm dev
```

## What Works Now

### ✅ **Database Integration**
- Problems are stored in and fetched from the database
- User submissions are tracked
- Progress tracking works for authenticated users

### ✅ **Individual Problem Pages**
- Full LeetCode-style interface at `/problems/[id]`
- Language selection (JavaScript, Python, Java, C++)
- Code editor with starter code
- Test case display
- Run and Submit functionality

### ✅ **Judge0 Integration**
- Code execution and testing
- Real-time feedback
- Submission status tracking

### ✅ **Authentication Flow**
- Sign in to track progress
- Save solutions to database
- User-specific stats and progress

## Testing Without External Services

The app will work even without:
- **Judge0 API**: Code won't execute, but the interface works
- **GitHub OAuth**: Users can browse without signing in
- **Database**: You'll see errors, but can test the UI

## Next Steps

1. **Set up Neon database** - Get a free account at [neon.tech](https://neon.tech)
2. **Configure GitHub OAuth** - For user authentication
3. **Add Judge0 API** - For code execution (optional) 