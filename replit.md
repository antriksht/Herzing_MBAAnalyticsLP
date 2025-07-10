# MBA Business Analytics Landing Page

## Overview

This is a React-based landing page application for Herzing University's MBA in Business Analytics program, specifically targeting international F1 visa students. The application is built with a full-stack architecture using React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom Herzing University brand colors
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful endpoints for lead capture and retrieval
- **Middleware**: JSON parsing, request logging, and error handling
- **Development**: Hot reloading with Vite integration in development mode

### Database & ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Defined in shared directory for frontend/backend consistency
- **Migrations**: Managed through Drizzle Kit
- **Storage**: In-memory fallback storage for development

## Key Components

### Landing Page Sections
1. **Hero Section**: Main value proposition with lead capture form
2. **Benefits Section**: Key advantages for international students (STEM designation, no GMAT/GRE, etc.)
3. **Program Highlights**: Duration, credits, pricing, and start dates
4. **Student Support**: International student services and visa transfer guidance
5. **Curriculum Section**: Course overview and specializations
6. **Certifications Section**: Industry certifications included (CAPM, CBAP, PMP, IIBA-CBDA)
7. **Final CTA**: Call-to-action with contact information

### Lead Capture System
- Form validation using Zod schemas
- Real-time form state management
- Toast notifications for user feedback
- Data persistence to PostgreSQL database
- Admin endpoint for lead retrieval

### UI Components
- Comprehensive shadcn/ui component library
- Responsive design with mobile-first approach
- Accessibility features through Radix UI primitives
- Custom color scheme matching Herzing University branding
- Interactive elements with hover states and animations

## Data Flow

1. **User Interaction**: User fills out lead capture form on landing page
2. **Form Validation**: Client-side validation using Zod schemas
3. **API Request**: Form data sent to `/api/leads` endpoint
4. **Server Processing**: Express server validates and processes lead data
5. **Database Storage**: Lead information stored in PostgreSQL via Drizzle ORM
6. **Response Handling**: Success/error feedback displayed to user via toast notifications
7. **Admin Access**: Leads can be retrieved via `/api/leads` GET endpoint

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Validation**: Zod with Drizzle-Zod integration

### Backend Dependencies
- **Server**: Express.js, TypeScript execution via tsx
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Development**: Vite for frontend integration
- **Build**: esbuild for server bundling

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server with HMR
- **PostCSS**: CSS processing with Tailwind
- **ESLint**: Code quality and consistency (implied by package structure)

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied to PostgreSQL

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution, Vite dev server
- **Production**: Node.js runs bundled server, serves static assets
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build of both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Apply database schema changes

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database compatible)
- Environment variables for database connection
- Static file serving capability for frontend assets

The application is designed to be deployed on platforms like Vercel, Netlify, or traditional cloud providers with minimal configuration required.