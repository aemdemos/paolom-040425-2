/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Embed'];

  // Extract the URL from the anchor tag
  const linkElement = element.querySelector('a');
  const url = linkElement ? linkElement.href : '';

  // Create the content row for the table
  const contentRow = [url];

  // Build the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}