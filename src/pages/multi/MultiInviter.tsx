
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletContext } from "../../App";
import { useProfileContext } from "../../context/ProfileContext";
import ProfileStatusBlock from "../../components/ProfileStatusBlock";
import { ErrorCode } from "../../errors/ErrorCodes";
import { translateError } from "../../errors/errorUtils";
import { getProfilePrograms } from "../../services/contractsApi";
import MultiInviterInviterData from "../../components/multi/inviter/MultiInviterInviterData";
import MultiInviterChooseInviter from "../../components/multi/inviter/MultiInviterChooseInviter";

type ProgramInfo = {
  confirmed: boolean;
  inviter_addr: string;
  invite_addr: string;
  seq_no: number;
};

export default function MultiInviter() {
  const { t } = useTranslation();
  const { wallet } = useContext(WalletContext)!;
  const { currentProfile } = useProfileContext();
  const [programData, setProgramData] = useState<ProgramInfo | null>(null);
  const [programErrors, setProgramErrors] = useState<ErrorCode[] | null>(null);
  const [isProgramLoading, setIsProgramLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setProgramData(null);
    setProgramErrors(null);
    setIsProgramLoading(true);

    if (!currentProfile) return () => {
      cancelled = true;
    };

    const loadProgramStatus = async () => {
      const program = await getProfilePrograms(currentProfile.address);
      if (cancelled) return;

      const multi = program?.multi;
      if (!multi || multi.confirmed !== 1) {
        setProgramErrors([ErrorCode.UNEXPECTED]);
        setProgramData(null);
      } else {
        setProgramData({
          confirmed: true,
          inviter_addr: multi.inviter_addr,
          invite_addr: multi.invite_addr,
          seq_no: multi.seq_no,
        });
      }
      setIsProgramLoading(false);
    };

    loadProgramStatus();

    return () => {
      cancelled = true;
    };
  }, [currentProfile, reloadKey]);

  if (!wallet) return <ProfileStatusBlock type="wallet" />;
  if (!currentProfile) return <ProfileStatusBlock type="profile" />;

  const handleInviterChosen = () => setReloadKey((key) => key + 1);

  return (
    <section className="multi-tab-unified w-full max-w-6xl mx-auto animate-fade-in space-y-4 md:space-y-6 px-1 sm:px-0">
      {isProgramLoading ? (
        <div className="multi-panel rounded-3xl shadow-xl p-8 border border-gray-200/80 text-center relative overflow-hidden">
          <div className="flex flex-col justify-center items-center h-40 text-gray-500 space-y-3">
            <span className="w-8 h-8 border-2 border-gray-300 border-t-accent rounded-full animate-spin" />
            <span className="text-sm font-medium">{t("common.loading", "Загрузка...")}</span>
          </div>
        </div>
      ) : programData?.confirmed ? (
        <MultiInviterInviterData inviterAddress={programData.inviter_addr} />
      ) : (
        <div className="multi-panel rounded-3xl shadow-xl p-8 border border-gray-200/80 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-accent-soft text-accent rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{t("multi.inviter.title", "Ваш куратор")}</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              {t("multi.inviter.subtitle", "Введите логин пригласителя, чтобы присоединиться к его структуре и начать работу.")}
            </p>

            {programErrors && programErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4">
                {programErrors.map((code) => (
                  <div key={code}>{translateError(t, code)}</div>
                ))}
              </div>
            )}

            <MultiInviterChooseInviter onInviterChosen={handleInviterChosen} />
          </div>
        </div>
      )}
    </section>
  );
}
