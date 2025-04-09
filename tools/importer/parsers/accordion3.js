/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = Array.from(element.querySelectorAll('[data-ref="accordion"]')).map((accordion) => {
    const titleElement = accordion.querySelector('[data-ref="accordionHeading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const contentElement = accordion.querySelector('[data-testid="AccordionContent"]');
    const content = contentElement ? Array.from(contentElement.childNodes).map(node => node.cloneNode(true)) : '';

    return [title, content];
  });

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}