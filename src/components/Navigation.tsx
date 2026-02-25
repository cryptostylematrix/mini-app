import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, User, Wallet, Layers } from "lucide-react";

export default function Navigation() {
  const { t } = useTranslation();

  const links = [
    { to: "/", icon: Home, label: t("nav.home_page"), end: true },
    { to: "/profile", icon: User, label: t("nav.profile_page") },
    { to: "/finance", icon: Wallet, label: t("nav.finance_page") },
    { to: "/multi", icon: Layers, label: t("nav.multi_page") },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 pb-4 z-50 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.02)]"
      aria-label={t("nav.main_navigation")}
    >
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 ${
                isActive ? "text-accent" : "text-gray-400 hover:text-gray-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`mb-1 transition-transform ${isActive ? "-translate-y-1" : ""}`}>
                  <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
                </div>
                <span className={`text-[10px] font-medium leading-none ${isActive ? "opacity-100" : "opacity-70"}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
