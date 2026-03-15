import no_avatar from "../assets/no-avatar.jpg";
import { AlertTriangle, Send, User, UserX, Wallet } from "lucide-react";
import { useContext, useEffect, useState, type ComponentType } from "react";
import { WalletContext } from "../App";
import { useProfileContext } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import { getContractBalance } from "../services/contractsApi";
import { useTranslation } from "react-i18next";
import { translateError } from "../errors/errorUtils";
import { ErrorCode } from "../errors/ErrorCodes";
import SocialAuthBlock, { SocialAuthError } from "../components/auth/SocialAuthBlock";

type StatusCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
};

function StatusCard({ icon: Icon, title, subtitle }: StatusCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-card rounded-[2.5rem] shadow-2xl shadow-blue-900/5 animate-fade-in max-w-md w-full mx-auto relative overflow-hidden group">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundImage: "linear-gradient(135deg, var(--color-bg), var(--color-card))" }}
      ></div>
      <div className="relative z-10">
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-accent mb-8 shadow-inner mx-auto transform group-hover:scale-110 transition-transform duration-500 bg-accent-soft">
          <Icon className="w-14 h-14 drop-shadow-sm" />
        </div>
        <h2 className="text-3xl font-extrabold text-app mb-4 tracking-tight">{title}</h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-xs mx-auto">{subtitle}</p>
      </div>
    </div>
  );
}

type ProfileCardProps = {
  fullName: string;
  tgUsername?: string;
  imageUrl?: string;
  memberLabel: string;
  noNameLabel: string;
  noUsernameLabel: string;
  profileIdLabel: string;
};

function ProfileCard({
  fullName,
  tgUsername,
  imageUrl,
  memberLabel,
  noNameLabel,
  noUsernameLabel,
  profileIdLabel,
}: ProfileCardProps) {
  const hasAvatar = Boolean(imageUrl);
  return (
    <div className="relative group bg-card md:bg-gradient-to-br md:from-white md:to-[var(--color-bg)] rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-center transition-all hover:shadow-2xl hover:shadow-slate-300/50 border border-slate-50 min-h-[220px] md:min-h-[280px]">
      <div
        className="hidden md:block absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        style={{ backgroundColor: "var(--color-accent)", opacity: 0.06 }}
      ></div>
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-bl-[10rem] opacity-70 transition-transform group-hover:scale-110 duration-700 pointer-events-none md:hidden"
        style={{ backgroundImage: "linear-gradient(135deg, var(--color-bg), transparent)" }}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-8 h-full justify-center w-full">
        <div className="relative flex-shrink-0">
          <div
            className="absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"
            style={{ backgroundImage: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))" }}
          ></div>
          <div className="relative p-1.5 bg-card rounded-full ring-1 ring-gray-100 md:ring-4 md:ring-gray-100">
            {hasAvatar ? (
              <img
                src={imageUrl || no_avatar}
                alt="Avatar"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            )}
            <div className="hidden md:block absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm" title="Online"></div>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
          <div>
            <div className="text-2xl md:text-4xl font-black text-gray-900 truncate tracking-tight mb-1">
              {fullName || noNameLabel}
            </div>
            <div className="hidden md:block text-gray-400 text-sm font-bold uppercase tracking-wider">{memberLabel}</div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <div className="inline-flex items-center justify-center space-x-2 bg-accent-soft px-4 py-2 rounded-xl text-accent transition-colors">
              <Send className="w-4 h-4" />
              <span className="font-bold">{tgUsername ? `@${tgUsername}` : noUsernameLabel}</span>
            </div>
            <div className="hidden md:inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl text-gray-500 border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-sm font-semibold">{profileIdLabel}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center pl-4 border-l border-gray-100 h-24 opacity-30 hover:opacity-100 transition-all cursor-pointer">
          <span className="text-gray-400">›</span>
        </div>
      </div>
    </div>
  );
}

type BalanceCardProps = {
  status: "loading" | "error" | "success";
  value: number;
  unitLabel: string;
  titleLabel: string;
  loadingLabel: string;
  errorLabel: string;
};

function BalanceCard({ status, value, unitLabel, titleLabel, loadingLabel, errorLabel }: BalanceCardProps) {
  return (
    <div className="relative bg-accent-gradient rounded-[2.5rem] p-8 shadow-xl shadow-black/10 overflow-hidden flex flex-col justify-center text-white group min-h-[220px]">
      <svg className="absolute bottom-0 left-0 right-0 opacity-20 group-hover:scale-105 transition-transform duration-700 pointer-events-none" viewBox="0 0 1440 320" fill="currentColor">
        <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
        <div className="flex items-center space-x-3 mb-6 opacity-90">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">{titleLabel}</span>
        </div>

        <div className="flex items-end justify-center">
          {status === "loading" && <span className="text-3xl font-bold animate-pulse">{loadingLabel}</span>}

          {status === "error" && (
            <div className="flex items-center space-x-3 text-red-100 bg-red-500/20 px-4 py-2 rounded-xl border border-red-200/20 backdrop-blur-sm">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-bold">{errorLabel}</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter drop-shadow-md">{value.toFixed(2)}</span>
              <span className="text-2xl font-medium opacity-80 mt-1">{unitLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WarningBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-yellow-200/50 rounded-3xl p-6 flex items-start space-x-5 animate-fade-in shadow-lg shadow-yellow-900/5 h-full">
      <div className="flex-shrink-0 mt-1">
        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shadow-sm">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-app">{title}</h3>
        <p className="text-base text-gray-600 mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const { wallet } = useContext(WalletContext)!;
  const { currentProfile } = useProfileContext();

  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<ErrorCode[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    const loadBalance = async () => {
      setLoading(true);
      setError(null);
      setBalance(null);

      const result = await getContractBalance(wallet);
      if (result) {
        setBalance(result.balance.toString());
      } else {
        setError([ErrorCode.BALANCE_FETCH_FAILED]);
      }

      setLoading(false);
    };

    loadBalance();
  }, [wallet]);

  const fullName = [currentProfile?.firstName, currentProfile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const tgUsername = currentProfile?.tgUsername?.replace(/^@+/, "");
  const balanceValue = Number.parseFloat(balance ?? "");

  const balanceStatus = loading ? "loading" : error ? "error" : "success";

  const walletTitle = t("profile.status.wallet_title", { defaultValue: "Ваш кошелек не подключен!" });
  const walletDescription = t("profile.status.wallet_description", {
    defaultValue: "Чтобы использовать сайт, подключите свой кошелек.",
  });
  const profileTitle = t("profile.status.profile_title", { defaultValue: "Профиль не добавлен." });
  const profileDescription = t("profile.status.profile_description", {
    defaultValue: "Чтобы использовать сайт, добавьте профиль.",
  });

  const { authError, clearAuthError } = useAuth();

  if (!wallet) {
    return (
      <div className="animate-fade-in-up min-h-[70vh] flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "var(--color-accent)" }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "var(--color-accent-dark)" }}></div>
        </div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-md">
          <StatusCard icon={Wallet} title={walletTitle} subtitle={walletDescription} />
          <SocialAuthBlock />
          {authError && <SocialAuthError message={authError} onDismiss={clearAuthError} />}
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="animate-fade-in-up min-h-[70vh] flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: "var(--color-accent)" }}></div>
        </div>
        <StatusCard icon={UserX} title={profileTitle} subtitle={profileDescription} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up w-full max-w-6xl mx-auto px-4 py-8 pb-32 flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-app text-center">
          {t("home.welcome", { defaultValue: "Добро пожаловать" })},{" "}
          {fullName || t("home.no_name", { defaultValue: "друг" })}!
        </h1>
        <p className="text-gray-500 text-center">{t("home.subtitle", { defaultValue: "Ваша панель управления" })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileCard
          fullName={fullName}
          tgUsername={tgUsername}
          imageUrl={currentProfile.imageUrl}
          memberLabel={t("home.member", { defaultValue: "Участник" })}
          noNameLabel={t("home.no_name", { defaultValue: "Без имени" })}
          noUsernameLabel={t("home.no_username", { defaultValue: "Нет username" })}
          profileIdLabel={t("home.profile_id", { defaultValue: "ID: 84920" })}
        />
        <BalanceCard
          status={balanceStatus}
          value={Number.isFinite(balanceValue) ? balanceValue : 0}
          unitLabel={t("home.balance_unit", { defaultValue: "TON" })}
          titleLabel={t("home.balance_title", { defaultValue: "Текущий баланс" })}
          loadingLabel={t("home.loading", { defaultValue: "Загрузка..." })}
          errorLabel={translateError(t, error?.[0] ?? ErrorCode.BALANCE_FETCH_FAILED)}
        />
      </div>

      <WarningBlock
        title={t("common.warning.title", { defaultValue: "Сайт находится в разработке" })}
        description={t("common.warning.description", {
          defaultValue: "Некоторые функции могут быть временно недоступны или работать нестабильно.",
        })}
      />
    </div>
  );
}
