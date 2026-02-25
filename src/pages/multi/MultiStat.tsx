import ProfileStatusBlock from "../../components/ProfileStatusBlock";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { WalletContext } from "../../App";
import { useProfileContext } from "../../context/ProfileContext";

export default function MultiStat() {
  const { t } = useTranslation();
  const { wallet } = useContext(WalletContext)!;
  const { currentProfile } = useProfileContext();

  if (!wallet) {
    return <ProfileStatusBlock type="wallet" />;
  }

  if (!currentProfile) {
    return <ProfileStatusBlock type="profile" />;
  }

  return (
    <section className="multi-tab-unified multi-tab-neutral w-full max-w-6xl mx-auto animate-fade-in px-1 sm:px-0">
      <div className="multi-panel bg-gray-50 border border-gray-200 rounded-2xl p-6 flex items-start space-x-3 max-w-lg">
        <div className="text-gray-500 mt-1 text-xl">⚠️</div>
        <div>
          <h4 className="font-bold text-gray-900">{t("multi.stat.title", "Раздел в разработке")}</h4>
          <p className="text-sm text-gray-600 mt-1">
            {t("multi.stat.message", "Статистика будет доступна в ближайших обновлениях.")}
          </p>
        </div>
      </div>
    </section>
  );
}
