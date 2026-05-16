/**
 * Truncates a text string if it exceeds the specified limit
 * and appends an ellipsis (`...`) at the end.
 *
 * @param {string} text - The text to be sliced.
 * @param {number} [limit=100] - Maximum allowed characters before truncation.
 *
 * @returns {string} The truncated text with ellipsis if needed,
 * otherwise the original text.
 *
 * @example
 * textSlicer("Hello World", 5);
 * Returns: "Hello..."
 *
 * @example
 * textSlicer("Short text", 20);
 * Returns: "Short text"
 */

export const textSlicer = (text: string, limit: number = 100) => {
    return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
};