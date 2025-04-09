/* global WebImporter */
export default function parse(element, { document }) {
  // Check if the element contains the necessary data
  const logoSvg = element.querySelector('svg[aria-label="nationwide"]');
  const homepageLinkElement = element.querySelector('a[data-analytics-identifier="homepage logo"]');

  // Handle missing data gracefully
  if (!logoSvg || !homepageLinkElement) {
    console.warn('Required data not found in element');
    return;
  }

  const homepageLink = homepageLinkElement.getAttribute('href');

  // Remove any extraneous characters (e.g., '/') from the homepage link
  const sanitizedLink = homepageLink.replace(/\/$/, '');

  // Creating structured block table
  const cells = [
    ['Embed'],
    [[logoSvg, document.createTextNode(sanitizedLink)]] // Combine logo SVG and sanitized plaintext link into one cell
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing original element with block table
  element.replaceWith(blockTable);
}