export const getTranslations = async (language) => { 
    try {
      const translations = await import(`./${language}.json`);
      return translations.default;
    } catch (error) {
      console.error(`Chyba při načítání překladů pro jazyk ${language}:`, error);
      return {}; 
    }
  };