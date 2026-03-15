import React from "react";
import { useTranslation } from "react-i18next";
import { AlertTriangle, X } from "lucide-react";
import { getVkIdStartUrl, getYandexStartUrl } from "../../services/authApi";

const VK_ICON = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z" />
  </svg>
);

const YANDEX_ICON = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M2.04 12c0-5.523 4.476-10 10-10s10 4.477 10 10c0 5.524-4.476 10-10 10s-10-4.476-10-10zm10.005-1.31v5.558c.322 0 .653-.023.99-.07v-2.714h.022c.363.407.782.763 1.257 1.066.476.303 1.002.454 1.578.454.678 0 1.235-.203 1.67-.61.436-.407.653-.95.653-1.63 0-.305-.068-.576-.203-.813-.136-.237-.322-.47-.576-.678-.237-.22-.522-.407-.847-.576-.407-.203-.762-.39-1.066-.576-.305-.186-.542-.373-.712-.576-.17-.203-.254-.44-.254-.71 0-.305.068-.576.203-.813.136-.237.39-.44.763-.61.373-.17.847-.254 1.423-.254.44 0 .847.068 1.22.203.373.136.678.322.915.576.237.254.39.542.474.847h2.116c-.068-.61-.237-1.136-.508-1.576-.271-.44-.61-.813-1.017-1.119-.407-.305-.847-.542-1.322-.712-.474-.17-.98-.288-1.525-.373-.542-.085-1.067-.127-1.576-.127-1.525 0-2.746.39-3.66 1.169-.915.78-1.372 1.847-1.372 3.203zm-.237 1.373v1.491h.847c.373 0 .678-.034.915-.102.237-.068.407-.17.508-.305.102-.136.152-.305.152-.508 0-.237-.085-.44-.254-.61-.17-.17-.44-.254-.813-.254h-1.355z" />
  </svg>
);

export default function SocialAuthBlock() {
  const { t } = useTranslation();
  const returnUrl =
    typeof window !== "undefined"
      ? window.location.origin + (window.location.pathname || "/")
      : "";

  const handleVk = () => {
    window.location.href = getVkIdStartUrl({ returnUrl, source: window.location.hostname || undefined });
  };

  const handleYandex = () => {
    window.location.href = getYandexStartUrl({ returnUrl, source: window.location.hostname || undefined });
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-6 flex flex-col items-center gap-4">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {t("auth.or_social", { defaultValue: "Или войдите через соцсети" })}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          type="button"
          onClick={handleVk}
          className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-semibold text-white bg-[#0077FF] hover:bg-[#0066DD] shadow-lg shadow-[#0077FF]/25 transition-all duration-200 hover:shadow-[#0077FF]/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          {VK_ICON}
          <span>{t("auth.vkid", { defaultValue: "Войти через VK ID" })}</span>
        </button>
        <button
          type="button"
          onClick={handleYandex}
          className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-semibold text-white bg-[#FC3F1D] hover:bg-[#E63514] shadow-lg shadow-[#FC3F1D]/25 transition-all duration-200 hover:shadow-[#FC3F1D]/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          {YANDEX_ICON}
          <span>{t("auth.yandex", { defaultValue: "Войти через Яндекс" })}</span>
        </button>
      </div>
    </div>
  );
}

export function SocialAuthError({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-md mx-auto mt-4 p-4 rounded-2xl bg-red-50 border border-red-200/60 flex items-start gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-red-800">{t("auth.error_title", { defaultValue: "Ошибка входа" })}</p>
        <p className="text-sm text-red-700 mt-0.5">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="flex-shrink-0 p-1.5 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
        aria-label="Закрыть"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
