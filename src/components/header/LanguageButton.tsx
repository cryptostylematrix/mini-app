import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface LangOption {
  code: string;
  label: string;
}

const LANGUAGES: LangOption[] = [
  { code: "en", label: "English" },
  { code: "hu", label: "Magyar" },
  { code: "it", label: "Italiano" },
  { code: "kk", label: "Қазақша" },
  { code: "pl", label: "Polski" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Український" },
];

const LanguageButton: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const ref = useRef<HTMLDivElement>(null);

  // Update current language when i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // Normalize language code (e.g., "en-US" -> "en", "ru-RU" -> "ru")
  const normalizedLang = currentLanguage ? currentLanguage.split("-")[0] : "en";
  
  // Determine current language (default to English)
  const currentLang =
    LANGUAGES.find((lang) => lang.code === normalizedLang) || LANGUAGES.find((l) => l.code === "en")!;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Get language code for display (uppercase, first 2 letters)
  const langCode = currentLang.code.toUpperCase().slice(0, 2);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors text-sm font-semibold"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Language selector"
      >
        {langCode}
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-40 bg-card border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                data-lang={lang.code}
                onClick={() => changeLanguage(lang.code)}
                aria-selected={lang.code === currentLang.code}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  lang.code === currentLang.code
                    ? "bg-accent-soft text-accent"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(LanguageButton);
