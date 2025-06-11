# Learn to Scode

A modern platform for learning programming through hands-on puzzles and coding challenges. Built with Next.js, TypeScript, and powered by Judge0 for real-time code execution.

## Features

- **Programming Puzzles**: Advent of Code style challenges that test your problem-solving skills
- **Interactive Problems**: LeetCode-style coding problems with real-time execution and testing
- **Multi-language Support**: Write solutions in JavaScript, Python, Java, C++, and more
- **Progress Tracking**: Sign in to save your solutions and track your learning journey
- **Modern UI**: Clean, responsive design built with shadcn/ui components
- **Real-time Execution**: Powered by Judge0 API for instant code feedback

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Auth.js (NextAuth.js v5)
- **Code Execution**: Judge0 API
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ (Note: Neon requires Node.js 19+, but the app will work with warnings)
- pnpm (preferred package manager)
- A Neon PostgreSQL database
- (Optional) GitHub OAuth app for authentication
- (Optional) Judge0 API key for code execution

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/learn-to-scode.git
   cd learn-to-scode
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_neon_database_url_here"

   # Auth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret_here"

   # OAuth Providers (optional)
   GITHUB_CLIENT_ID="your_github_client_id"
   GITHUB_CLIENT_SECRET="your_github_client_secret"

   # Judge0 API (optional)
   JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
   JUDGE0_API_KEY="your_rapidapi_key_here"
   ```

4. **Set up the database**
   ```bash
   # Generate migration files
   pnpm db:generate

   # Push schema to database
   pnpm db:push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Neon PostgreSQL

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project and database
3. Copy the connection string to your `.env.local` file
4. Run the database commands above to set up the schema

### Local PostgreSQL (Alternative)

If you prefer to use a local PostgreSQL database:

1. Install PostgreSQL locally
2. Create a database for the project
3. Update the `DATABASE_URL` in your `.env.local` file
4. Run the database setup commands

## Authentication Setup

### GitHub OAuth (Recommended)

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env.local` file

### Other Providers

Auth.js supports many providers. Check the [Auth.js documentation](https://authjs.dev/getting-started/providers) to add more.

## Judge0 Setup (Optional)

For code execution features:

1. Sign up for a free account at [RapidAPI](https://rapidapi.com)
2. Subscribe to the Judge0 CE API (free tier available)
3. Copy your API key to the `.env.local` file

Without Judge0, the problems section will still work but won't execute code.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── contribute/        # Contribute page
│   ├── problems/          # Coding problems
│   ├── profile/           # User profile (auth required)
│   ├── puzzles/           # Programming puzzles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   └── providers.tsx     # Context providers
├── lib/                   # Utility libraries
│   ├── db/               # Database configuration
│   ├── auth.ts           # Authentication config
│   └── judge0.ts         # Judge0 service
└── drizzle.config.ts     # Drizzle ORM config
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:seed` - Seed database with sample problems

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🧩 Create new puzzles and problems
- 💻 Improve code and documentation
- 🎨 Enhance UI/UX design

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

- 📖 [Documentation](https://github.com/your-username/learn-to-scode/wiki)
- 💬 [Discussions](https://github.com/your-username/learn-to-scode/discussions)
- 🐛 [Issues](https://github.com/your-username/learn-to-scode/issues)

---

Built with ❤️ by the Learn to Scode community
