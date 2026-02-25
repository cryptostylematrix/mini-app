import "./multi-matrixes.css";
import { useContext } from "react";
import MultiMatrixFilters from "../../components/multi/matrixes/filters/MultiMatrixFilters";
import MultiMatrixBreadCrumbs from "../../components/multi/matrixes/MultiMatrixBreadCrumbs";
import MultiMatrixTree from "../../components/multi/matrixes/tree/MultiMatrixTree";
import ProfileStatusBlock from "../../components/ProfileStatusBlock";
import { WalletContext } from "../../App";
import { useProfileContext } from "../../context/ProfileContext";
import { MatrixProvider } from "../../context/MatrixContext";
import { getProfilePrograms } from "../../services/contractsApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MultiMatrixes() {
  const { wallet } = useContext(WalletContext)!;
  const { currentProfile } = useProfileContext();
  const { t } = useTranslation();
  const [programAllowed, setProgramAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    setProgramAllowed(null);

    if (!currentProfile) return () => { cancelled = true; };

    const run = async () => {
      const program = await getProfilePrograms(currentProfile.address);
      if (cancelled) return;
      if (!program?.multi || program.multi.confirmed !== 1) {
        setProgramAllowed(false);
      } else {
        setProgramAllowed(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [currentProfile]);

  if (!wallet) {
    return <ProfileStatusBlock type="wallet" />;
  }

  if (!currentProfile) {
    return <ProfileStatusBlock type="profile" />;
  }

  if (programAllowed === false) {
    return (
      <section className="w-full max-w-5xl mx-auto animate-fade-in">
        <div className="multi-panel bg-accent-soft border border-accent/30 rounded-2xl p-6 text-gray-900">
          {t("multiMatrix.filters.programNotConfirmed", "You need to choose an inviter first.")}
        </div>
      </section>
    );
  }

  return (
    <MatrixProvider>
      <section className="matrixes-tab w-full max-w-6xl mx-auto animate-fade-in space-y-4 md:space-y-6 px-1 sm:px-0 min-w-0">
        <MultiMatrixFilters />
        <MultiMatrixBreadCrumbs />
        <MultiMatrixTree />
      </section>
    </MatrixProvider>
  );
}
