// socialRenderer.js - Render social links

import { SOCIAL_CONFIG } from 'https://www.sipa.ingr.in/xiku/ilu/social/rinku.js';

export function renderSocialLinks(data) {
  const container = document.getElementById('social');
  if (!container) return;
  container.innerHTML = '';

  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    container.innerHTML = '<p style="color:#666; font-size:0.95rem;">No social links available</p>';
    return;
  }

  const { urlPatterns, displayNames, icons, iconClass } = SOCIAL_CONFIG;

  // Check if <a prem='sinu'> exists in the DOM
  const sinuElement = document.querySelector('a[prem="sinu"]');
  const isSinuAvailable = sinuElement !== null;

  for (const [platform, username] of Object.entries(data)) {
    if (!username || !urlPatterns[platform]) continue;

    let link;
    
    // If <a prem='sinu'> is available, use it and update its attributes
    if (isSinuAvailable) {
      link = sinuElement.cloneNode(true); // Clone the element to reuse
      link.href = urlPatterns[platform](username);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = `social-link ${iconClass[platform] || ''}`;
      
      // Update the inner <i> element if it exists
      const iconElement = link.querySelector('i[linu="icon"]');
      if (iconElement) {
        iconElement.innerHTML = icons[platform] || '🔗';
      } else {
        // If no i element, set the content directly
        link.innerHTML = `${icons[platform] || '🔗'} ${displayNames[platform] || platform}`;
      }
      
      link.classList.add(`platform-${platform}`);
    } else {
      // Create new link if <a prem='sinu'> is not available
      link = document.createElement('a');
      link.href = urlPatterns[platform](username);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = `social-link ${iconClass[platform] || ''}`;
      link.innerHTML = `${icons[platform] || '🔗'} ${displayNames[platform] || platform}`;
      link.classList.add(`platform-${platform}`);
    }
    
    container.appendChild(link);
  }
}