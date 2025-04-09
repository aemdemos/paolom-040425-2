/* global WebImporter */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('[data-component="CardContactSimple"]'); // Select the card elements

  const headerRow = ['Columns'];

  const contentRow = Array.from(cards).map((card) => {
    const icon = card.querySelector('svg');
    const heading = card.querySelector('[data-ref="heading"]').textContent.trim();
    const availability = card.querySelector('[data-testid="CardAvailability"]').innerHTML.trim();
    const actionText = card.querySelector('[data-testid="CardActionText"]').innerHTML.trim();

    const columnContent = document.createElement('div');
    const columnHeading = document.createElement('h2');
    columnHeading.textContent = heading;
    columnContent.appendChild(icon.cloneNode(true)); // Clone the icon
    columnContent.appendChild(columnHeading);

    const availabilityContent = document.createElement('div');
    availabilityContent.innerHTML = availability;
    columnContent.appendChild(availabilityContent);

    const actionTextContent = document.createElement('div');
    actionTextContent.innerHTML = actionText;
    columnContent.appendChild(actionTextContent);

    return columnContent;
  });

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}