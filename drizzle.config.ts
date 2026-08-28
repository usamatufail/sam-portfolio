import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: ['.env.local', '.env'], quiet: true });

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
  strict: true,
  verbose: true,
});
