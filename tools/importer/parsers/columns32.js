/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main heading dynamically from the left column
  const headerElement = element.querySelector('[data-component="Heading2"]');
  const header = document.createElement('h2');
  if (headerElement) {
    header.innerHTML = headerElement.innerHTML;
  }

  // Extract list items dynamically from the left column
  const listItemsContainer = element.querySelector('[data-component="ListTicksCrosses"] ul');
  const listItems = listItemsContainer
    ? Array.from(listItemsContainer.querySelectorAll('li')).map((li) => li.querySelector('p'))
    : [];

  // Extract eligibility criteria dynamically from the right column
  const eligibilityHeaderElement = element.querySelector('[data-component="Eligibility"] h3');
  const eligibilityHeader = document.createElement('h3');
  if (eligibilityHeaderElement) {
    eligibilityHeader.innerHTML = eligibilityHeaderElement.innerHTML;
  }

  const eligibilityList = element.querySelector('[data-component="Eligibility"] ul') || document.createElement('ul');

  // Extract the note section dynamically
  const noteElement = element.querySelector('[data-testid="MessagingFramework"]');
  const noteHeader = document.createElement('h3');
  const noteHeaderElement = noteElement?.querySelector('h3');
  if (noteHeaderElement) {
    noteHeader.innerHTML = noteHeaderElement.innerHTML;
  }

  const noteContent = document.createElement('p');
  const noteContentElement = noteElement?.querySelector('div.Content-sc-mh9bui-0');
  if (noteContentElement) {
    noteContent.innerHTML = noteContentElement.innerHTML;
  }

  // Prepare the table cells ensuring headers match example structure
  const cells = [
    ['Columns'], // Header row
    [header, listItems],
    [eligibilityHeader, eligibilityList],
    [noteHeader, noteContent],
  ];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(tableBlock);
}