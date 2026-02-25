import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, Plus, User } from "lucide-react";

export default function Profile() {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { id: "update", label: t("profile.section_update_title", { defaultValue: "Личные данные" }), icon: User, desc: t("profile.section_update_subtitle", { defaultValue: "Обновите информацию о себе" }), path: "/profile/update" },
    { id: "add", label: t("profile.section_add_title", { defaultValue: "Добавить профиль" }), icon: Plus, desc: t("profile.section_add_subtitle", { defaultValue: "Привяжите существующий аккаунт" }), path: "/profile/add" },
    { id: "create", label: t("profile.section_create_title", { defaultValue: "Создать новый" }), icon: FileText, desc: t("profile.section_create_subtitle", { defaultValue: "Регистрация нового профиля" }), path: "/profile/create" },
  ];

  const activeTab = menuItems.find((item) => location.pathname === item.path)?.id || "update";

  return (
    <section className="relative min-h-[calc(100vh-140px)] bg-app flex flex-col items-center pt-10 pb-20">
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center w-full">
          {t("profile.title")}
        </h1>

        <div className="w-full flex flex-col gap-8 items-start">
          {/* TABS - Same for mobile and desktop */}
          <div className="w-full space-y-2 mb-2">
            <div className="bg-card rounded-2xl shadow-sm p-1 flex ring-1 ring-black/5">
              <NavLink
                to="/profile/update"
                end
                className={({ isActive }) =>
                  `flex-1 py-2.5 text-xs font-bold rounded-xl transition-all text-center ${
                    isActive ? "bg-accent text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                {t("profile.update_link", { defaultValue: "Личные" })}
              </NavLink>
              <NavLink
                to="/profile/add"
                className={({ isActive }) =>
                  `flex-1 py-2.5 text-xs font-bold rounded-xl transition-all text-center ${
                    isActive ? "bg-accent text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                {t("profile.add_link", { defaultValue: "Добавить" })}
              </NavLink>
              <NavLink
                to="/profile/create"
                className={({ isActive }) =>
                  `flex-1 py-2.5 text-xs font-bold rounded-xl transition-all text-center ${
                    isActive ? "bg-accent text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                {t("profile.create_link", { defaultValue: "Создать" })}
              </NavLink>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 w-full bg-card rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5 min-h-[400px]">
            {/* Content Header Decoration */}
            <div className="bg-gradient-to-r from-[var(--color-bg)] to-[var(--color-card)] border-b border-gray-200 p-6 md:p-8">
              {activeTab === "update" && (
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <User className="w-6 h-6 text-accent" /> {t("profile.section_update_title", { defaultValue: "Личные данные" })}
                </h2>
              )}
              {activeTab === "add" && (
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <Plus className="w-6 h-6 text-accent" /> {t("profile.section_add_title", { defaultValue: "Добавить профиль" })}
                </h2>
              )}
              {activeTab === "create" && (
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <FileText className="w-6 h-6 text-accent" /> {t("profile.section_create_title", { defaultValue: "Создать новый" })}
                </h2>
              )}
              <p className="text-gray-500 mt-1 text-center">
                {activeTab === "update" && t("profile.section_update_subtitle", { defaultValue: "Управляйте вашей личной информацией и настройками аккаунта." })}
                {activeTab === "add" && t("profile.section_add_subtitle", { defaultValue: "Подключите существующий профиль к текущей сессии." })}
                {activeTab === "create" && t("profile.section_create_subtitle", { defaultValue: "Создайте совершенно новый профиль в системе." })}
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
