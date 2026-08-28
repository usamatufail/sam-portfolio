import { CommandPalette } from '@/components/site/CommandPalette';
import { Header } from '@/components/site/Header';
import { PageShell } from '@/components/site/PageShell';
import { RevealRoot } from '@/components/site/RevealRoot';
import { getCommands, getSettings } from '@/lib/queries';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, commands] = await Promise.all([getSettings(), getCommands()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header wordmark={settings.wordmark} />

      <PageShell>{children}</PageShell>

      <footer className="mx-auto flex w-full max-w-[720px] justify-between gap-4 px-[28px] pb-[44px] font-mono text-[12.5px] text-muted-2">
        <span>{settings.footerLeft}</span>
        <span>{settings.footerRight}</span>
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
          answerLines: c.answerLines,
        }))}
        email={settings.email}
        placeholder={settings.palettePlaceholder}
      />

      <RevealRoot />
    </div>
  );
}
