/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract accordion content
  const extractAccordionItems = (accordionElement) => {
    const items = [];
    const headers = accordionElement.querySelectorAll('[data-ref="accordionHeader"] > span');
    const contents = accordionElement.querySelectorAll('[data-ref="accordionContent"]');

    headers.forEach((header, index) => {
      const contentElement = contents[index];
      const title = header.textContent.trim();
      const content = [];

      if (contentElement) {
        const paragraphs = contentElement.querySelectorAll('p');
        paragraphs.forEach((p) => {
          content.push(p.textContent.trim()); // Extract plain text from paragraphs
        });

        const otherElements = contentElement.querySelectorAll(':scope > *:not(p)');
        otherElements.forEach((el) => {
          content.push(el.textContent.trim()); // Extract plain text from other elements
        });
      }

      items.push([title, content.join(' ')]); // Combine content into a single string cell
    });

    return items;
  };

  // Extract accordion blocks
  const accordionBlocks = [];
  const accordionContainers = element.querySelectorAll('[data-ref="accordion"]');
  accordionContainers.forEach((accordion) => {
    accordionBlocks.push(...extractAccordionItems(accordion));
  });

  // Correct header row to match example exactly
  const headerRow = ['Accordion'];
  const tableData = [headerRow, ...accordionBlocks];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  
  // Replace element with block table
  element.replaceWith(blockTable);
}