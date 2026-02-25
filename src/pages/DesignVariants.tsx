import "./design-variants.css";
import { useState } from "react";

interface DesignVariant {
  id: number;
  name: string;
  description: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

const designVariants: DesignVariant[] = [
  {
    id: 1,
    name: "Ocean Breeze",
    description: "Спокойная морская тема с градиентами",
    theme: "ocean",
    colors: {
      primary: "#0EA5E9",
      secondary: "#06B6D4",
      accent: "#22D3EE",
      background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 2,
    name: "Dark Elegance",
    description: "Премиум темная тема с золотыми акцентами",
    theme: "dark-elegance",
    colors: {
      primary: "#1A1A1A",
      secondary: "#2D2D2D",
      accent: "#D4AF37",
      background: "linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 3,
    name: "Sunset Glow",
    description: "Теплые оранжево-розовые тона",
    theme: "sunset",
    colors: {
      primary: "#F97316",
      secondary: "#FB923C",
      accent: "#FBBF24",
      background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 4,
    name: "Forest Green",
    description: "Природная зеленая палитра",
    theme: "forest",
    colors: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#34D399",
      background: "linear-gradient(135deg, #065F46 0%, #047857 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 5,
    name: "Purple Dream",
    description: "Мистическая фиолетовая тема",
    theme: "purple",
    colors: {
      primary: "#8B5CF6",
      secondary: "#7C3AED",
      accent: "#A78BFA",
      background: "linear-gradient(135deg, #6D28D9 0%, #9333EA 50%, #C026D3 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 6,
    name: "Ice Blue",
    description: "Холодная ледяная синева",
    theme: "ice",
    colors: {
      primary: "#3B82F6",
      secondary: "#2563EB",
      accent: "#60A5FA",
      background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 7,
    name: "Crimson Red",
    description: "Энергичная красная тема",
    theme: "crimson",
    colors: {
      primary: "#DC2626",
      secondary: "#B91C1C",
      accent: "#F87171",
      background: "linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #EF4444 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 8,
    name: "Neon Cyber",
    description: "Киберпанк с неоновыми акцентами",
    theme: "cyber",
    colors: {
      primary: "#00F5FF",
      secondary: "#7C3AED",
      accent: "#F59E0B",
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
      text: "#00F5FF",
    },
  },
  {
    id: 9,
    name: "Rose Gold",
    description: "Роскошная розово-золотая палитра",
    theme: "rose-gold",
    colors: {
      primary: "#EC4899",
      secondary: "#DB2777",
      accent: "#FBBF24",
      background: "linear-gradient(135deg, #BE185D 0%, #EC4899 50%, #FBBF24 100%)",
      text: "#FFFFFF",
    },
  },
  {
    id: 10,
    name: "Midnight Blue",
    description: "Глубокий ночной синий",
    theme: "midnight",
    colors: {
      primary: "#1E3A8A",
      secondary: "#1E40AF",
      accent: "#3B82F6",
      background: "linear-gradient(180deg, #0F172A 0%, #1E3A8A 50%, #3B82F6 100%)",
      text: "#FFFFFF",
    },
  },
];

export default function DesignVariants() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSelectVariant = (id: number) => {
    setSelectedVariant(id);
  };

  const handleApplyDesign = () => {
    if (selectedVariant) {
      setPreviewMode(true);
      // Здесь можно добавить логику применения дизайна
      setTimeout(() => {
        alert(`Дизайн "${designVariants[selectedVariant - 1].name}" применен!`);
        setPreviewMode(false);
        setSelectedVariant(null);
      }, 1000);
    }
  };

  return (
    <div className="design-variants-page">
      <div className="design-variants-header">
        <h1>🎨 Варианты дизайна Telegram приложения</h1>
        <p>Выберите понравившийся дизайн для вашего приложения</p>
      </div>

      <div className="variants-grid">
        {designVariants.map((variant) => (
          <div
            key={variant.id}
            className={`variant-card ${selectedVariant === variant.id ? "selected" : ""}`}
            onClick={() => handleSelectVariant(variant.id)}
            style={{
              "--primary-color": variant.colors.primary,
              "--secondary-color": variant.colors.secondary,
              "--accent-color": variant.colors.accent,
              "--bg-gradient": variant.colors.background,
              "--text-color": variant.colors.text,
            } as React.CSSProperties}
          >
            <div className="variant-preview">
              <div className="preview-header">
                <div className="preview-avatar"></div>
                <div className="preview-info">
                  <div className="preview-name">Crypto Style</div>
                  <div className="preview-status">online</div>
                </div>
              </div>
              
              <div className="preview-content">
                <div className="preview-message incoming" style={{ animationDelay: "0.1s" }}>
                  <div className="message-bubble">
                    <div className="message-text">Привет! 👋</div>
                    <div className="message-time">12:30</div>
                  </div>
                </div>
                <div className="preview-message outgoing" style={{ animationDelay: "0.2s" }}>
                  <div className="message-bubble">
                    <div className="message-text">Привет! Как дела?</div>
                    <div className="message-time">12:31</div>
                  </div>
                </div>
                <div className="preview-message incoming" style={{ animationDelay: "0.3s" }}>
                  <div className="message-bubble">
                    <div className="message-text">Отлично! Спасибо 😊</div>
                    <div className="message-time">12:32</div>
                  </div>
                </div>
                <div className="preview-message outgoing" style={{ animationDelay: "0.4s" }}>
                  <div className="message-bubble">
                    <div className="message-text">Супер! 🚀</div>
                    <div className="message-time">12:33</div>
                  </div>
                </div>
              </div>

              <div className="preview-footer">
                <div className="preview-input"></div>
                <div className="preview-send"></div>
              </div>
            </div>

            <div className="variant-info">
              <h3>{variant.name}</h3>
              <p>{variant.description}</p>
              <div className="color-palette">
                <div
                  className="color-swatch"
                  style={{ backgroundColor: variant.colors.primary }}
                  title="Primary"
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: variant.colors.secondary }}
                  title="Secondary"
                ></div>
                <div
                  className="color-swatch"
                  style={{ backgroundColor: variant.colors.accent }}
                  title="Accent"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewMode && selectedVariant && (
        <div className="preview-overlay">
          <div className="preview-fullscreen">
            <div className="preview-close" onClick={() => setPreviewMode(false)}>×</div>
            <div
              className="preview-fullscreen-content"
              style={{
                background: designVariants[selectedVariant - 1].colors.background,
              }}
            >
              <h2>{designVariants[selectedVariant - 1].name}</h2>
              <p>Применение дизайна...</p>
            </div>
          </div>
        </div>
      )}

      {selectedVariant && !previewMode && (
        <div className="selection-panel">
          <div className="selection-content">
            <h2>Выбран дизайн: {designVariants[selectedVariant - 1].name}</h2>
            <p>{designVariants[selectedVariant - 1].description}</p>
            <div className="selection-actions">
              <button className="btn-primary" onClick={handleApplyDesign}>
                Применить дизайн
              </button>
              <button className="btn-secondary" onClick={() => setSelectedVariant(null)}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
