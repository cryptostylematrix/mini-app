import { useTranslation } from "react-i18next";
import { FileText, Youtube } from "lucide-react";

const SUPPORTED_LANGS = ["en", "hu", "it", "kk", "pl", "ru", "uk"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const videoLinks: Record<SupportedLang, string> = {
  ru: "https://youtu.be/AcHttS57cGo",
  hu: "https://youtu.be/FJQsnZ2vgIQ",
  en: "https://youtu.be/plxxqhkToJY",
  it: "https://youtu.be/5kjwWmcLu6U",
  pl: "https://youtu.be/ONQ4o_b09uY",
  kk: "https://youtu.be/plxxqhkToJY",
  uk: "https://youtu.be/plxxqhkToJY",
};

export default function MultiMarketing() {
  const { t, i18n } = useTranslation();

  const lang = (i18n.language || "en").split("-")[0] as SupportedLang | string;
  const pdfLang: SupportedLang = SUPPORTED_LANGS.includes(lang as SupportedLang) ? (lang as SupportedLang) : "en";

  const base = import.meta.env.BASE_URL || "/";
  const pdfHref = `${base}marketing-${pdfLang}.pdf`;
  const videoHref = videoLinks[pdfLang] || videoLinks.en;

  return (
    <section className="multi-tab-unified multi-tab-neutral w-full max-w-6xl mx-auto animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-1 sm:px-0">
      <div className="multi-panel rounded-3xl shadow-lg p-6 ring-1 ring-black/5 hover:ring-2 hover:ring-gray-300 transition-all cursor-pointer group">
        <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
          {t("multi.marketing.pdfTitle", "Презентация (PDF)")}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {t("multi.marketing.pdfDescription", "Подробное описание маркетинга и возможностей программы.")}
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className="text-gray-700 font-medium text-sm flex items-center space-x-1 group-hover:underline"
        >
          <span>{t("multi.marketing.view", "Открыть PDF (RU)")}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>

      <div className="multi-panel rounded-3xl shadow-lg p-6 ring-1 ring-black/5 hover:ring-2 hover:ring-gray-300 transition-all cursor-pointer group">
        <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Youtube className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
          {t("multi.marketing.videoTitle", "Видео-обзор")}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {t("multi.marketing.videoDescription", "Видеоинструкция по работе с платформой.")}
        </p>
        <a
          href={videoHref}
          target="_blank"
          rel="noreferrer"
          className="text-gray-700 font-medium text-sm flex items-center space-x-1 group-hover:underline"
        >
          <span>{t("multi.marketing.watch", "Смотреть видео (RU)")}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </section>
  );
}
