/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row (matches example exactly)
  const headerRow = ['Columns'];

  // Extract introduction paragraph
  const introElement = element.querySelector('div[data-component="RichText"] > p');
  const introParagraph = introElement ? document.createElement('p').appendChild(document.createTextNode(introElement.textContent.trim())) : document.createElement('p');

  // Extract eligibility list
  const eligibilityListElements = element.querySelectorAll('ul > li');
  const eligibilityList = 
    eligibilityListElements.length > 0
      ? (() => {
          const ul = document.createElement('ul');
          Array.from(eligibilityListElements).forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.textContent.trim();
            ul.appendChild(li);
          });
          return ul;
        })()
      : document.createElement('ul');

  // Extract information box content
  const infoBoxElement = element.querySelector('div[data-ref="messageContent"] > div');
  const infoBox = infoBoxElement ? document.createElement('p').appendChild(document.createTextNode(infoBoxElement.textContent.trim())) : document.createElement('p');

  // Extract "Make a claim" section content
  const claimContentElements = element.querySelectorAll('div[data-component="RichText"] > p');
  const claimContent = 
    claimContentElements.length > 1
      ? (() => {
          const div = document.createElement('div');
          Array.from(claimContentElements)
            .slice(1) // Skip the first paragraph that belongs to the intro
            .forEach((item) => {
              const p = document.createElement('p');
              p.textContent = item.textContent.trim();
              div.appendChild(p);
            });
          return div;
        })()
      : document.createElement('div');

  // Extract related links
  const relatedLinkElements = element.querySelectorAll('aside ul > li > a');
  const relatedLinks = relatedLinkElements.length > 0
    ? (() => {
        const ul = document.createElement('ul');
        Array.from(relatedLinkElements).forEach((link) => {
          const li = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent.trim();
          li.appendChild(anchor);
          ul.appendChild(li);
        });
        return ul;
      })()
    : document.createElement('ul');

  // Construct the table array
  const rows = [
    [introParagraph, eligibilityList],
    [infoBox, claimContent],
    [relatedLinks]
  ];

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}