import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function WarningBlock() {
  const { t } = useTranslation();

  return (
    <div
      className="w-full bg-white/60 backdrop-blur-xl border border-yellow-200/50 rounded-3xl p-6 flex items-start space-x-5 animate-fade-in shadow-lg shadow-yellow-900/5 h-full"
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shadow-sm">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900">{t("common.warning.title")}</h3>
        <p className="text-base text-gray-600 mt-2 leading-relaxed">
          {t("common.warning.description")}
        </p>
      </div>
    </div>
  );
}
