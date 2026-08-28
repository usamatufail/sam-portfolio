'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { COMMAND_KINDS, type Command } from '@/db/schema';
import { updateCommand } from '@/lib/actions/content';
import type { ActionState } from '@/lib/actions/types';
import { formatParagraphs } from '@/lib/parse';
import { Field, SaveBar, Section, Select, TextArea, Toggle } from './ui';

const KIND_LABELS: Record<(typeof COMMAND_KINDS)[number], string> = {
  route: 'Go to a page on this site',
  external: 'Open an external link',
  mailto: 'Start an email to me',
  copyEmail: 'Copy my email to the clipboard',
  answer: 'Print an answer inside the palette',
};

export function CommandForm({ command }: { command: Command }) {
  const [state, action] = useActionState<ActionState, FormData>(updateCommand, null);
  const [kind, setKind] = useState(command.kind);

  const needsValue = kind === 'route' || kind === 'external';
  const isAnswer = kind === 'answer';

  return (
    <form action={action} className="flex flex-col gap-6">
      <input type="hidden" name="id" value={command.id} />

      <Section title="Row" description="How this appears in the ⌘K list.">
        <Field label="label" name="label" defaultValue={command.label} />
        <Field
          label="hint"
          name="hint"
          defaultValue={command.hint}
          hint="The right-aligned mono text, e.g. page, link, answer."
        />
        <Field
          label="key"
          name="key"
          defaultValue={command.key}
          hint="Unique. Also matched when searching the palette."
        />
        <Select
          label="type"
          name="kind"
          defaultValue={command.kind}
          onChange={(value) => {
            const next = COMMAND_KINDS.find((candidate) => candidate === value);
            if (next) setKind(next);
          }}
          options={COMMAND_KINDS.map((k) => ({ value: k, label: KIND_LABELS[k] }))}
        />
        <div className="sm:col-span-2">
          <Toggle
            label="Enabled"
            name="enabled"
            defaultChecked={command.enabled}
            hint="Disabled commands are hidden from the palette."
          />
        </div>
      </Section>

      {needsValue && (
        <Section title={kind === 'route' ? 'Destination' : 'Link'} columns={1}>
          <Field
            label={kind === 'route' ? 'path' : 'url'}
            name="value"
            defaultValue={command.value}
            hint={kind === 'route' ? 'A path on this site, e.g. /work.' : 'A full URL including https://'}
          />
        </Section>
      )}

      {!needsValue && <input type="hidden" name="value" value={command.value ?? ''} />}

      {isAnswer && (
        <Section title="Answer view" description="Shown inside the palette when the command runs." columns={1}>
          <Field
            label="title"
            name="answerTitle"
            defaultValue={command.answerTitle}
            hint="The mono accent heading, e.g. whoami."
          />
          <TextArea
            label="lines"
            name="answerLines"
            defaultValue={formatParagraphs(command.answerLines)}
            rows={10}
            hint="One paragraph per block, separated by a blank line."
          />
        </Section>
      )}

      {!isAnswer && (
        <>
          <input type="hidden" name="answerTitle" value={command.answerTitle ?? ''} />
          <input type="hidden" name="answerLines" value={formatParagraphs(command.answerLines)} />
        </>
      )}

      <SaveBar state={state} />

      <Link href="/admin/commands" className="font-mono text-[13px] text-muted hover:text-accent">
        ← all commands
      </Link>
    </form>
  );
}
