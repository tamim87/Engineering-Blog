import { defineConfig, devices } from "@playwright/test";

const port = 3000;
const baseURL = `http://localhost:${port}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL, trace: "on-first-retry" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Optional override for environments with a pre-installed browser.
        launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
          ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
          : {},
      },
    },
  ],
  webServer: {
    // The site is a static export (ADR 0005); `next start` does not work
    // with `output: "export"`. `wrangler dev` runs it on Cloudflare's actual
    // Workers runtime, the closest local equivalent to production. CI builds
    // `out/` in an earlier job and downloads it here (see ci.yml); running
    // `pnpm build` locally first is on you (`pnpm dev` below serves source
    // instead, for local development).
    command: isCI
      ? `pnpm exec wrangler dev --port ${port} --ip 127.0.0.1`
      : "pnpm dev",
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
