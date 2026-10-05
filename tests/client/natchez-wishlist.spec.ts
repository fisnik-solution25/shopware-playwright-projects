import { test, expect } from '../../src/client/fixtures';

/**
 * Natchez: multiple-wishlist plugin. Clicking the heart opens a "select / create list"
 * modal (GET /wishlist/modal/<productId>) instead of adding to a single wishlist, so the
 * core wishlist specs are switched off for this shop (features.wishlist = false).
 * Read-only: opens the modal, does not create a list.
 */
test.describe('Client: multiple wishlists', { tag: ['@client', '@smoke'] }, () => {
  test('wishlist button opens the list chooser for the product', async ({ page, cfg, product }) => {
    const p = cfg.testData.simpleProduct;
    await product.open(p);
    test.skip((await page.locator('.wishlist-modal--button').count()) === 0, 'Multiple-wishlist plugin not present');

    await Promise.all([page.waitForResponse(/\/wishlist\/modal\//), product.wishlistButton.click()]);
    const modal = page.locator('#multiple-wishlist-modal-window');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText(p.productNumber);
  });
});
