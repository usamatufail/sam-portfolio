import type { CommandKind } from '@/db/schema';

/** A command palette row, shaped for the client. */
export type PaletteCommand = {
  id: number;
  key: string;
  label: string;
  hint: string;
  kind: CommandKind;
  value: string | null;
  answerTitle: string | null;
  answerLines: string[];
};

/** What the palette is currently showing. */
export type PaletteView = { mode: 'list' } | { mode: 'answer'; title: string; lines: string[] };

/** Substring match across the label, key and hint. Pure, so it is testable. */
export function filterCommands(commands: PaletteCommand[], query: string): PaletteCommand[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return commands;
  return commands.filter((command) =>
    `${command.label} ${command.key} ${command.hint}`.toLowerCase().includes(needle),
  );
}
