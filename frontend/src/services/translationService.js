/**
 * Translation Service using MyMemory Translation API
 * This service provides methods to translate text between different languages
 */

// Base URL for MyMemory API
const BASE_URL = "https://api.mymemory.translated.net/get";

/**
 * Translates text from one language to another
 * @param {string} text - The text to translate
 * @param {string} fromLang - Source language code (e.g., 'en', 'es')
 * @param {string} toLang - Target language code (e.g., 'fr', 'de')
 * @param {string} email - Optional email for higher daily limits (recommended for production)
 * @returns {Promise<string>} - The translated text
 */
export const translateText = async (
  text,
  fromLang = "en",
  toLang,
  email = ""
) => {
  try {
    // Build the query parameters
    const params = new URLSearchParams({
      q: text,
      langpair: `${fromLang}|${toLang}`,
    });

    // Add email parameter if provided (for higher limits)
    if (email) {
      params.append("de", email);
    }

    // Make the API request
    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Translation failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Check for API errors
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || "Translation failed");
    }

    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

/**
 * Batch translate an object of texts
 * @param {Object} textsObject - Object containing texts to translate as key-value pairs
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {Promise<Object>} - Object with the same keys but translated values
 */
export const batchTranslate = async (textsObject, fromLang = "en", toLang) => {
  const translatedObject = {};

  // Process each key-value pair sequentially to avoid rate limiting
  for (const [key, value] of Object.entries(textsObject)) {
    if (typeof value === "string") {
      // Translate the string value
      translatedObject[key] = await translateText(value, fromLang, toLang);
    } else if (typeof value === "object" && value !== null) {
      // Recursively translate nested objects
      translatedObject[key] = await batchTranslate(value, fromLang, toLang);
    } else {
      // Keep non-string values as is
      translatedObject[key] = value;
    }

    // Add a small delay between requests to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return translatedObject;
};

/**
 * Get supported languages
 * @returns {Array} Array of supported language objects with code and name
 */
export const getSupportedLanguages = () => {
  return [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "nl", name: "Nederlands" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "tr", name: "Türkçe" },
    { code: "pl", name: "Polski" },
    { code: "vi", name: "Tiếng Việt" },
  ];
};

/**
 * Fetches current exchange rates from a free API
 * @returns {Promise<Object>} Object containing exchange rates
 */
export const getExchangeRates = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Return default rates as fallback
    return {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110,
      CAD: 1.25,
      AUD: 1.35,
      INR: 75,
    };
  }
};

export default {
  translateText,
  batchTranslate,
  getSupportedLanguages,
  getExchangeRates,
};
