import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorCode } from "../../../errors/ErrorCodes";
import { translateError } from "../../../errors/errorUtils";
import { chooseInviter } from "../../../services/profileService";
import { getInviteAddrBySeqNo, getInviteData, getNftAddrByLogin, getProfilePrograms } from "../../../services/contractsApi";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useProfileContext } from "../../../context/ProfileContext";
import { getPlacesCount } from "../../../services/matrixApi";

type Props = {
  onInviterChosen: () => void;
};

export default function MultiInviterChooseInviter({ onInviterChosen }: Props) {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const { currentProfile } = useProfileContext();
  const [inviterLogin, setInviterLogin] = useState("");
  const [errorCodes, setErrorCodes] = useState<ErrorCode[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const currentProfileAddress = currentProfile?.address ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCodes(null);
    setSuccessMsg(null);

    if (!currentProfileAddress) {
      setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]);
      return;
    }

    const trimmed = inviterLogin.trim();
    if (!trimmed) {
      setErrorCodes([ErrorCode.INVALID_LOGIN]);
      return;
    }

    setIsSubmitting(true);

    // get current program
    const currentProgram = await getProfilePrograms(currentProfileAddress);
    const currentMulti = currentProgram?.multi;
    // if inviter is already chosen
    if (currentMulti?.confirmed === 1) {
      setIsSubmitting(false);
      onInviterChosen();
      return;
    }

    // if loading inviter profile fails
    const inviterProfileResult = await getNftAddrByLogin(trimmed);
    if (!inviterProfileResult?.addr) {
      setIsSubmitting(false);
      setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]);
      return;
    }

    // get inviter's program data
    const programResult = await getProfilePrograms(inviterProfileResult.addr);
    const inviterProgram = programResult?.multi;
    // if inviter participated to the program
    if (!inviterProgram || inviterProgram.confirmed !== 1) {
      setIsSubmitting(false);
      setErrorCodes([ErrorCode.INVITER_NOT_IN_PROGRAM]);
      return;
    }

    // if loading inviter data failed
    const inviterAddr = inviterProgram.invite_addr;
    const inviterData = await getInviteData(inviterAddr);
    if (!inviterData) {
      setIsSubmitting(false);
      setErrorCodes([ErrorCode.UNEXPECTED]);
      return;
    }

    const inviterOwnerAddress = inviterData.owner?.owner_addr ?? "";
    if (!inviterOwnerAddress) {
      setIsSubmitting(false);
      setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]);
      return;
    }

    const placesCount = await getPlacesCount(1, inviterOwnerAddress);
    if (placesCount === 0) {
      setIsSubmitting(false);
      setErrorCodes([ErrorCode.INVITER_HAS_NO_PLACES]);
      return;
    }

    // if calculating invite's address fails
    const inviteAddrResult = await getInviteAddrBySeqNo(inviterAddr, inviterData.next_ref_no);
    if (!inviteAddrResult) {
      setIsSubmitting(false);
      setErrorCodes([ErrorCode.UNEXPECTED]);
      return;
    }

    // choose inviter
    const chooseResult = await chooseInviter(tonConnectUI, currentProfileAddress, inviterAddr, inviterData.next_ref_no, inviteAddrResult.addr);

    setIsSubmitting(false);

    if (!chooseResult.success) {
      setErrorCodes(chooseResult.errors ?? [ErrorCode.UNEXPECTED]);
      return;
    }

    setErrorCodes(null);
    setSuccessMsg(t("multi.inviter.success", "Inviter chosen. Updates will appear soon, please refresh the page later."));
    onInviterChosen();
  };

  const isFormDisabled = isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative group">
        <input
          type="text"
          maxLength={40}
          placeholder={t("multi.inviter.loginPlaceholder", "Login")}
          value={inviterLogin}
          onChange={(e) => {
            setInviterLogin(e.target.value);
            setErrorCodes(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          required
          disabled={isFormDisabled}
          className="w-full bg-gray-50 text-center text-lg font-bold text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-accent/50 focus:bg-white rounded-2xl py-4 px-4 outline-none transition-all shadow-sm group-hover:bg-gray-100/80"
        />
      </div>

      {errorCodes && errorCodes.length > 0 && (
        <div className="text-red-500 text-sm font-medium animate-pulse">
          {errorCodes.map((code) => (
            <div key={code}>{translateError(t, code)}</div>
          ))}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl p-3">
          {successMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={isFormDisabled}
        className="w-full bg-accent hover:bg-accent-dark text-white font-bold text-lg rounded-2xl py-4 shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center"
      >
        {isSubmitting ? (
          <span className="w-6 h-6 border-2 border-white/60 border-t-white rounded-full animate-spin" />
        ) : (
          t("multi.inviter.submit", "Найти")
        )}
      </button>
    </form>
  );
}
