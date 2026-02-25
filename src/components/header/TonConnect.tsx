import React, { useState, useEffect, useRef, useContext } from "react";
import { WalletContext } from "../../App";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Copy, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Locales } from "@tonconnect/ui";
import { Address } from "@ton/core";

const TonConnect: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setWallet } = useContext(WalletContext)!;

  // ✅ Hook returns [TonConnectUI instance, setOptions function]
  const [tonConnectUI, setTonConnectUIOptions] = useTonConnectUI();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const rawAddress = tonConnectUI.account?.address;

  const userFriendlyAddress = rawAddress
    ? Address.parse(rawAddress).toString({ bounceable: false })
    : "";

  const shortAddress = userFriendlyAddress
    ? `${userFriendlyAddress.slice(0, 6)}...${userFriendlyAddress.slice(-4)}`
    : "";

  // 🔄 Keep WalletContext synced with TON Connect state
  useEffect(() => {
    if (tonConnectUI.account?.address) {
      setWallet(tonConnectUI.account.address);
    }

    const unsubscribe = tonConnectUI.onStatusChange((walletInfo) => {
      setWallet(walletInfo ? walletInfo.account.address : "");
    });

    return unsubscribe;
  }, [tonConnectUI, setWallet]);

  // 🌍 Correct way to update TonConnect UI language
  useEffect(() => {
    setTonConnectUIOptions({
      language: normalizeTonLocale(i18n.language),
    });
  }, [setTonConnectUIOptions, i18n.language]);


  // -- handlers
  const handleMainClick = async () => {
    if (!rawAddress) {
      tonConnectUI.openModal();
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleCopy = async () => {
    if (!userFriendlyAddress) return;
    await navigator.clipboard.writeText(userFriendlyAddress);
    setIsOpen(false);
  };

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
    setIsOpen(false);
  };

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

  return (
    <div className="relative" ref={ref}>
      <button
        className="hidden sm:flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-black/10 hover:shadow-black/15 hover:bg-accent-dark transition-all transform hover:-translate-y-0.5"
        onClick={handleMainClick}
        type="button"
      >
        <span>{rawAddress ? shortAddress : t("wallet.connect")}</span>
        {rawAddress && <span className="text-xs">{isOpen ? "▲" : "▼"}</span>}
      </button>

      <button
        className="sm:hidden flex items-center space-x-2 bg-accent text-white px-3 py-2 rounded-xl font-medium shadow-lg shadow-black/10 hover:shadow-black/15 hover:bg-accent-dark transition-all"
        onClick={handleMainClick}
        type="button"
      >
        {rawAddress ? shortAddress : t("wallet.connect")}
      </button>

      {rawAddress && isOpen && (
        <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <li>
            <button
              onClick={handleCopy}
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Copy size={16} className="text-gray-400" />
              <span>{t("wallet.copyAddress")}</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleDisconnect}
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>{t("wallet.disconnect")}</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

const TONCONNECT_LOCALES: Locales[] = ["en", "ru"];

function normalizeTonLocale(lang: string): Locales {
  const short = lang.split("-")[0] as Locales;
  return TONCONNECT_LOCALES.includes(short) ? short : "en";
}

export default TonConnect;
