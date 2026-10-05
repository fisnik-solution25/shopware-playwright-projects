import { test, expect } from '../../src/fixtures';

/**
 * Runs once before all tests. Fails fast (with a clear message) when the
 * shop is down, behind unexpected auth, or in maintenance mode.
 */
test('storefront is reachable', async ({ request, cfg }) => {
  const res = await request.get('/');
  expect(res.status(), `GET ${cfg.baseURL}/ returned ${res.status()} — shop down, maintenance mode or basic auth missing?`).toBe(200);
  // Some themes drop the is-ctl-* body classes; is-active-route-* is set by core as well.
  expect(await res.text()).toMatch(/is-ctl-|is-active-route-/);
});

test('API access for test data setup', async ({ cfg, adminApi, storeApi }) => {
  if (!adminApi) {
    test.info().annotations.push({
      type: 'warning',
      description: 'No Admin API credentials — customers are registered via UI and not cleaned up.',
    });
  }
  if (!storeApi) {
    test.info().annotations.push({
      type: 'warning',
      description: 'No Store API access key — cart/customer setup falls back to slower UI flows.',
    });
    return;
  }
  // Smoke-check the Store API with the configured product
  const id = await storeApi.productIdByNumber(cfg.testData.simpleProduct.productNumber);
  expect(id).toMatch(/^[0-9a-f]{32}$/);
});
