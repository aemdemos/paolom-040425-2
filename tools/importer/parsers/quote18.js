/* global WebImporter */
export default function parse(element, { document }) {
  // Critical Review:
  // 1. The header row matches the example precisely: ['Quote']
  // 2. Content is dynamically extracted from the element (quote text).
  // 3. Markdown syntax is not used; we rely on creating HTML elements properly.
  // 4. Edge cases are handled by dynamically querying the element and not hardcoding.

  // Extract the quote text from the paragraph within the provided element.
  const paragraph = element.querySelector('p');
  const quoteText = paragraph ? paragraph.textContent.trim() : '';

  // Ensure header row matches the example format exactly
  const headerRow = ['Quote'];

  // Check and handle edge cases for missing or empty content
  const rows = [
    headerRow,
    [quoteText || 'No quote available'], // Fallback for empty data
  ];

  // Create the table block using the provided helper function
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(tableBlock);
}