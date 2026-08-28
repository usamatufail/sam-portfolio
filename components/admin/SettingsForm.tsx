'use client';

import { useActionState } from 'react';
import type { Settings } from '@/db/schema';
import { saveSettings } from '@/lib/actions/content';
import type { ActionState } from '@/lib/actions/types';
import { formatParagraphs } from '@/lib/parse';
import { Field, SaveBar, Section, TextArea, Toggle } from './ui';

const PARAGRAPH_HINT = 'One paragraph per block, separated by a blank line.';

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action] = useActionState<ActionState, FormData>(saveSettings, null);

  return (
    <form action={action} className="flex flex-col gap-6">
      <Section title="Identity" description="The wordmark in the header and the name search engines index.">
        <Field label="wordmark" name="wordmark" defaultValue={settings.wordmark} />
        <Field label="full name" name="fullName" defaultValue={settings.fullName} />
        <Field label="job title" name="jobTitle" defaultValue={settings.jobTitle} hint="Used in the Person schema." />
        <Field label="avatar url" name="avatarUrl" defaultValue={settings.avatarUrl} hint="A path under /public, or an absolute URL." />
        <Field label="avatar alt text" name="avatarAlt" defaultValue={settings.avatarAlt} />
      </Section>

      <Section title="Home hero" columns={1}>
        <TextArea label="headline" name="heroHeadline" defaultValue={settings.heroHeadline} rows={2} />
        <TextArea
          label="intro paragraphs"
          name="heroParagraphs"
          defaultValue={formatParagraphs(settings.heroParagraphs)}
          rows={9}
          hint={PARAGRAPH_HINT}
        />
      </Section>

      <Section title="Toptal badge" description="Toptal's own mark. Copy is editable; the styling is theirs.">
        <div className="sm:col-span-2">
          <Toggle
            label="Show the badge on the home page"
            name="badgeEnabled"
            defaultChecked={settings.badgeEnabled}
          />
        </div>
        <Field label="headline" name="badgeHeadline" defaultValue={settings.badgeHeadline} />
        <Field label="vetted-by line" name="badgeVettedBy" defaultValue={settings.badgeVettedBy} />
        <Field label="button label" name="badgeCtaLabel" defaultValue={settings.badgeCtaLabel} />
        <div className="sm:col-span-2">
          <Field
            label="button url"
            name="badgeCtaUrl"
            defaultValue={settings.badgeCtaUrl}
            hint="Toptal's referral link — keep the #fragment, it is what credits the referral."
          />
        </div>
      </Section>

      <Section title="Contact and profiles" description="Used on the contact page, the hero link row and the command palette.">
        <Field label="email" name="email" type="email" defaultValue={settings.email} />
        <Field label="phone" name="phone" defaultValue={settings.phone} hint="Digits only; the WhatsApp link is built from this." />
        <Field label="phone label" name="phoneLabel" defaultValue={settings.phoneLabel} hint="How the number is displayed." />
        <div />
        <Field label="linkedin url" name="linkedinUrl" defaultValue={settings.linkedinUrl} />
        <Field label="linkedin label" name="linkedinLabel" defaultValue={settings.linkedinLabel} />
        <Field label="github url" name="githubUrl" defaultValue={settings.githubUrl} />
        <Field label="github label" name="githubLabel" defaultValue={settings.githubLabel} />
        <Field label="résumé url" name="resumeUrl" defaultValue={settings.resumeUrl} />
        <Field label="résumé label" name="resumeLabel" defaultValue={settings.resumeLabel} />
      </Section>

      <Section title="Home — selected work">
        <Field label="section label" name="selectedWorkLabel" defaultValue={settings.selectedWorkLabel} />
        <Field label="closing link" name="selectedWorkCta" defaultValue={settings.selectedWorkCta} />
      </Section>

      <Section title="Work page" columns={1}>
        <Field label="heading" name="workTitle" defaultValue={settings.workTitle} />
        <TextArea label="intro" name="workIntro" defaultValue={settings.workIntro} rows={3} />
        <TextArea label="also shipped" name="alsoShipped" defaultValue={settings.alsoShipped} rows={2} />
      </Section>

      <Section title="About page" columns={1}>
        <Field label="heading" name="aboutTitle" defaultValue={settings.aboutTitle} />
        <TextArea
          label="narrative paragraphs"
          name="aboutParagraphs"
          defaultValue={formatParagraphs(settings.aboutParagraphs)}
          rows={12}
          hint={PARAGRAPH_HINT}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="experience label" name="experienceLabel" defaultValue={settings.experienceLabel} />
          <Field label="how-I-work label" name="principlesLabel" defaultValue={settings.principlesLabel} />
          <Field label="education label" name="educationLabel" defaultValue={settings.educationLabel} />
        </div>
      </Section>

      <Section title="Contact page" columns={1}>
        <Field label="heading" name="contactTitle" defaultValue={settings.contactTitle} />
        <TextArea label="intro" name="contactIntro" defaultValue={settings.contactIntro} rows={3} />
      </Section>

      <Section title="Footer and palette">
        <Field label="footer left" name="footerLeft" defaultValue={settings.footerLeft} />
        <Field label="footer right" name="footerRight" defaultValue={settings.footerRight} />
        <div className="sm:col-span-2">
          <Field
            label="palette placeholder"
            name="palettePlaceholder"
            defaultValue={settings.palettePlaceholder}
          />
        </div>
      </Section>

      <Section title="SEO" description="Feeds the <title>, meta description, Open Graph tags and the Person schema." columns={1}>
        <Field label="title" name="seoTitle" defaultValue={settings.seoTitle} />
        <TextArea label="description" name="seoDescription" defaultValue={settings.seoDescription} rows={3} />
        <TextArea label="keywords" name="seoKeywords" defaultValue={settings.seoKeywords} rows={3} hint="Comma separated." />
        <Field label="og:title" name="ogTitle" defaultValue={settings.ogTitle} />
        <TextArea label="og:description" name="ogDescription" defaultValue={settings.ogDescription} rows={3} />
      </Section>

      <SaveBar state={state} />
    </form>
  );
}
