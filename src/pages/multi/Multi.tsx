import "./multi.css";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BarChart3, FileText, Grid3X3, GitBranch, Menu, UserPlus } from "lucide-react";

export default function Multi() {
  const { t } = useTranslation();
  const location = useLocation();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const burgerRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: "inviter", path: "/multi/inviter", labelKey: "multi.inviter_link", icon: UserPlus },
    { id: "structure", path: "/multi/structure", labelKey: "multi.structure_link", icon: GitBranch },
    { id: "matrixes", path: "/multi/matrixes", labelKey: "multi.matrixes_link", icon: Grid3X3 },
    { id: "marketing", path: "/multi/marketing", labelKey: "multi.marketing_link", icon: FileText },
    { id: "stat", path: "/multi/stat", labelKey: "multi.stat_link", icon: BarChart3 },
  ];

  const activeTab = menuItems.find((item) => location.pathname === item.path)?.id ?? "inviter";
  const activeLabel = menuItems.find((item) => item.id === activeTab)?.labelKey;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (burgerRef.current && !burgerRef.current.contains(e.target as Node)) {
        setBurgerOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-140px)] bg-app flex flex-col items-center pt-10 pb-20 overflow-x-hidden">
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center w-full">
          {t("multi.title")}
        </h1>

        <div className="w-full flex flex-col gap-8 items-start">
          <div className="w-full space-y-2 mb-2">
            {/* Мобильные: бургер-кнопка + выпадающее меню под ней */}
            <div className="multi-burger-wrap md:hidden relative" ref={burgerRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBurgerOpen((v) => !v);
                }}
                className={`multi-burger-btn w-full flex items-center gap-3 rounded-2xl bg-card shadow-sm p-3 ring-1 border transition-all duration-200 ease-out ${
                  burgerOpen
                    ? "ring-2 ring-accent/50 border-accent/30 shadow-md"
                    : "ring-black/5 border-gray-100 hover:shadow-md hover:border-gray-200"
                }`}
                aria-expanded={burgerOpen}
                aria-haspopup="true"
                aria-label={t("common.menu", "Меню")}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-200 ${
                    burgerOpen ? "bg-accent/15 scale-95" : "bg-gray-100"
                  }`}
                  aria-hidden
                >
                  <Menu
                    className={`w-5 h-5 transition-transform duration-300 ease-out ${
                      burgerOpen ? "text-accent rotate-90" : "text-gray-700"
                    }`}
                  />
                </span>
                <span className="text-sm font-bold text-gray-800 truncate">
                  {activeLabel ? t(activeLabel) : t("multi.title")}
                </span>
              </button>
              <nav
                className={`multi-burger-dropdown absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white shadow-xl ring-1 ring-black/10 border border-gray-100 py-1 z-50 overflow-hidden ${
                  burgerOpen ? "multi-burger-dropdown--open" : ""
                }`}
                aria-label={t("multi.title")}
                aria-hidden={!burgerOpen}
              >
                {menuItems.map(({ id, path, labelKey, icon: Icon }, index) => (
                  <NavLink
                    key={id}
                    to={path}
                    end={id === "inviter"}
                    onClick={() => setBurgerOpen(false)}
                    className={({ isActive }) =>
                      `multi-burger-item flex items-center gap-3 py-3 px-4 text-left font-semibold text-sm transition-colors duration-150 ${
                        isActive ? "bg-accent/15 text-accent" : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      }`
                    }
                    style={{ animationDelay: burgerOpen ? `${index * 0.03}s` : undefined }}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {t(labelKey)}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Десктоп: горизонтальные вкладки */}
            <div className="hidden md:block w-full">
              <div className="bg-card rounded-2xl shadow-sm p-1 flex flex-wrap gap-1 ring-1 ring-black/5">
                {menuItems.map(({ id, path, labelKey }) => (
                  <NavLink
                    key={id}
                    to={path}
                    end={id === "inviter"}
                    className={({ isActive }) =>
                      `flex-1 min-w-0 py-2.5 px-2 text-xs font-bold rounded-xl transition-all text-center ${
                        isActive ? "bg-accent text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                      }`
                    }
                  >
                    {t(labelKey)}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 bg-card rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5 min-h-[400px]">
            <div className="bg-gradient-to-r from-[var(--color-bg)] to-[var(--color-card)] border-b border-gray-200 p-6 md:p-8">
              {menuItems.map(({ id, labelKey, icon: Icon }) =>
                activeTab === id ? (
                  <h2 key={id} className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                    <Icon className="w-6 h-6 text-accent" /> {t(labelKey)}
                  </h2>
                ) : null
              )}
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
