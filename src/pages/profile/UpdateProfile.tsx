import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Save } from "lucide-react";
import { WalletContext } from "../../App";
import { useProfileContext } from "../../context/ProfileContext";
import ProfileStatusBlock from "../../components/ProfileStatusBlock";
import { ErrorCode } from "../../errors/ErrorCodes";
import { translateError } from "../../errors/errorUtils";

type ProfileData = {
  avatar: string;
  firstName: string;
  lastName: string;
  telegram: string;
};

export default function UpdateProfile() {
  const { t } = useTranslation();
  const { wallet } = useContext(WalletContext)!;
  const { currentProfile, updateCurrentProfile } = useProfileContext();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);
  const [errorCodes, setErrorCodes] = useState<ErrorCode[] | null>(null);

  const [profile, setProfile] = useState<ProfileData>({
    avatar: "",
    firstName: "",
    lastName: "",
    telegram: "",
  });

  useEffect(() => {
    if (currentProfile) {
      setProfile({
        avatar: currentProfile.imageUrl || "",
        firstName: currentProfile.firstName || "",
        lastName: currentProfile.lastName || "",
        telegram: currentProfile.tgUsername || "",
      });
    } else {
      setProfile({ avatar: "", firstName: "", lastName: "", telegram: "" });
    }
  }, [currentProfile]);

  // 🧩 Require wallet & profile connection
  if (!wallet) return <ProfileStatusBlock type="wallet" />;
  if (!currentProfile) return <ProfileStatusBlock type="profile" />;

  const update = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) => setProfile((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setMessage(null);
    setErrorCodes(null);

    if (!wallet || !currentProfile) {
      setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]);
      return;
    }

    setLoading(true);
    const result = await updateCurrentProfile(wallet, {
      imageUrl: profile.avatar.trim(),
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      tgUsername: profile.telegram.trim(),
    });

    if (result?.success === true) {
      setMessage({ type: "success", text: t("profile.update_success") });
    } else if (result?.success === false) {
      setErrorCodes(result.errors);
      setMessage(null);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="space-y-5 animate-fade-in">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {t("profile.update_avatar_label")}
          </label>
          <input
            type="url"
            maxLength={300}
            placeholder={t("profile.update_avatar_placeholder")}
            value={profile.avatar}
            onChange={(e) => update("avatar", e.target.value)}
            disabled={loading}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent block p-3 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              {t("profile.update_firstname_label")}
            </label>
            <input
              type="text"
              maxLength={30}
              placeholder={t("profile.update_firstname_placeholder")}
              value={profile.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              disabled={loading}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent block p-3 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              {t("profile.update_lastname_label")}
            </label>
            <input
              type="text"
              maxLength={30}
              placeholder={t("profile.update_lastname_placeholder")}
              value={profile.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              disabled={loading}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent block p-3 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            {t("profile.update_telegram_label")}
          </label>
          <input
            type="text"
            maxLength={30}
            placeholder={t("profile.update_telegram_placeholder")}
            value={profile.telegram}
            onChange={(e) => update("telegram", e.target.value)}
            disabled={loading}
            className="w-full bg-[var(--c-input-bg)] border border-[var(--c-border)] text-[var(--c-text-main)] text-sm rounded-xl focus:ring-[var(--c-primary)] focus:border-[var(--c-primary)] block p-3 outline-none transition-all"
          />
        </div>

        {errorCodes && errorCodes.length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
            {errorCodes.map((code) => (
              <div key={code}>{translateError(t, code)}</div>
            ))}
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            className={`w-full text-white bg-accent hover:bg-accent-dark focus:ring-4 focus:ring-accent/30 font-medium rounded-xl text-lg px-5 py-3 text-center transition-all flex justify-center items-center shadow-md hover:shadow-lg ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/60 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" /> {t("profile.save_btn")}
              </>
            )}
          </button>
        </div>

        {message && (
          <div
            className={`text-sm rounded-xl p-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

    </>
  );
}
