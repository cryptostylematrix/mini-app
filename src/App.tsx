import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, createContext, useEffect, lazy, Suspense } from "react";

import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

import { ProfileProvider } from "./context/ProfileContext";
import { useTonConnectUI } from "@tonconnect/ui-react";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const AddProfile = lazy(() => import("./pages/profile/AddProfile"));
const CreateProfile = lazy(() => import("./pages/profile/CreateProfile"));
const UpdateProfile = lazy(() => import("./pages/profile/UpdateProfile"));
const Finance = lazy(() => import("./pages/Finance"));
const Multi = lazy(() => import("./pages/multi/Multi"));
const MultiInviter = lazy(() => import("./pages/multi/MultiInviter"));
const MultiStructure = lazy(() => import("./pages/multi/MultiStructure"));
const MultiMatrixes = lazy(() => import("./pages/multi/MultiMatrixes"));
const MultiMarketing = lazy(() => import("./pages/multi/MultiMarketing"));
const MultiStat = lazy(() => import("./pages/multi/MultiStat"));

/**
 * Wallet context shared globally
 */
export interface WalletContextType {
  wallet: string;
  setWallet: React.Dispatch<React.SetStateAction<string>>;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Component to ensure trailing slash for root path
function TrailingSlashRedirect() {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = window.location.pathname;
    // If we're at root (without trailing slash) and on root route, redirect to /
    if (currentPath === "" && location.pathname === "/") {
      window.history.replaceState(null, "", "/");
    }
  }, [location]);
  
  return null;
}

function App() {
  const [wallet, setWallet] = useState("");
  const [tonConnectUI] = useTonConnectUI();

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      <ProfileProvider wallet={wallet} tonConnectUI={tonConnectUI}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <TrailingSlashRedirect />
          <div className="min-h-screen bg-app text-app flex flex-col font-inter">
            <Header />

            <main className="flex-1 bg-app pb-24 md:pb-0">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
                <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/profile" element={<Profile />}>
                  {/* Redirect /profile → /profile/update by default */}
                  <Route index element={<Navigate to="update" replace />} />
                  <Route path="update" element={<UpdateProfile />} />
                  <Route path="add" element={<AddProfile />} />
                  <Route path="create" element={<CreateProfile />} />
                </Route>

                <Route path="/finance" element={<Finance />} />

                <Route path="/multi" element={<Multi />}>
                  <Route index element={<Navigate to="inviter" replace />} />
                  <Route path="inviter" element={<MultiInviter />} />
                  <Route path="structure" element={<MultiStructure />} />
                  <Route path="matrixes" element={<MultiMatrixes />} />
                  <Route path="marketing" element={<MultiMarketing />} />
                  <Route path="stat" element={<MultiStat />} />
                </Route>
                </Routes>
              </Suspense>
            </main>

            <Footer />
            <Navigation />
          </div>
        </BrowserRouter>
      </ProfileProvider>
    </WalletContext.Provider>
  );
}

export default App;
