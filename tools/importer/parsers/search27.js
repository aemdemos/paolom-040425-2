/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search'];

  // Extracting the query index URL dynamically with a fallback
  const searchForm = element.querySelector('form');
  let queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  if (searchForm && searchForm.action && searchForm.action !== 'about:blank#') {
    queryIndexURL = searchForm.action;
  }

  const tableData = [
    headerRow,
    [queryIndexURL], // Use the dynamically extracted or fallback URL
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}