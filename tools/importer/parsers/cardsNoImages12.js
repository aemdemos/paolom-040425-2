/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Cards (no images)'];

  // Extract the cards from the input element
  const cards = Array.from(element.querySelectorAll('[data-component="CardCTATextLinks"]'));

  // Process each card to extract relevant content
  const rows = cards.map((card) => {
    const heading = card.querySelector('[data-ref="heading"]');
    const description = card.querySelector('[data-testid="CardContent"] p');
    const link = card.querySelector('[data-ref="link"]');

    // Create content for the cell
    const cellContent = [];

    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      cellContent.push(headingElement);
      cellContent.push(document.createElement('br'));
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      cellContent.push(descriptionElement);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      cellContent.push(document.createElement('br'));
      cellContent.push(linkElement);
    }

    return [cellContent];
  });

  // Combine header and rows into the final table structure
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}