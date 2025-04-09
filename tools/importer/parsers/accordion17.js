/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the accordion header and content
  const headers = element.querySelectorAll('[data-ref="accordionHeader"] > span');
  const contents = element.querySelectorAll('[data-ref="accordionContent"] .Accordion__StyledRichTextContent-sc-kdxjv9-0');

  // Prepare the header row
  const headerRow = ['Accordion'];

  // Prepare the content rows
  const rows = Array.from(headers).map((header, index) => {
    const title = document.createElement('div');
    title.textContent = header.textContent.trim();

    const content = document.createElement('div');
    content.innerHTML = contents[index]?.innerHTML.trim() || '';

    return [title, content];
  });

  // Combine header and content rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}