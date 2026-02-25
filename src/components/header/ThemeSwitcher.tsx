import React, { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";

type Theme = {
  id: string;
  name: string;
  colors: {
    accent: string;
    accentDark: string;
    accentSoft: string;
    bg: string;
    text: string;
    card: string;
  };
};

const THEMES: Theme[] = [
  {
    id: "clean-tech",
    name: "Clean Tech",
    colors: {
      accent: "#0EA5E9",
      accentDark: "#0284C7",
      accentSoft: "#E0F2FE",
      bg: "#F8FAFC",
      text: "#0F172A",
      card: "#FFFFFF",
    },
  },
  {
    id: "calm-indigo",
    name: "Calm Indigo",
    colors: {
      accent: "#6366F1",
      accentDark: "#4F46E5",
      accentSoft: "#E0E7FF",
      bg: "#EEF2FF",
      text: "#111827",
      card: "#FFFFFF",
    },
  },
  {
    id: "fintech-green",
    name: "Fintech Green",
    colors: {
      accent: "#10B981",
      accentDark: "#065F46",
      accentSoft: "#D1FAE5",
      bg: "#ECFDF5",
      text: "#1F2937",
      card: "#FFFFFF",
    },
  },
  {
    id: "royal-gold",
    name: "Royal Gold",
    colors: {
      accent: "#D97706",
      accentDark: "#78350F",
      accentSoft: "#FEF3C7",
      bg: "#FFFBEB",
      text: "#1C1917",
      card: "#FFFFFF",
    },
  },
  {
    id: "berry-modern",
    name: "Berry Modern",
    colors: {
      accent: "#F43F5E",
      accentDark: "#881337",
      accentSoft: "#FFE4E6",
      bg: "#FFF1F2",
      text: "#111827",
      card: "#FFFFFF",
    },
  },
];

const THEME_STORAGE_KEY = "ui-theme";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", theme.colors.accent);
  root.style.setProperty("--color-accent-dark", theme.colors.accentDark);
  root.style.setProperty("--color-accent-soft", theme.colors.accentSoft);
  root.style.setProperty("--color-bg", theme.colors.bg);
  root.style.setProperty("--color-text", theme.colors.text);
  root.style.setProperty("--color-card", theme.colors.card);
};

const getInitialThemeId = () => {
  if (typeof window === "undefined") return THEMES[0].id;
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  return THEMES.some((theme) => theme.id === saved) ? (saved as string) : THEMES[0].id;
};

const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState(getInitialThemeId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const theme = THEMES.find((item) => item.id === activeThemeId) ?? THEMES[0];
    applyTheme(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    }
  }, [activeThemeId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const activeTheme = THEMES.find((item) => item.id === activeThemeId) ?? THEMES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 sm:bg-transparent px-3 py-2 rounded-xl sm:p-0"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Theme switcher"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">{activeTheme.name}</span>
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-56 bg-card border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          role="listbox"
        >
          {THEMES.map((theme) => {
            const isActive = theme.id === activeThemeId;
            return (
              <li key={theme.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveThemeId(theme.id);
                    setIsOpen(false);
                  }}
                  aria-selected={isActive}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-accent-soft text-accent" : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: theme.colors.bg, borderColor: "#e5e7eb" }}
                    />
                    <span>{theme.name}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;
