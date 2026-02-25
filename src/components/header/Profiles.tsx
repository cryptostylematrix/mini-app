import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/ProfileContext";
import { useTranslation } from "react-i18next";

const Profiles: React.FC = () => {
  const { t } = useTranslation();
  const { profiles, currentProfile, isChecking, setCurrentProfile } = useProfileContext();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🌀 Loading
  if (isChecking)
    return (
      <div className="flex items-center text-xs text-gray-400">{t("profile.checking")}</div>
    );

  // ➕ No profiles yet
  if (profiles.length === 0)
    return (
      <button
        className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full sm:bg-transparent sm:p-0"
        onClick={() => {
          setIsOpen(false);
          navigate("/profile/add");
        }}
      >
        <span className="text-sm">{t("profile.add")}</span>
      </button>
    );

  // ✅ Dropdown of profiles
  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full sm:bg-transparent sm:p-0"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
          <span className="text-xs font-semibold">
            {(currentProfile?.login || t("profile.select")).slice(0, 2).toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:block text-sm">{currentProfile?.login || t("profile.select")}</span>
        <span className="text-xs hidden sm:block">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-card border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {profiles.map((p) => (
            <li key={p.login}>
              {p.valid ? (
                <button
                  onClick={() => {
                    setCurrentProfile(p);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    currentProfile?.login === p.login
                      ? "bg-accent-soft text-accent"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {p.login}
                </button>
              ) : (
                <button className="w-full text-left px-3 py-2 text-sm text-red-500 bg-red-50" disabled>
                  {p.login} ⚠️
                </button>
              )}
            </li>
          ))}

          <li className="border-t border-gray-100">
            <button
              type="button"
              className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
              onClick={() => {
                setIsOpen(false);
                navigate("/profile/add");
              }}
            >
              {t("profile.add")}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Profiles;
