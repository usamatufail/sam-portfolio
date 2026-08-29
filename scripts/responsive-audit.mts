/**
 * Renders every page at phone and tablet widths and fails on two things the eye
 * misses: horizontal overflow, and tap targets too small to hit reliably.
 *
 * Worth re-running after editing content in the admin panel, since long copy is
 * what usually breaks a layout.
 *
 *   pnpm dev                      # in another terminal
 *   pnpm audit:responsive
 *
 * Needs a browser binary once:  npx playwright install chromium
 */
import { config } from 'dotenv';

config({ path: ['.env.local', '.env'], quiet: true });

const { chromium } = await import('playwright');
const { signSessionToken } = await import('../lib/session.js');
const { db } = await import('../db/index.js');
const { projects, commands } = await import('../db/schema.js');

const BASE = process.env.AUDIT_BASE ?? 'http://localhost:4321';
const MIN_TAP = 32;

const [project] = await db.select({ id: projects.id }).from(projects).limit(1);
const [command] = await db.select({ id: commands.id }).from(commands).limit(1);

const PAGES = [
  '/',
  '/work',
  '/about',
  '/contact',
  '/admin/login',
  '/admin',
  '/admin/settings',
  '/admin/projects',
  '/admin/projects/new',
  `/admin/projects/${project.id}`,
  '/admin/experience',
  '/admin/principles',
  '/admin/education',
  '/admin/commands',
  `/admin/commands/${command.id}`,
];

const VIEWPORTS = [
  { label: '320 iPhone SE', width: 320, height: 568 },
  { label: '375 iPhone mini', width: 375, height: 667 },
  { label: '414 iPhone Max', width: 414, height: 896 },
  { label: '768 iPad', width: 768, height: 1024 },
  { label: '1280 desktop', width: 1280, height: 900 },
];

const browser = await chromium.launch();
const token = await signSessionToken();
let failures = 0;

for (const vp of VIEWPORTS) {
  console.log(`\n${vp.label} (${vp.width}px)`);
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.width < 768,
    hasTouch: vp.width < 768,
  });
  await context.addCookies([{ name: 'sam_admin_session', value: token, url: BASE }]);
  const page = await context.newPage();

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    // Let the scroll-reveal transforms settle before measuring anything.
    await page.waitForTimeout(1800);

    const result = await page.evaluate((minTap) => {
      const vw = document.documentElement.clientWidth;
      const overflow = document.documentElement.scrollWidth > vw + 1;

      const widest = Array.from(document.querySelectorAll<HTMLElement>('*'))
        .map((el) => ({ el, w: el.scrollWidth, c: el.clientWidth }))
        .filter((x) => x.c > 0 && x.w > x.c + 1)
        .toSorted((a, b) => b.w - b.c - (a.w - a.c))[0];

      const small = Array.from(
        document.querySelectorAll<HTMLElement>('a, button, input, select, textarea'),
      )
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ el, r }) => {
          if (r.width === 0 || r.height === 0 || r.height >= minTap) return false;
          // A small checkbox is fine when its wrapping label is the real target.
          const label = el.closest('label');
          if (label && label !== el && label.getBoundingClientRect().height >= minTap) return false;
          return true;
        })
        .map(
          ({ el, r }) =>
            `${Math.round(r.height)}px <${el.tagName.toLowerCase()}> "${(el.textContent || '').trim().slice(0, 22)}"`,
        );

      return {
        overflow,
        culprit: widest
          ? `<${widest.el.tagName.toLowerCase()}> needs ${widest.w}px in ${widest.c}px`
          : null,
        small: small.slice(0, 5),
      };
    }, MIN_TAP);

    // Tap targets only matter where there is a touch screen.
    const tapProblems = vp.width < 768 ? result.small : [];
    const bad = result.overflow || tapProblems.length > 0;
    if (bad) failures += 1;

    console.log(`  ${bad ? 'FAIL' : 'ok  '} ${path}`);
    if (result.overflow && result.culprit) console.log(`         overflow: ${result.culprit}`);
    for (const s of tapProblems) console.log(`         tap target: ${s}`);
  }
  await context.close();
}

await browser.close();
console.log(failures === 0 ? '\nAll pages clean.' : `\n${failures} page/viewport failures.`);
process.exit(failures === 0 ? 0 : 1);
