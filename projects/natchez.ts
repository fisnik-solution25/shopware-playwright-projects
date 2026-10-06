import type { ProjectConfig } from '../src/config/types';

/**
 * Natchez (Shopware 6.7.14.1) — staging.
 *
 *   PROJECT=natchez npx playwright test --grep @smoke
 *
 * BASE_URL comes from .env / CI variables only: *.tst.site hosts rotate on rebuild.
 * baseURL is only a fallback; BASE_URL in .env / CI always wins.
 *
 * Sales channels: Headless, Natchez — all test data is taken from the Natchez channel
 * and was verified logged-out on the storefront (2026-09-25).
 *
 * The payment-integration suite (natches-auto-tests: Curbstone, Sezzle, Smarty, Vertex)
 * is separate and stays untouched; this profile covers the generic storefront only.
 */
const config: ProjectConfig = {
  name: 'Natchez',
  baseURL: 'https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/',
  locale: 'en-US',
  currencySymbol: '$',

  features: {
    // Wishlist IS used, but via the multiple-wishlist plugin: clicking opens a "select/create
    // list" modal and there is no header badge, so the core wishlist specs do not apply.
    // Covered by tests/client/natchez-wishlist.spec.ts instead.
    wishlist: false,
    guestCheckout: true,
    registration: true,
    // Admin API: core.loginRegistration.doubleOptInRegistration not set (global or channel) → off.
    doubleOptInRegistration: false,
    // Shopware core reviews are not rendered; reviews come from the SiteVibes widget (third party).
    productReviews: false,
    // /Help/Contact/ has no Shopware contact form (only the footer newsletter form).
    contactForm: false,
    // Footer newsletter form (form[action="/form/newsletter"]) on every page.
    newsletter: true,
    promotionCodes: true,
    cookieBanner: true,
    // No .top-bar-language / .top-bar-currency on the storefront.
    languageSwitch: false,
    currencySwitch: false,
    mobileNavigation: true,
    // US pricing: no tax notice on the PDP (Vertex quotes tax at checkout); no delivery-time element.
    productTaxNotice: false,
    productDeliveryInfo: false,
    // HawkSearch results page does not echo the search term (no .search-headline).
    searchHeadline: false,
    // Admin API: core.loginRegistration.showPhoneNumberField = true, phoneNumberFieldRequired = true (global).
    registrationPhoneNumber: true,
    // Visible PDP breadcrumb shows at most "Home" (no category trail on any PDP checked).
    productBreadcrumb: false,
    // HawkSearch replaces the core suggest dropdown.
    searchSuggest: false,
  },

  // Theme drops is-ctl-* on home (landing page), category and HawkSearch search templates;
  // core is-active-route-* is present on every page. Finish page: core default (not yet verified).
  pageClasses: {
    home: /\bis-active-route-frontend-home-page\b/,
    category: /\bis-active-route-frontend-navigation-page\b/,
    search: /\bis-active-route-frontend-search-page\b/,
  },

  routes: {
    home: '/',
    login: '/account/login',
    register: '/account/register',
    account: '/account',
    accountProfile: '/account/profile',
    accountAddresses: '/account/address',
    accountOrders: '/account/order',
    logout: '/account/logout',
    cart: '/checkout/cart',
    checkoutRegister: '/checkout/register',
    checkoutConfirm: '/checkout/confirm',
    checkoutFinish: '/checkout/finish',
    search: '/search',
    wishlist: '/wishlist',
    contactPage: null, // no Shopware contact form on this shop (features.contactForm = false)
  },

  testData: {
    // Root navigation entries (theme renders them upper-case via CSS).
    mainCategories: ['Ammunition', 'Optics', 'Hunting'],
    // 24 boxes/page, pagination, 4 core sortings, manufacturer/property/price filters.
    listingCategoryPath: '/Optics/',
    // PDP URL pattern on Natchez is /<slug>/<sku>.
    simpleProduct: {
      path: '/Leupold-VX-Freedom-Rifle-Scope-3-9x40-1-SFP-Tri-MOA-Non-Illum.-Black/LU180603',
      productNumber: 'LU180603',
      name: 'Leupold VX-Freedom Rifle Scope 3-9x40 1" SFP Tri-MOA Non Illum. Black',
    },
    // Admin API: parent XO4107CNF (8 variants), visible in the Natchez channel; PDP renders
    // the main variant XO4107CNF.5 logged-out. Groups: 1 radio + 2 dropdown (display type "select").
    variantProduct: {
      path: '/Blackhawk-T-Series-L2C-Holster/XO4107CNF',
      productNumber: 'XO4107CNF.5',
      name: 'Blackhawk T-Series L2C Holster',
      optionGroups: ['Holster Draw', 'Weapon Mfg', 'Weapon Mfg Model'],
    },
    // Search is HawkSearch: "scope" → 22 hits, 19 with "scope" in the name.
    searchTerm: 'scope',
    searchMinResults: 5,
    searchNoResultTerm: 'zzqx-no-such-product-4711',
    expectedFilterTypes: ['manufacturer', 'properties', 'price'],
    expectedSortings: ['name-asc', 'name-desc', 'price-asc', 'price-desc'],
    customer: {
      emailDomain: 'example.com',
      emailPrefix: 'e2e',
      password: 'Shopware-E2E-2026!',
      firstName: 'Erika',
      lastName: 'Tester',
      salutationIndex: 1,
      // No-tax state (Oregon) taken from natches-auto-tests data/guests.ts (noTaxSalemOR).
      address: {
        street: '2795 Pine Garden Lane',
        zipcode: '97302',
        city: 'Salem',
        countryIso: 'US',
        countryLabel: 'United States',
        stateLabel: 'Oregon', // US registration requires a state
      },
    },
    contactLinkText: /Contact/i,
    // Admin API: Invoice (InvoicePayment) active, assigned, channel default, no availability rule.
    // Kept null until writes are enabled and the storefront label is verified on /checkout/confirm.
    paymentMethod: 'Cash on delivery',
    // Channel default "Residential Ground" is not offered on /checkout/confirm for the test
    // address (confirm shows 2nd Day Air, Ground Economy, Next Day Air, Priority Mail; none
    // preselected → submit disabled). Ground Economy = the shop's "CORE fallback method".
    shippingMethod: 'Ground Economy',
    // natches-auto-tests codes (O1W7X5U2 / T2J1N1T0) are tied to Curbstone/Sezzle cases and
    // expire — not reused until their rule conditions are checked via Admin API.
       promotionCode: 'T2J1N1T0',
  },

  redirects: [
    { from: '/account', to: '/account/login' },
    { from: '/checkout/confirm', to: '/checkout/cart' },
  ],

  importantLinks: [
    '/',
    '/checkout/cart',
    '/account/login',
    '/account/register',
    '/wishlist',
    '/sitemap.xml',
    '/robots.txt',
    '/Terms-Conditions/',
    '/Privacy-Policy/',
    '/Help/Shipping-Returns/',
    '/Help/Contact/',
    '/Help/FAQs/',
  ],

  // Natchez theme ("natchez-*" markup). Only keys that differ from shopware67Selectors.
  selectors: {
    page: {
      // Core .breadcrumb is rendered but display:none; the visible one is a CMS block.
      breadcrumb: '.cms-element-breadcrumb-display .breadcrumb-simple',
    },
    header: {
      // No visible cart total; the widget's screen-reader label carries it
      // ("… contains 1 items. The cart total value is $378.14.").
      cartTotal: '#cart-widget-aria-label',
      // Account menu is the core off-canvas variant on every viewport.
      accountDropdown: '.account-menu-offcanvas.show',
    },
    cart: {
      // Promotion form sits in a collapsed "Promo code" panel.
      promotionInput: 'form.cart-add-promotion-form input[name="code"]',
      promotionToggle: '.cart-add-promotion-toggle',
    },
    cookie: {
      // .js-cookie-permission-button is a <span> wrapper; on mobile its centre is covered.
      onlyNecessary: '.js-cookie-permission-button button',
    },
    navigation: {
      // Root links carry no ".root" class in this theme.
      rootLink: '.main-navigation-link',
      // Flyout sub-category links (no .navigation-flyout-link).
      flyoutLink: '.flyout__column-title a, .flyout__list a',
    },
    login: {
      // /account/login is a magic-link / password chooser: "Continue with password" reveals
      // #loginMail / #loginPassword. Same toggle as natches-auto-tests login.locators.ts.
      collapseToggle: 'button[data-login-toggle-password-button="true"]',
      // The toggle only reveals the password form once the magic-link e-mail is filled.
      toggleEmail: '#loginLinkMail',
      // Two form.login-form elements — never hit the magic-link submit (sends an e-mail).
      submit: 'form.login-form[action$="/account/login"] button[type="submit"]',
    },
    account: {
      // /account/order lists orders as cards
      orderItem: '.natchez-account-order-card',
      // Profile form is a collapse behind "Edit" on the contact information card.
      profileFormToggle: 'a[href="#profile-personal-form"]',
    },
    product: {
      name: '.natchez-pdp-buy-box__name',
      productNumber: '.natchez-pdp-buy-box__numbers dd',
      price: '.natchez-pdp-buy-box__price-main',
      description: '.natchez-pdp-detail-content__description',
    },
    search: {
      emptyAlert: '.search-no-results-headline',
    },
  },
};

export default config;
