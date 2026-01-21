# Bangsamoro Scholarship Portal (BSP)

A comprehensive digital ecosystem for educational opportunities in the Bangsamoro region, combining scholarship matchmaking, scholar community networking, and learning support services.

**Live URL:** [scholarships.bangsamoro.site](https://scholarships.bangsamoro.site)

---

## Overview

The Bangsamoro Scholarship Portal (BSP) is developed and administered by **MoroTech**. Rather than granting scholarships directly, the portal serves as a unified platform connecting scholarship applicants with scholarship-granting entities across the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).

### Three Pillars

| Pillar | Description |
|--------|-------------|
| **Scholarship Matchmaking** | Centralized listings, advanced search, one-click applications, tracking |
| **Scholar Community** | Academic profiles, networking, portfolio building, alumni connections |
| **Support Services** | Online courses, mentorship, academic resources, career guidance |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS, TanStack Query |
| **Backend** | Django 6, Django REST Framework, Python |
| **Database** | PostgreSQL with pgvector |
| **Cache** | Redis |
| **Storage** | S3-compatible object storage |
| **Auth** | Django Allauth (OAuth, MFA) |
| **Real-time** | Django Channels (WebSocket) |
| **CI/CD** | GitHub Actions |

---

## Project Structure

```
bangsamoro-scholarship/
├── frontend/           # Next.js web application
├── backend/            # Django REST API
│   ├── config/         # Django project configuration
│   └── apps/           # Django applications
├── docs/               # Documentation
│   ├── architecture/   # Architecture documents
│   └── UI-UX/          # UI/UX specifications
├── scripts/            # Build and deployment scripts
├── .github/            # GitHub Actions workflows
├── runserver.sh        # Development server script
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.14+
- PostgreSQL 15+
- Redis

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:2620`

### Backend

```bash
cd backend
pip install -r requirements/development.txt
python manage.py migrate
python manage.py runserver 8620
```

The API runs at `http://localhost:8620`

### Development Script

```bash
./runserver.sh
```

---

## Design System

The portal uses a **light theme** with colors derived from the Bangsamoro Scholars Association branding:

| Color | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#1B5E20` | Primary brand, headers |
| Emerald Green | `#2E7D32` | Buttons, links, accents |
| Gold | `#D4A017` | Highlights, badges |
| White | `#FFFFFF` | Card backgrounds |
| Light Gray | `#F8FAFC` | Page backgrounds |
| Slate | `#1E293B` | Text, footer |

---

## Multi-Tenant Architecture

The BSP supports multiple scholarship-granting entities with data isolation:

- **URL-based tenant identification:** `/mbhte`, `/most`, `/moh`
- **Row-Level Security (RLS)** in PostgreSQL
- **Branded sub-portals** per entity

### Supported Entities

- Ministry of Basic, Higher and Technical Education (MBHTE)
- Ministry of Science and Technology (MOST)
- Ministry of Health (MOH)
- Commission on Higher Education (CHED)
- Department of Science and Technology (DOST-SEI)
- Provincial, City, and Municipal LGUs
- Private foundations and NGOs

---

---

## Development Phases

1. **Phase 1 (MVP):** Matchmaking - User auth, scholarship listings, applications
2. **Phase 2:** Multi-tenant features, entity dashboards, scholar monitoring
3. **Phase 3:** Community features - Profiles, networking, messaging
4. **Phase 4:** LMS and support services
5. **Phase 5:** AI recommendations (Gemini + pgvector), mobile app

---

## Environments

| Environment | URL |
|-------------|-----|
| Development | `localhost:2620` (frontend), `localhost:8620` (backend) |
| Staging | `staging.scholarships.bangsamoro.site` |
| Production | `scholarships.bangsamoro.site` |

---

## Documentation

- [Software Architecture](docs/architecture/Software-Architecture.md)
- [Software Requirements](docs/architecture/Software-Requirements.md)
- [User Types](docs/architecture/Users.md)
- [UI/UX Specifications](docs/UI-UX/)

---

## License

Copyright MoroTech. All rights reserved.
