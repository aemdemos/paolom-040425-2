/* global WebImporter */
export default function parse(element, { document }) {
  const columns = [];

  // Extract each list item from the element
  const items = element.querySelectorAll('li');
  items.forEach((item) => {
    const title = item.querySelector('h3');
    const description = item.querySelector('p');
    const image = item.querySelector('img');

    // Create content for the column
    const columnContent = [];

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      columnContent.push(h3);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent;
      columnContent.push(p);
    }

    if (image) {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      columnContent.push(img);
    }

    columns.push(columnContent);
  });

  const tableData = [
    ['Columns'], // Header row
    columns.map((content) => content), // Each column as a separate cell
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}