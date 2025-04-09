/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Ensure dynamic extraction of all relevant content
  const title = element.querySelector('p strong')?.textContent.trim();
  const listItems = element.querySelectorAll('ul > li');

  // Handle edge cases for missing or empty data
  if (!listItems || listItems.length === 0) {
    console.warn('No list items found in the element');
    return;
  }

  // Collect rows representing each card
  const rows = Array.from(listItems).map((listItem) => {
    // Ensure dynamic extraction of title and description for each card
    const cardTitle = listItem.querySelector('p strong')?.textContent.trim() || '';
    const cardDescription = listItem.querySelector('p strong')?.nextSibling?.textContent.trim() || '';

    // Create HTML elements for the card content dynamically
    const cardContent = document.createElement('div');
    if (cardTitle) {
      const heading = document.createElement('h3');
      heading.textContent = cardTitle;
      cardContent.appendChild(heading);
    }
    if (cardDescription) {
      const description = document.createElement('p');
      description.textContent = cardDescription;
      cardContent.appendChild(description);
    }

    return [cardContent];
  });

  // Create the block table with dynamically extracted content
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}