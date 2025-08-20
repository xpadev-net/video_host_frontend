# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Japanese home media server frontend** built with Next.js - a video hosting platform for personal/home use that allows users to upload, organize, and stream video content with features like series organization, user authentication, and Niconico-style overlay comments.

## Development Commands

**Setup:**
```bash
pnpm install
```

**Development:**
```bash
pnpm run dev          # Start development server
```

**Build & Production:**
```bash
pnpm run build        # Build for production
pnpm start           # Start production server
```

**Code Quality:**
```bash
pnpm run lint         # Run ESLint
pnpm run check-types  # TypeScript type checking
pnpm run format       # Format with Prettier
pnpm run lint:fix     # Fix linting, formatting, and type issues
```

## Architecture

### Technology Stack
- **Framework**: Next.js 14.2.23 with React 18.3.1
- **Language**: TypeScript with strict mode and `@/*` path aliases
- **Styling**: Tailwind CSS (preferred) + Radix UI themes. Use Tailwind for all new components instead of CSS modules
- **State Management**: Jotai (atomic state management)
- **Data Fetching**: SWR + Axios
- **Video Playback**: HLS.js for HTTP Live Streaming
- **Comments**: `@xpadev-net/niconicomments` for Niconico-style overlay comments

### Key Directories
```
src/
├── @types/           # TypeScript API type definitions (v4Api.ts)
├── atoms/            # Jotai state atoms for global state
├── components/       # React components organized by feature
├── contexts/         # Environment configuration (env.ts)
├── hooks/            # Custom hooks (useMovies.ts for content fetching)
├── pages/            # Next.js file-based routing
├── service/          # API service functions
└── libraries/        # Utility libraries and API client (requests.ts)
```

### Core Features
- **Video Management**: Movie/series organization with HLS streaming
- **Dual Player Architecture**: Separate desktop/mobile video player implementations
- **User System**: Authentication with JWT, user profiles, content ownership
- **Comment System**: Niconico-style overlay comments with toggle support
- **Responsive Design**: Mobile-first with separate mobile/desktop components

### API Integration
Communicates with a REST API (v4) for authentication, content management, user management, and search. API types are defined in `src/@types/v4Api.ts`.

### Environment Variables
```bash
NEXT_PUBLIC_API_ENDPOINT        # Backend API URL
NEXT_PUBLIC_SITE_NAME          # Site branding
NEXT_PUBLIC_ENABLE_COMMENTS    # Toggle comment system
NEXT_PUBLIC_ALLOWED_IMAGE_HOSTNAME # Image CDN configuration
```

### State Management Pattern
Uses Jotai atoms for global state management. State is organized in `src/atoms/` with atomic updates and reactive components.

### Component Architecture
- Well-organized component hierarchy with feature-based organization
- Mobile/desktop component variations for responsive design
- Custom hooks abstract data fetching logic
- TypeScript definitions ensure type safety across API boundaries

### Styling Guidelines
- **Primary**: Use Tailwind CSS for all new components and styling
- **Legacy**: Existing SCSS modules are maintained but should be converted to Tailwind when modified
- **Avoid**: Do not create new CSS modules or SCSS files
- **Components**: Prefer utility-first approach with Tailwind classes