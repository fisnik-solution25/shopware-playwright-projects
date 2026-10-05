/**
 * Parses storefront price strings independent of locale:
 * "29,95 €", "€29.95", "ab 1.299,00 €", "$1,299.00*" → number
 */
export function parsePrice(text: string): number {
  const m = text.replace(/\s/g, '').match(/\d[\d.,]*/);
  if (!m) return NaN;
  let n = m[0];
  const lastComma = n.lastIndexOf(',');
  const lastDot = n.lastIndexOf('.');
  if (lastComma > lastDot) {
    n = n.replace(/\./g, '').replace(',', '.'); // 1.299,00
  } else {
    n = n.replace(/,/g, ''); // 1,299.00
  }
  return parseFloat(n);
}

/**
 * Like parsePrice, but prefers the amount next to the currency symbol — for texts that
 * contain other numbers too, e.g. "Cart contains 2 items. The cart total value is $41.98."
 */
export function parsePriceNear(text: string, currencySymbol: string): number {
  const sym = currencySymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = text.replace(/\s/g, '').match(new RegExp(`${sym}\\d[\\d.,]*|\\d[\\d.,]*${sym}`));
  return parsePrice(m ? m[0] : text);
}

export function isSortedAsc(values: number[]): boolean {
  return values.every((v, i) => i === 0 || v >= values[i - 1] - 0.001);
}

export function isSortedDesc(values: number[]): boolean {
  return values.every((v, i) => i === 0 || v <= values[i - 1] + 0.001);
}
