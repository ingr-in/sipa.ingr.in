// socialLoader.js - Main social links loader
const baseUrl = 'https://www.sipa.ingr.in/xiku/ilu/social';

import { getDataSource } from `${baseUrl}/megha.js`;
import { loadFromTxt } from `${baseUrl}/kalpu.js`;
import { loadFromJson } from `${baseUrl}/alpu.js`;

export async function loadSocialLinks(sinuElem, dataFile) {
  // Validate inputs
  if (!sinuElem) {
    console.warn('sinuElem not provided, using default data file');
  }
  
  if (!dataFile) {
    console.warn('dataFile not provided, using default');
    dataFile = 'default';
  }

  try {
    // Determine source type
    const sourceType = getDataSource(sinuElem, dataFile);
    console.log(`Loading social links from ${sourceType} source...`);

    let result;

    if (sourceType === 'txt') {
      result = await loadFromTxt(dataFile);
    } else {
      // Try JSON
      try {
        result = await loadFromJson(dataFile);
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          // If result is an object with expected structure
          console.log('JSON data loaded successfully');
        }
      } catch (jsonError) {
        console.warn('JSON load failed:', jsonError.message);
        // Fallback to TXT
        console.log('Attempting TXT fallback...');
        result = await loadFromTxt(dataFile);
      }
    }

    // Validate result structure
    if (!result || (Array.isArray(result) && result.length === 0)) {
      console.warn('No data loaded, returning empty array');
      return [];
    }

    return result;

  } catch (error) {
    console.error('Critical error in loadSocialLinks:', error);
    // Return safe default
    return [];
  }
}