// api.sinu - Fetch and display social media links
(function() {
    "use strict";

    const sinuElem = document.querySelector('sinu');
    const dataFile = sinuElem ? sinuElem.getAttribute('prem'):'prem';

    function getDataSource() {
      const premAttr = sinuElem ? sinuElem.getAttribute('prem') : null;
      if (premAttr && premAttr.toLowerCase() === 'txt') return 'txt';
      if (dataFile && dataFile.toLowerCase().endsWith('.txt')) return 'txt';
      return 'json';
    }

    async function loadFromTxt(file) {
      try {
        const resp = await fetch(file);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const text = await resp.text();
        const data = {};
        const lines = text.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const parts = trimmed.split(':').map(s => s.trim());
          if (parts.length >= 2) {
            const platform = parts[0];
            const username = parts.slice(1).join(':');
            if (platform && username) {
              data[platform] = username;
            }
          }
        }
        return data;
      } catch (e) {
        console.warn('TXT load error:', e);
        return null;
      }
    }

    async function loadFromJson(file) {
      try {
        const resp = await fetch(file);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        return data;
      } catch (e) {
        console.warn('JSON load error:', e);
        return null;
      }
    }

    async function loadSocialLinks() {
      const sourceType = getDataSource();
      if (sourceType === 'txt') {
        return await loadFromTxt(dataFile);
      } else {
        let jsonData = await loadFromJson(dataFile);
        if (jsonData) return jsonData;
        console.log('JSON not found, trying TXT fallback...');
        return await loadFromTxt(dataFile);
      }
    }

    function renderSocialLinks(data) {
      const container = document.getElementById('social');
      if (!container) return;
      container.innerHTML = '';

      if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
        container.innerHTML = '<p style="color:#666; font-size:0.95rem;">No social links available</p>';
        return;
      }

      const urlPatterns = {
        youtube: (u) => `https://youtube.com/@${u}`,
        instagram: (u) => `https://instagram.com/${u}`,
        facebook: (u) => `https://facebook.com/${u}`,
          facebookPage:(u)=>`https://www.facebook.com/profile.php?id=${u}`,
        twitter: (u) => `https://twitter.com/${u}`,
        linkedin: (u) => `https://linkedin.com/in/${u}`,
        github: (u) => `https://github.com/${u}`
      };

      const displayNames = {
        youtube: 'YouTube',
        instagram: 'Instagram',
        facebook: 'Facebook',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub'
      };

      const icons = {
        youtube: '▶️',
        instagram: '📷',
        facebook: '👍',
        twitter: '🐦',
        linkedin: '💼',
        github: '🐙'
      };
       const iconClass = {
  youtube: "fa-brands fa-youtube",
  instagram: "fa-brands fa-instagram",
  facebook: "fa-brands fa-facebook",
  twitter: "fa-brands fa-x-twitter",
  linkedin: "fa-brands fa-linkedin",
  github: "fa-brands fa-github"
};

      for (const [platform, username] of Object.entries(data)) {
        if (!username || !urlPatterns[platform]) continue;
        const link = document.createElement('a');
        link.href = urlPatterns[platform](username);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'social-link ${iconClass[platform]' ;
        link.innerHTML = `${icons[platform] || '🔗'} ${displayNames[platform] || platform}`;
        link.classList.add(`platform-${platform}`);
        container.appendChild(link);
      }
    }

    document.addEventListener('DOMContentLoaded', async () => {
      const data = await loadSocialLinks();
      renderSocialLinks(data);

      const yearSpan = document.getElementById('year');
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    });

})();
