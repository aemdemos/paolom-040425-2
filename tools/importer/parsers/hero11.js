/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract image
  const imageElement = element.querySelector('.ImageUi__Container-sc-1s16dzd-0 img');
  const image = imageElement ? document.createElement('img') : null;
  if (imageElement) {
    image.src = imageElement.src;
  }

  // Extract heading
  const headingElement = element.querySelector('[data-component="Heading2Editorial"]');
  const heading = headingElement ? document.createElement('h1') : null;
  if (headingElement) {
    heading.textContent = headingElement.textContent.trim();
  }

  // Extract subheading
  const subheadingElement = element.querySelector('[data-component="RichText"]');
  const subheading = subheadingElement ? document.createElement('p') : null;
  if (subheadingElement) {
    subheading.innerHTML = subheadingElement.innerHTML;
  }

  // Extract call-to-action
  const linkElement = element.querySelector('[data-testid="TextLink"]');
  const callToAction = linkElement ? document.createElement('a') : null;
  if (linkElement) {
    callToAction.href = linkElement.href;
    callToAction.textContent = linkElement.textContent.trim();
  }

  // Create table rows
  const rows = [
    headerRow,
    [
      [image, heading, subheading, callToAction].filter(Boolean)
    ]
  ];

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(blockTable);
}