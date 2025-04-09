/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row, ensuring it matches the example
  const headerRow = ['Columns'];

  // Extract content and ensure proper handling of edge cases
  const contentRow = Array.from(element.querySelectorAll('li')).map((item) => {
    const link = item.querySelector('a');
    const text = link ? link.textContent.trim() : '';
    const href = link ? link.href : '';
    const anchor = document.createElement('a');
    if (href) {
      anchor.href = href;
      anchor.textContent = text;
    }

    const image = item.querySelector('img');
    const imgElement = document.createElement('img');
    if (image && image.src) {
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';
    }

    // Combine anchor and image directly into one cohesive cell
    return [anchor, imgElement];
  });

  const cells = [
    headerRow,
    contentRow, // Ensure content row distributes items into individual columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}