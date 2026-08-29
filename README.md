# sam-portfolio

Personal portfolio for **Usama Tufail (Sam)**, senior full-stack engineer, Toptal Verified
Expert in Engineering. Four public pages (Home, Work, About, Contact), a ⌘K command palette,
and a passcode-protected admin panel where every word on the site is editable.

## Stack

| Layer      | Choice                                | Why                                                                          |
| ---------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)    | Static prerendering + `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD |
| Language   | TypeScript 5.9                        |                                                                              |
| Styling    | Tailwind CSS v4 (`@theme` tokens)     | Design tokens live in `app/globals.css` as `oklch()` custom properties       |
| Database   | Neon (Lakebase Postgres)              | Serverless, scale-to-zero, branches with the app                             |
| ORM        | Drizzle                               | ~7.4kb, zero deps, fast serverless cold starts                               |
| Auth       | `jose` HS256 cookie session           | One admin, one passcode, no auth provider needed                             |
| Linting    | oxlint (+ `tsgolint` type-aware pass) | 50–100× faster than ESLint                                                   |
| Formatting | Prettier                              |                                                                              |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill it in
pnpm db:migrate              # apply schema
pnpm db:seed                 # load the approved copy (skips if already seeded)
pnpm dev
```

### Environment

| Variable               | Purpose                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| `DATABASE_URL`         | Neon pooled connection string. `neon link` writes this for you.       |
| `ADMIN_PASSCODE`       | The code that unlocks `/admin`.                                       |
| `SESSION_SECRET`       | Signs the admin session cookie. 32+ chars. `openssl rand -base64 48`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and robots.                    |

## Scripts

| Command                           | Does                                      |
| --------------------------------- | ----------------------------------------- |
| `pnpm dev`                        | Dev server                                |
| `pnpm build` / `pnpm start`       | Production build / serve                  |
| `pnpm check`                      | `lint` + `typecheck`                      |
| `pnpm lint` / `pnpm lint:types`   | oxlint / oxlint with type-aware rules     |
| `pnpm format`                     | Prettier write                            |
| `pnpm db:generate` / `db:migrate` | Create / apply a migration                |
| `pnpm db:seed` / `db:seed:force`  | Seed content (`:force` wipes and reseeds) |
| `pnpm db:studio`                  | Drizzle Studio                            |

## How it fits together

```
app/
  layout.tsx            root: fonts, base metadata
  (site)/               public site, statically prerendered
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

### Editing content

There are two places, split by whether the text is visible on the page.

**Inline, on the site itself.** Open any page, press `⌘K`, type the admin code into the
palette and hit Enter. A floating bar appears with `edit` / `preview`, a save button and a
lock. In edit mode every heading, paragraph, label and list row is directly editable;
`⌘S` saves, and saving revalidates the live pages immediately. This is the fast path and
covers all visible copy.

**`/admin`, for everything with no on-page text to click.** Link destinations, the avatar
source, availability state, SEO metadata, and the structural operations inline editing
cannot express: adding, deleting and reordering projects, experience rows, principles,
education lines and palette commands.

Two things worth knowing before changing this:

- **`/api/edit-session` exists so the public pages stay static.** Reading the session
  cookie in the site layout would opt every page out of prerendering, which is what the
  SEO depends on. The pages render statically for everyone and the editor bootstraps after
  hydration.
- **The settings form only writes the fields it renders.** A form submits only its own
  inputs, so if `saveSettings` still wrote the inline-edited columns it would read `''`
  from the missing inputs and wipe the copy. If you add a field to that form, add it to the
  action too, and vice versa.

Inline saves arrive as `table:id:field[:index]` paths from the browser, so
`lib/inline/fields.ts` is a security boundary, not a convenience: anything not on that
allowlist is dropped rather than written.

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
at the top of every server action. A proxy check alone is not an authorisation boundary.

Login compares the submitted code against `ADMIN_PASSCODE` in constant time (both sides are
SHA-256'd first so length never leaks) and is throttled to 8 attempts per 15 minutes per IP.
That throttle is per-instance, so on serverless it slows an attacker rather than stopping one,
fine behind a long passcode, worth revisiting if the threat model changes.

### Availability

Whether Sam is taking work is stated in **exactly one place**: `availabilityState` in
settings, rendered as the footer badge. The other copy was deliberately scrubbed of
availability claims: the hero's closing sentence, the `whoami` palette answer, and the SEO
description all used to assert it independently and would have gone stale.

Three states (`available` / `limited` / `unavailable`), each with its own editable message.
A command-palette answer line containing the `{availability}` token has it substituted at
render time, capitalised when it starts the line. That is how the "Availability and how I
work" answer stays in sync with the badge without restating it.

If you add copy that mentions taking work, use the token or leave it to the badge. Two
independent claims is the bug this exists to prevent.

### Design

`design_handoff_portfolio/README.md` is the source of truth for colours, type scale, spacing
and motion. Two rules worth keeping:

- **Never hide what is already on screen.** `RevealRoot` only hides below-the-fold nodes, does
  it from JS after first paint, and clears everything unconditionally after 1.6s. An earlier
  build shipped a blank first paint by getting this wrong.
- **Two layouts stack below `sm` on purpose.** Contact rows and the About experience
  timeline use a fixed 116px label column; below 375px that starves the email address,
  which has no break points and cannot wrap. The hero stacks for the same reason: at 320px
  a 150px portrait leaves the headline about 90px of column. Both are unchanged at `sm`
  and above, which is the approved design.
- **Tap targets are grown with padding plus a matching negative margin**, so hit areas
  increase without moving anything on screen. Keep the pairs together when editing.
- **Do not restyle Toptal's badge.** It is their embeddable mark. Its CTA carries a referral
  fragment, which is why `badgeCtaUrl` is a separate field from the plain résumé link.

## Social preview

`app/opengraph-image.png` and `app/twitter-image.png` are the 1200x630 cards shown when the
link is pasted into LinkedIn, Slack, WhatsApp or X. They are static files rather than a
generated `ImageResponse`, so regenerate them if the name or role changes:
`pnpm og` in `~/Desktop/sam-portfolio-probes` with the dev server running.

`NEXT_PUBLIC_SITE_URL` **must be the host that actually serves the site.** The apex
redirects to `www`, so pointing it at the apex makes every canonical URL, `og:url` and
sitemap entry reference a URL that 308s away.

## Deploying

Push to GitHub, import on Vercel (framework preset: Next.js), and set the four environment
variables above. Rotate `ADMIN_PASSCODE` before going live.
