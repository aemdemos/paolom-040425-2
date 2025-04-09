/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all columns dynamically
  const columns = Array.from(
    element.querySelectorAll('.FooterNavigation__ColumnedFooter-sc-e6atpx-0 > .NelComponents__Grid-sc-vsly48-37 .NelComponents__Col-sc-vsly48-38')
  );

  // Header row must match example markdown
  const headerRow = ['Columns'];

  // Extract content dynamically for each column
  const contentRow = columns.map((col) => {
    const heading = col.querySelector('h2');
    const list = col.querySelector('ul');

    // Handle missing heading gracefully
    const headingText = heading ? document.createElement('h2') : null;
    if (headingText) headingText.textContent = heading.textContent.trim();

    // Dynamically extract list items
    const items = list
      ? Array.from(list.querySelectorAll('li')).map((li) => {
          const link = li.querySelector('a');
          return link ? link.outerHTML : li.textContent.trim();
        })
      : [];

    // Create structured content dynamically
    const content = document.createElement('div');
    if (headingText) content.appendChild(headingText);
    items.forEach((item) => {
      const itemElement = document.createElement('p');
      itemElement.innerHTML = item;
      content.appendChild(itemElement);
    });

    return content;
  });

  // Create table using WebImporter helper method
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with the new block table
  element.replaceWith(table);
}