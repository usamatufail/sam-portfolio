import type { AvailabilityState, Settings } from '@/db/schema';

type AvailabilityFields = Pick<
  Settings,
  'availabilityState' | 'availabilityAvailable' | 'availabilityLimited' | 'availabilityUnavailable'
>;

/** The one place the site is allowed to state whether Sam is taking work. */
export function availabilityMessage(settings: AvailabilityFields): string {
  switch (settings.availabilityState) {
    case 'available':
      return settings.availabilityAvailable;
    case 'limited':
      return settings.availabilityLimited;
    case 'unavailable':
      return settings.availabilityUnavailable;
  }
}

export const AVAILABILITY_TOKEN = '{availability}';

/**
 * Substitutes {availability} in command-palette answer copy, so a palette
 * answer about availability can never drift from the footer badge.
 *
 * The substituted text is capitalised when it starts the line, which lets the
 * same lowercase message ("available for work") read correctly both as a badge
 * and as the opening of a sentence.
 */
export function applyAvailabilityToken(lines: string[], message: string): string[] {
  return lines.map((line) => {
    if (!line.includes(AVAILABILITY_TOKEN)) return line;
    const leading = line.startsWith(AVAILABILITY_TOKEN);
    const replacement = leading ? message.charAt(0).toUpperCase() + message.slice(1) : message;
    return line.replaceAll(AVAILABILITY_TOKEN, replacement);
  });
}

export const AVAILABILITY_DOT: Record<AvailabilityState, string> = {
  available: 'bg-status-available',
  limited: 'bg-status-limited',
  unavailable: 'bg-status-unavailable',
};
