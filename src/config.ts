const defaultMatrixApiHost = "https://cs.apihub160.cc";
//const defaultMatrixApiHost = "http://localhost:5004";
const defaultContractsApiHost = defaultMatrixApiHost;
const defaultAuthApiBase = "https://zs.kbth.ru";

export const appConfig = {
  matrixApi: {
    host: (import.meta.env.VITE_MATRIX_API_HOST as string | undefined) ?? defaultMatrixApiHost,
    defaultApiHost: defaultMatrixApiHost,
  },
  contractsApi: {
    host: (import.meta.env.VITE_CONTRACTS_API_HOST as string | undefined) ?? defaultContractsApiHost,
    defaultApiHost: defaultContractsApiHost,
  },
  authApi: {
    baseUrl: (import.meta.env.VITE_AUTH_API_BASE as string | undefined) ?? defaultAuthApiBase,
  },
} as const;
