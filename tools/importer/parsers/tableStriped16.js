/* global WebImporter */
export default function parse(element, { document }) {
    const tableElement = element.querySelector('table');

    // Header row must EXACTLY match the example
    const headerRow = ['Table (striped)'];

    // Extract rows dynamically
    const rows = Array.from(tableElement.querySelectorAll('tr')).slice(1).map(row => {
        return Array.from(row.querySelectorAll('td')).map(td => {
            const contentElements = Array.from(td.childNodes).map(node => {
                if (node.nodeType === 3) { // Text node
                    return node.textContent.trim();
                } else if (node.nodeType === 1) { // Element node
                    return node.textContent.trim();
                }
            }).filter(content => content && content.length > 0); // Filter out empty data

            // Flatten content if it's a single element, otherwise keep array
            return contentElements.join(' ');
        });
    });

    // Create block table
    const tableData = [
        headerRow,
        ...rows
    ];

    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element
    element.replaceWith(block);
}