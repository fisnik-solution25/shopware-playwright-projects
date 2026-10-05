import { expect, type Locator } from '@playwright/test';
import { BasePage, escapeRegExp } from './BasePage';

/** /checkout/confirm and /checkout/finish */
export class CheckoutPage extends BasePage {
  get lineItems(): Locator {
    return this.$(`${this.s.cart.root} ${this.s.checkout.lineItem}`);
  }
  get submitButton(): Locator {
    return this.$(this.s.checkout.submitOrder).first();
  }

  async openConfirm(): Promise<void> {
    await this.goto(this.cfg.routes.checkoutConfirm);
  }

  async expectOnConfirm(): Promise<void> {
    await this.expectPath(this.cfg.routes.checkoutConfirm);
    await expect(this.submitButton).toBeVisible();
  }

  async selectPaymentMethod(label: string): Promise<void> {
    await this.selectMethod(this.s.checkout.paymentMethodLabel, label);
  }

  async selectShippingMethod(label: string): Promise<void> {
    await this.selectMethod(this.s.checkout.shippingMethodLabel, label);
  }

  /**
   * Changing a method submits the confirm form (POST /checkout/configure) and reloads the
   * page. Waiting for that reload — not for the already-loaded current document — keeps the
   * next click (TOS / submit) from landing mid-navigation. Already selected → nothing to do.
   */
  private async selectMethod(labelSelector: string, label: string): Promise<void> {
    const lbl = this.$(labelSelector).filter({ hasText: new RegExp(escapeRegExp(label), 'i') }).first();
    const inputId = await lbl.getAttribute('for');
    if (inputId && (await this.page.locator(`[id="${inputId}"]`).isChecked())) return;
    await this.clickAndLoad(lbl);
  }

  async acceptTerms(): Promise<void> {
    const tos = this.$(this.s.checkout.tos).first();
    if (!(await tos.count())) return;
    // Shopware JS can re-render the confirm page right after load and drop the
    // checked state → wait for load and retry until the checkbox stays checked.
    await this.page.waitForLoadState('load');
    await expect(async () => {
      if (!(await tos.isChecked())) await tos.check();
      await expect(tos).toBeChecked({ timeout: 1_000 });
    }).toPass({ timeout: 15_000 });
  }

  /** Selects the shipping/payment method configured in the profile (if any). */
  async applyConfiguredMethods(): Promise<void> {
    const { paymentMethod, shippingMethod } = this.cfg.testData;
    if (shippingMethod) await this.selectShippingMethod(shippingMethod);
    if (paymentMethod) await this.selectPaymentMethod(paymentMethod);
  }

  /** Accepts TOS, applies configured payment/shipping, places the order. Returns the order number if shown. */
  async placeOrder(): Promise<string | undefined> {
    await this.applyConfiguredMethods();
    await this.acceptTerms();
    await Promise.all([
      this.page.waitForURL(new RegExp(escapeRegExp(this.cfg.routes.checkoutFinish)), { timeout: 45_000 }),
      this.submitButton.click(),
    ]);
    const nr = this.$(this.s.checkout.finishOrderNumber).first();
    return (await nr.count()) ? (await nr.innerText()).replace(/\D+/g, ' ').trim().split(' ').pop() : undefined;
  }

  get finishHeader(): Locator {
    return this.$(this.s.checkout.finishHeader).first();
  }
}
