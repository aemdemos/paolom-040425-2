/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const cells = [headerRow];

  // Extract sections from the element
  const sections = element.querySelectorAll('[data-component="GuideSection"]');

  sections.forEach((section) => {
    const sectionTitle = section.querySelector('h2')?.textContent.trim();

    const items = [...section.querySelectorAll('li')].map((li) => {
      const anchor = li.querySelector('a[data-ref="link"]');
      const titleElement = anchor.querySelector('span')?.textContent.trim();
      const descriptionElement = anchor.querySelector('small')?.textContent.trim();
      const linkHref = anchor.getAttribute('href');

      const container = document.createElement('div');

      if (titleElement) {
        const titleDiv = document.createElement('div');
        titleDiv.textContent = titleElement;
        container.appendChild(titleDiv);
      }

      if (descriptionElement) {
        const descDiv = document.createElement('div');
        descDiv.textContent = descriptionElement;
        container.appendChild(descDiv);
      }

      if (linkHref) {
        const linkDiv = document.createElement('div');
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', linkHref);
        linkElement.textContent = 'Download';
        linkDiv.appendChild(linkElement);
        container.appendChild(linkDiv);
      }

      return container;
    });

    const combinedContent = document.createElement('div');
    items.forEach((item) => combinedContent.appendChild(item));

    cells.push([sectionTitle, combinedContent]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}