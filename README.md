# sam-portfolio

Personal portfolio for **Usama Tufail (Sam)** — senior full-stack engineer, Toptal Verified
Expert in Engineering. Four public pages (Home, Work, About, Contact), a ⌘K command palette,
and a passcode-protected admin panel where every word on the site is editable.

## Stack

| Layer      | Choice                                  | Why |
|------------|-----------------------------------------|-----|
| Framework  | Next.js 16 (App Router, Turbopack)      | Static prerendering + `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD |
| Language   | TypeScript 5.9                          | |
| Styling    | Tailwind CSS v4 (`@theme` tokens)       | Design tokens live in `app/globals.css` as `oklch()` custom properties |
| Database   | Neon (Lakebase Postgres)                | Serverless, scale-to-zero, branches with the app |
| ORM        | Drizzle                                 | ~7.4kb, zero deps, fast serverless cold starts |
| Auth       | `jose` HS256 cookie session             | One admin, one passcode — no auth provider needed |
| Linting    | oxlint (+ `tsgolint` type-aware pass)   | 50–100× faster than ESLint |
| Formatting | Prettier                                | |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill it in
pnpm db:migrate              # apply schema
pnpm db:seed                 # load the approved copy (skips if already seeded)
pnpm dev
```

### Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon pooled connection string. `neon link` writes this for you. |
| `ADMIN_PASSCODE` | The code that unlocks `/admin`. |
| `SESSION_SECRET` | Signs the admin session cookie. 32+ chars — `openssl rand -base64 48`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and robots. |

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm check` | `lint` + `typecheck` |
| `pnpm lint` / `pnpm lint:types` | oxlint / oxlint with type-aware rules |
| `pnpm format` | Prettier write |
| `pnpm db:generate` / `db:migrate` | Create / apply a migration |
| `pnpm db:seed` / `db:seed:force` | Seed content (`:force` wipes and reseeds) |
| `pnpm db:studio` | Drizzle Studio |

## How it fits together

```
app/
  layout.tsx            root: fonts, base metadata
  (site)/               public site — statically prerendered
    layout.tsx          header, footer, ⌘K palette, reveal animations
    page.tsx            home (+ JSON-LD Person schema)
    work|about|contact/
  admin/
    layout.tsx          noindex wrapper
    login/              passcode form
    (dashboard)/        every editor, guarded by requireAdmin()
  sitemap.ts robots.ts
components/site/        Header, CommandPalette, RevealRoot, Avatar, ToptalBadge
components/admin/       forms + shared field primitives
db/                     schema.ts, index.ts, seed.mts
lib/                    auth, session, queries (cached), actions (mutations)
proxy.ts                fast redirect for /admin (Next 16 renamed middleware -> proxy)
```

### Content and caching

Public pages read through `lib/queries.ts`, where every query is wrapped in `unstable_cache`
and tagged `site-content`. Pages therefore prerender at build time and are served static.

Every admin mutation ends in `publish()`, which calls **both** `revalidateTag` and
`revalidatePath('/', 'layout')`. Both are required: verified against a production build,
`revalidateTag` on its own drops the cached query results but does **not** re-render the
prerendered routes, so the site keeps serving the old HTML. Do not remove either call.

### Auth

`proxy.ts` redirects unauthenticated `/admin` requests to the login page, but it is only a
convenience layer. The real boundary is `requireAdmin()`, called in the dashboard layout and
at the top of every server action — a proxy check alone is not an authorisation boundary.

Login compares the submitted code against `ADMIN_PASSCODE` in constant time (both sides are
SHA-256'd first so length never leaks) and is throttled to 8 attempts per 15 minutes per IP.
That throttle is per-instance, so on serverless it slows an attacker rather than stopping one —
fine behind a long passcode, worth revisiting if the threat model changes.

### Design

`design_handoff_portfolio/README.md` is the source of truth for colours, type scale, spacing
and motion. Two rules worth keeping:

- **Never hide what is already on screen.** `RevealRoot` only hides below-the-fold nodes, does
  it from JS after first paint, and clears everything unconditionally after 1.6s. An earlier
  build shipped a blank first paint by getting this wrong.
- **Do not restyle Toptal's badge.** It is their embeddable mark. Its CTA carries a referral
  fragment, which is why `badgeCtaUrl` is a separate field from the plain résumé link.

## Deploying

Push to GitHub, import on Vercel (framework preset: Next.js), and set the four environment
variables above. Rotate `ADMIN_PASSCODE` before going live.
