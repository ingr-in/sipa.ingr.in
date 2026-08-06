// main.js - Main entry point

import { loadSocialLinks } from 'www.sipa.ingr.in/xiku/ilu/social/janvikantumae.js';
import { renderSocialLinks } from 'www.sipa.ingr.in/xiku/ilu/social/jgpri.js';
import { updateYear } from 'www.sipa.ingr.in/xiku/ilu/social/varsha.js';

(async function() {
  "use strict";

  const sinuElem = document.querySelector('sinu');
  const dataFile = sinuElem ? sinuElem.getAttribute('prem') : 'prem';

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const data = await loadSocialLinks(sinuElem, dataFile);
      renderSocialLinks(data);
      updateYear();
    } catch (error) {
      console.error('Failed to initialize:', error);
    }
  });

})();