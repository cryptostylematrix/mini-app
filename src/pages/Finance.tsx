import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletContext } from "../App";
import { useProfileContext } from "../context/ProfileContext";
import ProfileStatusBlock from "../components/ProfileStatusBlock";
import { getProfileNftData, getWalletHistory } from "../services/contractsApi";
import type { TransactionResponse } from "../services/contractsApi";
import { Check, Copy } from "lucide-react";

const PAGE_SIZE = 20;

export default function Finance() {
  console.log("rendering Finance");

  const { t } = useTranslation();
  const { wallet } = useContext(WalletContext)!;
  const { currentProfile } = useProfileContext();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState("");
  const [profileLogins, setProfileLogins] = useState<Record<string, string | null>>({});
  const pendingProfilesRef = useRef<Set<string>>(new Set());

  const title = (
    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center w-full">
      {t("finance.title")}
    </h1>
  );

  const rows = useMemo(
    () =>
      transactions.flatMap((transaction) =>
        transaction.messages.map((message, index) => ({
          key: `${transaction.hash}-${transaction.lt}-${index}`,
          date: new Date(transaction.unix_time * 1000).toLocaleDateString(),
          time: new Date(transaction.unix_time * 1000).toLocaleTimeString(),
          addr: message.addr,
          op: message.op,
          comment: message.comment,
          profileAddr: message.profile_addr,
          value: message.value,
        })),
      ),
    [transactions],
  );

  const formatAddr = (value: string) => {
    const trimmed = value?.trim();
    if (!trimmed) return "";
    if (trimmed.length <= 12) return trimmed;
    return `${trimmed.slice(0, 4)}....${trimmed.slice(-4)}`;
  };

  const formatOp = (value: string) => {
    const normalized = value?.trim();
    if (!normalized) return "";
    return t(`finance.ops.${normalized}`, { defaultValue: normalized });
  };

  const copyToClipboard = async (value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedAddr(value);
      window.setTimeout(() => {
        setCopiedAddr((current) => (current === value ? "" : current));
      }, 1500);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const loadHistory = async (lastTransaction?: TransactionResponse) => {
    if (!wallet) return;
    setIsLoading(true);
    const response = await getWalletHistory(wallet, {
      limit: PAGE_SIZE,
      lt: lastTransaction?.lt,
      hash: lastTransaction?.hash,
    });
    const items = response?.items ?? [];
    setTransactions((prev) => {
      if (!lastTransaction) return items;
      const existing = new Set(prev.map((transaction) => `${transaction.hash}-${transaction.lt}`));
      const deduped = items.filter((transaction) => !existing.has(`${transaction.hash}-${transaction.lt}`));
      return [...prev, ...deduped];
    });
    setHasMore(items.length === PAGE_SIZE);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!wallet) return;
    setTransactions([]);
    setHasMore(false);
    void loadHistory();
  }, [wallet]);

  useEffect(() => {
    let isActive = true;
    const profileAddrs = new Set<string>();
    transactions.forEach((transaction) => {
      transaction.messages.forEach((message) => {
        const profileAddr = message.profile_addr?.trim();
        if (profileAddr) profileAddrs.add(profileAddr);
      });
    });

    const missing = Array.from(profileAddrs).filter(
      (addr) => !(addr in profileLogins) && !pendingProfilesRef.current.has(addr),
    );
    if (!missing.length) return;

    missing.forEach((addr) => pendingProfilesRef.current.add(addr));

    void (async () => {
      const entries = await Promise.all(
        missing.map(async (addr) => {
          const response = await getProfileNftData(addr);
          return [addr, response?.content?.login ?? null] as const;
        }),
      );

      if (!isActive) return;
      setProfileLogins((prev) => {
        const next = { ...prev };
        entries.forEach(([addr, login]) => {
          next[addr] = login;
        });
        return next;
      });

      missing.forEach((addr) => pendingProfilesRef.current.delete(addr));
    })();

    return () => {
      isActive = false;
    };
  }, [transactions, profileLogins]);

  // 🪙 Require wallet connection
  if (!wallet) {
    return (
      <>
        {title}
        <ProfileStatusBlock type="wallet" />
      </>
    );
  }

  // 👤 Require active profile
  if (!currentProfile) {
    return (
      <>
        {title}
        <ProfileStatusBlock type="profile" />
      </>
    );
  }

  // ✅ Main content (wallet + profile both available)
  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-app flex flex-col items-center pt-10 pb-20">
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        {title}

        <div className="w-full bg-card rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5 mb-8">
          <div className="md:hidden p-4 sm:p-6 space-y-3">
            {rows.map((row) => (
              <div key={row.key} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-wider text-gray-400">
                      {t("finance.columns.date")}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{row.date}</div>
                    <div className="text-xs text-gray-400">{row.time}</div>
                  </div>
                  <div className={`text-sm font-bold ${row.value > 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {row.value > 0 ? "+" : ""}
                    {row.value}
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400">
                      {t("finance.columns.profile")}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-900">
                      <span>{profileLogins[row.profileAddr] ?? "—"}</span>
                      {row.profileAddr && (
                        <span className="text-xs text-gray-400 font-mono">{formatAddr(row.profileAddr)}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400">
                      {t("finance.columns.addr")}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-900 font-mono">
                      <span>{formatAddr(row.addr)}</span>
                      <button
                        onClick={() => void copyToClipboard(row.addr)}
                        className="text-gray-400 hover:text-accent transition-colors p-1 -m-1"
                        aria-label={t("finance.actions.copy_addr")}
                        type="button"
                      >
                        {copiedAddr === row.addr ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400">
                      {t("finance.columns.description")}
                    </div>
                    <div className="text-sm text-gray-900">{formatOp(row.op)}</div>
                    {row.comment && <div className="text-xs text-gray-400 break-words">{row.comment}</div>}
                  </div>
                </div>
              </div>
            ))}

            {!rows.length && !isLoading && (
              <div className="py-6 text-center text-gray-500">{t("finance.empty")}</div>
            )}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">
                    {t("finance.columns.date")}
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">
                    {t("finance.columns.profile")}
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">
                    {t("finance.columns.addr")}
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900">
                    {t("finance.columns.description")}
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-900 text-right">
                    {t("finance.columns.value")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0">
                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      {row.date} <span className="text-gray-400">{row.time}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      <div className="flex items-center space-x-2 group relative">
                        <span>{profileLogins[row.profileAddr] ?? "—"}</span>
                        {row.profileAddr && (
                          <span className="text-xs text-gray-400 hidden group-hover:inline">
                            {formatAddr(row.profileAddr)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-mono">
                      <div className="flex items-center space-x-2">
                        <span>{formatAddr(row.addr)}</span>
                        <button
                          onClick={() => void copyToClipboard(row.addr)}
                          className="text-gray-400 hover:text-accent transition-colors"
                          aria-label={t("finance.actions.copy_addr")}
                          type="button"
                        >
                          {copiedAddr === row.addr ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      <div className="flex flex-col">
                        <span>{formatOp(row.op)}</span>
                        <span className="text-gray-400 text-xs">{row.comment}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 text-sm font-bold text-right ${row.value > 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {row.value > 0 ? "+" : ""}
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!rows.length && !isLoading && (
              <div className="p-6 text-center text-gray-500">{t("finance.empty")}</div>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {hasMore && (
              <button
                type="button"
                className="w-full bg-accent hover:bg-accent-dark text-white font-medium rounded-xl py-3 transition-all shadow-sm disabled:opacity-60"
                onClick={() => loadHistory(transactions[transactions.length - 1])}
                disabled={isLoading}
              >
                {isLoading ? t("finance.loading") : t("finance.actions.load_more")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
