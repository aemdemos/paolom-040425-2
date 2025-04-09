/* global WebImporter */
export default function parse(element, { document }) {
  const blockName = 'Cards (no images)';
  const rows = [[blockName]]; // Initialize table rows with the block name

  // Iterate through each section inside the element
  const sections = element.querySelectorAll('section');
  sections.forEach((section) => {
    const rowContent = []; // Initialize an array for the row’s content

    // Extract section heading
    const heading = section.querySelector('h3');
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim(); // Dynamically extract heading text
      rowContent.push(headingElement);
    }

    // Extract section list
    const list = section.querySelector('ul');
    if (list) {
      const listItems = Array.from(list.querySelectorAll('li')).map((li) => {
        const link = li.querySelector('a');
        if (link) {
          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', link.getAttribute('href')); // Dynamically set link href
          linkElement.textContent = link.textContent.trim(); // Dynamically extract link text
          return linkElement;
        }
        return null;
      }).filter(Boolean); // Remove null values from the array
      rowContent.push(...listItems); // Add all list items to the row content
    }

    // Push the row content into the rows array
    rows.push([rowContent]);
  });

  // Create a table block using WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the newly created table block
  element.replaceWith(table);
}