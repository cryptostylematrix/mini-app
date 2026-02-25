/**
 * Файл для доступа к конфигурации приложения
 * 
 * Предоставляет удобные методы для получения конфигурационных значений
 * и нормализованных URL для API
 * 
 * СЕРВЕРЫ:
 * - Production: https://cs.apihub160.cc (по умолчанию)
 * - Development: http://localhost:5004 (закомментирован в config.ts)
 * 
 * Настройка через переменные окружения (.env):
 * - VITE_MATRIX_API_HOST - хост для Matrix API
 * - VITE_CONTRACTS_API_HOST - хост для Contracts API
 */

import { appConfig } from '../config';

/**
 * Нормализует URL: добавляет протокол если отсутствует и удаляет завершающие слэши
 */
const normalizeUrl = (url: string): string => {
  if (!url) return "";
  let withProtocol = url.startsWith("http://") || url.startsWith("https://") 
    ? url 
    : `https://${url}`;
  // Force HTTPS for non-localhost URLs
  if (withProtocol.startsWith("http://") && !withProtocol.includes("localhost")) {
    withProtocol = withProtocol.replace("http://", "https://");
  }
  return withProtocol.replace(/\/+$/, "");
};

/**
 * Получить базовый URL для Matrix API
 */
export const getMatrixApiBaseUrl = (): string => {
  const raw = appConfig.matrixApi.host || "";
  return normalizeUrl(raw);
};

/**
 * Получить базовый URL для Contracts API
 */
export const getContractsApiBaseUrl = (): string => {
  const raw = appConfig.contractsApi.host || "";
  return normalizeUrl(raw);
};

/**
 * Получить дефолтный базовый URL для Matrix API
 */
export const getDefaultMatrixApiHost = (): string => {
  return appConfig.matrixApi.defaultApiHost;
};

/**
 * Получить дефолтный базовый URL для Contracts API
 */
export const getDefaultContractsApiHost = (): string => {
  return appConfig.contractsApi.defaultApiHost;
};

/**
 * Получить полный URL для Matrix API endpoint
 */
export const buildMatrixApiUrl = (path: string, query?: Record<string, string | number | undefined>): string => {
  const baseUrl = getMatrixApiBaseUrl();
  let defaultOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  // Force HTTPS for non-localhost origins
  if (defaultOrigin.startsWith("http://") && !defaultOrigin.includes("localhost")) {
    defaultOrigin = defaultOrigin.replace("http://", "https://");
  }
  const url = new URL(path, baseUrl || defaultOrigin);
  // Ensure HTTPS for non-localhost URLs
  if (url.protocol === "http:" && !url.hostname.includes("localhost")) {
    url.protocol = "https:";
  }
  
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }
  
  return url.toString();
};

/**
 * Получить полный URL для Contracts API endpoint
 */
export const buildContractsApiUrl = (path: string, query?: Record<string, string | number | undefined>): string => {
  const baseUrl = getContractsApiBaseUrl();
  let defaultOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  // Force HTTPS for non-localhost origins
  if (defaultOrigin.startsWith("http://") && !defaultOrigin.includes("localhost")) {
    defaultOrigin = defaultOrigin.replace("http://", "https://");
  }
  const url = new URL(path, baseUrl || defaultOrigin);
  // Ensure HTTPS for non-localhost URLs
  if (url.protocol === "http:" && !url.hostname.includes("localhost")) {
    url.protocol = "https:";
  }
  
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }
  
  return url.toString();
};

/**
 * Получить весь объект конфигурации
 */
export const getAppConfig = () => appConfig;

/**
 * Получить конфигурацию Matrix API
 */
export const getMatrixApiConfig = () => appConfig.matrixApi;

/**
 * Получить конфигурацию Contracts API
 */
export const getContractsApiConfig = () => appConfig.contractsApi;

/**
 * Проверить, используется ли дефолтный хост для Matrix API
 */
export const isUsingDefaultMatrixApiHost = (): boolean => {
  return appConfig.matrixApi.host === appConfig.matrixApi.defaultApiHost;
};

/**
 * Проверить, используется ли дефолтный хост для Contracts API
 */
export const isUsingDefaultContractsApiHost = (): boolean => {
  return appConfig.contractsApi.host === appConfig.contractsApi.defaultApiHost;
};

/**
 * Получить origin для fallback (используется когда базовый URL не задан)
 */
export const getDefaultOrigin = (): string => {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    // Force HTTPS for non-localhost origins
    if (origin.startsWith("http://") && !origin.includes("localhost")) {
      return origin.replace("http://", "https://");
    }
    return origin;
  }
  return "http://localhost";
};
