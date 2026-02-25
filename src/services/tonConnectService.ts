import type { TonConnectUI } from "@tonconnect/ui-react";
import type { Cell } from "@ton/core";
import { ErrorCode } from "../errors/ErrorCodes";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isMockPaymentsEnabled = (): boolean => {
  if (import.meta.env.VITE_MOCK_PAYMENTS === "true") return true;
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("mock-payments") === "1";
};

export async function sendTransaction(
  tonConnectUI: TonConnectUI,
  address: string,
  amount: bigint,
  body: Cell
): Promise<{ success: boolean; errors?: ErrorCode[] }> {
  try {
    if (isMockPaymentsEnabled()) {
      console.info("[mock] TonConnect transaction", {
        address,
        amount: amount.toString(),
        hasPayload: Boolean(body),
      });
      await sleep(600);
      return { success: true };
    }

    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 300, // 5 min
      messages: [
        {
          address: address,
          amount: amount.toString(),
          payload: body.toBoc().toString("base64"), // encoded body
        },
      ],
    };

    await tonConnectUI.sendTransaction(tx);

    return { success: true };
  } catch (err: any) {
    console.error("TonConnect transaction error:", err);

    if (err?.message?.includes("User declined")) {
      return { success: false, errors: [ErrorCode.USER_REJECTED_TRANSACTION] };
    }

    if (err?.message?.includes("address")) {
      return { success: false, errors: [ErrorCode.INVALID_WALLET_ADDRESS] };
    }

    return { success: false, errors: [ErrorCode.TRANSACTION_FAILED] };
  }
}
