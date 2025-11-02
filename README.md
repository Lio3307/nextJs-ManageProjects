# ProjectHub

ProjectHub is a modern project management application built with Next.js 15, TypeScript, and Prisma. It provides a comprehensive platform for organizing projects, managing tasks, collaborating with team members, and tracking progress.

## Why ProjectHub?

As a developer, I faced challenges keeping track of multiple projects, tasks, and reports. I needed a simple yet powerful solution to:

- Organize my projects in one central place
- Keep track of what tasks I need to do
- Document problems I encounter in tasks and how I solve them
- Collaborate with team members effectively
- Have a clear overview of project progress

Existing tools were either too complex or lacked the specific features I needed. So I built ProjectHub to solve these exact problems - a focused project management tool that helps me stay organized and productive.

## Features

- **User Authentication**: Secure sign-up and login with email/password or Google OAuth
- **Project Management**: Create, organize, and manage multiple projects
- **Task Tracking**: Create and assign tasks within projects
- **Problem Reporting**: Document issues encountered in tasks
- **Solution Tracking**: Record how problems were solved in task comments
- **Team Collaboration**: Invite members to projects and collaborate
- **Reporting System**: Generate reports on project progress and task completion
- **Commenting System**: Discuss tasks and reports with team members
- **Public Projects**: Share projects with the community
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **UI Components**: Radix UI, Lucide React icons
- **Rich Text Editor**: Tiptap
- **Validation**: Zod, React Hook Form

## Data Model

The application uses a comprehensive data model with the following entities:

- **User**: Registered users with authentication details
- **Project**: Container for tasks with visibility settings
- **Task**: Individual work items assigned to projects
- **Report**: Progress reports for tasks
- **Comment**: Discussion threads on reports
- **ReplyComment**: Replies to comments
- **MemberList**: Project members information
- **RequestJoin**: Pending join requests for projects
- **JoinStatus**: Status of user join requests

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (for social login)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lio3307/nextJs-ProjectHub
cd nextJs-ProjectHub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file based on `.env.example`:
```env
DATABASE_URL=your_postgresql_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

The project follows a standard Next.js 15 App Router structure with additional organization for better maintainability:

```
src/
├── app/                    # Next.js app router pages and layouts
│   ├── (auth)/            # Authentication pages (login, signup)
│   │   ├── login/         # Login page with email/password and Google OAuth
│   │   └── signup/        # User registration page
│   ├── dashboard/         # Main dashboard application
│   │   ├── page.tsx       # Dashboard overview page
│   │   ├── project/       # Project-specific pages
│   │   │   └── [idProject]/ # Dynamic routes for individual projects
│   │   ├── project-list/  # List of user's projects
│   │   ├── join-project/  # Join project functionality
│   │   ├── join-status/   # Join request status tracking
│   │   └── report/        # Report viewing and management
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components (buttons, cards, etc.)
│   ├── home-components/   # Landing page components
│   └── dashboard-components/ # Dashboard-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
│   └── auth/              # Authentication utilities
└── styles/                # Global styles and Tailwind configuration
prisma/
├── schema.prisma          # Database schema definition
└── migrations/            # Database migration files
public/                    # Static assets (images, icons, etc.)
```

Key directories explained:
- `src/app/`: Contains all pages and layouts using Next.js App Router
- `src/components/`: Reusable UI components organized by purpose
- `src/components/ui/`: shadcn/ui components with Radix UI foundation
- `src/components/home-components/`: Components for the landing page
- `src/components/dashboard-components/`: Components specific to the dashboard
- `src/lib/`: Utility functions, authentication helpers, and configurations
- `prisma/`: Database schema and migrations using Prisma ORM

## Authentication Flow

The application uses Better Auth for authentication with the following features:
- Email/password authentication
- Google OAuth integration
- Session management with secure cookies
- Protected routes for dashboard pages

## Database and Realtime Updates

**Important**: This application uses a traditional database approach with PostgreSQL and Prisma ORM. Data is not updated in realtime using WebSockets or similar technologies.

- **Data Fetching**: Data is fetched from the database on page load and through manual refresh
- **No Automatic Updates**: Changes made by other users will not automatically appear in your browser
- **Manual Refresh Required**: Users need to manually refresh pages or navigate between routes to see updated data
- **Form Submissions**: Form submissions will update the UI immediately after successful database operations

This approach was chosen for simplicity and to reduce infrastructure complexity. For applications requiring realtime updates, technologies like WebSockets, Server-Sent Events, or solutions like Pusher would need to be implemented.

## Development

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint

### Component Library

The project uses shadcn/ui components which are built on top of Radix UI and styled with Tailwind CSS. Components are located in `src/components/ui`.

## Deployment

The application can be deployed to any platform that supports Next.js applications such as Vercel, Netlify, or a custom Node.js server.

For deployment, ensure you set the required environment variables:
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.