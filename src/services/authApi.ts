import { appConfig } from "../config";

/**
 * Build redirect URL for VK ID or Yandex OAuth start.
 * return_url must be the full URL of the page where the user will land after login.
 */
export function getVkIdStartUrl(options: {
  returnUrl: string;
  referralCode?: string;
  source?: string;
}): string {
  const base = appConfig.authApi.baseUrl.replace(/\/$/, "");
  const url = new URL(`${base}/api/auth/vkid/start`);
  url.searchParams.set("return_url", options.returnUrl);
  if (options.referralCode) url.searchParams.set("referral_code", options.referralCode);
  if (options.source) url.searchParams.set("source", options.source);
  return url.toString();
}

export function getYandexStartUrl(options: {
  returnUrl: string;
  referralCode?: string;
  source?: string;
}): string {
  const base = appConfig.authApi.baseUrl.replace(/\/$/, "");
  const url = new URL(`${base}/api/auth/yandex/start`);
  url.searchParams.set("return_url", options.returnUrl);
  if (options.referralCode) url.searchParams.set("referral_code", options.referralCode);
  if (options.source) url.searchParams.set("source", options.source);
  return url.toString();
}
