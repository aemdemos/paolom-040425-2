/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example provided
  const headerRow = ['Cards (no images)'];

  // Extract the heading dynamically from the element
  const headingElement = element.querySelector('[data-ref="heading"]');
  const heading = headingElement ? headingElement.textContent.trim() : '';

  // Extract the rich text content dynamically
  const richTextElement = element.querySelector('[data-component="RichText"]');
  let content = [];
  if (richTextElement) {
    Array.from(richTextElement.childNodes).forEach((node) => {
      if (node.nodeType === 3) { // Text node type
        const trimmedText = node.textContent.trim();
        if (trimmedText) {
          content.push(document.createTextNode(trimmedText));
        }
      } else {
        content.push(node.cloneNode(true));
      }
    });
  }

  // Create the table structure based on extracted content
  const cells = [
    headerRow,
    [[heading, ...content]],
  ];

  // Use WebImporter.DOMUtils.createTable to generate the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table block
  element.replaceWith(block);
}