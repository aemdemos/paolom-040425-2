/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = Array.from(element.querySelectorAll('[data-ref="accordion"]')).map((accordion) => {
    const titleElement = accordion.querySelector('[data-ref="accordionHeading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const contentElement = accordion.querySelector('[data-ref="accordionContent"]');
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    const titleCell = document.createElement('div');
    titleCell.textContent = title;

    const contentCell = document.createElement('div');
    contentCell.innerHTML = content;

    return [titleCell, contentCell];
  });

  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}