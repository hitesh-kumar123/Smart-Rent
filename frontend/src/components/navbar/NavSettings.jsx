import React from "react";

// Add custom animation styles
const styles = {
  "@keyframes slideUpAndFade": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes slideDownAndFade": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
  },
};

const NavSettings = ({
  isSettingsMenuOpen,
  setIsSettingsMenuOpen,
  languageName,
  currency,
  supportedLanguages,
  currencies,
  handleLanguageChange,
  handleCurrencyChange,
  isTranslating,
  isLoadingRates,
  language,
  settingsRef,
}) => {
  // Animation classes for the modal
  const modalAnimationClass = isSettingsMenuOpen
    ? "animate-fadeIn"
    : "animate-fadeOut";

  // Animation classes for the modal content
  const contentAnimationClass = isSettingsMenuOpen
    ? "animate-slideUpAndFade"
    : "animate-slideDownAndFade";
  return (
    <div ref={settingsRef} className="relative">
      <button
        onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
        className={`
          flex items-center justify-center p-2.5 
          text-neutral-600 hover:text-neutral-900
          rounded-full 
          hover:bg-neutral-100 active:bg-neutral-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transform active:scale-95
          transition-all duration-200
        `}
        aria-label="Language and Currency Settings"
        title="Language and Currency Settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-transform duration-200 hover:scale-105"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12H22"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Language and Currency Modal */}
      {isSettingsMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center animate-fadeIn p-4 sm:p-0">
          <div
            className={`
              bg-white rounded-2xl shadow-2xl w-full sm:max-w-xl 
              max-h-[90vh] sm:max-h-[85vh] overflow-y-auto 
              transform transition-all duration-300 ease-out 
              animate-slideUpAndFade
              relative
            `}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold text-neutral-800 mb-2 sm:mb-0">
                Language and Currency
              </h2>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                <span className="text-sm text-neutral-500 sm:mr-4">
                  {languageName}, {currency}
                </span>
                <button
                  onClick={() => setIsSettingsMenuOpen(false)}
                  className="p-2.5 rounded-full hover:bg-neutral-100 active:bg-neutral-200 transition-colors duration-200"
                  aria-label="Close settings"
                >
                  <i className="fas fa-times text-neutral-500 hover:text-neutral-700"></i>
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Select a language
              </h3>

              {isTranslating ? (
                <div className="flex flex-col items-center justify-center py-8 px-4">
                  <div className="relative w-10 h-10 mb-3">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-100 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                  </div>
                  <span className="text-neutral-600 text-center font-medium">
                    Loading translations...
                  </span>
                  <span className="text-neutral-400 text-sm mt-1">
                    This may take a few seconds
                  </span>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="font-medium text-neutral-700 mb-2">
                      Suggested languages
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {supportedLanguages.slice(0, 6).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() =>
                            handleLanguageChange(lang.code, lang.name)
                          }
                          className={`
                            flex items-center px-4 py-3 text-sm rounded-lg
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-500
                            transform active:scale-[0.98]
                            ${
                              language === lang.code
                                ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200 shadow-sm"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
                            }
                          `}
                        >
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium text-neutral-700 mb-2">
                      All languages
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {supportedLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() =>
                            handleLanguageChange(lang.code, lang.name)
                          }
                          className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                            language === lang.code
                              ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200"
                              : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Currency Selection */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Select a currency
              </h3>

              {isLoadingRates ? (
                <div className="flex flex-col items-center justify-center py-8 px-4">
                  <div className="relative w-10 h-10 mb-3">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-100 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                  </div>
                  <span className="text-neutral-600 text-center font-medium">
                    Loading exchange rates...
                  </span>
                  <span className="text-neutral-400 text-sm mt-1">
                    Fetching latest rates
                  </span>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="font-medium text-neutral-700 mb-2">
                      Popular currencies
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currencies.slice(0, 4).map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => handleCurrencyChange(curr.code)}
                          className={`
                            flex items-center px-4 py-3 text-sm rounded-lg
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-500
                            transform active:scale-[0.98]
                            ${
                              currency === curr.code
                                ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200 shadow-sm"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
                            }
                          `}
                        >
                          <span className="mr-2 font-bold text-base">
                            {curr.symbol}
                          </span>
                          <span>
                            {curr.code} - {curr.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-medium text-neutral-700 mb-2">
                      All currencies
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => handleCurrencyChange(curr.code)}
                          className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                            currency === curr.code
                              ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200"
                              : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <span className="mr-2 font-bold">{curr.symbol}</span>
                          <span>
                            {curr.code} - {curr.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSettings;
