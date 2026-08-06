// main.js - Main entry point

const iS=`https://www.sipa.ingr.in/xiku/ilu/social`;
import { loadSocialLinks } from '${iS}/janvikantumae.js';
import { renderSocialLinks } from '${iS}/jgpri.js';
import { updateYear } from '${iS}/varsha.js';

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