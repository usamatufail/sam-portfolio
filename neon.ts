import { defineConfig } from '@neon/config/v1';

/**
 * Neon services this app uses.
 *
 * Only Lakebase Postgres — the portfolio reads and writes its content through
 * Drizzle over `DATABASE_URL`. No Neon Auth (the admin panel signs its own
 * cookie against ADMIN_PASSCODE), no buckets, no functions, no AI gateway.
 */
export default defineConfig({
  auth: false,
  dataApi: false,
  branch: (branch) => {
    if (branch.isDefault) return {};
    if (!branch.exists) {
      // Feature branches clean themselves up and stay cheap.
      return {
        ttl: '7d',
        postgres: {
          computeSettings: {
            autoscalingLimitMinCu: 0.25,
            autoscalingLimitMaxCu: 1,
            suspendTimeout: '5m',
          },
        },
      };
    }
    return {};
  },
});
