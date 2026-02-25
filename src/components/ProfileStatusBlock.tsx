import { Wallet, UserX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfileStatusBlockProps {
  type: "wallet" | "profile";
}

export default function ProfileStatusBlock({ type }: ProfileStatusBlockProps) {
  const { t } = useTranslation();
  const isWallet = type === "wallet";

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-[2.5rem] shadow-2xl shadow-black/10 animate-fade-in max-w-md w-full mx-auto relative overflow-hidden group">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundImage: "linear-gradient(135deg, var(--color-accent-soft), transparent)" }}
      ></div>
      <div className="relative z-10">
        <div className="w-32 h-32 bg-accent-soft rounded-full flex items-center justify-center text-accent mb-8 shadow-inner mx-auto transform group-hover:scale-110 transition-transform duration-500">
          {isWallet ? <Wallet className="w-16 h-16" /> : <UserX className="w-16 h-16" />}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {isWallet ? t("profile.status.wallet_title") : t("profile.status.profile_title")}
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-xs mx-auto">
          {isWallet
            ? t("profile.status.wallet_description")
            : t("profile.status.profile_description")}
        </p>
      </div>
    </div>
  );
}
