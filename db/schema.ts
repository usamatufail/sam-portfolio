import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

/**
 * Singleton row (id = 1) holding every piece of standalone site copy:
 * identity, contact links, per-page headings and the SEO block.
 */
export const settings = pgTable('settings', {
  id: integer('id').primaryKey().default(1),

  // Identity + hero
  wordmark: text('wordmark').notNull(),
  fullName: text('full_name').notNull(),
  jobTitle: text('job_title').notNull(),
  heroHeadline: text('hero_headline').notNull(),
  heroParagraphs: jsonb('hero_paragraphs').$type<string[]>().notNull().default([]),
  avatarUrl: text('avatar_url').notNull(),
  avatarAlt: text('avatar_alt').notNull(),

  // Toptal badge
  badgeEnabled: boolean('badge_enabled').notNull().default(true),
  badgeHeadline: text('badge_headline').notNull(),
  badgeVettedBy: text('badge_vetted_by').notNull(),
  badgeCtaLabel: text('badge_cta_label').notNull(),
  badgeCtaUrl: text('badge_cta_url').notNull(),

  // Contact + profiles
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  phoneLabel: text('phone_label').notNull(),
  linkedinUrl: text('linkedin_url').notNull(),
  linkedinLabel: text('linkedin_label').notNull(),
  githubUrl: text('github_url').notNull(),
  githubLabel: text('github_label').notNull(),
  resumeUrl: text('resume_url').notNull(),
  resumeLabel: text('resume_label').notNull(),

  // Home
  selectedWorkLabel: text('selected_work_label').notNull(),
  selectedWorkCta: text('selected_work_cta').notNull(),

  // Work page
  workTitle: text('work_title').notNull(),
  workIntro: text('work_intro').notNull(),
  alsoShipped: text('also_shipped').notNull(),

  // About page
  aboutTitle: text('about_title').notNull(),
  aboutParagraphs: jsonb('about_paragraphs').$type<string[]>().notNull().default([]),
  experienceLabel: text('experience_label').notNull(),
  principlesLabel: text('principles_label').notNull(),
  educationLabel: text('education_label').notNull(),

  // Contact page
  contactTitle: text('contact_title').notNull(),
  contactIntro: text('contact_intro').notNull(),

  // Footer + palette
  footerLeft: text('footer_left').notNull(),
  footerRight: text('footer_right').notNull(),
  palettePlaceholder: text('palette_placeholder').notNull(),

  // SEO
  seoTitle: text('seo_title').notNull(),
  seoDescription: text('seo_description').notNull(),
  seoKeywords: text('seo_keywords').notNull(),
  ogTitle: text('og_title').notNull(),
  ogDescription: text('og_description').notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** A project: one row in the home list and one case study on /work. */
export const projects = pgTable(
  'projects',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    listDescription: text('list_description').notNull(),
    year: text('year').notNull(),
    category: text('category').notNull(),
    caseTitle: text('case_title').notNull(),
    body: jsonb('body').$type<string[]>().notNull().default([]),
    tech: jsonb('tech').$type<string[]>().notNull().default([]),
    linkUrl: text('link_url'),
    linkLabel: text('link_label'),
    featured: boolean('featured').notNull().default(true),
    published: boolean('published').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('projects_slug_idx').on(t.slug)],
);

/** A row in the About page experience timeline. */
export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  period: text('period').notNull(),
  role: text('role').notNull(),
  employer: text('employer').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

/** A "How I work" paragraph: a bold lead phrase followed by evidence. */
export const principles = pgTable('principles', {
  id: serial('id').primaryKey(),
  lead: text('lead').notNull(),
  body: text('body').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

/** A line in the Education & certifications block. */
export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  line: text('line').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const COMMAND_KINDS = ['route', 'external', 'mailto', 'copyEmail', 'answer'] as const;
export type CommandKind = (typeof COMMAND_KINDS)[number];

/** A row in the ⌘K command palette. */
export const commands = pgTable(
  'commands',
  {
    id: serial('id').primaryKey(),
    key: text('key').notNull(),
    label: text('label').notNull(),
    hint: text('hint').notNull(),
    kind: text('kind').$type<CommandKind>().notNull(),
    /** Route path for `route`, absolute URL for `external`. Ignored otherwise. */
    value: text('value'),
    answerTitle: text('answer_title'),
    answerLines: jsonb('answer_lines').$type<string[]>().notNull().default([]),
    enabled: boolean('enabled').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => [uniqueIndex('commands_key_idx').on(t.key)],
);

export type Settings = typeof settings.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Principle = typeof principles.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Command = typeof commands.$inferSelect;
