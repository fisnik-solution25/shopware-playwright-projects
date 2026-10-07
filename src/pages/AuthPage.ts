import { expect, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import type { TestCustomer } from '../data/customer';

/**
 * Login + registration forms. Used on /account/login and /checkout/register
 * (checkout variant additionally offers guest checkout).
 */
export class AuthPage extends BasePage {
  get loginForm(): Locator {
    return this.$(this.s.login.form).first();
  }
  get registerForm(): Locator {
    return this.$(this.s.register.form).first();
  }

  async open(): Promise<void> {
    await this.goto(this.cfg.routes.login);
    await expect(this.loginForm).toBeVisible();
  }

  // ---------------- login ----------------
  async login(email: string, password: string): Promise<void> {
    // On /checkout/register the login form is collapsed
    const toggle = this.$(this.s.login.collapseToggle).first();
    const emailField = this.$(this.s.login.email);
    if ((await toggle.isVisible()) && !(await emailField.isVisible())) {
      // Some login choosers (magic link / password) only reveal the password form once
      // their own e-mail field is filled (the value is copied into the password form).
      const pre = this.s.login.toggleEmail ? this.$(this.s.login.toggleEmail).first() : null;
      if (pre && (await pre.isVisible())) await pre.fill(email);
      await toggle.click();
      await expect(emailField).toBeVisible();
    }

    await emailField.fill(email);
    await this.$(this.s.login.password).fill(password);
    await this.$(this.s.login.submit).click();
  }

  async loginAndExpectSuccess(email: string, password: string): Promise<void> {
    await this.login(email, password);
    await expect(this.page).not.toHaveURL(/\/account\/login/);
  }

  get loginError(): Locator {
    return this.loginForm.locator(this.s.page.alertDanger).or(this.$(`${this.s.page.main} ${this.s.page.alertDanger}`)).first();
  }

  // ---------------- registration ----------------
  /** Shops that render registration on its own page (no register form on /account/login). */
  private async ensureRegisterForm(): Promise<void> {
    if (await this.registerForm.count()) return this.showRegisterForm();
    if (!new URL(this.page.url()).pathname.startsWith(this.cfg.routes.login)) return;
    await this.goto(this.cfg.routes.register);
    await expect(this.registerForm).toBeVisible();
  }

  /** Some checkouts hide the register form behind a login/register chooser. No-op otherwise. */
  async showRegisterForm(): Promise<void> {
    if (!this.s.register.reveal || (await this.registerForm.isVisible())) return;
    await this.$(this.s.register.reveal).locator('visible=true').first().click();
    await expect(this.registerForm).toBeVisible();
  }

  async fillRegistration(c: TestCustomer, opts: { guest?: boolean } = {}): Promise<void> {
    await this.ensureRegisterForm();
    const r = this.s.register;
    const form = this.registerForm;

    // /checkout/register: checkbox; /account/login: hidden input (value=1) → leave it alone
    const createAccount = form.locator(`${r.createAccount}[type="checkbox"]`);
    if (await createAccount.count()) {
      // checkout variant: checked = create account, unchecked = guest
      await createAccount.setChecked(!opts.guest, { force: true });
    }

    const salutation = form.locator(r.salutation);
    if (await salutation.isVisible()) await salutation.selectOption({ index: c.salutationIndex });

    await form.locator(r.firstName).fill(c.firstName);
    await form.locator(r.lastName).fill(c.lastName);
    await form.locator(r.email).fill(c.email);

    const pw = form.locator(r.password);
    if (!opts.guest && (await pw.isVisible())) {
      await pw.fill(c.password);
      const confirm = form.locator(r.passwordConfirmation);
      if (await confirm.isVisible()) await confirm.fill(c.password);
    }

    await form.locator(r.street).fill(c.address.street);
    await form.locator(r.zipcode).fill(c.address.zipcode);
    await form.locator(r.city).fill(c.address.city);
    if (c.phoneNumber) await form.locator(r.phoneNumber).first().fill(c.phoneNumber);
    await this.selectCountry(form.locator(r.country).first(), c.address.countryLabel);
    if (c.address.stateLabel) {
      // state options are loaded after the country change
      const state = form.locator(r.countryState).first();
      await expect(async () => {
        await this.selectCountry(state, c.address.stateLabel);
        expect(await state.inputValue()).not.toBe('');
      }).toPass({ timeout: 10_000 });
    }

    const dp = form.locator(r.dataProtection);
    if (await dp.count()) {
      // force (custom-styled checkboxes) skips the stability check, so a click during a
      // layout shift (e.g. field feedback appearing) can miss — retry until it is checked
      await expect(async () => {
        if (!(await dp.isChecked())) await dp.check({ force: true, timeout: 2_000 });
        await expect(dp).toBeChecked({ timeout: 1_000 });
      }).toPass({ timeout: 10_000 });
    }
  }

  private async selectCountry(select: Locator, label?: string): Promise<void> {
    if (!label || !(await select.isVisible())) return;
    const re = new RegExp(label, 'i');
    const values = await select.locator('option').evaluateAll((opts, src) => {
      const rx = new RegExp(src, 'i');
      return opts.filter((o) => rx.test(o.textContent ?? '')).map((o) => (o as HTMLOptionElement).value);
    }, re.source);
    if (values[0]) await select.selectOption(values[0]);
  }

  async submitRegistration(): Promise<void> {
    await this.ensureRegisterForm();
    await this.registerForm.locator(this.s.register.submit).first().click();
  }

  async register(c: TestCustomer, opts: { guest?: boolean } = {}): Promise<void> {
    await this.fillRegistration(c, opts);
    await this.submitRegistration();
  }

  get invalidFields(): Locator {
    return this.registerForm.locator(this.s.page.invalidField);
  }

  /** Inline invalid fields (client/server validation) or an error alert on the page. */
  get validationErrors(): Locator {
    return this.invalidFields.or(this.page.locator(`${this.s.page.main} ${this.s.page.alertDanger}`)).locator('visible=true');
  }
}
