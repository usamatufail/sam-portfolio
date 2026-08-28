CREATE TABLE "commands" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"hint" text NOT NULL,
	"kind" text NOT NULL,
	"value" text,
	"answer_title" text,
	"answer_lines" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"line" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"period" text NOT NULL,
	"role" text NOT NULL,
	"employer" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "principles" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead" text NOT NULL,
	"body" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"list_description" text NOT NULL,
	"year" text NOT NULL,
	"category" text NOT NULL,
	"case_title" text NOT NULL,
	"body" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tech" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"link_url" text,
	"link_label" text,
	"featured" boolean DEFAULT true NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"wordmark" text NOT NULL,
	"full_name" text NOT NULL,
	"job_title" text NOT NULL,
	"hero_headline" text NOT NULL,
	"hero_paragraphs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"avatar_url" text NOT NULL,
	"avatar_alt" text NOT NULL,
	"badge_enabled" boolean DEFAULT true NOT NULL,
	"badge_headline" text NOT NULL,
	"badge_vetted_by" text NOT NULL,
	"badge_cta_label" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"phone_label" text NOT NULL,
	"linkedin_url" text NOT NULL,
	"linkedin_label" text NOT NULL,
	"github_url" text NOT NULL,
	"github_label" text NOT NULL,
	"resume_url" text NOT NULL,
	"resume_label" text NOT NULL,
	"selected_work_label" text NOT NULL,
	"selected_work_cta" text NOT NULL,
	"work_title" text NOT NULL,
	"work_intro" text NOT NULL,
	"also_shipped" text NOT NULL,
	"about_title" text NOT NULL,
	"about_paragraphs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"experience_label" text NOT NULL,
	"principles_label" text NOT NULL,
	"education_label" text NOT NULL,
	"contact_title" text NOT NULL,
	"contact_intro" text NOT NULL,
	"footer_left" text NOT NULL,
	"footer_right" text NOT NULL,
	"palette_placeholder" text NOT NULL,
	"seo_title" text NOT NULL,
	"seo_description" text NOT NULL,
	"seo_keywords" text NOT NULL,
	"og_title" text NOT NULL,
	"og_description" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "commands_key_idx" ON "commands" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");