import { type BrowserContext, type Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/** Shopware core cookie consent ("cookie-preference" cookie). */
export class CookieBanner extends BasePage {
  get banner(): Locator {
    return this.$(this.s.cookie.banner);
  }

  /**
   * Heavy storefronts bind the CookiePermission plugin well after `load` — a click
   * before that is silently ignored. Waits (bounded) for the plugin, then clicks.
   */
  private async waitUntilReady(): Promise<void> {
    await this.banner
      .first()
      .evaluate(
        (el) =>
          new Promise<void>((resolve) => {
            const deadline = Date.now() + 10_000;
            const check = () =>
              (window as any).PluginManager?.getPluginInstanceFromElement(el, 'CookiePermission') || Date.now() > deadline
                ? resolve()
                : requestAnimationFrame(check);
            check();
          }),
      )
      .catch(() => undefined);
  }

  /**
   * Shopware 6.7.x stores "cookie-config-hash" only after an async GET /cookie/groups.
   * Navigating before that aborts it, and on the next page load the consent is reset.
   */
  private async waitForConsentStored(): Promise<void> {
    const usesHash = await this.page.evaluate(() => Boolean((window as any).router?.['frontend.cookie.groups']));
    if (!usesHash) return;
    await this.page
      .waitForFunction(() => document.cookie.includes('cookie-config-hash='), undefined, { timeout: 10_000 })
      .catch(() => undefined);
  }

  async acceptOnlyNecessary(): Promise<void> {
    await this.waitUntilReady();
    const button = this.$(this.s.cookie.onlyNecessary).first();
    // Some themes let the banner's content column overlap the buttons' box, which makes
    // Playwright's hit-test report "intercepts pointer events" although a real click at
    // the button centre works — fall back to a forced click in that case.
    await button.click({ timeout: 5_000 }).catch(() => button.click({ force: true }));
    await this.waitForConsentStored();
  }

  async acceptAll(): Promise<void> {
    await this.waitUntilReady();
    const all = this.$(this.s.cookie.acceptAll).first();
    if (await all.isVisible()) await all.click();
    else await this.acceptOnlyNecessary();
  }

  /**
   * Pre-sets consent so the banner never overlays elements in functional tests.
   * Used by the base fixture for every test (except the cookie banner test).
   *
   * Shopware 6.7.x also stores "cookie-config-hash" ({languageId: hash} from /cookie/groups);
   * with "cookie-preference" alone the consent is reset and the banner shown again.
   */
  static async preAccept(context: BrowserContext, baseURL: string): Promise<void> {
    const { hostname } = new URL(baseURL);
    const cookies = [{ name: 'cookie-preference', value: '1', domain: hostname, path: '/', sameSite: 'Lax' as const }];

    const res = await context.request
      .get(`${baseURL}/cookie/groups`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .catch(() => null);
    const groups = res?.ok() ? await res.json().catch(() => null) : null;
    if (groups?.hash && groups?.languageId) {
      cookies.push({
        name: 'cookie-config-hash',
        value: JSON.stringify({ [groups.languageId]: groups.hash }),
        domain: hostname,
        path: '/',
        sameSite: 'Lax',
      });
    }
    await context.addCookies(cookies);
  }
}
