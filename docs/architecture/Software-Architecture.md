# Overview

This document outlines the software architecture for the **Bangsamoro Scholarship Portal (BSP)** at [`scholarships.bangsamoro.site`](http://scholarships.bangsamoro.site). The architecture is designed to support the portal's three pillars (Matchmaking, Community, LMS) and multi-tenant model as defined in the [Software Users](Users.md) document.

---

# Design System: Color Palette

The BSP uses the official colors from the **Bangsamoro Scholars Association** logo:

| Color | Hex Code | Usage |
| --- | --- | --- |
| **Forest Green** | `#1B5E20` | Primary brand color, headers, navigation |
| **Emerald Green** | `#2E7D32` | Buttons, links, accents |
| **Gold** | `#D4A017` | Highlights, success states, badges |
| **Light Gold** | `#F5D061` | Hover states, secondary accents |
| **White** | `#FFFFFF` | Backgrounds, cards |
| **Light Gray** | `#F8FAFC` | Page backgrounds |
| **Slate** | `#1E293B` | Text, dark UI elements (footer) |

---

# High-Level Architecture

## System Context Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL ACTORS                                    │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────────┤
│  Applicants │   Entities  │  Verifiers  │   Admins    │   Public/Guests     │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴──────────┬──────────┘
       │             │             │             │                 │
       └─────────────┴─────────────┴─────────────┴─────────────────┘
                                   │
                          ┌────────▼────────┐
                          │  GoDaddy DNS    │
                          │  (CNAME Record) │
                          └────────┬────────┘
                                   │
                          ┌────────▼────────┐
                          │ Railway Proxy   │
                          │ (SSL, LB, DDoS) │
                          └────────┬────────┘
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       │                           │                           │
┌──────▼──────┐           ┌────────▼────────┐         ┌────────▼────────┐
│  Web App    │           │   API Gateway   │         │  Mobile App     │
│(React+Vite) │           │    (REST API)   │         │  (React Native) │
└─────────────┘           └────────┬────────┘         └─────────────────┘
                                   │
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
          ┌───────▼───────┐  ┌────▼────┐  ┌───────▼───────┐
          │ Django API    │  │  Celery  │  │ Railway Cron  │
          │  (Gunicorn)   │  │ (Worker) │  │(Scheduled Jobs)│
          └───────┬───────┘  └────┬────┘  └───────┬───────┘
                  │                │                │
                  └────────────────┼────────────────┘
                                   │
            ┌────────────┼────────────┐
            │            │            │
     ┌──────▼──────┐   ┌────▼────┐   ┌────▼────┐
     │   pgvector   │   │  Redis   │   │ Buckets  │
     │ (PostgreSQL) │   │ (Cache)  │   │  (S3)    │
     └─────────────┘   └──────────┘   └──────────┘
              │                │
              └──RAILWAY SERVICES──┘
```

---

# Architecture Principles

| Principle | Description |
| --- | --- |
| **Multi-Tenancy** | Single codebase serving multiple scholarship-granting entities with data isolation |
| **Modularity** | Loosely coupled modules aligned with the three pillars |
| **API-First** | Backend exposes RESTful APIs consumed by web and mobile clients |
| **Scalability** | Horizontal scaling through containerization and microservices |
| **Security-First** | Defense in depth with encryption, RBAC, and audit logging |
| **Mobile-First** | Responsive design prioritizing mobile users in BARMM |
| **Offline-Ready** | Progressive Web App (PWA) capabilities for limited connectivity |

---

# UI Theme: Light Mode with Green & Gold Accents

The portal uses a **modern light color scheme** inspired by the Bangsamoro Scholars Association branding:

## Theme Configuration

```css
/* Primary Colors - Derived from BSA Logo */
--color-primary: #1B5E20;        /* Forest Green */
--color-primary-light: #2E7D32;  /* Emerald Green */
--color-accent: #D4A017;         /* Gold */
--color-accent-light: #F5D061;   /* Light Gold */

/* Background Colors */
--color-bg-primary: #FFFFFF;     /* White - Cards, modals */
--color-bg-secondary: #F8FAFC;   /* Light Gray - Page backgrounds */
--color-bg-tertiary: #F1F5F9;    /* Slate 100 - Input backgrounds */

/* Text Colors */
--color-text-primary: #0F172A;   /* Slate 900 - Headings */
--color-text-secondary: #475569; /* Slate 600 - Body text */
--color-text-muted: #94A3B8;     /* Slate 400 - Placeholders */

/* Border Colors */
--color-border: #E2E8F0;         /* Slate 200 */
--color-border-focus: #2E7D32;   /* Green focus ring */

/* Status Colors */
--color-success: #2E7D32;        /* Green - Success states */
--color-warning: #D4A017;        /* Gold - Warnings */
--color-error: #DC2626;          /* Red - Errors */
--color-info: #0284C7;           /* Blue - Information */
```

## Component Styling

| Component | Light Theme Style |
| --- | --- |
| **Header** | White background, green logo, gold accents |
| **Navigation** | White with green active states, gold hover |
| **Buttons (Primary)** | Green background, white text |
| **Buttons (Secondary)** | White background, green border and text |
| **Cards** | White background, subtle shadow, green titles |
| **Footer** | Slate/dark background for contrast |
| **Forms** | Light gray inputs, green focus states |
| **Badges** | Gold background for highlights, green for status |

---

# Multi-Tenant Architecture

## Tenant Model

The BSP uses a **shared database with tenant ID isolation** model for cost-effectiveness while maintaining data security.

```
┌─────────────────────────────────────────────────────────────────┐
│                     SHARED DATABASE                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  MBHTE   │  │   MOST   │  │   MOH    │  │  Future  │        │
│  │ tenant_id│  │ tenant_id│  │ tenant_id│  │  Tenant  │        │
│  │  = 001   │  │  = 002   │  │  = 003   │  │   ...    │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
├─────────────────────────────────────────────────────────────────┤
│  Row-Level Security (RLS) enforces data isolation per tenant   │
└─────────────────────────────────────────────────────────────────┘
```

## Tenant Identification

| Method | Implementation |
| --- | --- |
| **URL Path** | `scholarships.bangsamoro.site/mbhte` |
| **Subdomain** (future) | `mbhte.scholarships.bangsamoro.site` |
| **Tenant ID** | Every database record includes `tenant_id` foreign key |
| **Row-Level Security** | PostgreSQL RLS policies enforce tenant isolation |

---

# Module Architecture

## Core Modules (Three Pillars)

### Module 1: Scholarship Matchmaking

```
┌─────────────────────────────────────────────────────────┐
│                 MATCHMAKING MODULE                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Scholarship │  │ Application │  │   Search &  │     │
│  │  Listings   │  │  Pipeline   │  │  Discovery  │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐     │
│  │  Program    │  │  Workflow   │  │ Recommend-  │     │
│  │  CRUD       │  │  Engine     │  │ ation Engine│     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

**Components:**

- **Scholarship Service** — CRUD for scholarship programs
- **Application Service** — Application submission and tracking
- **Search Service** — PostgreSQL full-text / pgvector-powered search
- **Recommendation Engine** — Gemini embeddings + pgvector (Phase 5)
- **Notification Service** — Deadline reminders, status updates

### Module 2: Scholar Profiles & Community

```
┌─────────────────────────────────────────────────────────┐
│                 COMMUNITY MODULE                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Profile   │  │  Networking │  │    Feed &   │     │
│  │  Management │  │  & Messaging│  │   Groups    │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐     │
│  │  Portfolio  │  │ Connection  │  │  Content    │     │
│  │  Builder    │  │   Graph     │  │  Service    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

**Components:**

- **Profile Service** — User profile CRUD
- **Portfolio Service** — Document/achievement uploads
- **Connection Service** — Social graph management
- **Messaging Service** — Real-time chat (WebSocket)
- **Feed Service** — Activity feed and posts
- **Group Service** — Community management

### Module 3: Scholar Support Services

```
┌─────────────────────────────────────────────────────────┐
│                   SUPPORT MODULE                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │     LMS     │  │  Resources  │  │  Mentorship │     │
│  │   Engine    │  │   Library   │  │   Matching  │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐     │
│  │   Course    │  │   Content   │  │   Pairing   │     │
│  │  Progress   │  │    CMS      │  │  Algorithm  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

**Components:**

- **LMS Service** — Course delivery and tracking
- **Content Service** — Resource management (CMS)
- **Mentorship Service** — Mentor-mentee matching
- **Progress Tracker** — Learning analytics

---

## Entity Management Module (Multi-Tenant)

```
┌─────────────────────────────────────────────────────────┐
│              ENTITY MANAGEMENT MODULE                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Tenant    │  │    Staff    │  │  Branding   │     │
│  │  Onboarding │  │ Management  │  │   Config    │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐     │
│  │   Scholar   │  │  Reporting  │  │  Financial  │     │
│  │  Monitoring │  │  Analytics  │  │   Tracking  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

**Components:**

- **Tenant Service** — Entity registration and configuration (Django app)
- **Auth/Permissions** — Role-based access via Django's auth system + django-guardian
- **Monitoring Service** — Scholar progress tracking (Django app)
- **Finance Service** — Disbursement tracking (Django app)
- **Analytics Service** — Tenant-specific reports (Django app)

---

## Platform Administration Module

```
┌─────────────────────────────────────────────────────────┐
│                ADMIN MODULE (MoroTech)                   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Master    │  │   Content   │  │   Support   │     │
│  │  Dashboard  │  │ Moderation  │  │  Helpdesk   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   System    │  │   Audit     │  │  Partner    │     │
│  │  Monitoring │  │    Logs     │  │   CRM       │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

# Technology Stack

## Recommended Stack

| Layer | Technology | Rationale |
| --- | --- | --- |
| **Frontend** | React + Vite + TypeScript + TanStack Query + Tailwind CSS | Fast build times, SSR-capable, type safety |
| **Mobile** | React Native / Expo + TypeScript | Code sharing with web, type safety, cross-platform |
| **Backend** | Django 6 (Python) | Batteries-included, robust ORM, admin panel, security-first |
| **API** | Django REST Framework + drf-spectacular | RESTful API with auto-generated OpenAPI schema for TypeScript client generation |
| **Database** | pgvector (Railway) | PostgreSQL with vector extension — ACID, RLS, JSON, similarity search |
| **Cache** | Redis (Railway) | Session management, caching, pub/sub |
| **Search** | PostgreSQL Full-Text / Meilisearch | Full-text search for scholarships |
| **File Storage** | Railway Buckets (S3-compatible) | Document uploads, presigned URLs, native Railway integration |
| **Message Queue** | Django-Q2 / Celery with Redis | Async processing, notifications |
| **Real-time** | Django Channels (WebSocket) | Chat, notifications |
| **Auth** | Django Allauth | OAuth, MFA, session management |
| **PaaS/Hosting** | Railway | Simplified deployment, managed services, auto-scaling |
| **CI/CD** | GitHub Actions + Railway | Automated testing and deployment on push |
| **Monitoring** | Railway Metrics + Sentry | Performance monitoring, error tracking |
| **Logging** | Railway Logs + Logtail | Centralized logging |

## Railway Ecosystem Services

| Service | Purpose |
| --- | --- |
| **Railway pgvector** | PostgreSQL with vector extension, managed backups, similarity search |
| **Railway Redis** | Caching, sessions, task queues |
| **Railway Buckets** | S3-compatible object storage for documents, images, user uploads |
| **Railway Cron** | Scheduled tasks (deadline reminders, reports) |
| **Railway Private Networking** | Secure service-to-service communication |

---

# Database Architecture

## Entity-Relationship Overview

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   USERS     │       │   TENANTS   │       │SCHOLARSHIPS │
│─────────────│       │─────────────│       │─────────────│
│ id          │       │ id          │       │ id          │
│ email       │       │ name        │◄──────│ tenant_id   │
│ role        │       │ slug        │       │ title       │
│ profile_id  │       │ branding    │       │ criteria    │
│ tenant_id   │──────►│ settings    │       │ deadline    │
└──────┬──────┘       └─────────────┘       └──────┬──────┘
       │                                          │
       │              ┌─────────────┐              │
       │              │APPLICATIONS │              │
       │              │─────────────│              │
       └─────────────►│ id          │◄─────────────┘
                      │ user_id     │
                      │ scholarship │
                      │ status      │
                      │ documents   │
                      └─────────────┘
```

## Vector Search Architecture

pgvector is enabled from day one to support future AI features without database migration.

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Example: Scholarship embeddings for semantic search (Gemini text-embedding-004 = 768 dimensions)
ALTER TABLE scholarships ADD COLUMN embedding vector(768);

-- Example: Profile embeddings for recommendations
ALTER TABLE profiles ADD COLUMN skills_embedding vector(768);

-- HNSW index for fast approximate nearest neighbor search
CREATE INDEX ON scholarships USING hnsw (embedding vector_cosine_ops);
CREATE INDEX ON profiles USING hnsw (skills_embedding vector_cosine_ops);
```

**Vector-enabled tables (embeddings populated in Phase 5):**

- `scholarships.embedding` — Semantic search for scholarship descriptions
- `profiles.skills_embedding` — Profile matching and mentor recommendations
- `posts.embedding` — Community content discovery
- `courses.embedding` — LMS content recommendations

## Key Tables

| Table | Description |
| --- | --- |
| `tenants` | Scholarship-granting entities |
| `users` | All user accounts (applicants, staff, admins) |
| `profiles` | Extended user information (academic, skills) |
| `scholarships` | Scholarship programs |
| `applications` | Application submissions |
| `documents` | Uploaded files with verification status |
| `evaluations` | Application scoring and reviews |
| `scholars` | Approved scholars and monitoring data |
| `disbursements` | Financial transactions |
| `notifications` | User notifications |
| `audit_logs` | System activity logs |
| `connections` | Social connections between users |
| `messages` | Direct messages |
| `posts` | Community feed content |
| `courses` | LMS course content |
| `progress` | Learning progress tracking |

## Multi-Tenant Data Isolation

```sql
-- Example: Row-Level Security Policy
CREATE POLICY tenant_isolation ON scholarships
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Every query automatically filtered by tenant
SET app.current_tenant = 'mbhte-uuid-here';
SELECT * FROM scholarships; -- Only MBHTE scholarships returned
```

---

# Security Architecture

## Authentication & Authorization

```
┌─────────────────────────────────────────────────────────┐
│                 SECURITY LAYERS                          │
├─────────────────────────────────────────────────────────┤
│  Layer 1: Network Security                               │
│  • Railway HTTP Proxy with DDoS protection              │
│  • Automatic TLS/SSL certificates                       │
│  • Rate limiting via Django middleware                  │
├─────────────────────────────────────────────────────────┤
│  Layer 2: Authentication                                 │
│  • JWT tokens (access + refresh)                        │
│  • OAuth 2.0 (Google, Facebook)                         │
│  • MFA via OTP (email/SMS)                              │
│  • Session management with Redis                        │
├─────────────────────────────────────────────────────────┤
│  Layer 3: Authorization                                  │
│  • Role-Based Access Control (RBAC)                     │
│  • Tenant-level permissions                             │
│  • Resource-level permissions                           │
│  • API key management for integrations                  │
├─────────────────────────────────────────────────────────┤
│  Layer 4: Data Security                                  │
│  • Encryption at rest (AES-256)                         │
│  • Row-Level Security in PostgreSQL                     │
│  • PII masking in logs                                  │
│  • Secure file storage with signed URLs                 │
├─────────────────────────────────────────────────────────┤
│  Layer 5: Audit & Compliance                             │
│  • Comprehensive audit logging                          │
│  • DPA 2012 compliance                                  │
│  • Regular security audits                              │
└─────────────────────────────────────────────────────────┘
```

## Role Hierarchy

| Role | Scope | Permissions |
| --- | --- | --- |
| **Super Admin** | Platform-wide | Full access to all features and data |
| **Content Moderator** | Platform-wide | Review/approve content, manage listings |
| **Support Staff** | Platform-wide | User support, view tickets, limited data |
| **Entity Admin** | Tenant-specific | Manage entity settings, staff, programs |
| **Entity Evaluator** | Tenant-specific | Review applications, add evaluations |
| **Entity Finance** | Tenant-specific | Manage disbursements, financial reports |
| **Entity Viewer** | Tenant-specific | View-only access to entity data |
| **Verification Partner** | Institution-specific | Verify enrollment, submit grades |
| **Applicant** | Own data | Apply, track applications, manage profile |
| **Public** | None | Browse scholarships, register |

---

# API Architecture

## API Design

| Endpoint Pattern | Example | Description |
| --- | --- | --- |
| `/api/v1/scholarships` | GET, POST | Scholarship CRUD |
| `/api/v1/scholarships/:id` | GET, PUT, DELETE | Single scholarship |
| `/api/v1/applications` | GET, POST | Applications |
| `/api/v1/tenants/:slug/*` | Entity-scoped | Tenant-specific endpoints |
| `/api/v1/users/me` | GET, PUT | Current user profile |
| `/api/v1/schema` | GET | OpenAPI schema (for TS client generation) |

## API Gateway Features

- **Rate Limiting** — Prevent abuse
- **Request Validation** — Schema validation
- **Authentication** — JWT verification
- **Tenant Resolution** — Extract tenant from URL/header
- **Caching** — Response caching for common queries
- **Logging** — Request/response logging

---

# Deployment Architecture

## Production Environment (Railway)

The production environment runs entirely on Railway with GoDaddy DNS for domain management.

**Traffic Flow:**

1. **GoDaddy DNS** — `scholarships.bangsamoro.site` CNAME points to Railway
2. **Railway HTTP Proxy** — Handles SSL/TLS termination, load balancing, and DDoS protection
3. **Application Services** — React (frontend), Django API (backend), Celery (worker)
4. **Data Services** — pgvector (database), Redis (cache), Buckets (storage)
5. **Private Network** — All services communicate via `*.railway.internal` hostnames

## Environments

| Environment | Purpose | URL |
| --- | --- | --- |
| **Development** | Local development | `localhost:2620` (frontend), `localhost:8620` (backend) |
| **Staging** | Testing before production | `staging.scholarships.bangsamoro.site` |
| **Production** | Live system | `scholarships.bangsamoro.site` |

---

# Scalability Strategy

## Horizontal Scaling

| Component | Scaling Strategy |
| --- | --- |
| **React Frontend** | Vite build, Railway replicas |
| **Django API** | Railway replicas, Gunicorn workers |
| **Database** | Railway pgvector scaling, connection pooling (PgBouncer) |
| **Cache** | Railway Redis with persistence |
| **Search** | PostgreSQL GIN indexes, optional Meilisearch service |
| **Storage** | Railway Buckets (S3-compatible, auto per-environment) |
| **Background Jobs** | Celery workers with Railway scaling |

## Performance Optimizations

- **Database indexing** on frequently queried columns
- **Query optimization** with EXPLAIN ANALYZE
- **Response caching** for scholarship listings
- **Image optimization** and lazy loading
- **Code splitting** for frontend bundles
- **CDN caching** for static assets

---

# Project Structure

The project uses a **monorepo** structure with separate directories for frontend, backend, and shared resources.

## Repository Layout

```
bangsamoro-scholarship/
├── frontend/                # React + Vite web application
├── backend/                 # Django REST API
├── mobile/                  # React Native app (Phase 5)
├── shared/                  # Shared types and utilities
│   └── types/               # TypeScript types shared between frontend/mobile
├── docs/                    # Documentation
│   ├── api/                 # API documentation
│   ├── architecture/        # Architecture decision records
│   └── user-guides/         # User manuals
├── scripts/                 # Build and deployment scripts
├── .github/                 # GitHub Actions workflows
├── docker-compose.yml       # Local development stack
├── railway.toml             # Railway deployment config
├── runserver.sh             # Development server script
└── README.md
```

---

## Frontend Structure (React + Vite)

```
frontend/
├── public/                  # Static assets
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── forms/               # Form components
│   ├── layouts/             # Layout components
│   └── features/            # Feature-specific components
├── pages/                   # Page components
├── services/                # API services
├── hooks/                   # Custom React hooks
├── stores/                  # State management
├── types/                   # TypeScript types
├── mockData.ts              # Mock data for development
├── App.tsx                  # Main app component
├── index.tsx                # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## Backend Structure (Django)

```
backend/
├── config/                      # Django project configuration
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/                        # Django applications
│   ├── core/                    # Shared utilities
│   ├── accounts/                # User authentication
│   ├── scholarships/            # Scholarship programs
│   ├── applications/            # Application submissions
│   └── assessments/             # Application evaluations
├── api/
│   └── v1/
│       └── urls.py
├── templates/                   # Email templates
├── tests/                       # Test suite
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── manage.py
└── pyproject.toml
```

---

# Development Phases

## Phase 1: MVP (Pillar 1 - Matchmaking)

- User registration and authentication
- Basic profile management
- Scholarship listings and search
- Application submission and tracking
- Entity dashboard for application review
- Basic notifications

## Phase 2: Multi-Tenant & Entity Features

- Tenant onboarding and configuration
- Branded sub-portals
- Role-based access control per tenant
- Advanced application workflows
- Scholar monitoring
- Reporting and analytics

## Phase 3: Community Features (Pillar 2)

- Enhanced profiles with portfolios
- Connection and networking
- Messaging system
- Community feed and groups
- Alumni network

## Phase 4: LMS & Support (Pillar 3)

- Learning management system
- Course content delivery
- Mentorship matching
- Academic resources library
- Webinars and workshops

## Phase 5: Advanced Features

- Recommendation engine (Gemini embeddings + pgvector similarity search)
- Mobile app (React Native)
- External system integrations
- Analytics dashboards
