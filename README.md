# Truth Seeker Hub

# Real & Raw Gospel Platform - Full Lovable Build Blueprint

## Project Goal

Build a modern ministry platform that combines content publishing, discipleship pathways, Bible study tools, and admin operations in one integrated web app.

The product should feel:

- Spiritually grounded and mission-focused

- Fast, mobile-first, and easy to navigate

- Safe for public users while powerful for admins/editors

- Structured as a discipleship engine (not just a blog)

---

## Product Vision

Create a single destination where people can:

- Discover truth-centered teaching content (blog, video, music, books)

- Start guided discipleship pathways (Starter Packs + progress tracking)

- Study Scripture deeply (reader, search, bookmarks, notes, plans)

- Receive personalized support and recommendations

- Move from first visit to consistent weekly spiritual growth

---

## Primary Users

### 1) Visitor (Unauthenticated)

- Browses public content

- Watches videos, reads blog posts, listens to music

- Uses Bible tools in basic mode

- Starts discipleship pathways

- Can sign up for deeper personalization

### 2) Registered User

- All visitor capabilities

- Saves progress in pathways

- Saves Bible bookmarks/notes/history

- Receives in-app notifications

- Accesses personalized recommendations

### 3) Editor

- Manages content (blog, videos, music, books, devotionals)

- Uses CMS tools and content analytics

- Can publish and update ministry materials

### 4) Admin

- Full platform control

- Manages users/roles, notifications, analytics, exports

- Oversees donations, support workflows, and operations

---

## Core Feature Modules

## 1. Public Website Experience

### Required Pages

- Home

- Start Here

- Starter Packs

- Blog (index + post detail)

- Videos (index + detail)

- Music (index + detail)

- Books (index + detail)

- Bible (reader, search, plans, progress)

- Devotionals

- Donations

- Contact / Support

### Homepage Priorities

- Mission-first hero section

- Weekly Focus card (rotating discipleship highlight)

- Starter Packs entry points

- Featured latest content (blog/video/music)

- Clear CTA to start a pathway

### Navigation

- Sticky top nav

- Search access

- Mobile drawer navigation

- Contextual "New here?" prompts on content pages

---

## 2. Discipleship Engine

### Starter Packs

Provide 5 guided entry points for different spiritual needs.

Each pack includes:

- Intro and target audience

- Recommended sequence of blog/video/music content

- Completion tracking (per user)

- Next-step recommendations

### Pathways Progress

Track completion across major pathways:

- Reset

- Identity

- Warfare

- Feasts

- End-Times

- Prayer

Progress requirements:

- Mark complete per lesson/content item

- Store timestamps and completion percentages

- Show personal dashboard of progress

### Weekly Focus

- Automatic weekly rotation

- Display on home/start pages

- Connect users to priority ministry focus

---

## 3. Bible Study System

### Bible Reader

- Restored Hebrew names translation support

- Book/chapter/verse browsing

- Responsive reading UI

- Fast chapter navigation

### Bible Search

- Full-text search with fuzzy matching

- Support:

  - keyword search ("love your enemies")

  - book search ("genesis")

  - verse reference search ("john 3:16")

- Debounced input and highlighted results

### Personal Study Features

- Bookmarks

- Notes

- Reading history

- Reading plans

- Progress indicators

- Optional offline cache support

---

## 4. AI Study Coach

### Goals

- Answer study questions grounded in site doctrine/content

- Guide users toward structured pathways

- Offer practical next steps

### Requirements

- Chat UI with conversation history

- API route for LLM orchestration

- Multi-provider fallback support

- Retrieval over internal ministry content (RAG style)

- Guardrails for doctrine and language preferences

- Search-only fallback mode if no AI key is configured

### Safety and Quality

- Prompt controls to avoid doctrinal drift

- Basic moderation and abuse controls

- Error-safe user messaging on provider failure

---

## 5. Content Management System (CMS)

### Content Types

- Blog

- Video

- Music

- Books

- Devotionals

- Optional testimonies/events modules

### CMS Capabilities

- Create/edit/publish/unpublish

- Rich metadata fields (tags, topics, scripture refs, etc.)

- Draft + scheduled publication

- Media attachments

- Bulk actions

- Activity log

### Workflow Needs

- Editor-friendly forms

- Slug management and SEO fields

- Validation and sanitized output

- Content analytics visibility

---

## 6. Notifications and Engagement

### In-App Notifications

- Admin can broadcast site notices

- Notices stored in database

- Toast/banner shown across public pages

- Dismiss state handling

### Push Notifications (Optional Phase 2)

- Browser opt-in management

- Send notifications to subscribed users

- Safe unsubscribe endpoint

---

## 7. Donations and Payments

### Donation UX

- Clear giving options page

- Support one-time and recurring intent UX

- Provide method selection:

  - Card (Stripe)

  - PayPal

  - Crypto (optional)

### Admin Operations

- Donation logs/dashboard

- Export functionality

- Failure-safe messaging for unavailable providers

---

## 8. Authentication and Authorization

### Auth Flows

- Sign up

- Sign in

- Password reset

- Session persistence

### Roles

- user

- editor

- admin

### Access Controls

- Public pages remain accessible

- CMS and admin routes restricted by role

- Protected APIs enforce server-side role checks

---

## 9. Data Model (Lovable/Supabase-Oriented)

Use Supabase as backend (Auth + Postgres + Storage + optional realtime).

### Core Tables (Minimum)

- `profiles` (user profile + role)

- `blog_posts`

- `videos`

- `music_tracks`

- `books`

- `devotionals`

- `starter_packs`

- `pathway_items`

- `user_progress`

- `bible_bookmarks`

- `bible_notes`

- `bible_history`

- `site_notifications`

- `donations`

- `support_tickets` (optional phase)

### Common Table Conventions

- `id` UUID PK

- `created_at` / `updated_at`

- `published` + `published_at` for publishable content

- `created_by` / `updated_by` for auditability

- Slug fields indexed where route-based

### Security

- Enable RLS on all private tables

- Public read policies only for published content

- Admin/editor write policies by role

- Service-role usage only in trusted server routes

---

## 10. API Surface (Initial)

### Public Read APIs

- `GET /api/content/blog`

- `GET /api/content/videos`

- `GET /api/content/music`

- `GET /api/content/books`

- `GET /api/devotionals`

- `GET /api/scripture/search?q=&limit=`

### Authenticated User APIs

- `GET/POST /api/user/progress`

- `GET/POST/DELETE /api/user/bookmarks`

- `GET/POST/DELETE /api/user/notes`

- `GET /api/user/history`

### AI API

- `POST /api/chat`

### Admin APIs

- `POST /api/admin/notifications`

- `GET /api/admin/analytics/*`

- `GET /api/admin/donations/export`

- content CRUD endpoints

### API Standards

- Zod schema validation

- Typed responses

- Sanitized errors (avoid leaking internals)

- Rate limiting on sensitive routes (auth/chat/admin)

---

## 11. Frontend and Design System

### UI/UX Direction

- Clean, bold ministry brand style

- Dark-friendly theme support

- Strong readability (scripture/content heavy)

- Mobile-first layouts

### Component Priorities

- Reusable card grids

- Media embeds

- Scripture blocks

- Progress widgets

- Admin tables with filters/actions

### Accessibility

- Keyboard navigation

- Sufficient contrast

- Semantic headings/landmarks

- Focus states and aria labels for interactive controls

---

## 12. Performance, SEO, and Analytics

### Performance Targets

- Fast page loads on mobile

- Optimized image/media handling

- Lazy-load heavy embeds/components

### SEO Requirements

- Canonical URLs

- Meta title/description per content type

- Open Graph / Twitter cards

- XML sitemap

- Structured internal linking

### Analytics

- Track page views + content engagement

- Track pathway progression and conversion events

- Admin dashboard for top-performing content

---

## 13. Deployment and Environment

### Deployment Target

- Vercel production deployment

- SSR-compatible build

### Required Environment Variables

- `PUBLIC_SUPABASE_URL`

- `PUBLIC_SUPABASE_ANON_KEY`

- `SUPABASE_SERVICE_ROLE_KEY`

### Optional / Feature Variables

- AI providers: `GROQ_API_KEY`, `GOOGLE_AI_API_KEY`, `DEEPSEEK_API_KEY`

- Push notifications: `PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`

- Monitoring: `SENTRY_DSN`

- Payment provider keys (Stripe/PayPal/Crypto)

### Operational Requirements

- Run DB migrations before release

- Keep staging/prod envs aligned

- Ensure secure secret management

---

## 14. Non-Functional Requirements

- Security-first defaults (RLS, role checks, input validation)

- Type-safe codebase (TypeScript end to end)

- Observability (logs + optional error monitoring)

- Graceful degradation when optional integrations are missing

- Scalable structure for future mobile app reuse

---

## 15. Build Plan (Lovable Execution Roadmap)

## Phase 1 - Foundation (MVP Core)

- Project scaffold and design system

- Supabase auth + profiles/roles

- Core public pages and navigation

- Blog + video + music content listing/detail

- Basic admin CMS CRUD for content

- Initial SEO setup

## Phase 2 - Discipleship and Bible

- Starter Packs and pathway model

- User progress tracking and dashboard

- Bible reader + scripture search API/UI

- Bookmarks/notes/history

- Weekly Focus module

## Phase 3 - AI and Engagement

- AI Study Coach chat experience

- Retrieval grounding and provider fallback

- Site notifications broadcast system

- Optional push notification support

## Phase 4 - Operations and Revenue

- Donations flow integrations

- Admin analytics dashboards and exports

- Hardening pass for security/performance

- End-to-end testing and launch checklist

---

## 16. Acceptance Criteria (Launch-Ready)

The build is launch-ready when:

- Public users can discover and consume all core content types

- Registered users can track discipleship and Bible activity

- Admin/editor roles can safely manage content via CMS

- AI Study Coach is stable with safe fallback behavior

- Key pages pass accessibility and performance checks

- Production deployment succeeds with secure env configuration

---

## 17. Lovable Prompt Seed (Copy/Paste)

Use this prompt when starting in Lovable:

"Build a full-stack ministry platform called Real & Raw Gospel. Use a modern SSR-friendly web stack with Supabase for auth/database/storage. Include public pages (home, start here, starter packs, blog, videos, music, books, bible, devotionals, donations), an admin CMS with role-based access (user/editor/admin), discipleship pathways with progress tracking, bible reader + scripture search + bookmarks/notes/history, AI study coach with provider fallback and doctrinal guardrails, in-app notifications, and donation flows (Stripe/PayPal/optional crypto). Ensure mobile-first UX, strong SEO, secure RLS policies, typed APIs, and production readiness for Vercel deployment."

---

## 18. Notes for Lovable Build Sessions

- Build features in vertical slices (UI + data + API + auth) per module.

- Keep role checks server-side even if UI hides controls.

- Implement graceful fallback for every optional integration.

- Prioritize Starter Packs + progress UX early, since discipleship flow is core value.

- Treat doctrine and content integrity as a first-class product constraint.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7eb5f4e8-af80-4ef9-85e3-ae0a9a711458).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
