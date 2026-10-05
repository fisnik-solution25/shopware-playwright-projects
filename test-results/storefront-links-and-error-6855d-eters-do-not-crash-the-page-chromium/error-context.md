# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: storefront/links-and-errors.spec.ts >> Error handling >> invalid listing parameters do not crash the page
- Location: tests/storefront/links-and-errors.spec.ts:60:7

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 500
Received:   500
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#content-main"
    - link "Skip to search" [ref=e4] [cursor=pointer]:
      - /url: "#header-main-search-input"
    - link "Skip to main navigation" [ref=e5] [cursor=pointer]:
      - /url: "#main-navigation-menu"
  - banner [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e8]: 2 DAYS ONLY- 8% off on Reloading Orders of $99.99+ Code P250819
      - generic [ref=e14]:
        - link [ref=e17] [cursor=pointer]:
          - /url: /
          - img "Go to homepage" [ref=e19]
        - generic [ref=e25]:
          - combobox "Enter search term..." [ref=e26]
          - button "Search" [ref=e27] [cursor=pointer]
        - generic [ref=e30]:
          - link "Track my order" [ref=e33] [cursor=pointer]:
            - /url: "#"
          - button "Account" [ref=e38] [cursor=pointer]
          - link "Cart Shopping cart contains 0 items. The cart total value is $0.00." [ref=e42] [cursor=pointer]:
            - /url: /checkout/cart
            - text: Cart
            - generic [ref=e45]: Shopping cart contains 0 items. The cart total value is $0.00.
  - navigation "Main navigation" [ref=e48]:
    - list [ref=e50]:
      - listitem [ref=e51]:
        - link "Shop All" [ref=e52] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Shop-All/
      - listitem [ref=e54]:
        - link "Ammunition" [ref=e55] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Ammunition/
      - listitem [ref=e57]:
        - link "Optics" [ref=e58] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Optics/
      - listitem [ref=e60]:
        - link "Reloading" [ref=e61] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Reloading/
      - listitem [ref=e63]:
        - link "Shooting" [ref=e64] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Shooting/
      - listitem [ref=e66]:
        - link "Hunting" [ref=e67] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Hunting/
      - listitem [ref=e69]:
        - link "Gun Parts" [ref=e70] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Gun-Parts/
      - listitem [ref=e72]:
        - link "Outdoors" [ref=e73] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Outdoors/
      - listitem [ref=e75]:
        - link "Archery" [ref=e76] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Archery/
      - listitem [ref=e78]:
        - link "Fishing" [ref=e79] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Fishing/
      - listitem [ref=e81]:
        - link "Personal Defense & Security" [ref=e82] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Personal-Defense-Security/
      - listitem [ref=e84]:
        - link "Muzzleloaders" [ref=e85] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Muzzleloaders/
      - listitem [ref=e87]:
        - link "Gunsmithing" [ref=e88] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Gunsmithing/
      - listitem [ref=e90]:
        - link "Clothing & Footwear" [ref=e91] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Clothing-Footwear/
      - listitem [ref=e93]:
        - link "Magazine" [ref=e94] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Magazine/
      - listitem [ref=e96]:
        - link "Brands" [ref=e97] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Brands/
      - listitem [ref=e99]:
        - link "melos-category" [ref=e100] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/melos-category/
      - listitem [ref=e102]:
        - link "Compliance" [ref=e103] [cursor=pointer]:
          - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Compliance/
  - main [ref=e105]:
    - alert [ref=e107]:
      - generic [ref=e109]: Unfortunately, something went wrong.
  - contentinfo [ref=e112]:
    - generic [ref=e114]:
      - generic [ref=e116]:
        - generic [ref=e117]:
          - img "Free shipping" [ref=e119]
          - generic [ref=e120]:
            - generic [ref=e121]: Free shipping
            - generic [ref=e122]: Lorem ipsum dolor sit amet
        - generic [ref=e123]:
          - img "10 Years Warranty" [ref=e125]
          - generic [ref=e126]:
            - generic [ref=e127]: 10 Years Warranty
            - generic [ref=e128]: Lorem ipsum dolor sit amet
        - generic [ref=e129]:
          - img "Premium products" [ref=e131]
          - generic [ref=e132]:
            - generic [ref=e133]: Premium products
            - generic [ref=e134]: Lorem ipsum dolor sit amet
        - generic [ref=e135]:
          - img "24/7 Support" [ref=e137]
          - generic [ref=e138]:
            - generic [ref=e139]: 24/7 Support
            - generic [ref=e140]: Live chat or 0800 123 45
      - generic [ref=e141]:
        - heading "Your opinion helps us improve." [level=3] [ref=e142]
        - generic [ref=e143]: Was this page helpful? Let us know.
    - generic [ref=e145]:
      - generic [ref=e146]:
        - heading "Join Natchez Club" [level=2] [ref=e147]
        - paragraph [ref=e148]: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pellentesque sit amet turpis sed auctor.
      - generic [ref=e153]:
        - generic [ref=e155]:
          - textbox "Your email" [ref=e157]
          - button "Submit" [ref=e158] [cursor=pointer]: Join now
        - paragraph [ref=e160]: By joining now, you agree to receive special offers, promotions, and catalog announcements.
    - generic [ref=e161]:
      - generic [ref=e162]:
        - generic [ref=e167]:
          - generic [ref=e168]:
            - link "800-251-7839" [ref=e170] [cursor=pointer]:
              - /url: tel:8002517839
            - link "info@natchezss.com" [ref=e172] [cursor=pointer]:
              - /url: mailto:info@natchezss.com
            - generic [ref=e173]: Live Chat
          - generic [ref=e175]:
            - link [ref=e176] [cursor=pointer]:
              - /url: https://www.facebook.com/NatchezSS
              - img "Facebook" [ref=e177]
            - link [ref=e178] [cursor=pointer]:
              - /url: https://www.instagram.com/natchezoutdoors/
              - img "Instagram" [ref=e179]
            - link [ref=e180] [cursor=pointer]:
              - /url: https://x.com/natchezss
              - img "Twitter" [ref=e181]
            - link [ref=e182] [cursor=pointer]:
              - /url: https://www.youtube.com/natchezshooters
              - img "YouTube" [ref=e183]
        - generic [ref=e184]:
          - generic [ref=e185]:
            - generic "Help" [ref=e187]
            - list [ref=e190]:
              - listitem [ref=e191]:
                - link "Order status" [ref=e192] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Order-status/
              - listitem [ref=e193]:
                - link "Shipping & Returns" [ref=e194] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Shipping-Returns/
              - listitem [ref=e195]:
                - link "FAQs" [ref=e196] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/FAQs/
              - listitem [ref=e197]:
                - link "Contact" [ref=e198] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Contact/
              - listitem [ref=e199]:
                - link "Live Chat" [ref=e200] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Live-Chat/
              - listitem [ref=e201]:
                - link "Restricted Items" [ref=e202] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Restricted-Items/
              - listitem [ref=e203]:
                - link "Hazmat / Oversized Shipping" [ref=e204] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Hazmat-Oversized-Shipping/
              - listitem [ref=e205]:
                - link "Payments" [ref=e206] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Help/Payments/
          - generic [ref=e207]:
            - generic "Resources" [ref=e209]
            - list [ref=e212]:
              - listitem [ref=e213]:
                - link "About Us" [ref=e214] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/About-Us/
              - listitem [ref=e215]:
                - link "RSS Feed" [ref=e216] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/RSS-Feed/
              - listitem [ref=e217]:
                - link "Blogs" [ref=e218] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/Blogs/
              - listitem [ref=e219]:
                - link "Our Current Flyer" [ref=e220] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/Our-Current-Flyer/
              - listitem [ref=e221]:
                - link "Request a Flyer" [ref=e222] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/Request-a-Flyer/
              - listitem [ref=e223]:
                - link "Master Catalog" [ref=e224] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/Master-Catalog/
              - listitem [ref=e225]:
                - link "Rebates & Promotions" [ref=e226] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/Rebates-Promotions/
              - listitem [ref=e227]:
                - link "Affiliate Program" [ref=e228] [cursor=pointer]:
                  - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Resources/Affiliate-Program/
      - generic [ref=e229]:
        - generic [ref=e230]: Copyright © 2025 Natchez Shooting & Outdoors All rights reserved.
        - generic [ref=e231]:
          - img "Invoice" [ref=e233]
          - img "Cash on delivery" [ref=e235]
          - img "2nd Day Air" [ref=e237]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms & Conditions" [ref=e241] [cursor=pointer]:
              - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Terms-Conditions/
          - listitem [ref=e242]:
            - link "Privacy Policy" [ref=e243] [cursor=pointer]:
              - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Privacy-Policy/
          - listitem [ref=e244]:
            - link "Copyright Notice" [ref=e245] [cursor=pointer]:
              - /url: https://f2yt3gogmjqkq-main-bvxea6i.us-2.tst.site/Copyright-Notice/
      - generic [ref=e246]: "About Natchez: Over 40 Years of Outdoor Excellence. The Natchez Trace was historically a path where explorers and explorers obtained vital goods. Today, Natchez Shooters Supplies carries on that legacy of reliability. We are your one-stop shop for high-performance outdoor gear. Whether you are looking for bullets to stock up for the range, discount optics to improve your view, or rugged reloading supplies to custom-build your loads, our family-owned business is dedicated to customer satisfaction. We stock over 50,000 SKUs, providing a diverse selection of handgun ammo, rimfire ammo, hunting apparel, tactical gear, and fishing accessories. Our team of sportsmen is here to outfit your next hunt, competitive match, or weekend outdoors with gear you can trust."
  - generic:
    - generic:
      - button "Go back to the top of the page"
  - generic [ref=e247]: AvantLink injected at body end
```

# Test source

```ts
  1  | import { test, expect } from '../../src/fixtures';
  2  | import { loadConfig } from '../../src/config/loader';
  3  | 
  4  | test.describe('Important links & redirects', () => {
  5  |   test('important pages respond without error', { tag: '@smoke' }, async ({ request, cfg }) => {
  6  |     const failures: string[] = [];
  7  |     for (const path of cfg.importantLinks) {
  8  |       const res = await request.get(path);
  9  |       if (res.status() >= 400) failures.push(`${path} → ${res.status()}`);
  10 |     }
  11 |     expect(failures, failures.join('\n')).toEqual([]);
  12 |   });
  13 | 
  14 |   for (const rule of loadConfig().redirects) {
  15 |     test(`redirect ${rule.from} → ${rule.to}`, async ({ page }) => {
  16 |       await page.goto(rule.from);
  17 |       await expect(page).toHaveURL(new RegExp(rule.to));
  18 |     });
  19 |   }
  20 | 
  21 |   test('header and footer links on the homepage are not broken', async ({ page, request, cfg }) => {
  22 |     await page.goto(cfg.routes.home);
  23 |     const hrefs = await page
  24 |       .locator(`${cfg.selectors.header.root} a[href], ${cfg.selectors.footer.root} a[href]`)
  25 |       // getAttribute: SVG <a> elements expose href as SVGAnimatedString, not a string
  26 |       .evaluateAll((as) => as.map((a) => new URL(a.getAttribute('href') ?? '', document.baseURI).href));
  27 |     const origin = new URL(cfg.baseURL).origin;
  28 |     const internal = [...new Set(hrefs)].filter((h) => h.startsWith(origin) && !h.includes('/account/logout')).slice(0, 60);
  29 |     const broken: string[] = [];
  30 |     for (const href of internal) {
  31 |       const res = await request.get(href, { maxRedirects: 5 });
  32 |       if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
  33 |     }
  34 |     expect(broken, broken.join('\n')).toEqual([]);
  35 |   });
  36 | 
  37 |   test('sitemap and robots.txt are served', async ({ request }) => {
  38 |     const robots = await request.get('/robots.txt');
  39 |     expect(robots.status()).toBe(200);
  40 |     const sitemap = await request.get('/sitemap.xml');
  41 |     expect(sitemap.status()).toBe(200);
  42 |     expect(await sitemap.text()).toContain('<sitemapindex');
  43 |   });
  44 | });
  45 | 
  46 | test.describe('Error handling', () => {
  47 |   test('unknown URL shows a 404 page with a way back', { tag: ['@smoke', '@mobile'] }, async ({ page, cfg }) => {
  48 |     const res = await page.goto(`/e2e-not-existing-${Date.now()}`);
  49 |     expect(res?.status()).toBe(404);
  50 |     await expect(page.locator(cfg.selectors.error.body)).toBeAttached();
  51 |     await expect(page.locator(cfg.selectors.header.logo)).toBeVisible();
  52 |     await expect(page.locator(cfg.selectors.error.backToShop).first()).toBeVisible();
  53 |   });
  54 | 
  55 |   test('unknown category/deep URL returns 404, not 500', async ({ request, cfg }) => {
  56 |     const res = await request.get(`${cfg.testData.listingCategoryPath.replace(/\/$/, '')}/does-not-exist-${Date.now()}/`);
  57 |     expect(res.status()).toBe(404);
  58 |   });
  59 | 
  60 |   test('invalid listing parameters do not crash the page', async ({ page, cfg }) => {
  61 |     const res = await page.goto(`${cfg.testData.listingCategoryPath}?order=invalid&p=99999&manufacturer=xyz`);
> 62 |     expect(res?.status()).toBeLessThan(500);
     |                           ^ Error: expect(received).toBeLessThan(expected)
  63 |   });
  64 | 
  65 |   test('POST to add-to-cart with invalid product does not 500', async ({ page, cfg }) => {
  66 |     await page.goto(cfg.routes.home);
  67 |     const res = await page.request.post('/checkout/line-item/add', {
  68 |       form: { 'lineItems[x][id]': 'x', 'lineItems[x][type]': 'product', 'lineItems[x][referencedId]': 'invalid', 'lineItems[x][quantity]': '1' },
  69 |       maxRedirects: 0,
  70 |     });
  71 |     expect(res.status()).toBeLessThan(500);
  72 |   });
  73 | });
  74 | 
```