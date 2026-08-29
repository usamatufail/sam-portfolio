/**
 * The approved copy from the design handoff, verbatim.
 *
 * Data only: the procedure that writes it lives in seed.mts. Editing anything
 * here changes what a fresh `pnpm db:seed` installs, not what is on the live
 * site; the site is edited inline or through /admin.
 */
export const SETTINGS = {
  id: 1,
  wordmark: 'Usama Tufail',
  fullName: 'Usama Tufail',
  jobTitle: 'Senior Full-stack Engineer',
  heroHeadline: 'Usama Tufail, senior full-stack engineer, ten years of products that shipped.',
  heroParagraphs: [
    'Ten years shipping software, since 2016. I build product front-ends in React, Next.js and TypeScript, mobile apps in React Native, Chrome extensions used by thousands, and the Node, NestJS and PostgreSQL services behind them. Most of my work is the part nobody enjoys: migrations, hydration bugs, p95 latency, the last 10% that decides whether software feels good to use.',
    'A Toptal Verified Expert in Engineering since 2022, and the engineer US startups call when a product has to get faster, cleaner or shipped by a date that will not move.',
  ],
  avatarUrl: '/images/sam-avatar-500.png',
  avatarAlt: 'Usama Tufail (Sam), senior full-stack engineer',

  badgeEnabled: true,
  badgeHeadline: 'TOP 3% TALENT',
  badgeVettedBy: 'Vetted by',
  badgeCtaLabel: 'Hire me',
  badgeCtaUrl: 'https://www.toptal.com/developers/resume/usama-tufail#BGGYeP',

  email: 'usama.tufail@toptal.com',
  phone: '+923158626392',
  phoneLabel: '+92 315 862 6392',
  linkedinUrl: 'https://www.linkedin.com/in/samtufail/',
  linkedinLabel: 'in/samtufail ↗',
  githubUrl: 'https://github.com/usamatufail',
  githubLabel: '@usamatufail ↗',
  resumeUrl: 'https://www.toptal.com/developers/resume/usama-tufail',
  resumeLabel: 'Toptal profile ↗',

  selectedWorkLabel: 'Selected work',
  selectedWorkCta: 'read the case studies →',

  workTitle: 'Work',
  workIntro:
    'Thirty-plus products shipped since 2016: agency work, startup rebuilds, and platforms I led. Six worth reading about, newest first.',
  alsoShipped: 'Also shipped: Investler Realty, Racquet Pass, Learnatric, Maxxis, NTA.',

  aboutTitle: 'About',
  aboutParagraphs: [
    'I wrote my first paid line of code in 2016, while studying computer science. Small client sites at first, then MERN products for agencies: an eCommerce store you could navigate by voice, a browser-based language compiler, mobile apps in React Native. Thirty-odd projects in those early years taught me more about shipping than any single job would have.',
    'From there I moved into lead roles at Humans and AMF Media, working directly with designer-founders, reviewing the team’s work and mentoring juniors. In August 2022 Toptal accepted me as a Verified Expert in Engineering, and I graduated their Node.js Accelerator that December. Since then the work has been the kind clients remember: a Chrome extension now used by more than 10,000 shoppers at 4.7 stars, an AI shopping app whose first paint dropped from 3.4 seconds to 1.2, a market-intelligence suite holding data on 65,000 licensed operators, and a real-estate marketplace where I cut reported vulnerabilities by 80%.',
    'Ten years in, what I actually sell is judgement: knowing which 20% of a rebuild carries the risk, when to say a feature is not worth its complexity, and how to leave a codebase a new engineer can run in ten minutes. I am equally comfortable owning a roadmap with a founder and being the quiet one who fixes the p95 nobody wants to look at. Master’s in Computer Science.',
  ],
  experienceLabel: 'Experience',
  principlesLabel: 'How I work',
  educationLabel: 'Education & certifications',

  contactTitle: 'Contact',
  contactIntro:
    'Senior front-end and full-stack work: new products, rescue missions, and migrations that have to ship without downtime. Email or WhatsApp reaches me fastest; I reply within a day.',

  footerLeft: 'Remote · overlapping US and EU hours',
  palettePlaceholder: 'Search: work, numbers, availability, email…',

  // The only availability claim on the site. Everything else was scrubbed of it.
  availabilityState: 'available' as const,
  availabilityAvailable: 'available for work',
  availabilityLimited: 'mostly booked, open to a conversation',
  availabilityUnavailable: 'not taking new work right now',

  seoTitle: 'Usama Tufail (Sam), Senior Full-stack Engineer · React, Next.js, TypeScript',
  seoDescription:
    'Usama Tufail (Sam), senior full-stack engineer. Ten years of shipped products across web, mobile and the services behind them. Toptal Verified Expert in Engineering, working remotely with teams across the US and Europe.',
  seoKeywords:
    'Usama Tufail, Sam Tufail, senior full-stack engineer, React developer, Next.js developer, TypeScript, Node.js, NestJS, React Native, Chrome extension developer, Toptal Verified Expert, hire senior full-stack engineer remote',
  ogTitle: 'Usama Tufail (Sam), Senior Full-stack Engineer',
  ogDescription:
    'Ten years of shipped products: React and Next.js front-ends, React Native apps, Chrome extensions, and the Node and PostgreSQL services behind them. Toptal Verified Expert in Engineering, working remotely with teams across the US and Europe.',
};

export const PROJECTS = [
  {
    slug: 'phia',
    name: 'Phia',
    listDescription:
      ', AI shopping app that compares prices across 40,000+ retail and resale sites',
    year: '2024',
    category: 'AI commerce · Next.js 14',
    caseTitle: 'Phia: AI shopping app',
    body: [
      'Phia compares prices across 40,000+ retail and resale sites in real time, like Google Flights but for fashion. I rebuilt search, product pages and filters in the Next.js 14 App Router, shipped shareable search links with a Stripe-metered referral flow, and moved the marketing site off WordPress onto streamed server components.',
      'Time-to-interactive fell 40%, first contentful paint went from 3.4s to 1.2s, and a price-matching query I rewrote dropped from 480ms to 170ms at p95. A/B tests on the install flow lifted conversion to active user by 27%.',
    ],
    tech: ['Next.js 14', 'TypeScript', 'GraphQL', 'NestJS', 'PostgreSQL'],
    linkUrl: 'https://phia.com',
    linkLabel: 'phia.com ↗',
    sortOrder: 0,
  },
  {
    slug: 'phia-extension',
    name: 'Phia Chrome extension',
    listDescription: ', Manifest V3 price checker, 10,000+ users at 4.7 stars',
    year: '2024',
    category: 'Chrome extension · Manifest V3',
    caseTitle: 'Phia: “Should I buy this?” extension',
    body: [
      'A Manifest V3 extension that adds one button to any product page and checks the item against 250 million resale listings and 40,000 stores. AI content scripts read Shopify, Salesforce Commerce and Magento pages at 94% accuracy; a background service worker caches price history so it still answers offline.',
      '10,000+ users at 4.7 stars, a 2.7 MiB tree-shaken bundle, 38% fewer API calls after caching, and Chrome Web Store CI with GDPR-compliant telemetry.',
    ],
    tech: ['React', 'TypeScript', 'CRXJS', 'semantic-release'],
    linkUrl:
      'https://chromewebstore.google.com/detail/phia-best-price-in-one-cl/ehoknmhmadiboejdbinglmbnlghnbldc',
    linkLabel: 'chrome web store ↗',
    sortOrder: 1,
  },
  {
    slug: 'cannaspyglass',
    name: 'CannaSpyglass',
    listDescription:
      ', B2B market intelligence on 65,000 licensed operators, CRA rebuilt in Next.js',
    year: '2023',
    category: 'B2B market intelligence',
    caseTitle: 'CannaSpyglass: market intelligence suite',
    body: [
      'A research platform holding verified data on 65,000 licensed operators, 16,000 products and 5,000 vendors. I migrated the legacy Create React App codebase to the Next.js App Router for server rendering, then built a faceted filter system (region, licence type, revenue band, category) that drills from continent down to zip code in under 300ms.',
      'Initial load dropped 45%. Redesigning the operator profile, comparison dashboard and report wizard cut clicks-to-insight from eleven to six and lifted session duration 23%.',
    ],
    tech: ['Next.js', 'React Query', 'Mapbox', 'SSR'],
    linkUrl: 'https://cannaspyglass.com/',
    linkLabel: 'cannaspyglass.com ↗',
    sortOrder: 2,
  },
  {
    slug: 'marketplug',
    name: 'Marketplug',
    listDescription: ', commerce platform interface and real-time analytics dashboard',
    year: '2023',
    category: 'Commerce platform · micro-frontends',
    caseTitle: 'Marketplug: platform UI and analytics',
    body: [
      'As senior front-end engineer I headed the interface (React, Redux, Material UI, micro-frontends) and built the analytics dashboard businesses use to watch customer interactions in real time.',
      'A stricter lint and review process cut bugs 70%; workshops on React practice lifted team throughput 45% and shortened the design-to-ship loop by 40%.',
    ],
    tech: ['React', 'Redux', 'Material UI', 'Micro-frontends', 'GitLab CI'],
    linkUrl: null,
    linkLabel: null,
    sortOrder: 3,
  },
  {
    slug: 'neufluence',
    name: 'Neufluence',
    listDescription: ', influencer marketing platform built and led end to end as full-stack lead',
    year: '2022',
    category: 'Marketing platform · full-stack lead',
    caseTitle: 'Neufluence: influencer marketing platform',
    body: [
      'The most interesting thing I’ve built: brands find influencers, run campaigns and read the results back, while influencers manage their own work, earnings and audience. I led the development team and owned technical direction from architecture to release.',
      'Most of the difficulty was matching and measurement: making two very different audiences trust the same numbers.',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Team lead'],
    linkUrl: 'https://neufluence.com',
    linkLabel: 'neufluence.com ↗',
    sortOrder: 4,
  },
  {
    slug: 'human-dilemmas',
    name: 'Human Dilemmas',
    listDescription: ', anonymous survey and research platform, technical project manager',
    year: '2022',
    category: 'Research platform · privacy by design',
    caseTitle: 'Human Dilemmas: anonymous research platform',
    body: [
      'A survey platform for research on subjects people find hard to discuss: mental health, sexuality, personal belief. As technical project manager I owned the platform, the data collection and the reporting.',
      'Anonymity was treated as an engineering constraint rather than a setting: honest answers depend on it, so nothing identifying was collected in the first place.',
    ],
    tech: ['React', 'Django', 'PostgreSQL', 'Privacy by design'],
    linkUrl: null,
    linkLabel: null,
    sortOrder: 5,
  },
];

export const EXPERIENCE = [
  {
    period: '2022-Present',
    role: 'Verified Expert in Engineering',
    employer: 'Toptal',
    sortOrder: 0,
  },
  { period: '2023-2024', role: 'Senior Front-end Engineer', employer: 'Marketplug', sortOrder: 1 },
  { period: '2022-2023', role: 'Full-stack Developer', employer: 'NTA', sortOrder: 2 },
  {
    period: '2021-2022',
    role: 'Lead Front-end Engineer',
    employer: 'Humans · AMF Media',
    sortOrder: 3,
  },
  {
    period: '2018-2021',
    role: 'Full-stack Developer',
    employer: 'Invictus Solutions · Gamicacloud',
    sortOrder: 4,
  },
  {
    period: '2016-2018',
    role: 'Freelance Web Developer',
    employer: 'Remote client work',
    sortOrder: 5,
  },
];

export const PRINCIPLES = [
  {
    lead: 'I own the whole path from interface to database.',
    body: 'React, Next.js App Router and TypeScript on the front; Node, NestJS, GraphQL and PostgreSQL behind it. That means no handoff gaps, and no waiting on someone else to expose the endpoint I need.',
    sortOrder: 0,
  },
  {
    lead: 'Rescues and migrations are my speciality.',
    body: 'Create React App to the Next.js App Router, WordPress to streamed server components, Manifest V2 extensions to V3, all done incrementally on products that stayed live and kept earning while the work happened.',
    sortOrder: 1,
  },
  {
    lead: 'Speed is measured, not claimed.',
    body: 'Time-to-interactive down 40%, first paint from 3.4s to 1.2s, a p95 query from 480ms to 170ms, 45% off an initial load. I instrument first, then optimise what the data points at.',
    sortOrder: 2,
  },
  {
    lead: 'I make teams faster too.',
    body: 'Linting and review processes that cut bugs 70%, workshops that lifted throughput 45%, Storybook design systems, CI to Vercel and GitLab, and documents that get a new contributor running in ten minutes.',
    sortOrder: 3,
  },
  {
    lead: 'Vetted, and still learning.',
    body: 'Toptal Verified Expert in Engineering, TopAcademy Node.js Accelerator graduate, and currently shipping LLM-backed features, Chrome extensions and Mapbox and Algolia search at production scale.',
    sortOrder: 4,
  },
];

export const EDUCATION = [
  { line: 'MS Computer Science · 2020-2022', sortOrder: 0 },
  { line: 'BS Computer Science · 2016-2020', sortOrder: 1 },
  { line: 'TopAcademy Node.js Accelerator, Toptal · 2022', sortOrder: 2 },
  { line: 'Coursera: React, React Native, Node/Express/MongoDB · 2020', sortOrder: 3 },
];

export const COMMANDS = [
  {
    key: 'work',
    label: 'Selected work',
    hint: 'page',
    kind: 'route' as const,
    value: '/work',
    sortOrder: 0,
  },
  {
    key: 'about',
    label: 'About me',
    hint: 'page',
    kind: 'route' as const,
    value: '/about',
    sortOrder: 1,
  },
  {
    key: 'contact',
    label: 'Contact details',
    hint: 'page',
    kind: 'route' as const,
    value: '/contact',
    sortOrder: 2,
  },
  {
    key: 'hire',
    label: 'Email me about a role',
    hint: 'mail',
    kind: 'mailto' as const,
    value: null,
    sortOrder: 3,
  },
  {
    key: 'copy',
    label: 'Copy my email address',
    hint: 'copy',
    kind: 'copyEmail' as const,
    value: null,
    sortOrder: 4,
  },
  {
    key: 'whatsapp',
    label: 'Message me on WhatsApp',
    hint: 'link',
    kind: 'external' as const,
    value: 'https://wa.me/923158626392',
    sortOrder: 5,
  },
  {
    key: 'resume',
    label: 'Open my Toptal résumé',
    hint: 'link',
    kind: 'external' as const,
    value: 'https://www.toptal.com/developers/resume/usama-tufail',
    sortOrder: 6,
  },
  {
    key: 'linkedin',
    label: 'Open LinkedIn',
    hint: 'link',
    kind: 'external' as const,
    value: 'https://www.linkedin.com/in/samtufail/',
    sortOrder: 7,
  },
  {
    key: 'github',
    label: 'Open GitHub',
    hint: 'link',
    kind: 'external' as const,
    value: 'https://github.com/usamatufail',
    sortOrder: 8,
  },
  {
    key: 'whoami',
    label: 'Who am I, in four lines',
    hint: 'answer',
    kind: 'answer' as const,
    value: null,
    answerTitle: 'whoami',
    answerLines: [
      'Usama Tufail, called Sam. Senior full-stack engineer, ten years in, working remotely with teams in the US and Europe.',
      'Toptal Verified Expert in Engineering since 2022. Master’s in Computer Science.',
      'Best used for product front-ends in React and Next.js, rescues of codebases that grew faster than their architecture, and performance work with numbers attached.',
      'Remote, UTC+5, with a working day that overlaps both US and European mornings.',
    ],
    sortOrder: 9,
  },
  {
    key: 'numbers',
    label: 'The numbers, all in one place',
    hint: 'answer',
    kind: 'answer' as const,
    value: null,
    answerTitle: 'numbers',
    answerLines: [
      'Phia: time-to-interactive down 40%, first paint 3.4s to 1.2s, a p95 query from 480ms to 170ms.',
      'Phia extension: 10,000+ users at 4.7 stars, 38% fewer API calls, 94% parsing accuracy.',
      'CannaSpyglass: initial load down 45%, filters under 300ms, clicks-to-insight from 11 to 6.',
      'Marketplug: bugs down 70%, throughput up 45%. Investler Realty: reported vulnerabilities down 80%.',
    ],
    sortOrder: 10,
  },
  {
    key: 'stack',
    label: 'What I build with',
    hint: 'answer',
    kind: 'answer' as const,
    value: null,
    answerTitle: 'stack',
    answerLines: [
      'Front end: React, Next.js App Router, TypeScript, Redux and React Query, Tailwind, React Native, design systems in Storybook.',
      'Back end: Node and Express, NestJS, GraphQL, PostgreSQL with Prisma, MongoDB, Redis, JWT and OAuth 2.',
      'Around it: Vercel, AWS, Docker, GitHub Actions, Supabase and Firebase, Stripe, Mapbox and Algolia, Jest and Cypress, Chrome extensions, LLM integration.',
    ],
    sortOrder: 11,
  },
  {
    key: 'availability',
    label: 'Availability and how I work',
    hint: 'answer',
    kind: 'answer' as const,
    value: null,
    answerTitle: 'availability',
    answerLines: [
      '{availability}. Remote, UTC+5, with a working day that overlaps both US and European mornings.',
      'The work I take on is senior front-end and full-stack: new products, rescue missions, and migrations that have to ship without downtime.',
      'Engagements usually start with a short call, then a paid week so you can judge the work rather than the CV.',
    ],
    sortOrder: 12,
  },
];
