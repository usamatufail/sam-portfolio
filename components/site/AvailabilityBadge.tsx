import type { AvailabilityState } from '@/db/schema';
import { Editable } from '@/components/edit/Editable';
import { AVAILABILITY_DOT } from '@/lib/availability';

/**
 * The footer availability badge. The message carries the meaning on its own;
 * the dot is a redundant cue, never the only one.
 */
export function AvailabilityBadge({
  state,
  message,
  path,
}: {
  state: AvailabilityState;
  message: string;
  /** Inline-edit path for the message backing the current state. */
  path: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`h-[7px] w-[7px] flex-none rounded-full ${AVAILABILITY_DOT[state]}`}
      />
      <Editable path={path} value={message} />
    </span>
  );
}
