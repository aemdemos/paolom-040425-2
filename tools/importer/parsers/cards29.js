/* global WebImporter */
export default function parse(element, { document }) {
    // Correcting header row to match example exactly with <strong>
    const cardsHeader = [document.createElement('strong').appendChild(document.createTextNode('Cards'))];

    // Extract all cards and clean up structure
    const cards = Array.from(
        element.querySelectorAll('[data-component="CardContactSimple"]')
    ).map((card) => {
        // Extract image or icon from the card
        const imageOrIcon = card.querySelector('svg, img');

        // Extract title text from the card
        const title = card.querySelector('[data-ref="heading"]')?.textContent.trim();

        // Extract description content from the card, cleaning up nested tags
        let description = '';
        const descriptionElement = card.querySelector('[data-testid="CardContent"]');
        if (descriptionElement) {
            description = descriptionElement.innerHTML.trim().replace(/<p>(.*?)<\/p>/g, ' $1 ');
        }

        // Extract call-to-action text if available, cleaning up
        let action = '';
        const actionElement = card.querySelector('[data-testid="CardActionText"]');
        if (actionElement) {
            action = actionElement.innerHTML.trim().replace(/<div>(.*?)<\/div>/g, ' $1 ');
        }

        // Combine title, description, and action into text content array
        const textContent = [];
        if (title) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title;
            textContent.push(titleElement);
        }
        if (description) {
            const descriptionFragment = document.createElement('p');
            descriptionFragment.innerHTML = description;
            textContent.push(descriptionFragment);
        }
        if (action) {
            const actionFragment = document.createElement('div');
            actionFragment.innerHTML = action;
            textContent.push(actionFragment);
        }

        return [imageOrIcon, textContent];
    });

    // Combine header and cards into table data
    const tableData = [cardsHeader, ...cards];

    // Create the table using the WebImporter helper
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}