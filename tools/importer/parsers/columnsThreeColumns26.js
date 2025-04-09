/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content from list items
  function extractContentFromListItems(listItems) {
    return Array.from(listItems).map((listItem) => {
      const heading = listItem.querySelector('h2');
      const paragraph = listItem.querySelector('p');
      const image = listItem.querySelector('img');

      // Create heading element
      const headingElement = document.createElement('h2');
      headingElement.textContent = heading ? heading.textContent.trim() : '';

      // Create paragraph element
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph ? paragraph.textContent.trim() : '';

      // Create image element
      const imageElement = document.createElement('img');
      if (image) {
        imageElement.setAttribute('src', image.src);
        imageElement.setAttribute('alt', image.alt || '');
      }

      // Return content elements for this column
      return [imageElement, headingElement, paragraphElement];
    });
  }

  // Extract content from the first and second ordered lists
  const olElements = element.querySelectorAll('ol');
  const firstOlItems = olElements[0]?.querySelectorAll('li') || [];
  const secondOlItems = olElements[1]?.querySelectorAll('li') || [];

  const firstOlContent = extractContentFromListItems(firstOlItems);
  const secondOlContent = extractContentFromListItems(secondOlItems);

  // Combine all content into separate columns, matching example layout
  const allContent = [...firstOlContent, ...secondOlContent].slice(0, 3); // Ensure only 3 columns as per example

  // Header row for the table
  const headerRow = ['Columns'];

  // Create rows for the table
  const tableCells = [
    headerRow,
    allContent,
  ];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the table
  element.replaceWith(blockTable);
}