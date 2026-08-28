ALTER TABLE "settings" ADD COLUMN "availability_state" text NOT NULL DEFAULT 'available';--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "availability_available" text NOT NULL DEFAULT 'available for work';--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "availability_limited" text NOT NULL DEFAULT 'mostly booked — open to a conversation';--> statement-breakpoint
ALTER TABLE "settings" ADD COLUMN "availability_unavailable" text NOT NULL DEFAULT 'not taking new work right now';--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "availability_state" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "availability_available" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "availability_limited" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "availability_unavailable" DROP DEFAULT;
