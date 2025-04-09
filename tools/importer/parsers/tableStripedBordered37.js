/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row based on the example
  const headerRow = ['Table (striped & bordered)'];

  // Extract the table headers
  const tableHeaders = Array.from(element.querySelectorAll('thead th')).map(th => th.textContent.trim());

  // Extract the table rows from the original HTML
  const rows = Array.from(element.querySelectorAll('tbody tr')).map(tr => {
    return Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
  });

  // Prepare the cells for the new table
  const cells = [
    headerRow, // Correct header row based on the example
    tableHeaders.map(header => document.createTextNode(header)), // Table headers row
    ...rows.map(row => row.map(cell => document.createTextNode(cell))) // Data rows
  ];

  // Create the new table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}