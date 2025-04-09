/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header)'];

  // Dynamically extract all potential content from the element
  const textElements = element.querySelectorAll('small, span');
  const items = Array.from(textElements).map(el => el.textContent.trim()).filter(text => text.length > 0);

  // Handle edge cases for missing data
  if (items.length === 0) {
    const fallbackMessage = 'No content available in the provided element to generate a table.';
    const fallbackRow = [fallbackMessage];
    const cells = [headerRow, fallbackRow];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // Convert items into rows
  const rows = items.map(item => [item]);

  // Create the table block
  const cells = [headerRow, ...rows]; // Combine headerRow with rows
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}