import React from "react";

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
  return (
    <div ref={settingsRef} className="relative">
      <button
        onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
        className="flex items-center justify-center p-2 text-neutral-700 hover:text-neutral-900 transition duration-200"
        aria-label="Language and Currency Settings"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12H22"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Language and Currency Modal */}
      {isSettingsMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
          <div
            className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto mx-4 transform transition-all duration-300 ease-out"
            style={{ animation: "fadeInUp 0.3s ease-out" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-neutral-800">
                Language and Currency
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-3">
                  Currently: {languageName}, {currency}
                </span>
                <button
                  onClick={() => setIsSettingsMenuOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition duration-200"
                  aria-label="Close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Select a language
              </h3>

              {isTranslating ? (
                <div className="flex justify-center py-8">
                  <i className="fas fa-spinner fa-spin text-primary-500 mr-2 text-xl"></i>
                  <span className="text-neutral-700">
                    Loading translations...
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
                <div className="flex justify-center py-8">
                  <i className="fas fa-spinner fa-spin text-primary-500 mr-2 text-xl"></i>
                  <span className="text-neutral-700">
                    Loading exchange rates...
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
