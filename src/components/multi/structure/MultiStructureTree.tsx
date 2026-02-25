import "./multi-structure-tree.css";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadRootByLogin, loadChildren, type StructureNode } from "../../../services/structureService";
import { ErrorCode } from "../../../errors/ErrorCodes";
import { getNftAddrByLogin, getProfileNftData } from "../../../services/contractsApi";

type Props = {
  rootLogin: string;
  onCuratorSelect?: (login: string) => void;
};

function updateNode(tree: StructureNode, targetId: string, updater: (node: StructureNode) => StructureNode): StructureNode {
  if (tree.addr === targetId) {
    return updater(tree);
  }
  if (!tree.children) return tree;
  return {
    ...tree,
    children: tree.children.map((child) => updateNode(child, targetId, updater)),
  };
}

type ProfileImageCache = Record<string, string | null>;
type ProfileTgCache = Record<string, string | null>;
type ProfileFullNameCache = Record<string, string | null>;

function MultiStructureTree({ rootLogin, onCuratorSelect }: Props) {
  const { t } = useTranslation();
  const [root, setRoot] = useState<StructureNode | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [loadingNodes, setLoadingNodes] = useState<Record<string, boolean>>({});
  const [errorKey, setErrorKey] = useState<{ code: ErrorCode; login: string } | null>(null);
  const [profileImages, setProfileImages] = useState<ProfileImageCache>({});
  const [profileTgUsernames, setProfileTgUsernames] = useState<ProfileTgCache>({});
  const [profileFullNames, setProfileFullNames] = useState<ProfileFullNameCache>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    const login = rootLogin.trim();
    if (!login) {
      setRoot(null);
      setExpanded({});
      setErrorKey(null);
      return;
    }

    const load = async () => {
      setLoading(true);
      setRoot(null);
      setExpanded({});
      setErrorKey(null);
      const result = await loadRootByLogin(login);
      if (cancelled) return;
      if (!result.success || !result.node) {
        setErrorKey({ code: ErrorCode.STRUCTURE_ROOT_NOT_FOUND, login });
        setLoading(false);
        return;
      }

      const node = result.node;
      setRoot(node);
      setExpanded({});
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [rootLogin]);

  const getLastChildIndex = (node: StructureNode): number => {
    if (!node.children?.length) return 0;
    const last = node.children[node.children.length - 1].index;
    return Number.isFinite(last) ? last : 0;
  };

  const calcToRefNo = (node: StructureNode, lastIdx: number): number => {
    let toRefNo = lastIdx + 10; 

    if (node.nextRefNo < toRefNo) { 
      toRefNo = node.nextRefNo;
    }

    return toRefNo;
  };

  const handleToggle = async (node: StructureNode) => {
    if (expanded[node.addr]) {
      setExpanded((prev) => ({ ...prev, [node.addr]: false }));
      return;
    }

    setExpanded((prev) => ({ ...prev, [node.addr]: true }));

    if (node.children && node.children.length > 0) return;

    setLoadingNodes((prev) => ({ ...prev, [node.addr]: true }));

    const lastIdx = 0;
    const toRefNo = calcToRefNo(node, lastIdx);
    // if (lastIdx === toRefNo) {
    //   setLoadingNodes((prev) => {
    //     const next = { ...prev };
    //     delete next[node.id];
    //     return next;
    //   });
    //   return;
    // }
    const res = await loadChildren(node, lastIdx + 1, toRefNo);
    setLoadingNodes((prev) => {
      const next = { ...prev };
      delete next[node.addr];
      return next;
    });

    if (!res.success) return;
    setRoot((prev) => {
      if (!prev) return prev;
      return updateNode(prev, node.addr, (n) => ({
        ...n,
        children: res.children,
      }));
    });
  };

  const handleLoadMore = async (node: StructureNode) => {
    const lastIdx = getLastChildIndex(node);

    setLoadingNodes((prev) => ({ ...prev, [node.addr]: true }));
    const toRefNo = calcToRefNo(node, lastIdx);

    if (toRefNo === lastIdx) {
      setLoadingNodes((prev) => {
        const next = { ...prev };
        delete next[node.addr];
        return next;
      });
      return;
    }
    const res = await loadChildren(node, lastIdx + 1, toRefNo);
    setLoadingNodes((prev) => {
      const next = { ...prev };
      delete next[node.addr];
      return next;
    });
    if (!res.success) return;
    const children = res.children;
    setRoot((prev) => {
      if (!prev) return prev;
      return updateNode(prev, node.addr, (n) => ({
        ...n,
        children: [...(n.children ?? []), ...children],
      }));
    });
  };

  // Load profile image for a node
  useEffect(() => {
    const loadProfileImages = async () => {
      if (!root) return;
      
      const loadImageForNode = async (node: StructureNode) => {
        if (profileImages[node.login] !== undefined) return; // Already loaded or failed
        
        try {
          const nftAddr = await getNftAddrByLogin(node.login.toLowerCase());
          if (!nftAddr?.addr) {
            setProfileImages(prev => ({ ...prev, [node.login]: null }));
            setProfileTgUsernames(prev => ({ ...prev, [node.login]: null }));
            setProfileFullNames(prev => ({ ...prev, [node.login]: null }));
            return;
          }
          
          const profileData = await getProfileNftData(nftAddr.addr);
          const imageUrl = profileData?.content?.image_url || null;
          const tgUsername = profileData?.content?.tg_username?.trim() || null;
          const firstName = profileData?.content?.first_name?.trim();
          const lastName = profileData?.content?.last_name?.trim();
          const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;
          setProfileImages(prev => ({ ...prev, [node.login]: imageUrl }));
          setProfileTgUsernames(prev => ({ ...prev, [node.login]: tgUsername }));
          setProfileFullNames(prev => ({ ...prev, [node.login]: fullName }));
        } catch (err) {
          console.error(`Failed to load image for ${node.login}:`, err);
          setProfileImages(prev => ({ ...prev, [node.login]: null }));
          setProfileTgUsernames(prev => ({ ...prev, [node.login]: null }));
          setProfileFullNames(prev => ({ ...prev, [node.login]: null }));
        }
      };
      
      const loadAllImages = async (node: StructureNode) => {
        await loadImageForNode(node);
        if (node.children) {
          for (const child of node.children) {
            await loadAllImages(child);
          }
        }
      };
      
      loadAllImages(root);
    };
    
    loadProfileImages();
  }, [root]);

  const renderNode = (node: StructureNode, level: number, path: number[]) => {
    const hasChildren = !!node.children?.length;
    const isOpen = !!expanded[node.addr];
    const created = new Date(node.createdAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
    const lastIdx = getLastChildIndex(node);

    const hasExpandable = hasChildren || node.nextRefNo > 1;
    const showLoadMore = isOpen && node.nextRefNo > lastIdx + 1;
    const imageUrl = profileImages[node.login];
    const hasImageError = imageErrors[node.login];
    const showImage = imageUrl && !hasImageError;
    const tgUsername = profileTgUsernames[node.login];
    const tgDisplay = tgUsername ? (tgUsername.startsWith("@") ? tgUsername : `@${tgUsername}`) : null;
    const fullName = profileFullNames[node.login];
    
    return (
      <div key={node.addr} className={level > 0 ? "ml-6 border-l-2 border-gray-100 pl-4" : ""}>
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0 overflow-hidden">
              {showImage ? (
                <img
                  src={imageUrl}
                  alt={node.login}
                  className="w-full h-full rounded-full object-cover"
                  onError={() => setImageErrors(prev => ({ ...prev, [node.login]: true }))}
                />
              ) : (
                node.login.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <span className="font-bold text-gray-900">{node.login}</span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 font-medium">
                  {t("multi.structure.refs", "Refs")}: {node.referals}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span>{created}</span>
                </span>
                {fullName && (
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>
                      {t("multi.structure.fullname", "ФИ")}: <span className="text-gray-600">{fullName}</span>
                    </span>
                  </span>
                )}
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span>
                    {t("multi.structure.tg", "Telegram")}:{" "}
                    {tgDisplay ? (
                      <a
                        href={`https://t.me/${tgDisplay.replace(/^@+/, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {tgDisplay}
                      </a>
                    ) : (
                      <span className="text-gray-500">{t("multi.structure.no_username", "Нет username")}</span>
                    )}
                  </span>
                </span>
                {node.parent_login && (
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    <span>
                      {t("multi.structure.curator", "Curator")}:{" "}
                      {onCuratorSelect ? (
                        <button
                          type="button"
                          onClick={() => onCuratorSelect(node.parent_login!)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {node.parent_login}
                        </button>
                      ) : (
                        <span className="text-gray-600">{node.parent_login}</span>
                      )}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
          {hasExpandable ? (
            <button
              type="button"
              onClick={() => handleToggle(node)}
              disabled={!!loadingNodes[node.addr]}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>

        {isOpen && hasChildren && node.children!.map((child) => renderNode(child, level + 1, [...path, child.index]))}

        {isOpen && hasChildren && (
          <div className="animate-fade-in">
            {node.children!.map((child) => renderNode(child, level + 1, [...path, child.index]))}
          </div>
        )}

        {showLoadMore && (
          <div className="ml-4 mb-4">
            <button
              type="button"
              className="text-sm text-gray-700 font-medium hover:underline flex items-center space-x-1 group"
              onClick={() => handleLoadMore(node)}
              disabled={!!loadingNodes[node.addr]}
            >
              <span className="group-hover:text-gray-900">
                {loadingNodes[node.addr]
                  ? t("multi.structure.loading", "Загрузка...")
                  : t("multi.structure.loadMore", "Загрузить ещё...")}
              </span>
              {!loadingNodes[node.addr] && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover:translate-y-0.5 transition-transform">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="structure-card__body structure-placeholder">
        {t("multi.structure.loading", "Loading...")}
      </div>
    );
  }

  if (errorKey) {
    return (
      <div className="structure-card__body structure-placeholder">
        {t(`errors.${errorKey.code}`, "Curator {{login}} not found.", { login: errorKey.login })}
      </div>
    );
  }

  if (!root) {
    return (
      <div className="structure-card__body structure-placeholder">
        {t("multi.structure.treePlaceholder", "Tree view will appear here.")}
      </div>
    );
  }

  return (
    <div className="structure-card__body">
      <div className="structure-tree">{renderNode(root, 0, [root.index])}</div>
    </div>
  );
}

export default memo(MultiStructureTree);
