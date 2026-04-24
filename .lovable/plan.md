# Phase 1 — Foundation + Public Site

Building the public-facing site against the existing Supabase project (`Real Raw Gospel`). Auth and admin CMS come in subsequent phases.

## Step 1 — Brand foundation & shell

1. **`src/styles.css`** — Replace tokens with brand palette in oklch:
   - bg `#0b0b0c`, surface `#171717`, foreground `#fafafa`, primary `#d97706` (amber), secondary `#d5c7a1` (sand)
   - Add Cormorant Garamond (headings) + Inter (body) via Google Fonts `@import`
   - Add font family CSS variables `--font-serif`, `--font-sans`

2. **Logo assets** — Copy `user-uploads://rrg-logo-96x96.jpg` to:
   - `src/assets/rrg-logo.jpg` (component import)
   - `public/rrg-logo.jpg` (favicon + OG fallback)

3. **`src/routes/__root.tsx`** — Add Google Fonts link tags + favicon link, wrap `<Outlet />` with `<QueryClientProvider>`, render shared `<SiteHeader>` and `<SiteFooter>`. Convert root to `createRootRouteWithContext<{ queryClient }>`.

4. **`src/router.tsx`** — Create fresh `QueryClient` inside `getRouter`, pass via router context.

5. **`src/components/layout/SiteHeader.tsx`** — Logo + horizontal nav (Home, Start Here, Blog, Devotionals, Videos, About, Contact, Donate) + mobile drawer (Sheet) + Sign In button (links to `/auth`, page coming Phase 3).

6. **`src/components/layout/SiteFooter.tsx`** — Logo, link columns, copyright.

## Step 2 — Public content routes

7. **`src/routes/index.tsx`** — Replace placeholder. Homepage with:
   - Hero (logo + tagline + CTAs to Start Here / Donate)
   - Latest devotional card (loader fetches 1 from `devotionals`)
   - Latest 3 blog posts grid (loader fetches from `posts`)
   - Latest 3 videos grid (loader fetches from `content` where `content_type='video'`)
   - Donate strip
   - Empty states when tables have no published rows

8. **`src/routes/start-here.tsx`** — Onboarding/welcome content.
9. **`src/routes/about.tsx`** — Mission/story page.
10. **`src/routes/donate.tsx`** — Donate landing (placeholder external URL `#`, swap later).
11. **`src/routes/contact.tsx`** — Form with zod validation → `contact_messages` table via `supabase.from('contact_messages').insert(...)`.
12. **`src/routes/blog.index.tsx`** — Lists published `posts`.
13. **`src/routes/blog.$slug.tsx`** — Detail page; loader fetches by slug; `head()` derives `og:title`, `og:description`, `og:image` from post; `notFoundComponent` + `errorComponent`.
14. **`src/routes/devotionals.index.tsx`** + **`devotionals.$slug.tsx`** — Same pattern reading `devotionals` (`published=true AND workflow_state='published'`).
15. **`src/routes/videos.index.tsx`** + **`videos.$slug.tsx`** — Reads `content` table filtered by `content_type='video'` and `status='published'`.
16. Each route defines its own `head()` with title/description/og:title/og:description.

## Step 3 — Database migration

17. Create `contact_messages` table:
    ```sql
    create table public.contact_messages (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      email text not null,
      subject text,
      message text not null,
      status text not null default 'new',
      created_at timestamptz not null default now()
    );
    alter table public.contact_messages enable row level security;
    -- Public can submit
    create policy "Anyone can submit contact messages"
      on public.contact_messages for insert
      to anon, authenticated with check (true);
    -- Only admins can read/update (uses existing has_role function + user_roles table)
    create policy "Admins can view contact messages"
      on public.contact_messages for select
      to authenticated using (public.has_role(auth.uid(), 'admin'));
    create policy "Admins can update contact messages"
      on public.contact_messages for update
      to authenticated using (public.has_role(auth.uid(), 'admin'));
    ```
    *Note: I'll verify the exact signature of your existing `has_role()` function and `app_role` enum values before writing this — if `'admin'` isn't a valid enum value I'll adapt.*

## Step 4 — Dependencies

18. `bun add @tanstack/react-query zod react-hook-form @hookform/resolvers` (react-hook-form already pulled in by shadcn form.tsx but I'll verify).

## Decisions locked in

- **Content sourcing**: Live + empty states (no seed data).
- **Videos source**: `content` table (`content_type='video'`, `status='published'`).
- **Blog source**: `posts` table (`workflow_state='published'`).
- **Devotionals**: `devotionals` (`published=true AND workflow_state='published'`).
- **Routing**: Separate route files per page; per-route `head()` for SEO/social.
- **Donate URL**: `#` placeholder (swap later).
- **Sign In**: Header button links to `/auth` (route built in Phase 3).

## What's NOT in this phase

- Auth (`/auth`, sign-in/up, Google OAuth) → **Phase 3**
- Admin CMS (`/admin/*`) → **Phase 4**
- Email notifications, newsletter, comments → later

## Approval needed for

- The `contact_messages` migration (you'll see a migration approval prompt mid-build).

Approve this plan and I'll execute everything above in one build pass.