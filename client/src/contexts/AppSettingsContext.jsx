import React, { createContext, useState, useContext, useEffect } from 'react';
import translationService from '../services/translationService';

// Create the context
const AppSettingsContext = createContext();

// Default application texts
const defaultTexts = {
  common: {
    search: 'Search',
    login: 'Log in',
    signup: 'Sign up',
    logout: 'Logout',
    profile: 'Profile',
    help: 'Help',
    becomeHost: 'Become a Host',
    messages: 'Messages',
    trips: 'Trips',
    wishlist: 'Wishlist',
    account: 'Account',
    settings: 'Settings',
  },
  home: {
    title: 'Find your next perfect stay',
    subtitle: 'Discover the best vacation rentals, homes, and unique places to stay around the world.',
    searchPlaceholder: 'Anywhere',
    checkInOut: 'Check in - Check out',
    guests: 'Guests',
    inspirationTitle: 'Inspiration for your next trip',
    inspirationSubtitle: 'Explore top destinations with perfect vacation rentals',
    stayAnywhere: 'Stay anywhere',
    stayAnywhereSubtitle: 'Unique accommodations for every style and budget',
    discoverExperiences: 'Discover experiences',
    discoverExperiencesSubtitle: 'Find activities hosted by local experts',
    becomeHost: 'Become a host',
    becomeHostSubtitle: 'Share your space, earn extra income, and connect with guests from around the world.',
    learnMore: 'Learn more',
  },
  // Add more sections as needed
};

export const AppSettingsProvider = ({ children }) => {
  // Get initial settings from localStorage or use defaults
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  const [languageName, setLanguageName] = useState(() => {
    return localStorage.getItem('languageName') || 'English';
  });
  
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });

  const [translations, setTranslations] = useState(defaultTexts);
  const [isTranslating, setIsTranslating] = useState(false);

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('languageName', languageName);
    localStorage.setItem('currency', currency);
  }, [language, languageName, currency]);

  // Fetch translations when language changes
  useEffect(() => {
    const translateApp = async () => {
      // Skip translation if English (default)
      if (language === 'en') {
        setTranslations(defaultTexts);
        return;
      }

      try {
        setIsTranslating(true);
        // Only translate if not English
        const translated = await translationService.batchTranslate(defaultTexts, 'en', language);
        setTranslations(translated);
      } catch (error) {
        console.error('Translation error:', error);
        // Fallback to default texts
        setTranslations(defaultTexts);
      } finally {
        setIsTranslating(false);
      }
    };

    translateApp();
  }, [language]);

  // Change language
  const changeLanguage = async (code, name) => {
    setLanguage(code);
    setLanguageName(name);
  };

  // Change currency
  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  // Format price according to current currency
  const formatPrice = (amount) => {
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CAD: 'C$',
      AUD: 'A$',
      INR: '₹',
    };

    const symbol = currencySymbols[currency] || '$';
    
    // Simple conversion rates for demonstration
    // In a real app, you would fetch current exchange rates from an API
    const conversionRates = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110,
      CAD: 1.25,
      AUD: 1.35,
      INR: 75,
    };
    
    const convertedAmount = amount * conversionRates[currency];
    
    // Format based on currency
    if (currency === 'JPY' || currency === 'INR') {
      return `${symbol}${Math.round(convertedAmount)}`;
    }
    
    return `${symbol}${convertedAmount.toFixed(2)}`;
  };

  // Get text based on current language
  const getText = (section, key) => {
    if (translations && translations[section] && translations[section][key]) {
      return translations[section][key];
    }
    // Fallback to default text
    if (defaultTexts[section] && defaultTexts[section][key]) {
      return defaultTexts[section][key];
    }
    // Last resort fallback
    return `${section}.${key}`;
  };

  // Value object to be provided to consumers
  const value = {
    language,
    languageName,
    currency,
    changeLanguage,
    changeCurrency,
    formatPrice,
    getText,
    isTranslating,
    supportedLanguages: translationService.getSupportedLanguages(),
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useAppSettings = () => useContext(AppSettingsContext);

export default AppSettingsContext; 