/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to create table rows
  const createRow = (content) => {
    return [content];
  };

  // Extract buttons and their labels from the navigation menu
  const buttons = Array.from(element.querySelectorAll('button'));

  const buttonLabels = buttons.map((button) => {
    const labelSpan = button.querySelector('span:not([aria-hidden="true"])');
    return labelSpan ? labelSpan.textContent.trim() : '';
  });

  // Prepare table rows
  const headerRow = ['Navigation Menu'];
  const contentRows = buttonLabels.map((label) => createRow(label));

  const cells = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}