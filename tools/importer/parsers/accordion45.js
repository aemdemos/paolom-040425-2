/* global WebImporter */
export default function parse(element, { document }) {
    // Define header row for Accordion block
    const headerRow = ['Accordion'];

    // Initialize rows array, starting with header row
    const rows = [headerRow];

    // Find all accordion sections within the element
    const sections = element.querySelectorAll("div[data-component='AccordionSimple'] > div[data-ref='accordion']");

    // Loop through each section
    sections.forEach((section) => {
        // Extract title
        const titleElement = section.querySelector("button[data-ref='accordionHeader']");
        const title = titleElement ? titleElement.textContent.trim() : '';

        // Extract content
        const contentElement = section.querySelector("div[data-ref='accordionContent']");
        const content = contentElement ? contentElement.cloneNode(true) : document.createTextNode('');

        // Add title and content as a row
        rows.push([document.createTextNode(title), content]);
    });

    // Create the accordion table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}