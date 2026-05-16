/**
 * Formats a number with commas (e.g., 1,000)
 * @param {number} x - The number to be formatted.
 * @returns {string} The formatted number with commas.
 * @example
 * numberWithCommas(1000); // Returns: "1,000"
 * */

export const numberWithCommas = (number: string) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");