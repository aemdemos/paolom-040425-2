/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the URL for the search index
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Define the table header
  const headerRow = ['Search'];

  // Define the content row with the absolute URL
  const contentRow = [document.createElement('a')];
  contentRow[0].href = searchIndexUrl;
  contentRow[0].textContent = searchIndexUrl;

  const tableCells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}