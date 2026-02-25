import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import Lang from "./Lang";
import LanguageButton from "./LanguageButton";
import Socials from "./Socials";
import TonConnect from "./TonConnect";
import Profiles from "./Profiles";

const Header: React.FC = () => {
  const { t } = useTranslation();

  const navLinks = [
    { to: "/", label: t("nav.home_page"), end: true },
    { to: "/profile", label: t("nav.profile_page") },
    { to: "/finance", label: t("nav.finance_page") },
    { to: "/multi", label: t("nav.multi_page") },
  ];

  return (
    <header className="bg-card border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-8 lg:space-x-12">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Crypto Style Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `transition-colors relative ${
                    isActive ? "text-accent" : "text-gray-500 hover:text-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-5 left-0 w-full h-0.5 bg-accent rounded-t-full transition-opacity duration-200 md:block ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden lg:flex items-center space-x-3 text-gray-400">
            <Socials />
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <Lang />
          </div>

          <TonConnect />
          <LanguageButton />
          <Profiles />
        </div>
      </div>
    </header>
  );
};

export default Header;