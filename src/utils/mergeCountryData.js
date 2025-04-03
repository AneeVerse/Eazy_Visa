import { countryData } from '@/data/countryData';

export const mergeCountryData = (apiCountries) => {
  // Create a lookup map from local data
  const localDataMap = new Map();
  Object.values(countryData).forEach(continentCountries => {
    continentCountries.forEach(country => {
      localDataMap.set(country.name.toLowerCase(), country);
    });
  });

  return apiCountries.map(apiCountry => {
    const localCountry = localDataMap.get(apiCountry.name.toLowerCase()) || {};
    
    // Priority: API data > local data
    return {
      // Simple fields from API
      id: apiCountry.id,
      name: apiCountry.name,
      price: apiCountry.price,
      continent: apiCountry.continent,
      isTrending: apiCountry.isTrending,
      visasOnTime: apiCountry.visasOnTime,
      flag: apiCountry.flag,
      landmark: apiCountry.landmark,
      landmarkName: apiCountry.landmarkName,
      altName: apiCountry.altName,
      description: apiCountry.description,
      visaType: apiCountry.visaType,
      lengthOfStay: apiCountry.lengthOfStay,
      validity: apiCountry.validity,
      pdfDownload: apiCountry.pdfDownload,
      
      // Complex nested objects from local data
      documentsRequired: localCountry.documentsRequired,
      rejectionReasons: localCountry.rejectionReasons,
      faqs: localCountry.faqs,
      sampleVisaCopy: localCountry.sampleVisaCopy,
      
      // Special handling for basicInfo
      basicInfo: {
        ...(localCountry.basicInfo || {}),
        ...(apiCountry.basicInfo || {})
      }
    };
  });
};