import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorCode } from "../../../errors/ErrorCodes";
import { translateError } from "../../../errors/errorUtils";
import { getInviteData } from "../../../services/contractsApi";
import { getProfileNftData } from "../../../services/contractsApi";

type Props = {
  inviterAddress: string;
};

export default function MultiInviterInviterData({ inviterAddress }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inviterProfile, setInviterProfile] = useState<{
    address: string;
    login: string;
    imageUrl: string;
    firstName?: string;
    lastName?: string;
    tgUsername?: string;
    referralsCount: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCodes, setErrorCodes] = useState<ErrorCode[] | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setInviterProfile(null);
    setErrorCodes(null);
    setIsLoading(true);

    const loadInviter = async () => {
      if (!inviterAddress?.trim()) {
        setErrorCodes([ErrorCode.INVALID_WALLET_ADDRESS]);
        setIsLoading(false);
        return;
      }

      if (cancelled) return;

      // get getting invite data fails
      const inviteData = await getInviteData(inviterAddress);
      if (!inviteData) {
        setErrorCodes([ErrorCode.UNEXPECTED]);
        setIsLoading(false);
        return;
      }

      // if owner is not set
      const ownerAddress = inviteData.owner?.owner_addr;
      if (!ownerAddress) {
        setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]);
        setIsLoading(false);
        return;
      }

      // get nft data
      const inviterNft = await getProfileNftData(ownerAddress);

      if (cancelled) return;

      if (!inviterNft?.content?.login) {
        setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]);
      } else {
        const referralsCount = Math.max(0, (inviteData.next_ref_no ?? 1) - 1);
        setInviterProfile({
          address: ownerAddress,
          login: inviterNft.content.login,
          imageUrl: inviterNft.content.image_url ?? "",
          firstName: inviterNft.content.first_name ?? undefined,
          lastName: inviterNft.content.last_name ?? undefined,
          tgUsername: inviterNft.content.tg_username ?? undefined,
          referralsCount,
        });
      }
      setIsLoading(false);
    };

    loadInviter();

    return () => {
      cancelled = true;
    };
  }, [inviterAddress]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-32 text-gray-500 space-y-3">
        <span className="w-8 h-8 border-2 border-gray-300 border-t-[#d4af37] rounded-full animate-spin" />
        <span className="text-sm font-medium">{t("common.loading", "Загрузка...")}</span>
      </div>
    );
  }

  const cleanedTgUsername = inviterProfile?.tgUsername?.replace(/^@+/, "");

  if (inviterProfile) {
    return (
      <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 text-center relative">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t("multi.inviter.confirmTitle", "Это ваш куратор")}</h2>
        
        <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-tr from-accent to-cyan-400 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-md overflow-hidden">
            {inviterProfile.imageUrl && !imageError ? (
              <img
                src={inviterProfile.imageUrl}
                alt={inviterProfile.login}
                className="w-full h-full rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              inviterProfile.login.substring(0, 2).toUpperCase()
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{inviterProfile.login}</h3>
          {(inviterProfile.firstName || inviterProfile.lastName) && (
            <p className="text-gray-500 text-sm mb-1">
              {[inviterProfile.firstName, inviterProfile.lastName].filter(Boolean).join(" ")}
            </p>
          )}
          <div className="flex justify-center items-center space-x-2 mt-3">
            <span className="bg-blue-100 text-accent text-xs font-bold px-2 py-1 rounded-lg">
              {inviterProfile.referralsCount} {t("multi.inviter.refs", "рефералов")}
            </span>
            {cleanedTgUsername && (
              <a
                className="text-gray-400 hover:text-accent transition-colors"
                href={`https://t.me/${cleanedTgUsername}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.48-.94-2.4-1.54-1.06-.7.11-1.09.68-1.64.15-.14 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.35-.01-1.03-.2-1.53-.35-.62-.19-1.1-.29-1.06-.61.02-.16.24-.32.65-.49 2.54-1.1 4.23-1.84 5.09-2.2 2.41-1 2.91-1.21 3.24-1.22.07 0 .23.02.33.09.09.07.12.17.13.24 0 .09.01.21 0 .23z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate("/multi/structure")}
          className="w-full bg-accent hover:bg-accent-dark text-white font-bold text-lg rounded-2xl py-4 shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center"
        >
          {t("multi.inviter.viewStructure", "Посмотреть структуру")}
        </button>
      </div>
    );
  }

  if (errorCodes && errorCodes.length > 0) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
        {errorCodes.map((code) => (
          <div key={code}>{translateError(t, code)}</div>
        ))}
      </div>
    );
  }

  return null;
}
