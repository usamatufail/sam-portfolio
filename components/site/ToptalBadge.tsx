/**
 * Toptal's own embeddable badge, kept verbatim from the snippet Toptal issues.
 * The CTA carries a referral fragment, so it is a separate field from the plain
 * résumé link. Toptal's mark, colours and gradients are deliberately not restyled.
 */
const HEX = 'polygon(50% 0, 100% 24%, 100% 76%, 50% 100%, 0 76%, 0 24%)';

const GLOW = [
  'radial-gradient(circle at 20% -10%, #00c3ff -80%, #fff 30%)',
  'radial-gradient(circle at -20% 20%, #00c3ff -80%, #fff 30%)',
  'radial-gradient(circle at 70% 100%, #00c3ff -80%, #fff 30%)',
  'radial-gradient(circle at 120% 80%, #00c3ff -80%, #fff 30%)',
].join(', ');

import { Editable } from '@/components/edit/Editable';
import { ToptalStars, ToptalWordmark } from './toptal-marks';
import { editPath } from '@/lib/inline/fields';

export function ToptalBadge({
  headline,
  vettedBy,
  ctaLabel,
  ctaUrl,
}: {
  headline: string;
  vettedBy: string;
  ctaLabel: string;
  ctaUrl: string;
}) {
  return (
    <>
      <link rel="preconnect" href="https://use.typekit.net" />
      <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
      <link rel="stylesheet" href="https://use.typekit.net/kmj5qkr.css" />

      <div
        data-anim=""
        className="flex justify-center pt-[4px] sm:justify-end"
        style={{ fontFamily: 'proxima-nova, Arial, sans-serif' }}
      >
        <div
          className="ease-site inline-block bg-[#25a9ef] p-[6px] transition-transform duration-500 hover:-translate-y-[4px] hover:scale-[1.02]"
          style={{ clipPath: HEX }}
        >
          <div
            className="flex w-[200px] flex-col items-center gap-2 pt-6 pb-10 text-center text-[#204ecf]"
            style={{
              clipPath: HEX,
              backgroundImage: GLOW,
              backgroundBlendMode: 'multiply',
              boxShadow: '0 28px 50px rgba(6, 30, 96, 0.35)',
            }}
          >
            <ToptalStars />

            {/* Badge branding, not a section heading: as an <h3> after the
                page's <h1> it skipped a level in the document outline. */}
            <Editable
              as="div"
              path={editPath('settings', 1, 'badgeHeadline')}
              value={headline}
              className="m-0 text-[19px] leading-none font-bold"
            />
            <div className="h-px w-[120px] bg-[#25a9ef]" />
            <Editable
              path={editPath('settings', 1, 'badgeVettedBy')}
              value={vettedBy}
              className="mb-[-6px] text-base"
            />

            <ToptalWordmark />

            <a
              href={ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center justify-center rounded-md bg-[#296bff] px-5 py-1 text-base font-medium text-white"
              style={{ textDecorationThickness: '0.5px', textUnderlineOffset: '2px' }}
            >
              <Editable path={editPath('settings', 1, 'badgeCtaLabel')} value={ctaLabel} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
