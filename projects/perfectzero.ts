import type { ProjectConfig } from '../src/config/types';

/**
 * PerfectZero (Shopware 6.7) — dev environment.
 *
 *   BASE_URL=https://dev-perfectzero.nextmp.net PROJECT=perfectzero npx playwright test --grep @smoke
 *
 * BASE_URL from .env / CI variables wins over baseURL below.
 * Secrets (admin credentials, basic auth) NEVER go here — use .env / CI variables.
 *
 * All test data was verified logged-out on the storefront (2026-10-07). The checkout
 * confirm page was not inspected (needs a registration → write access).
 */
const config: ProjectConfig = {
  name: 'Perfect Zero',
  baseURL: 'https://dev-perfectzero.nextmp.net',
  locale: 'en-US',
  currencySymbol: '$',

  features: {
    // Core guest wishlist (localStorage) works; heart on PDP / product boxes.
    wishlist: true,
    // /checkout/register → "Check out as a new customer" shows the form with
    // "Create a customer account" unchecked (no password field).
    guestCheckout: true,
    registration: true,
    doubleOptInRegistration: false,
    // No Shopware reviews tab/teaser on the PDP (only a "Product Specs" tab).
    productReviews: false,
    // /contact-support is a Zendesk form (/zendesk-form-submit), not the Shopware contact form.
    contactForm: false,
    // Footer newsletter form (form[action="/form/newsletter"]) on every page.
    newsletter: true,
    promotionCodes: true,
    // No cookie consent banner at all (no CookiePermission plugin markup, no third-party CMP).
    cookieBanner: false,
    // No .top-bar-language / .top-bar-currency on the storefront.
    languageSwitch: false,
    currencySwitch: false,
    mobileNavigation: true,
    // US pricing: no tax notice on the PDP (cart shows tax $0 until the address is known).
    productTaxNotice: false,
    // .product-detail-delivery-information is rendered but always empty.
    productDeliveryInfo: false,
    searchHeadline: true,
    // Variant SEO URLs are name slugs (…-black-stainless → …-black-black-dlc), no product number.
    productNumberInUrl: false,
    // Register form marks billingAddress[phoneNumber] as required.
    registrationPhoneNumber: true,
    productBreadcrumb: true,
    searchSuggest: true,
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
    // Root navigation entries (upper-case in the data, not via CSS).
    mainCategories: ['FIREARMS', 'OPTICS', 'MAGAZINES'],
    // SEO URLs have no trailing slash. 24 boxes/page, 3 pages, manufacturer + price filters.
    listingCategoryPath: '/optics',
    // PDP URL pattern on PerfectZero is /<name-slug> (no product number).
    simpleProduct: {
      path: '/bondhus-1.5mm-hex-ball-end-driver',
      productNumber: '7035-00001',
      name: 'Bondhus 1.5mm Hex Ball End Driver',
    },
    // Two dropdown groups (display type "select"). The visible labels are "Color" / "Finish"
    // ("Select" is visually hidden). Switching Finish → Black DLC gives 3501-26060.
    variantProduct: {
      path: '/18-round-9mm-premium-magazine-black-stainless',
      productNumber: '3501-26010',
      name: '18 Round 9MM Premium Magazine (Black, Stainless)',
      optionGroups: ['Color', 'Finish'],
    },
    // "spring" → 7 hits, 5 with "spring" in the name.
    searchTerm: 'spring',
    searchMinResults: 5,
    searchNoResultTerm: 'zzqx-no-such-product-4711',
    // No property filters on any main category — only manufacturer and price.
    expectedFilterTypes: ['manufacturer', 'price'],
    expectedSortings: ['name-asc', 'name-desc', 'price-asc', 'price-desc'],
    customer: {
      emailDomain: 'example.com',
      emailPrefix: 'e2e',
      password: 'Shopware-E2E-2026!',
      firstName: 'Erika',
      lastName: 'Tester',
      salutationIndex: 1,
      address: {
        street: '2795 Pine Garden Lane',
        zipcode: '97302',
        city: 'Salem',
        countryIso: 'US',
        countryLabel: 'United States', // option text: "United States of America"
        stateLabel: 'Oregon', // US registration requires a state
      },
    },
    // Footer link "Support" → /contact-support (Zendesk form).
    contactLinkText: /Support/i,
    // Cart shipping-cost form offers: NMI Credit Card, NMI ACH (eCheck), Payment Terms (NET 30),
    // Invoice. Invoice is the only plain offline method. Not yet verified on /checkout/confirm.
    paymentMethod: 'Invoice',
    // Cart offers Standard Shipping / Expedited 2-Day Shipping.
    shippingMethod: 'Standard Shipping',
    // No known fixed, unlimited test code yet — needs to be created in the admin.
    promotionCode: 'X6I9O3M5',
  },

  redirects: [
    { from: '/account', to: '/account/login' },
    { from: '/account/order', to: '/account/login' },
    { from: '/account/profile', to: '/account/login' },
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
    '/firearms',
    '/optics',
    '/magazines',
    '/tools',
    '/1911-ds-parts',
    '/ar-15-parts',
    '/accessories',
    '/blog',
    '/contact-support',
    '/about-us/returns',
    '/about-us/terms-of-service-privacy-policy',
  ],

  // Core body classes (is-ctl-*) are present on home, category and search → default pageClasses.

  // PerfectZero theme ("custom-*" markup). Only keys that differ from shopware67Selectors.
  selectors: {
    header: {
      // Four .header-logo-main-link: desktop, mobile, account dropdown, off-canvas menu.
      logo: 'header .header-logo-main-link >> visible=true',
      // Icon-only cart link (no .header-cart wrapper).
      cart: '.header-cart-icon',
      // Desktop wishlist icon has no .header-wishlist class (only the off-canvas copy has).
      wishlist: 'a.header-icon[href$="/wishlist"]',
    },
    navigation: {
      offcanvasLink: '.custom-offcanvas-link',
    },
    product: {
      // Custom buy box: name/number/price live in .cms-element-buy-box, not .product-detail-*.
      name: '.cms-element-buy-box .product-name h1',
      productNumber: '.cms-element-buy-box .product-number', // "Item Number: 7035-00001"
      price: '.cms-element-buy-box .custom-current-price',
      description: '.product-detail-description-text',
    },
    register: {
      // E-mail field id is "-personalEmail" (empty id prefix), not #personalMail.
      email: 'input[name="email"]',
      // /checkout/register shows a "Log in / Check out as a new customer" chooser first.
      reveal: '.checkout-entry-choice-register',
    },
  },
};

export default config;
