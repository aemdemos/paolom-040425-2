/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all columns from the input element (SideBySideGrid)
  const columns = Array.from(element.querySelectorAll('[data-ref="gridColumn"]'));

  // Map over the columns to extract relevant content
  const rows = columns.map((column) => {
    const heading = column.querySelector('[data-ref="heading"]')?.textContent.trim();
    const paragraph = column.querySelector('p');
    const link = column.querySelector('a');
    const image = column.querySelector('img');

    // Create content for each column
    const content = [];

    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading;
      content.push(headingElement);
    }

    if (paragraph) {
      content.push(paragraph);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      content.push(linkElement);
    }

    return [content, image];
  });

  // Add the header row specifying the block type
  const headerRow = ['Columns'];

  // Combine header and content rows
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}