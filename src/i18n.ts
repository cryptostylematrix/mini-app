import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // 🔹 loads translations from JSON files
  .use(LanguageDetector) // 🔹 detects language and remembers it in localStorage
  .use(initReactI18next) // 🔹 connects i18next to React
  .init({
    fallbackLng: "ru", // язык по умолчанию
    lng: "ru", // изначально русский
    debug: import.meta.env.DEV, // only log in dev mode
    
    // All supported languages
    supportedLngs: ["en", "ru", "uk", "pl", "it", "kk", "hu"],
    
    interpolation: {
      escapeValue: false, // react already escapes
    },

    detection: {
      // you can customize where language is stored or read from
      order: ["localStorage", "cookie"],
      caches: ["localStorage"], // 🔹 saves user choice
      lookupLocalStorage: "i18nextLng",
      // если язык не сохранён — по умолчанию русский
    },

     backend: {
      // path to your translation files
      loadPath: "/locales/{{lng}}/translation.json",
    },
  })
  .then(() => {
    // Если язык не сохранён — ставим русский
    if (!localStorage.getItem("i18nextLng")) {
      i18n.changeLanguage("ru");
    }
  });

export default i18n;