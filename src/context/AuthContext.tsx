import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AUTH_TOKEN_KEY = "auth_access_token";
const AUTH_PROVIDER_KEY = "auth_provider";

export type AuthProviderType = "vkid" | "yandex" | null;

export interface AuthContextType {
  accessToken: string | null;
  authProvider: AuthProviderType;
  authError: string | null;
  setAuth: (token: string, provider: AuthProviderType) => void;
  clearAuth: () => void;
  clearAuthError: () => void;
  setAuthError: (msg: string | null) => void;
  getAuthorizationHeader: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStored(): { token: string | null; provider: AuthProviderType } {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const provider = localStorage.getItem(AUTH_PROVIDER_KEY) as AuthProviderType;
    return {
      token: token || null,
      provider: provider === "vkid" || provider === "yandex" ? provider : null,
    };
  } catch {
    return { token: null, provider: null };
  }
}

function persist(token: string | null, provider: AuthProviderType) {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_PROVIDER_KEY, provider || "");
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_PROVIDER_KEY);
    }
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => readStored().token);
  const [authProvider, setAuthProvider] = useState<AuthProviderType>(() => readStored().provider);
  const [authError, setAuthError] = useState<string | null>(null);

  const setAuth = useCallback((token: string, provider: AuthProviderType) => {
    setAccessToken(token);
    setAuthProvider(provider);
    setAuthError(null);
    persist(token, provider);
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setAuthProvider(null);
    persist(null, null);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const getAuthorizationHeader = useCallback(() => {
    const t = accessToken ?? readStored().token;
    return t ? `Bearer ${t}` : null;
  }, [accessToken]);

  const value: AuthContextType = {
    accessToken,
    authProvider,
    authError,
    setAuth,
    clearAuth,
    clearAuthError,
    setAuthError,
    getAuthorizationHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      <AuthReturnHandler />
      {children}
    </AuthContext.Provider>
  );
}

function AuthReturnHandler() {
  const { setAuth, setAuthError } = useAuth();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const provider = params.get("auth_provider") as AuthProviderType | null;
    const vkidError = params.get("vkid_error");
    const yandexError = params.get("yandex_error");

    if (token && (provider === "vkid" || provider === "yandex")) {
      setAuth(token, provider);
      const url = new URL(window.location.href);
      url.searchParams.delete("access_token");
      url.searchParams.delete("auth_provider");
      window.history.replaceState(null, "", url.pathname + url.search || "/");
      setDone(true);
      return;
    }

    if (vkidError || yandexError) {
      setAuthError(vkidError || yandexError || null);
      const url = new URL(window.location.href);
      url.searchParams.delete("vkid_error");
      url.searchParams.delete("yandex_error");
      window.history.replaceState(null, "", url.pathname + url.search || "/");
      setDone(true);
    }
  }, [done, setAuth, setAuthError]);

  return null;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

