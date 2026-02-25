import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MultiStructureTree from "../../components/multi/structure/MultiStructureTree";
import { useProfileContext } from "../../context/ProfileContext";

export default function MultiStructure() {
  const { t } = useTranslation();
  const { currentProfile } = useProfileContext();
  const [searchLogin, setSearchLogin] = useState(currentProfile?.login ?? "");
  const [rootLogin, setRootLogin] = useState(currentProfile?.login ?? "");

  useEffect(() => {
    const login = currentProfile?.login ?? "";
    setSearchLogin(login);
    setRootLogin(login);
  }, [currentProfile]);

  const handleSearch = () => {
    const trimmed = searchLogin.trim();
    if (!trimmed) return;
    setRootLogin(trimmed);
  };

  const handleCuratorSelect = (login: string) => {
    setSearchLogin(login);
    setRootLogin(login);
  };

  return (
    <section className="multi-tab-unified multi-tab-neutral w-full max-w-6xl mx-auto space-y-4 md:space-y-6 animate-fade-in px-1 sm:px-0">
      <div className="multi-panel rounded-3xl shadow-xl p-8 ring-1 ring-black/5">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t("multi.structure.searchTitle", "Поиск по логину")}</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder={t("multi.structure.searchPlaceholder", "Введите логин")}
              aria-label={t("multi.structure.searchTitle", "Поиск по логину")}
              value={searchLogin}
              onChange={(event) => setSearchLogin(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSearch()}
              className="w-full bg-white/80 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-gray-300 focus:border-gray-400 block pl-10 p-3.5 outline-none transition-all"
            />
          </div>
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl transition-all font-medium shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
            onClick={handleSearch}
          >
            {t("multi.structure.searchButton", "Поиск")}
          </button>
        </div>
      </div>

      <div className="multi-panel rounded-3xl shadow-xl p-8 ring-1 ring-black/5 min-h-[300px]">
        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200/80 text-center">
          {t("multi.structure.treeTitle", "Структура")}
        </h2>
        <MultiStructureTree rootLogin={rootLogin} onCuratorSelect={handleCuratorSelect} />
      </div>
    </section>
  );
}
