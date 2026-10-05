import type { Selectors } from '../selectors/shopware67';

/** Deep partial helper used for project-level overrides. */
export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

/**
 * Switch storefront features on/off per client project.
 * Tests for a disabled feature are skipped automatically.
 */
export interface FeatureFlags {
  wishlist: boolean;
  guestCheckout: boolean;
  registration: boolean;
  /** Registration requires e-mail confirmation (double opt-in). */
  doubleOptInRegistration: boolean;
  productReviews: boolean;
  contactForm: boolean;
  newsletter: boolean;
  promotionCodes: boolean;
  /** Cookie consent banner is shown to first-time visitors. */
  cookieBanner: boolean;
  languageSwitch: boolean;
  currencySwitch: boolean;
  /** Mobile off-canvas navigation exists (Shopware default). */
  mobileNavigation: boolean;
  /** PDP shows the tax notice (.product-detail-tax). Default true; e.g. US shops quote tax at checkout. */
  productTaxNotice?: boolean;
  /** PDP shows delivery/stock information. Default true. */
  productDeliveryInfo?: boolean;
  /** Search result page shows the core headline with the term. Default true; third-party search engines often don't. */
  searchHeadline?: boolean;
  /**
   * Registration requires a phone number (core.loginRegistration.showPhoneNumberField +
   * phoneNumberFieldRequired). Default false.
   */
  registrationPhoneNumber?: boolean;
  /** PDP breadcrumb contains the product's category. Default true. */
  productBreadcrumb?: boolean;
  /** Header search shows the core suggest dropdown while typing. Default true; third-party search engines replace it. */
  searchSuggest?: boolean;
}

/**
 * <body> class patterns that identify a page type. Core Shopware sets is-ctl-* / is-act-*,
 * but themes can override the body classes per template; is-active-route-* is an alternative.
 */
export interface PageClasses {
  home: RegExp;
  category: RegExp;
  search: RegExp;
  checkoutFinish: RegExp;
}

export interface ProductRef {
  /** SEO path relative to baseURL, e.g. "/Canvas-Tote-Bag/A-BAG-001-CREAM" */
  path: string;
  productNumber: string;
  name: string;
}

export interface RedirectRule {
  from: string;
  /** Expected final path (regex source or plain path prefix). */
  to: string;
  /** Only applies to logged-out visitors (default true). */
  guestOnly?: boolean;
}

export interface CustomerAddress {
  street: string;
  zipcode: string;
  city: string;
  /** ISO 3166 alpha-2, resolved to a countryId via Store API / UI */
  countryIso: string;
  /** Visible country name in the storefront select (used by UI flows). */
  countryLabel?: string;
  /** Visible state name, for countries where the shop requires a state (e.g. US). */
  stateLabel?: string;
}

export interface ProjectConfig {
  /** Human readable name, shown in reports. */
  name: string;
  baseURL: string;
  /** Shopware storefront locale — used for price parsing only. */
  locale: string;
  currencySymbol: string;

  features: FeatureFlags;

  /** Paths of important storefront routes (override for custom routing). */
  routes: {
    home: string;
    login: string;
    register: string;
    account: string;
    accountProfile: string;
    accountAddresses: string;
    accountOrders: string;
    logout: string;
    cart: string;
    checkoutRegister: string;
    checkoutConfirm: string;
    checkoutFinish: string;
    search: string;
    wishlist: string;
    /** Path of a CMS page containing the contact form (null = discover via footer). */
    contactPage: string | null;
  };

  testData: {
    /** Main navigation category names in display order (first N are checked). */
    mainCategories: string[];
    /** A category with enough products for listing / filter / sorting tests. */
    listingCategoryPath: string;
    /** A simple (non-variant) product that can be bought. */
    simpleProduct: ProductRef;
    /** A product with variants (configurator). */
    variantProduct: ProductRef & { optionGroups: string[] };
    /** Search term that returns results. */
    searchTerm: string;
    /** Minimum number of hits expected for searchTerm. */
    searchMinResults: number;
    /** Search term guaranteed to return nothing. */
    searchNoResultTerm: string;
    /** Filter types that must exist on the listing page (language independent). */
    expectedFilterTypes: Array<'manufacturer' | 'properties' | 'price' | 'rating' | 'boolean'>;
    /** Sorting option keys that must exist (Shopware values). */
    expectedSortings: string[];
    customer: {
      emailDomain: string;
      emailPrefix: string;
      password: string;
      firstName: string;
      lastName: string;
      /** Salutation option index in the select (0 = "not specified"). */
      salutationIndex: number;
      /** Sent when features.registrationPhoneNumber is on (default "5555550100"). */
      phoneNumber?: string;
      address: CustomerAddress;
    };
    /** Visible text of the footer link leading to the contact form. */
    contactLinkText: RegExp;
    /** Payment/shipping method labels to select in checkout; null = keep default. */
    paymentMethod: string | null;
    shippingMethod: string | null;
    promotionCode: string | null;
  };

  /** Redirects that must work (checked for guests unless stated). */
  redirects: RedirectRule[];

  /** Links (paths) that must resolve with a status < 400. */
  importantLinks: string[];

  /** Body class patterns per page type (defaults: core is-ctl-* / is-act-* classes). */
  pageClasses?: Partial<PageClasses>;

  /** Selector overrides for themes / customisations. Merged over Shopware 6.7 defaults. */
  selectors?: DeepPartial<Selectors>;
}

/** Final config after env overrides + selector merge. */
export interface ResolvedConfig extends Omit<ProjectConfig, 'selectors' | 'features' | 'pageClasses'> {
  features: Required<FeatureFlags>;
  pageClasses: PageClasses;
  selectors: Selectors;
  env: {
    httpCredentials?: { username: string; password: string };
    admin: {
      clientId?: string;
      clientSecret?: string;
      username?: string;
      password?: string;
    };
    accessKey?: string;
    allowWriteTests: boolean;
    cleanupTestData: boolean;
  };
}
