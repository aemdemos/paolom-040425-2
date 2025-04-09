/* global WebImporter */
export default function parse(element, { document }) {
  // Extract heading and subheading dynamically
  const heading = element.querySelector('[data-ref="heading"] span')?.textContent.trim() || '';
  const subheading = element.querySelector('.Content-sc-mh9bui-0 p')?.textContent.trim() || '';

  // Create heading element dynamically
  const headingElement = document.createElement('h1');
  headingElement.textContent = heading;

  // Create subheading element dynamically (handle empty case)
  const subheadingElement = document.createElement('p');
  subheadingElement.textContent = subheading;

  // Combine heading and subheading into a single cell in the second row
  const contentCell = document.createElement('div');
  contentCell.append(headingElement, subheadingElement);

  // Create the block table with exact headers matching example
  const cells = [
    ['Hero'], // Block type header row
    [contentCell], // Content row with combined elements
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}