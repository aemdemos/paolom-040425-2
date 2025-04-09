/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const heading = element.querySelector('[data-ref="heading"]');
  const title = heading ? heading.innerHTML : '';

  // Extract the subheading
  const subheadingElement = element.querySelector('.HomepageHeroEdgeToEdge__StyledRichText-sc-rkxeoj-5 p');
  const subheading = subheadingElement ? subheadingElement.innerHTML : '';

  // Extract the call-to-action
  const ctaElement = element.querySelector('[data-ref="link"]');
  const ctaLink = ctaElement ? ctaElement.href : '';
  const ctaText = ctaElement ? ctaElement.textContent : '';

  // Extract the background image (if any)
  const backgroundImageElement = element.querySelector('.HomepageHeroEdgeToEdge__ImageColumn-sc-rkxeoj-6 img');
  const backgroundImage = backgroundImageElement ? backgroundImageElement.src : '';

  // Create content array
  const content = [];

  if (backgroundImage) {
    const image = document.createElement('img');
    image.src = backgroundImage;
    content.push(image);
  }

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.innerHTML = title;
    content.push(titleElement);
  }

  if (subheading) {
    const subheadingParagraph = document.createElement('p');
    subheadingParagraph.innerHTML = subheading;
    content.push(subheadingParagraph);
  }

  if (ctaLink && ctaText) {
    const cta = document.createElement('a');
    cta.href = ctaLink;
    cta.textContent = ctaText;
    content.push(cta);
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [content]
  ], document);

  // Replace the original element
  element.replaceWith(blockTable);
}