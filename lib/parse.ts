/**
 * `FormDataEntryValue` is `string | File`. Every helper here narrows to string
 * explicitly, because coercing a File would silently store "[object File]".
 */
function text(raw: FormDataEntryValue | null): string {
  return typeof raw === 'string' ? raw : '';
}

/** Blank-line separated blocks -> paragraphs. Used by the admin textareas. */
export function parseParagraphs(raw: FormDataEntryValue | null): string[] {
  return text(raw)
    .split(/\n\s*\n/)
    .map((block) => block.trim().replace(/\s*\n\s*/g, ' '))
    .filter(Boolean);
}

export function formatParagraphs(items: string[]): string {
  return items.join('\n\n');
}

/** Comma separated tokens -> list. Used for tech tags and keywords. */
export function parseTokens(raw: FormDataEntryValue | null): string[] {
  return text(raw)
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);
}

export function formatTokens(items: string[]): string {
  return items.join(', ');
}

export function str(raw: FormDataEntryValue | null): string {
  return text(raw).trim();
}

export function optionalStr(raw: FormDataEntryValue | null): string | null {
  const value = str(raw);
  return value === '' ? null : value;
}

export function bool(raw: FormDataEntryValue | null): boolean {
  return raw === 'on' || raw === 'true';
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}
