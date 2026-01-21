# AGENT Development Guidelines

This document serves as the primary guidance for any AI agent working on the Bangsamoro Scholarship Portal. It defines the "Frontend-First" development lifecycle and the source of truth for architectural and design decisions.

## 1. Development Philosophy: Frontend-First

Development must proceed in two distinct phases to ensure visual and interactive excellence before technical complexity is introduced.

### Phase 1: Interactive Prototype (Frontend Only)
*   **Goal:** Build a high-fidelity, interactive version of each page.
*   **Input:** Use the wireframes and specifications found in `docs/UI-UX/Pages/`.
*   **Data Handling:** Always use **local mock data** (defined in component files or a dedicated mock data file). Do NOT attempt to connect to the backend during this phase.
*   **Aesthetics:** Prioritize "Wow" factor. High-impact visuals, smooth animations, and responsive layouts are mandatory. Use the established **Light Theme** with **Emerald Green and Gold** accents (derived from the official logo).
*   **Approval:** Each page must be approved by the USER before its frontend implementation is considered complete.

### Phase 2: Data Integration (Backend Connection)
*   **Goal:** Replace mock data with real API data from the Django REST Framework backend.
*   **Timing:** Only proceed to this phase after the frontend for the relevant module has been fully approved.
*   **Implementation:** Follow the data structures defined in `docs/architecture/Software-Architecture.md`.
*   **Source of Truth:** Data must be served via the Django REST Framework endpoints.

## 2. Source of Truth Documentation

Agents must strictly adhere to the following documentation:

1.  **Architecture & Requirements:**
    *   [`Software-Architecture.md`](docs/architecture/Software-Architecture.md): Defines the system stack, database schema, API patterns, and multi-tenant architecture.
    *   [`Software-Requirements.md`](docs/architecture/Software-Requirements.md): Defines the functional (FR) and non-functional (NFR) requirements.
    *   [`Users.md`](docs/architecture/Users.md): Defines user types, roles, and permissions.

2.  **UI & Design:**
    *   [`UI-UX/Pages/`](docs/UI-UX/Pages/): Contains wireframes, routing information, and component-specific requirements for every page.
        *   `Public.md` - Public-facing pages (Landing, Directory, etc.)
        *   `Authentication.md` - Login, registration, and auth flows
        *   `Applicant-Portal.md` - Applicant dashboard and features

## 3. Workflow for New Pages

When the USER requests a new page from the `docs/UI-UX/Pages/` directory:

1.  **Audit:** Read the corresponding `.md` file in `docs/UI-UX/Pages/` and check its linked requirements in `Software-Requirements.md`.
2.  **Mock Data:** Create or update mock data constants to include content for the new page.
3.  **Components:** Build the necessary React components in `/components/` using the specified aesthetics and the established design system (Light Theme, Emerald/Gold).
4.  **Types:** Update `/types` with any new TypeScript interfaces required.
5.  **Route:** Register the new page in schema-based routes or Next.js App Router structure.
6.  **Verify:** Run `npm run build` and notify the USER for visual review.

## 4. Technology Stack

### Frontend (Current)
*   **Framework:** Next.js 16.1.4 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + shadcn/ui
*   **Icons:** Lucide React (No Emojis)
*   **Animation:** Framer Motion
*   **AI Integration:** Google Gemini API (`@google/genai`)

### Backend (Planned)
*   **Framework:** Django 6 + Django REST Framework
*   **Database:** PostgreSQL with pgvector extension
*   **Cache/Queue:** Redis + Celery
*   **Real-time:** Django Channels (WebSocket)
*   **Authentication:** Django Allauth
*   **Deployment:** Railway

## 5. Coding Standards

### General
*   **File Length:** Keep files under ~1000 lines. Split into smaller components if necessary.
*   **No Purple Colors:** Never use purple in the UI design.
*   **Icons over Emojis:** Use icon libraries (Lucide, Heroicons) instead of emojis.
*   **TypeScript:** All frontend code must be properly typed.

### Frontend
*   Use functional components with React hooks.
*   Implement smooth animations for enhanced UX.
*   Ensure all pages are fully responsive (mobile-first).
*   Follow the established **Light Theme** with **Emerald Green and Gold** accent colors.

### Backend (When Implemented)
*   Django REST Framework for all API endpoints.
*   Auto-run migrations on deployment (Railway cannot run manual commands).
*   Django superusers must have full system access.

## 6. Project Structure

```
/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (public)/          # Public pages (Landing, Directory)
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Applicant/Scholar dashboard
│   │   ├── [tenant]/          # Tenant-specific routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── features/          # Feature-specific components
│   │   ├── layouts/           # Headers, Footers, Sidebars
│   │   └── shared/            # Reusable shared components
│   ├── lib/                   # Utilities and mock data
│   │   └── mock-data.ts
│   ├── styles/                # Global styles
│   │   └── globals.css
│   └── types/                 # TypeScript type definitions
└── docs/                      # Documentation (gitignored)
    ├── architecture/
    └── UI-UX/Pages/
```

## 7. Git & Deployment Rules

*   **No Auto-Commit:** Never commit without explicit user permission.
*   **No AI Attribution:** Never include "Co-Authored-By" or AI mentions in commits.
*   **No Auto-Push:** Never push to remote without explicit instruction.
*   **No Deletions:** Do not delete files/code without user approval.
*   **Docs Gitignored:** All documentation in `docs/` is gitignored.

## 8. Key Constraints

*   **Railway Limitations:** Cannot run manual commands on Railway (Southeast Asia region restriction). All migrations and setup must be automatic on deploy.
*   **Frontend-First:** Always build and approve frontend before backend integration.
*   **Long-term Solutions:** No shortcuts in debugging. Implement proper, long-term fixes.
*   **Parallel Development:** Use parallel agents for independent tasks when possible.

## 9. Core Modules (Three Pillars)

1.  **Matchmaking** - Scholarship discovery, eligibility checking, and application
2.  **Community** - Scholar networking and peer support
3.  **Support Services** - LMS, mentorship, and resources

## 10. User Roles Hierarchy

1.  **Super Admin** - Full system access (Django superuser)
2.  **Entity Admin** - Manages scholarship-granting entity
3.  **Staff/Evaluator** - Reviews and processes applications
4.  **Scholar** - Active scholarship recipient
5.  **Applicant** - Registered user applying for scholarships
6.  **Guest** - Unauthenticated visitor
