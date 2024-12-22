import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTranslations } from './translations'; 


export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('cs'); 
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      const data = await getTranslations(language);
      setTranslations(data);
    };

    fetchTranslations();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return React.useContext(LanguageContext);
};