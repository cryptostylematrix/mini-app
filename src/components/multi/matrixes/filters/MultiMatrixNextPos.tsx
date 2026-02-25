import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getNextPos } from "../../../../services/matrixApi";
import { useMatrixContext } from "../../../../context/MatrixContext";
import { useProfileContext } from "../../../../context/ProfileContext";


type Props = { label?: string; classNameModifier?: string };

export default function NextPosButton({ label, classNameModifier }: Props) {
  const { currentProfile } = useProfileContext();
  const { t } = useTranslation();
  const { setSelectedPlace, selectedMatrix } = useMatrixContext();
  const [nextPos, setNextPos] = useState<{ parent_addr: string; pos: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const displayLabel = label ?? t("multiMatrix.filters.nextPos", "Следующая позиция");

  useEffect(() => {
    if (!currentProfile) {
      setNextPos(null);
      return;
    }
    setLoading(true);
    getNextPos(selectedMatrix, currentProfile.address)
      .then((next) => {
        setNextPos(next ? { parent_addr: next.parent_addr, pos: next.pos } : null);
      })
      .finally(() => setLoading(false));
  }, [selectedMatrix, currentProfile]);

  return (
    <button
      type="button"
      className={`filter-button secondary update-page-button${classNameModifier ? ` ${classNameModifier}` : ""}`}
      onClick={() => {
        if (!nextPos) return;
        setSelectedPlace(nextPos.parent_addr);
      }}
      disabled={!nextPos || loading}
    >
      {loading ? t("home.loading") : displayLabel}
    </button>
  );
}
