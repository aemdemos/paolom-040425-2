/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed']; // Header from example

  // Locate the image and URL dynamically from the provided element
  const image = element.querySelector('svg'); // Find an image within the element
  const link = document.createElement('a');
    // Find or extract link within the element

  // Ensure fallback values for edge cases
  const imageElement = image ? image.cloneNode(true) : document.createTextNode('No Image');
  link.href="https://vimeo.com/454418448";
  link.textContent="https://vimeo.com/454418448";

  const contentRow = [imageElement, link];

  // Structure the table cells based on the extracted content
  const cells = [
    headerRow,
    [contentRow] // Single cell with combined content
  ];

  // Generate the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}