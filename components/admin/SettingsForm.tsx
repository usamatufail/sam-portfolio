'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { AVAILABILITY_STATES, type Settings } from '@/db/schema';
import { saveSettings } from '@/lib/actions/settings';
import type { ActionState } from '@/lib/actions/types';
import { Field, SaveBar, Section, Select, TextArea, Toggle } from './ui';

const FIELD_BY_STATE = {
  available: 'availabilityAvailable',
  limited: 'availabilityLimited',
  unavailable: 'availabilityUnavailable',
} as const;

/**
 * Only what cannot be edited on the page itself.
 *
 * Everything visible — headings, intros, paragraphs, labels, link text — is now
 * edited inline on the site via the command palette, so it deliberately does
 * not appear here too. What is left is the things with no on-page text to click:
 * URLs behind links, image sources, structured data, and SEO metadata.
 */
export function SettingsForm({ settings }: { settings: Settings }) {
  const [formState, action] = useActionState<ActionState, FormData>(saveSettings, null);
  const [state, setState] = useState<Settings['availabilityState']>(settings.availabilityState);

  return (
    <form action={action} className="flex flex-col gap-6">
      <p className="border-rule bg-panel text-text-5 m-0 rounded-2xl border p-4 text-[14px] leading-[1.7]">
        Headings, paragraphs and labels are edited on the site itself: open it, press{' '}
        <span className="text-text font-mono">⌘K</span>, type your code, then use the{' '}
        <span className="text-text">edit</span> toggle.{' '}
        <Link href="/" target="_blank" className="text-accent -my-2 inline-block py-2">
          Open the site ↗
        </Link>
      </p>

      <Section
        title="Identity"
        description="Not shown as text on the page; used for structured data and the portrait."
      >
        <Field
          label="full name"
          name="fullName"
          defaultValue={settings.fullName}
          hint="Person schema."
        />
        <Field
          label="job title"
          name="jobTitle"
          defaultValue={settings.jobTitle}
          hint="Person schema."
        />
        <Field
          label="avatar url"
          name="avatarUrl"
          defaultValue={settings.avatarUrl}
          hint="A path under /public, or an absolute URL."
        />
        <Field
          label="avatar alt text"
          name="avatarAlt"
          defaultValue={settings.avatarAlt}
          hint="Read by screen readers."
        />
      </Section>

      <Section
        title="Links"
        description="The destinations. The visible link text is edited on the page."
      >
        <Field label="email" name="email" type="email" defaultValue={settings.email} />
        <Field
          label="phone"
          name="phone"
          defaultValue={settings.phone}
          hint="Digits only; the WhatsApp link is built from this."
        />
        <Field label="linkedin url" name="linkedinUrl" defaultValue={settings.linkedinUrl} />
        <Field label="github url" name="githubUrl" defaultValue={settings.githubUrl} />
        <Field label="résumé url" name="resumeUrl" defaultValue={settings.resumeUrl} />
        <Field
          label="palette placeholder"
          name="palettePlaceholder"
          defaultValue={settings.palettePlaceholder}
          hint="Placeholder text inside ⌘K."
        />
      </Section>

      <Section title="Toptal badge">
        <div className="sm:col-span-2">
          <Toggle
            label="Show the badge on the home page"
            name="badgeEnabled"
            defaultChecked={settings.badgeEnabled}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="button url"
            name="badgeCtaUrl"
            defaultValue={settings.badgeCtaUrl}
            hint="Toptal's referral link. Keep the #fragment, it is what credits the referral."
          />
        </div>
      </Section>

      <Section
        title="Availability"
        description="The only place the site states whether you are taking work. The live message can also be edited inline in the footer."
        columns={1}
      >
        <Select
          label="current state"
          name="availabilityState"
          defaultValue={settings.availabilityState}
          onChange={(value) => {
            const next = AVAILABILITY_STATES.find((candidate) => candidate === value);
            if (next) setState(next);
          }}
          options={[
            { value: 'available', label: 'Available, taking work' },
            { value: 'limited', label: 'Limited, mostly booked' },
            { value: 'unavailable', label: 'Unavailable, not taking work' },
          ]}
        />
        <div className="flex flex-col gap-4">
          {AVAILABILITY_STATES.map((option) => (
            <div
              key={option}
              className={
                option === state ? '' : 'opacity-45 transition-opacity focus-within:opacity-100'
              }
            >
              <Field
                label={option === state ? `${option} (live now)` : option}
                name={FIELD_BY_STATE[option]}
                defaultValue={settings[FIELD_BY_STATE[option]]}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="SEO"
        description="Never rendered as text, so it has no inline equivalent."
        columns={1}
      >
        <Field label="title" name="seoTitle" defaultValue={settings.seoTitle} />
        <TextArea
          label="description"
          name="seoDescription"
          defaultValue={settings.seoDescription}
          rows={3}
        />
        <TextArea
          label="keywords"
          name="seoKeywords"
          defaultValue={settings.seoKeywords}
          rows={3}
          hint="Comma separated."
        />
        <Field label="og:title" name="ogTitle" defaultValue={settings.ogTitle} />
        <TextArea
          label="og:description"
          name="ogDescription"
          defaultValue={settings.ogDescription}
          rows={3}
        />
      </Section>

      <SaveBar state={formState} />
    </form>
  );
}
