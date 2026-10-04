import { describe, it } from 'vitest';

// The repository's CI installs Chromium after its npm-test step. Keep this
// explicit opt-in; the standalone runner is invoked after that install step.
// Skipping here does not claim that browser/visual verification passed.
describe.skipIf(process.env.LIVING_WOODS_BROWSER_TEST !== '1')('living woods real WebGL browser contract', () => {
  it('renders all four worlds and checks interaction, lifecycle, and viewport evidence', async () => {
    const { runLivingWoodsQA } = await import('./qa/run.mjs');
    await runLivingWoodsQA();
  }, 1_200_000);
});
