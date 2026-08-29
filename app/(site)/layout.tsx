import { AvailabilityBadge } from '@/components/site/AvailabilityBadge';
import { CommandPalette } from '@/components/site/CommandPalette';
import { Header } from '@/components/site/Header';
import { PageShell } from '@/components/site/PageShell';
import { RevealRoot } from '@/components/site/RevealRoot';
import { EditProvider } from '@/components/edit/EditProvider';
import { EditToolbar } from '@/components/edit/EditToolbar';
import { Editable } from '@/components/edit/Editable';
import { applyAvailabilityToken, availabilityMessage } from '@/lib/availability';
import { editPath } from '@/lib/inline/fields';
import { getCommands, getSettings } from '@/lib/queries';

/** The settings column backing whichever availability state is live. */
const AVAILABILITY_FIELD = {
  available: 'availabilityAvailable',
  limited: 'availabilityLimited',
  unavailable: 'availabilityUnavailable',
} as const;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, commands] = await Promise.all([getSettings(), getCommands()]);
  const availability = availabilityMessage(settings);

  return (
    <EditProvider>
      <div className="flex min-h-screen flex-col">
        <Header wordmark={settings.wordmark} />

        <PageShell>{children}</PageShell>

        <footer className="text-muted-2 mx-auto flex w-full max-w-[720px] flex-col gap-2 px-[28px] pb-[44px] font-mono text-[12.5px] sm:flex-row sm:justify-between sm:gap-4">
          <Editable path={editPath('settings', 1, 'footerLeft')} value={settings.footerLeft} />
          <AvailabilityBadge
            state={settings.availabilityState}
            message={availability}
            path={editPath('settings', 1, AVAILABILITY_FIELD[settings.availabilityState])}
          />
        </footer>

        <CommandPalette
          commands={commands.map((c) => ({
            id: c.id,
            key: c.key,
            label: c.label,
            hint: c.hint,
            kind: c.kind,
            value: c.value,
            answerTitle: c.answerTitle,
            answerLines: applyAvailabilityToken(c.answerLines, availability),
          }))}
          email={settings.email}
          placeholder={settings.palettePlaceholder}
        />

        <RevealRoot />
        <EditToolbar />
      </div>
    </EditProvider>
  );
}
