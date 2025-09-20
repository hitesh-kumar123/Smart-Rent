import React, { createContext, useState, useContext, useEffect } from "react";
import translationService from "../services/translationService";

// Create the context
const AppSettingsContext = createContext();

// Default application texts
const defaultTexts = {
  common: {
    search: "Search",
    login: "Log in",
    signup: "Sign up",
    logout: "Logout",
    profile: "Profile",
    help: "Help",
    becomeHost: "Become a Host",
    messages: "Messages",
    trips: "Trips",
    wishlist: "Wishlist",
    account: "Account",
    settings: "Settings",
  },
  home: {
    title: "Find your next perfect stay",
    subtitle:
      "Discover the best vacation rentals, homes, and unique places to stay around the world.",
    searchPlaceholder: "Anywhere",
    checkInOut: "Check in - Check out",
    guests: "Guests",
    inspirationTitle: "Inspiration for your next trip",
    inspirationSubtitle:
      "Explore top destinations with perfect vacation rentals",
    stayAnywhere: "Stay anywhere",
    stayAnywhereSubtitle: "Unique accommodations for every style and budget",
    discoverExperiences: "Discover experiences",
    discoverExperiencesSubtitle: "Find activities hosted by local experts",
    becomeHost: "Become a host",
    becomeHostSubtitle:
      "Share your space, earn extra income, and connect with guests from around the world.",
    learnMore: "Learn more",
  },
  // Add more sections as needed
};

export const AppSettingsProvider = ({ children }) => {
  // Get initial settings from localStorage or use defaults
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const [languageName, setLanguageName] = useState(() => {
    return localStorage.getItem("languageName") || "English";
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });

  const [translations, setTranslations] = useState(defaultTexts);
  const [isTranslating, setIsTranslating] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("languageName", languageName);
    localStorage.setItem("currency", currency);
  }, [language, languageName, currency]);

  // Fetch exchange rates when currency changes
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoadingRates(true);
      try {
        const rates = await translationService.getExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchExchangeRates();
    // Refresh rates every hour
    const interval = setInterval(fetchExchangeRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Fetch translations when language changes
  useEffect(() => {
    const translateApp = async () => {
      // Skip translation if English (default)
      if (language === "en") {
        setTranslations(defaultTexts);
        return;
      }

      try {
        setIsTranslating(true);
        // Only translate if not English
        const translated = await translationService.batchTranslate(
          defaultTexts,
          "en",
          language
        );
        setTranslations(translated);
      } catch (error) {
        console.error("Translation error:", error);
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
    if (!amount || isNaN(amount)) return "0";

    const currencySymbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
      INR: "₹",
    };

    // Get currency symbol for formatting
    const currencySymbol = currencySymbols[currency] || "$";

    // Use real exchange rates if available, otherwise use default conversion
    let convertedAmount = amount;
    if (exchangeRates && currency !== "USD") {
      convertedAmount = amount * exchangeRates[currency];
    }

    // Format based on currency
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(convertedAmount);
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
    isLoadingRates,
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
