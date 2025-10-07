# NuEra - Cognitive Assessment Platform

## Overview

NuEra (New Era of Assessments) is a modern educational technology platform that integrates IoT-based cognitive tracking with traditional learning management systems. The platform enables real-time monitoring of student cognitive states (attention, engagement, stress) through IoT sensors, providing teachers with actionable insights and students with personalized performance analytics.

The application features teacher dashboards for classroom management, student dashboards for personal analytics, live cognitive heatmaps, device integration hubs, and assessment tools with cognitive pacing indicators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR support
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture with code splitting

**State Management & Data Fetching:**
- TanStack Query (React Query) for server state management with automatic caching and refetching
- Custom query client with credential-based authentication
- No global state management library (component-level state with hooks)

**UI Component System:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui design system with "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for animations and transitions
- Chart.js for data visualization (line charts, radar charts)

**Design Tokens:**
- Primary color: Indigo (#6366F1) for CTAs and branding
- Semantic colors: Green (optimal), Yellow (moderate load), Red (high stress)
- Educational tech aesthetic with glassmorphism and gradient accents
- WCAG AA compliant color contrast ratios (>4.5:1)
- Inter font family for UI, JetBrains Mono for technical data

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript in ESM module format
- Custom middleware for request logging and error handling
- RESTful API design pattern with `/api` prefix
- Development mode with Vite middleware integration

**Data Persistence:**
- In-memory storage implementation (MemStorage class) for development
- Drizzle ORM configured for PostgreSQL (production-ready schema defined)
- Schema supports: users, students, classrooms, assessments, cognitive data, devices
- UUID-based primary keys with server-side generation

**API Structure:**
- CRUD operations for students (`/api/students`, bulk creation supported)
- Assessment management (`/api/assessments`)
- Assessment results tracking (`/api/assessments/:id/results/:studentId`)
- Zod schema validation for all incoming data
- Centralized error handling with status codes and JSON responses

### Key Architectural Decisions

**Monorepo Structure:**
- **Problem:** Need to share TypeScript types and schemas between client and server
- **Solution:** Shared `/shared` directory for common schemas and types
- **Benefit:** Single source of truth, type safety across full stack

**Database Abstraction:**
- **Problem:** Need flexibility to switch between development and production databases
- **Solution:** IStorage interface with pluggable implementations (MemStorage for dev, future DrizzleStorage for production)
- **Benefit:** Easy testing, environment-specific backends without code changes

**Component Architecture:**
- **Problem:** Need reusable, consistent UI components across complex dashboards
- **Solution:** Atomic design with shadcn/ui base components extended with custom logic (StatsCard, HeatmapCell, DeviceCard, etc.)
- **Benefit:** Rapid development, visual consistency, easy maintenance

**Real-time Cognitive State:**
- **Problem:** Need to represent and update student cognitive states dynamically
- **Solution:** Color-coded state system (green/yellow/red) with live metrics (attention, engagement, stress as 0-1 values)
- **Design Note:** WebSocket integration prepared but not yet implemented (current polling via React Query)

**Form Handling:**
- **Problem:** Complex form validation for student/assessment creation
- **Solution:** React Hook Form with Zod resolver for schema-based validation
- **Benefit:** Type-safe forms, automatic error handling, consistent validation logic

## External Dependencies

### Core Libraries
- **React & React DOM (^18.x):** UI framework
- **Express (^4.x):** Backend server framework
- **TypeScript (^5.x):** Type system for full stack
- **Vite (^6.x):** Frontend build tool and dev server

### Database & ORM
- **Drizzle ORM (^0.39):** SQL query builder and schema definition
- **@neondatabase/serverless (^0.10):** Neon PostgreSQL serverless driver
- **drizzle-zod (^0.7):** Zod schema generation from Drizzle schemas
- **connect-pg-simple (^10.x):** PostgreSQL session store (prepared for authentication)

### UI & Styling
- **Tailwind CSS (^3.x):** Utility-first CSS framework
- **Radix UI Components:** Accessible component primitives (accordion, dialog, dropdown, etc.)
- **Framer Motion (^11.x):** Animation library
- **Chart.js (^4.5):** Data visualization
- **lucide-react:** Icon library
- **class-variance-authority:** Type-safe variant styling
- **tailwind-merge & clsx:** Conditional class merging

### Data Management
- **@tanstack/react-query (^5.60):** Server state management
- **React Hook Form (^7.x):** Form state and validation
- **@hookform/resolvers (^3.10):** Zod integration for forms
- **Zod (^3.x):** Schema validation

### Date & Time
- **date-fns (^3.6):** Date formatting and manipulation

### Development Tools
- **tsx:** TypeScript execution for development
- **esbuild:** Production bundler for server code
- **@replit/vite-plugin-*:** Replit-specific development enhancements
- **drizzle-kit:** Database migrations and schema management

### Planned Integrations
- **WebSocket:** Real-time cognitive data streaming (server infrastructure prepared)
- **Authentication:** Session-based auth with PostgreSQL store (schema ready, implementation pending)
- **IoT Device APIs:** Cognitive sensor data ingestion endpoints (schema defined)