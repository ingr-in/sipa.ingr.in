import { getDataSource } from 'https://www.sipa.ingr.in/xiku/ilu/social/megha.js';
import { loadFromTxt } from 'https://www.sipa.ingr.in/xiku/ilu/social/kalpu.js';
import { loadFromJson } from 'https://www.sipa.ingr.in/xiku/ilu/social/alpu.js';

export async function loadSocialLinks(sinuElem, dataFile) {
  if (!sinuElem) {
    console.warn('sinuElem not provided, using default data file');
  }
  
  if (!dataFile) {
    console.warn('dataFile not provided, using default');
    dataFile = 'default.json';
  }

  try {
    const sourceType = getDataSource(sinuElem, dataFile);
    console.log(`Loading social links from ${sourceType} source...`);

    let result;

    if (sourceType === 'txt') {
      result = await loadFromTxt(dataFile);
    } else {
      try {
        result = await loadFromJson(dataFile);
        if (result && typeof result === 'object' && !Array.isArray(result)) {
          console.log('JSON data loaded successfully');
        }
      } catch (jsonError) {
        console.warn('JSON load failed:', jsonError.message);
        console.log('Attempting TXT fallback...');
        result = await loadFromTxt(dataFile);
      }
    }

    if (!result || (Array.isArray(result) && result.length === 0)) {
      console.warn('No data loaded, returning empty object');
      return {};
    }

    return result;

  } catch (error) {
    console.error('Critical error in loadSocialLinks:', error);
    return {};
  }
}