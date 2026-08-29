import { AvailabilityBadge } from '@/components/site/AvailabilityBadge';
import { CommandPalette } from '@/components/site/CommandPalette';
import { Header } from '@/components/site/Header';
import { PageShell } from '@/components/site/PageShell';
import { RevealRoot } from '@/components/site/RevealRoot';
import { applyAvailabilityToken, availabilityMessage } from '@/lib/availability';
import { getCommands, getSettings } from '@/lib/queries';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, commands] = await Promise.all([getSettings(), getCommands()]);
  const availability = availabilityMessage(settings);

  return (
    <div className="flex min-h-screen flex-col">
      <Header wordmark={settings.wordmark} />

      <PageShell>{children}</PageShell>

      <footer className="text-muted-2 mx-auto flex w-full max-w-[720px] flex-col gap-2 px-[28px] pb-[44px] font-mono text-[12.5px] sm:flex-row sm:justify-between sm:gap-4">
        <span>{settings.footerLeft}</span>
        <AvailabilityBadge state={settings.availabilityState} message={availability} />
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
    </div>
  );
}
