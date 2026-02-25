import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WalletContext } from "../../App";
import { useProfileContext } from "../../context/ProfileContext";
import { Save, X } from "lucide-react";
import ProfileStatusBlock from "../../components/ProfileStatusBlock";
import { translateError } from "../../errors/errorUtils";
import { ErrorCode } from "../../errors/ErrorCodes";

export default function AddProfile() {
  const { t } = useTranslation();
  const { wallet } = useContext(WalletContext)!;
  const { addProfile } = useProfileContext();
  const [login, setLogin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCodes, setErrorCodes] = useState<ErrorCode[] | null>(null);

  const navigate = useNavigate();

  // 🧩 Require wallet connection
  if (!wallet) {
    return <ProfileStatusBlock type="wallet" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCodes(null);

    if (!wallet) {
      setErrorCodes([ErrorCode.INVALID_WALLET_ADDRESS]);
      return;
    }

    const trimmed = login.trim();
    if (!trimmed) {
      setErrorCodes([ErrorCode.PROFILE_NOT_FOUND]); // or define a new ErrInvalidLogin
      return;
    }

    setIsSubmitting(true);

    const result = await addProfile(wallet, trimmed);

    if (result?.success === false) {
      setErrorCodes(result.errors);
    } else if (result?.success === true) {
      navigate("/"); // redirect after success
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">
          {t("profile.add_login_label")}
        </label>
        <input
          type="text"
          maxLength={40}
          placeholder={t("profile.add_login_placeholder")}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent block p-3 outline-none transition-all"
        />
      </div>

      {errorCodes && errorCodes.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
          {errorCodes.map((code) => (
            <div key={code}>{translateError(t, code)}</div>
          ))}
        </div>
      )}

      <div className="pt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="flex-1 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl text-lg px-5 py-3 transition-all shadow-sm hover:shadow"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          <X className="w-5 h-5 inline mr-2" /> {t("profile.cancel_btn")}
        </button>

        <button
          type="submit"
          className="flex-1 text-white bg-accent hover:bg-accent-dark font-medium rounded-xl text-lg px-5 py-3 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin inline-block" />
          ) : (
            <>
              <Save className="w-5 h-5 inline mr-2" /> {t("profile.add_btn")}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
