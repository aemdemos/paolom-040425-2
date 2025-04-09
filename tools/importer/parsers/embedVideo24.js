/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const iframe = element.querySelector('iframe[src]');

  if (!iframe) {
    return;
  }

  const videoUrl = iframe.getAttribute('src');

  // Create the table structure
  const cells = [
    ['Embed'],
    [videoUrl],
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}