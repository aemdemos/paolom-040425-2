/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import cardsNoImages1Parser from './parsers/cardsNoImages1.js';
import accordion2Parser from './parsers/accordion2.js';
import accordion3Parser from './parsers/accordion3.js';
import cardsNoImages4Parser from './parsers/cardsNoImages4.js';
import columns7Parser from './parsers/columns7.js';
import cardsNoImages8Parser from './parsers/cardsNoImages8.js';
import tableNoHeader9Parser from './parsers/tableNoHeader9.js';
import hero10Parser from './parsers/hero10.js';
import hero11Parser from './parsers/hero11.js';
import cardsNoImages12Parser from './parsers/cardsNoImages12.js';
import columnsThreeColumns13Parser from './parsers/columnsThreeColumns13.js';
import embedVideo14Parser from './parsers/embedVideo14.js';
import accordion15Parser from './parsers/accordion15.js';
import tableStriped16Parser from './parsers/tableStriped16.js';
import accordion17Parser from './parsers/accordion17.js';
import quote18Parser from './parsers/quote18.js';
import columnsThreeColumns19Parser from './parsers/columnsThreeColumns19.js';
import cardsNoImages20Parser from './parsers/cardsNoImages20.js';
import cards23Parser from './parsers/cards23.js';
import embedVideo24Parser from './parsers/embedVideo24.js';
import columnsThreeColumns26Parser from './parsers/columnsThreeColumns26.js';
import search27Parser from './parsers/search27.js';
import columnsThreeColumns28Parser from './parsers/columnsThreeColumns28.js';
import cards29Parser from './parsers/cards29.js';
import search30Parser from './parsers/search30.js';
import columns32Parser from './parsers/columns32.js';
import tabs33Parser from './parsers/tabs33.js';
import hero34Parser from './parsers/hero34.js';
import accordion35Parser from './parsers/accordion35.js';
import embedVideo36Parser from './parsers/embedVideo36.js';
import tableStripedBordered37Parser from './parsers/tableStripedBordered37.js';
import embedVideo38Parser from './parsers/embedVideo38.js';
import columns39Parser from './parsers/columns39.js';
import columns41Parser from './parsers/columns41.js';
import hero42Parser from './parsers/hero42.js';
import embedVideo43Parser from './parsers/embedVideo43.js';
import accordion44Parser from './parsers/accordion44.js';
import accordion45Parser from './parsers/accordion45.js';
import columns46Parser from './parsers/columns46.js';
import cardsNoImages47Parser from './parsers/cardsNoImages47.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cardsNoImages1: cardsNoImages1Parser,
  accordion2: accordion2Parser,
  accordion3: accordion3Parser,
  cardsNoImages4: cardsNoImages4Parser,
  columns7: columns7Parser,
  cardsNoImages8: cardsNoImages8Parser,
  tableNoHeader9: tableNoHeader9Parser,
  hero10: hero10Parser,
  hero11: hero11Parser,
  cardsNoImages12: cardsNoImages12Parser,
  columnsThreeColumns13: columnsThreeColumns13Parser,
  embedVideo14: embedVideo14Parser,
  accordion15: accordion15Parser,
  tableStriped16: tableStriped16Parser,
  accordion17: accordion17Parser,
  quote18: quote18Parser,
  columnsThreeColumns19: columnsThreeColumns19Parser,
  cardsNoImages20: cardsNoImages20Parser,
  cards23: cards23Parser,
  embedVideo24: embedVideo24Parser,
  columnsThreeColumns26: columnsThreeColumns26Parser,
  search27: search27Parser,
  columnsThreeColumns28: columnsThreeColumns28Parser,
  cards29: cards29Parser,
  search30: search30Parser,
  columns32: columns32Parser,
  tabs33: tabs33Parser,
  hero34: hero34Parser,
  accordion35: accordion35Parser,
  embedVideo36: embedVideo36Parser,
  tableStripedBordered37: tableStripedBordered37Parser,
  embedVideo38: embedVideo38Parser,
  columns39: columns39Parser,
  columns41: columns41Parser,
  hero42: hero42Parser,
  embedVideo43: embedVideo43Parser,
  accordion44: accordion44Parser,
  accordion45: accordion45Parser,
  columns46: columns46Parser,
  cardsNoImages47: cardsNoImages47Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
