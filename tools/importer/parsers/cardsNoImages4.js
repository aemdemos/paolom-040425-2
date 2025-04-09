/* global WebImporter */
export default function parse(element, { document }) {
    // Extract sections
    const sections = element.querySelectorAll('section[data-component="CardLinkList"]');

    if (!sections.length) {
        console.warn('No sections found to process.');
        return;
    }

    // Create table structure
    const tableData = [['Cards (no images)']];

    sections.forEach(section => {
        const heading = section.querySelector('h2[data-ref="heading"]');
        const listItems = section.querySelectorAll('ul[data-ref="list"] li');

        if (!heading || !listItems.length) {
            console.warn('Section missing heading or list items, skipping section.');
            return;
        }

        const content = [];

        // Add heading
        if (heading) {
            const headingElement = document.createElement('strong');
            headingElement.textContent = heading.textContent.trim();
            content.push(headingElement);
        }

        // Add list items
        listItems.forEach(item => {
            const link = item.querySelector('a[data-ref="link"]');
            if (link) {
                const linkElement = document.createElement('a');
                linkElement.href = link.href;
                linkElement.textContent = link.textContent.trim();
                content.push(linkElement);
                content.push(document.createElement('br'));
            }
        });

        tableData.push([content]);
    });

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element
    element.replaceWith(blockTable);
}