// main.js - Main entry point
const baseUrl = 'https://www.sipa.ingr.in/xiku/ilu/social';

(async function() {
  "use strict";

  const sinuElem = document.querySelector('sinu');
  const dataFile = sinuElem ? sinuElem.getAttribute('prem') : 'prem';

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Dynamic imports with proper error handling
      const [{ loadSocialLinks }, { renderSocialLinks }, { updateYear }] = await Promise.all([
        import(`${baseUrl}/janvikantumae.js`),
        import(`${baseUrl}/jgpri.js`),
        import(`${baseUrl}/varsha.js`)
      ]);

      const data = await loadSocialLinks(sinuElem, dataFile);
      renderSocialLinks(data);
      updateYear();
    } catch (error) {
      console.error('Failed to load modules or initialize:', error);
    }
  });

})();