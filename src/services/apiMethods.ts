/**
 * Централизованный файл со всеми API методами проекта
 * 
 * Этот файл экспортирует все API методы из различных сервисов
 * для удобного использования в приложении
 * 
 * СЕРВЕРЫ:
 * - Production: https://cs.apihub160.cc
 * - Development: http://localhost:5004 (закомментирован)
 * 
 * Настройка через переменные окружения:
 * - VITE_MATRIX_API_HOST - хост для Matrix API
 * - VITE_CONTRACTS_API_HOST - хост для Contracts API
 */

// ============================================================
// Contracts API Methods
// ============================================================
export {
  // GET методы
  getInviteAddrBySeqNo,
  getInviteData,
  getMinQueueTask,
  getMultiData,
  getPlaceData,
  getNftAddrByLogin,
  getProfileNftData,
  getProfilePrograms,
  getContractBalance,
  getCollectionData,
  getWalletHistory,
  
  // BUILD методы (создание тел транзакций)
  buildMultiChooseInviterBody,
  buildEditContentBody,
  buildDeployItemBody,
  buildBuyPlaceBody,
  buildLockPosBody,
  buildUnlockPosBody,
  
  // Экспорт объекта API
  contractsApi,
  
  // Типы
  type InviteAddressResponse,
  type InviteOwnerResponse,
  type InviteDataResponse,
  type PlacePosDataResponse,
  type MultiTaskPayloadResponse,
  type MultiTaskItemResponse,
  type MinQueueTaskResponse,
  type MultiFeesDataResponse,
  type MultiPricesDataResponse,
  type MultiSecurityDataResponse,
  type MultiQueueItemResponse,
  type MultiDataResponse,
  type PlaceProfilesResponse,
  type PlaceSecurityResponse,
  type PlaceChildrenResponse,
  type PlaceDataResponse,
  type NftAddressResponse,
  type ProfileContentResponse,
  type ProfileDataResponse,
  type ProgramDataResponse,
  type ProfileProgramsResponse,
  type BuildMultiChooseInviterBodyRequest,
  type MultiChooseInviterBodyResponse,
  type BuildEditContentBodyRequest,
  type EditContentBodyResponse,
  type BuildDeployItemBodyRequest,
  type DeployItemBodyResponse,
  type BuildBuyPlaceBodyRequest,
  type BuyPlaceBodyResponse,
  type BuildLockPosBodyRequest,
  type LockPosBodyResponse,
  type BuildUnlockPosBodyRequest,
  type UnlockPosBodyResponse,
  type ContractBalanceResponse,
  type CollectionDataResponse,
  type TransactionMessageResponse,
  type TransactionResponse,
  type TransactionHistoryResponse,
  type WalletHistoryRequest,
  type ContractsApi,
} from './contractsApi';

// ============================================================
// Matrix API Methods
// ============================================================
export {
  // GET методы
  getRootPlace,
  getNextPos,
  getPath,
  fetchPlaces,
  getPlacesCount,
  fetchLocks,
  searchPlaces,
  getMatrix,
  
  // Экспорт объекта API
  matrixApi,
  
  // Типы
  type MatrixPlace,
  type MatrixLock,
  type Paginated,
  type TreeFilledNode,
  type TreeEmptyNode,
  type TreeNode,
  type NextPos,
  type BuyPlaceResult,
  type MatrixApi,
} from './matrixApi';

// ============================================================
// Profile Service Methods
// ============================================================
export {
  // Методы работы с профилями
  chooseInviter,
  createProfile,
  updateProfile,
  
  // Типы
  type ProfileResult,
} from './profileService';

// ============================================================
// Multi Service Methods
// ============================================================
export {
  // Методы работы с multi-матрицами
  buyPlace,
  lockPos,
  unlockPos,
  
  // Типы
  type ContractResult,
} from './multiService';

// ============================================================
// Structure Service Methods
// ============================================================
export {
  // Методы работы со структурой
  loadInviteLogin,
  loadRootByLogin,
  loadChildren,
  
  // Экспорт объекта сервиса
  structureService,
  
  // Типы
  type StructureNode,
  type StructureRootResult,
  type StructureChildrenResult,
  type StructureService,
} from './structureService';

// ============================================================
// TonConnect Service Methods
// ============================================================
export {
  // Методы отправки транзакций
  sendTransaction,
} from './tonConnectService';

// ============================================================
// NFT Content Helper Methods
// ============================================================
export {
  // Вспомогательные методы
  normalizeImage,
  capitalize,
  toLower,
} from './nftContentHelper';

// ============================================================
// Config Access Methods
// ============================================================
export {
  // Методы доступа к конфигурации
  getMatrixApiBaseUrl,
  getContractsApiBaseUrl,
  getDefaultMatrixApiHost,
  getDefaultContractsApiHost,
  buildMatrixApiUrl,
  buildContractsApiUrl,
  getAppConfig,
  getMatrixApiConfig,
  getContractsApiConfig,
  isUsingDefaultMatrixApiHost,
  isUsingDefaultContractsApiHost,
  getDefaultOrigin,
} from '../config/configAccess';

// ============================================================
// API Methods Summary
// ============================================================
/**
 * Сводка всех доступных API методов:
 * 
 * CONTRACTS API (17 методов):
 * - getInviteAddrBySeqNo - получить адрес инвайта по номеру последовательности
 * - getInviteData - получить данные инвайта
 * - getMinQueueTask - получить минимальную задачу из очереди
 * - getMultiData - получить данные multi-контракта
 * - getPlaceData - получить данные места
 * - getNftAddrByLogin - получить адрес NFT по логину
 * - getProfileNftData - получить данные NFT профиля
 * - getProfilePrograms - получить программы профиля
 * - getContractBalance - получить баланс контракта
 * - getCollectionData - получить данные коллекции
 * - getWalletHistory - получить историю транзакций кошелька
 * - buildMultiChooseInviterBody - создать тело транзакции для выбора пригласившего
 * - buildEditContentBody - создать тело транзакции для редактирования контента
 * - buildDeployItemBody - создать тело транзакции для деплоя NFT
 * - buildBuyPlaceBody - создать тело транзакции для покупки места
 * - buildLockPosBody - создать тело транзакции для блокировки позиции
 * - buildUnlockPosBody - создать тело транзакции для разблокировки позиции
 * 
 * MATRIX API (8 методов):
 * - getRootPlace - получить корневое место матрицы
 * - getNextPos - получить следующую позицию
 * - getPath - получить путь между местами
 * - fetchPlaces - получить список мест с пагинацией
 * - getPlacesCount - получить количество мест
 * - fetchLocks - получить список блокировок с пагинацией
 * - searchPlaces - поиск мест
 * - getMatrix - получить дерево матрицы
 * 
 * PROFILE SERVICE (3 метода):
 * - chooseInviter - выбрать пригласившего
 * - createProfile - создать новый профиль
 * - updateProfile - обновить существующий профиль
 * 
 * MULTI SERVICE (3 метода):
 * - buyPlace - купить место в матрице
 * - lockPos - заблокировать позицию
 * - unlockPos - разблокировать позицию
 * 
 * STRUCTURE SERVICE (3 метода):
 * - loadInviteLogin - загрузить логин по адресу инвайта
 * - loadRootByLogin - загрузить корневой узел структуры по логину
 * - loadChildren - загрузить дочерние узлы структуры
 * 
 * TONCONNECT SERVICE (1 метод):
 * - sendTransaction - отправить транзакцию через TonConnect
 * 
 * NFT CONTENT HELPER (3 метода):
 * - normalizeImage - нормализовать URL изображения
 * - capitalize - капитализировать строку
 * - toLower - привести строку к нижнему регистру
 * 
 * CONFIG ACCESS (12 методов):
 * - getMatrixApiBaseUrl - получить базовый URL для Matrix API
 * - getContractsApiBaseUrl - получить базовый URL для Contracts API
 * - getDefaultMatrixApiHost - получить дефолтный хост Matrix API
 * - getDefaultContractsApiHost - получить дефолтный хост Contracts API
 * - buildMatrixApiUrl - построить полный URL для Matrix API endpoint
 * - buildContractsApiUrl - построить полный URL для Contracts API endpoint
 * - getAppConfig - получить весь объект конфигурации
 * - getMatrixApiConfig - получить конфигурацию Matrix API
 * - getContractsApiConfig - получить конфигурацию Contracts API
 * - isUsingDefaultMatrixApiHost - проверить использование дефолтного хоста Matrix API
 * - isUsingDefaultContractsApiHost - проверить использование дефолтного хоста Contracts API
 * - getDefaultOrigin - получить origin для fallback
 */
