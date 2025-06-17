import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_aX6RAzhioYs7@ep-royal-bush-a81nqg35-pooler.eastus2.azure.neon.tech/AI-Content_Generator?sslmode=require',
  },
});
