/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = Array.from(element.querySelectorAll('ul > li')).map((li) => {
    // Extract title and content
    const title = li.querySelector('span')?.textContent.trim();
    const linkText = li.querySelector('span')?.textContent.trim();
    const linkHref = li.querySelector('a')?.getAttribute('href');

    // Create title element
    const titleElement = document.createElement('div');
    titleElement.textContent = title;

    // Create content element with readable link
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', linkHref);
    linkElement.textContent = linkText;

    const contentElement = document.createElement('div');
    contentElement.appendChild(linkElement);

    return [titleElement, contentElement];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}