const GUJARATI_DIGITS = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];

/**
 * Converts English digits (0-9) to Gujarati numerals (૦-૯)
 */
export const toGujaratiNumeral = (num: number | string): string => {
  if (num === undefined || num === null) return '';
  return String(num).replace(/[0-9]/g, (digit) => GUJARATI_DIGITS[parseInt(digit, 10)]);
};
