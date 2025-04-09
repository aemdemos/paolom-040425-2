/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];
  const rows = [];

  // Extract heading from the section
  const sectionHeading = element.querySelector('h2')?.textContent.trim();

  // Extract list items
  const listItems = element.querySelectorAll('ul li');
  if (listItems) {
    listItems.forEach((item) => {
      const link = item.querySelector('a');
      const linkContent = link?.querySelector('span')?.textContent.trim();
      const linkHref = link?.getAttribute('href');

      const linkElement = document.createElement('a');
      linkElement.href = linkHref;
      linkElement.textContent = linkContent;

      const rowContent = document.createElement('div');
      rowContent.append(linkElement);

      rows.push([rowContent]);
    });
  }

  // Extract footer link
  const footerLink = element.querySelector('footer a');
  if (footerLink) {
    const footerContent = footerLink.querySelector('span')?.textContent.trim();
    const footerHref = footerLink.getAttribute('href');

    const footerElement = document.createElement('a');
    footerElement.href = footerHref;
    footerElement.textContent = footerContent;

    const footerRowContent = document.createElement('div');
    footerRowContent.append(footerElement);

    rows.push([footerRowContent]);
  }

  // Create table using helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the table
  element.replaceWith(table);
}