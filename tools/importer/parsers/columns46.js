/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row for the block table
    const headerRow = ['Columns'];

    // Extract first column content
    const columnsContent = Array.from(element.children).map(column => {
        const content = [];

        // Extract heading
        const heading = column.querySelector('h3');
        if (heading) {
            const headingElement = document.createElement('h3');
            headingElement.textContent = heading.textContent;
            content.push(headingElement);
        }

        // Extract percentage bar descriptions
        const percentBarItems = column.querySelectorAll('p');
        percentBarItems.forEach(item => {
            const paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = item.innerHTML;
            content.push(paragraphElement);
        });

        return content;
    });

    // Create the table data structure
    const cells = [
        headerRow,
        columnsContent
    ];

    // Create the table using WebImporter.DOMUtils.createTable()
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the generated table
    element.replaceWith(table);
}