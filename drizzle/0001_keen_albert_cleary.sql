ALTER TABLE "settings" ADD COLUMN "badge_cta_url" text NOT NULL DEFAULT 'https://www.toptal.com/developers/resume/usama-tufail#BGGYeP';--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "badge_cta_url" DROP DEFAULT;
