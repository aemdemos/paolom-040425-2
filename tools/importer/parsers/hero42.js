/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract content from the element
  const titleElement = element.querySelector('h1');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const subheadingElement = element.querySelector('p');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Create heading and subheading elements
  const heading = document.createElement('h1');
  heading.textContent = title;

  const paragraph = document.createElement('p');
  paragraph.textContent = subheading;

  // Combine heading and paragraph into a single cell
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(heading);
  combinedContent.appendChild(paragraph);

  // Build the table structure
  const cells = [
    headerRow, // Header row
    [combinedContent], // Content row with single cell
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}