import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Socials from "./header/Socials";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const copyright = t("footer.copyright", { year: currentYear });

  return (
    <footer className="hidden md:block bg-card border-t border-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <nav className="flex space-x-6 text-sm text-gray-600" aria-label="Footer navigation">
            <a
              href="https://t.me/CryptoStyleMatrixNews"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              {t("footer.news", { defaultValue: "News" })}
            </a>
            <a
              href="https://t.me/CryptoStyleMatrixbot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              {t("footer.group", { defaultValue: "Community" })}
            </a>
            <a
              href="https://www.youtube.com/@CryptoStyleOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              {t("footer.youtube", { defaultValue: "YouTube" })}
            </a>
            <Link to="/privacy" className="hover:text-gray-900">
              {t("footer.privacy")}
            </Link>
            <Link to="/user-agreement" className="hover:text-gray-900">
              {t("footer.agreement")}
            </Link>
          </nav>

          <div className="text-gray-400 text-sm">{copyright}</div>

          <div className="flex space-x-4 text-gray-400">
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
}
