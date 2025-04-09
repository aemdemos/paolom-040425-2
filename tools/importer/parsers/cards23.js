/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Extract cards content dynamically
  const cardsContent = Array.from(element.querySelectorAll('.SideBySideLayout__ContainerWrapper-sc-nb03j7-1')).map((card) => {
    const titleElement = card.querySelector('h2');
    const descriptionElement = card.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0 p');
    const itemsElements = card.querySelectorAll('ul li');
    const buttonElement = card.querySelector('a');

    const content = [];

    // Extract title dynamically
    if (titleElement) {
      const titleNode = document.createElement('strong');
      titleNode.textContent = titleElement.textContent.trim();
      content.push(titleNode);
    }

    // Extract description dynamically
    if (descriptionElement) {
      const descriptionNode = document.createElement('p');
      descriptionNode.textContent = descriptionElement.textContent.trim();
      content.push(descriptionNode);
    }

    // Extract list items dynamically
    if (itemsElements.length > 0) {
      const itemsList = document.createElement('ul');
      itemsElements.forEach((itemElement) => {
        const listItem = document.createElement('li');
        listItem.textContent = itemElement.textContent.trim();
        itemsList.appendChild(listItem);
      });
      content.push(itemsList);
    }

    // Extract button dynamically
    if (buttonElement) {
      const buttonNode = document.createElement('a');
      buttonNode.textContent = buttonElement.textContent.trim();
      buttonNode.href = buttonElement.href;
      content.push(buttonNode);
    }

    return [content];
  });

  // Create table block
  const tableData = [headerRow, ...cardsContent];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with the block table
  element.replaceWith(blockTable);
}