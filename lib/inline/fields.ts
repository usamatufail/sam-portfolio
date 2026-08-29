/**
 * Every field the inline editor is allowed to write, and nothing else.
 *
 * Inline edits arrive from the browser as `table:id:field` strings, so this
 * allowlist is the security boundary: without it a caller could name any column
 * on any table. Adding a field here is what makes it editable on the page.
 */
export const EDITABLE_FIELDS = {
  settings: {
    scalars: [
      'wordmark',
      'heroHeadline',
      'badgeHeadline',
      'badgeVettedBy',
      'badgeCtaLabel',
      'email',
      'phoneLabel',
      'linkedinLabel',
      'githubLabel',
      'resumeLabel',
      'selectedWorkLabel',
      'selectedWorkCta',
      'workTitle',
      'workIntro',
      'alsoShipped',
      'aboutTitle',
      'experienceLabel',
      'principlesLabel',
      'educationLabel',
      'contactTitle',
      'contactIntro',
      'footerLeft',
      // Whichever availability message is currently live. The page resolves
      // which of the three columns that is and sends its name.
      'availabilityAvailable',
      'availabilityLimited',
      'availabilityUnavailable',
    ],
    arrays: ['heroParagraphs', 'aboutParagraphs'],
  },
  projects: {
    scalars: ['name', 'listDescription', 'year', 'category', 'caseTitle', 'linkLabel'],
    arrays: ['body', 'tech'],
  },
  experience: { scalars: ['period', 'role', 'employer'], arrays: [] },
  principles: { scalars: ['lead', 'body'], arrays: [] },
  education: { scalars: ['line'], arrays: [] },
} as const;

export type EditableTable = keyof typeof EDITABLE_FIELDS;

export type ParsedPath = {
  table: EditableTable;
  id: number;
  field: string;
  /** Present only for array fields, e.g. the 2nd paragraph of a case study. */
  index?: number;
};

const TABLES = Object.keys(EDITABLE_FIELDS) as EditableTable[];

/** Builds the identifier an Editable sends back on save. */
export function editPath(table: EditableTable, id: number, field: string, index?: number): string {
  return index === undefined ? `${table}:${id}:${field}` : `${table}:${id}:${field}:${index}`;
}

/** Returns null for anything not explicitly allowed above. */
export function parseEditPath(path: string): ParsedPath | null {
  const parts = path.split(':');
  if (parts.length < 3 || parts.length > 4) return null;

  const [rawTable, rawId, field, rawIndex] = parts;
  const table = TABLES.find((t) => t === rawTable);
  if (!table) return null;

  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) return null;

  const spec = EDITABLE_FIELDS[table];
  const isScalar = (spec.scalars as readonly string[]).includes(field);
  const isArray = (spec.arrays as readonly string[]).includes(field);

  if (rawIndex === undefined) {
    return isScalar ? { table, id, field } : null;
  }

  if (!isArray) return null;
  const index = Number(rawIndex);
  if (!Number.isInteger(index) || index < 0 || index > 200) return null;
  return { table, id, field, index };
}
