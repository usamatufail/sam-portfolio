import { config } from 'dotenv';

config({ path: ['.env.local', '.env'], quiet: true });

const { db } = await import('./index.js');
const { settings, projects, experience, principles, education, commands } =
  await import('./schema.js');
const { SETTINGS, PROJECTS, EXPERIENCE, PRINCIPLES, EDUCATION, COMMANDS } =
  await import('./seed-data.js');

const force = process.argv.includes('--force');

async function main() {
  const existing = await db.select({ id: settings.id }).from(settings).limit(1);

  if (existing.length > 0 && !force) {
    console.log('Database already seeded. Re-run with --force to reset all content.');
    return;
  }

  if (force) {
    console.log('--force: clearing existing content…');
    await db.delete(commands);
    await db.delete(education);
    await db.delete(principles);
    await db.delete(experience);
    await db.delete(projects);
    await db.delete(settings);
  }

  await db.insert(settings).values(SETTINGS);
  await db.insert(projects).values(PROJECTS);
  await db.insert(experience).values(EXPERIENCE);
  await db.insert(principles).values(PRINCIPLES);
  await db.insert(education).values(EDUCATION);
  await db.insert(commands).values(COMMANDS);

  console.log(
    `Seeded: 1 settings row, ${PROJECTS.length} projects, ${EXPERIENCE.length} experience rows, ` +
      `${PRINCIPLES.length} principles, ${EDUCATION.length} education lines, ${COMMANDS.length} commands.`,
  );
}

await main();
