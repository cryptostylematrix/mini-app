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

const Lang: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Normalize language code (e.g., "en-US" -> "en", "ru-RU" -> "ru")
  const normalizedLang = i18n.language ? i18n.language.split("-")[0] : "en";
  
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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="text-gray-500 font-medium text-sm hover:text-gray-800 transition-colors"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Language selector"
      >
        {currentLang.label}
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

export default React.memo(Lang);
