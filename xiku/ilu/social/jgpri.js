// socialRenderer.js - Fixed version
import { SOCIAL_CONFIG } from 'https://www.sipa.ingr.in/xiku/ilu/social/rinku.js';

export function renderSocialLinks(data) {
  const container = document.getElementById('social');
  if (!container) return;
  container.innerHTML = '';

  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    container.innerHTML = '<p style="color:#666; font-size:0.95rem;">No social links available</p>';
    return;
  }

  const { urlPatterns, displayNames, icon } = SOCIAL_CONFIG;

  // Check if <a prem='sinu'> exists in the DOM
  const sinuElement = document.querySelector('a[prem="sinu"]');
  const isSinuAvailable = sinuElement !== null;

  for (const [platform, username] of Object.entries(data)) {
    if (!username || !urlPatterns[platform]) continue;

    let link;

    // If <a prem='sinu'> is available, use it and update its attributes
    if (isSinuAvailable) {
      link = sinuElement.cloneNode(true);
      link.href = urlPatterns[platform](username);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = `social-link platform-${platform}`;

      // Update the inner <i> element if it exists
      const iconElement = link.querySelector('i[linu="icon"]');
      if (iconElement) {
        const iconClass = icon[platform] || '';
        if (iconClass) {
          iconElement.className = iconClass;
        } else {
          iconElement.textContent = '🔗';
        }
      } else {
        // If no i element, create content
        const iconClass = icon[platform] || '';
        const displayName = displayNames[platform] || platform;
        if (iconClass) {
          link.innerHTML = `<i class="${iconClass}"></i> ${displayName}`;
        } else {
          link.innerHTML = `🔗 ${displayName}`;
        }
      }
    } else {
      // Create new link if <a prem='sinu'> is not available
      link = document.createElement('a');
      link.href = urlPatterns[platform](username);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = `social-link platform-${platform}`;
      
      const iconClass = icon[platform] || '';
      const displayName = displayNames[platform] || platform;
      
      if (iconClass) {
        link.innerHTML = `<i class="${iconClass}"></i> ${displayName}`;
      } else {
        link.innerHTML = `🔗 ${displayName}`;
      }
    }

    container.appendChild(link);
  }
}