import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const LogoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22L3 9L12 2L21 9L12 22Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 22V2M3 9H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.48-.94-2.4-1.54-1.06-.7.11-1.09.68-1.64.15-.14 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.4-1.08.39-.35-.01-1.03-.2-1.53-.35-.62-.19-1.1-.29-1.06-.61.02-.16.24-.32.65-.49 2.54-1.1 4.23-1.84 5.09-2.2 2.41-1 2.91-1.21 3.24-1.22.07 0 .23.02.33.09.09.07.12.17.13.24 0 .09.01.21 0 .23z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

// New UserX Icon
const UserXIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="18" y1="8" x2="23" y2="13"></line>
    <line x1="23" y1="8" x2="18" y2="13"></line>
  </svg>
);

// New Alert Icon
const AlertIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ArrowDownIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
     <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ChatBubbleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const UnlockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const LayersIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);

const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Components ---

const Header = ({ currentPage, navigateTo }: { currentPage: string, navigateTo: (page: string) => void }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo & Nav */}
        <div className="flex items-center space-x-8 lg:space-x-12">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => navigateTo('home')}>
             <div className="text-[#0EA5E9] w-8 h-8 group-hover:scale-110 transition-transform duration-300">
               <LogoIcon className="w-full h-full" />
             </div>
          </div>

          {/* Nav Links - HIDDEN ON MOBILE */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <button 
              onClick={() => navigateTo('home')} 
              className={`transition-colors ${currentPage === 'home' ? 'text-[#0EA5E9]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => navigateTo('profile')} 
              className={`transition-colors relative ${currentPage === 'profile' ? 'text-[#0EA5E9]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Профиль
              {currentPage === 'profile' && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#0EA5E9] rounded-t-full"></span>
              )}
            </button>
            <button 
              onClick={() => navigateTo('finance')}
              className={`transition-colors relative ${currentPage === 'finance' ? 'text-[#0EA5E9]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Финансы
              {currentPage === 'finance' && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#0EA5E9] rounded-t-full"></span>
              )}
            </button>
            <button 
              onClick={() => navigateTo('multi')}
              className={`transition-colors relative ${currentPage === 'multi' ? 'text-[#0EA5E9]' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Multi
              {currentPage === 'multi' && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#0EA5E9] rounded-t-full"></span>
              )}
            </button>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
           <div className="hidden lg:flex items-center space-x-3 text-gray-400">
              <button className="hover:text-[#0088cc]"><TelegramIcon className="w-5 h-5" /></button>
              <button className="hover:text-red-600"><YoutubeIcon className="w-6 h-6" /></button>
              <div className="h-4 w-px bg-gray-300 mx-2"></div>
              <button className="text-gray-500 font-medium text-sm hover:text-gray-800">RU/EN</button>
           </div>
           
           <button className="hidden sm:flex items-center space-x-2 bg-[#0EA5E9] text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:bg-[#0284c7] transition-all transform hover:-translate-y-0.5">
              <WalletIcon className="w-5 h-5" />
              <span>TonConnect</span>
           </button>

           <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full sm:bg-transparent sm:p-0">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                <UserIcon className="w-5 h-5" />
              </div>
              <ArrowDownIcon className="w-4 h-4 hidden sm:block" />
           </button>
        </div>
      </div>
    </header>
  );
};

// --- NEW BOTTOM NAVIGATION (MOBILE ONLY) ---
const BottomNavigation = ({ currentPage, navigateTo }: { currentPage: string, navigateTo: (page: string) => void }) => {
    const navItems = [
        { id: 'home', label: 'Главная', icon: HomeIcon },
        { id: 'profile', label: 'Профиль', icon: UserIcon },
        { id: 'finance', label: 'Финансы', icon: WalletIcon },
        { id: 'multi', label: 'Multi', icon: LayersIcon },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 pb-4 z-50 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                return (
                    <button 
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 ${isActive ? 'text-[#0EA5E9]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <div className={`mb-1 transition-transform ${isActive ? '-translate-y-1' : ''}`}>
                             <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        </div>
                        <span className={`text-[10px] font-medium leading-none ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

const Footer = () => {
  return (
    // HIDDEN ON MOBILE
    <footer className="hidden md:block bg-white border-t border-gray-100 py-6 mt-auto">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
             <div className="flex items-center space-x-6">
                <div className="text-[#0EA5E9] flex items-center space-x-2">
                   <LogoIcon className="w-6 h-6" />
                   <span className="font-bold text-gray-800 text-lg">Logo</span>
                </div>
                <nav className="flex space-x-6 text-sm text-gray-600">
                   <a href="#" className="hover:text-gray-900">О нас</a>
                   <a href="#" className="hover:text-gray-900">Помощь</a>
                   <a href="#" className="hover:text-gray-900">Документы</a>
                </nav>
             </div>
             
             <div className="text-gray-400 text-sm">
                © 2024 Project Name. Все права защищены.
             </div>

             <div className="flex space-x-4 text-gray-400">
                <button className="hover:text-[#0088cc]"><TelegramIcon className="w-5 h-5" /></button>
                <button className="hover:text-red-600"><YoutubeIcon className="w-5 h-5" /></button>
                <button className="hover:text-[#0088cc]"><SendIcon className="w-5 h-5" /></button>
                <button className="hover:text-pink-600"><InstagramIcon className="w-5 h-5" /></button>
             </div>
          </div>
       </div>
    </footer>
  );
}

// --- SUB-PAGES ---
// ... (Keeping existing tab components: MultiInviterTab, MultiStructureTab, MultiMatrixesTab, MultiMarketingTab, MultiStatsTab, MultiPage, FinancePage, ProfilePage unchanged except for layout usage) ...

// 1. INVITER TAB 
const MultiInviterTab = () => {
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
  const [login, setLogin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Mock data for the found user
  const [candidate, setCandidate] = useState<{name: string, login: string, telegram: string, refs: number} | null>(null);

  const onSearch = () => {
    if (!login.trim()) {
      setError('Пожалуйста, введите логин');
      return;
    }
    setIsLoading(true);
    setError('');
    
    // Simulate API search
    setTimeout(() => {
      setIsLoading(false);
      if (login.toLowerCase() === 'error') {
        setError('Пользователь не найден');
      } else {
        // Mock success
        setCandidate({
          name: 'Crypto Master',
          login: login,
          telegram: 'crypto_master_real',
          refs: 42
        });
        setStep('confirm');
      }
    }, 800);
  };

  const onConfirm = () => {
    setIsLoading(true);
    // Simulate API bind
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 800);
  };

  const onReset = () => {
    setStep('input');
    setLogin('');
    setCandidate(null);
    setError('');
  };

  // --- Render Steps ---

  // Step 1: Input
  if (step === 'input') {
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 text-center relative overflow-hidden">
           {/* Decorative bg blur */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/20 blur-3xl rounded-full pointer-events-none"></div>

           <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-50 text-[#0EA5E9] rounded-2xl mx-auto mb-6 flex items-center justify-center">
                 <UserIcon className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваш куратор</h2>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Введите логин пригласителя, чтобы присоединиться к его структуре и начать работу.
              </p>

              <div className="space-y-4">
                 <div className="relative group">
                    <input 
                      type="text" 
                      value={login}
                      onChange={(e) => { setLogin(e.target.value); setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                      placeholder="Login"
                      className="w-full bg-gray-50 text-center text-lg font-bold text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-[#0EA5E9]/50 focus:bg-white rounded-2xl py-4 px-4 outline-none transition-all shadow-sm group-hover:bg-gray-100/80"
                    />
                 </div>
                 
                 {error && (
                   <div className="text-red-500 text-sm font-medium animate-pulse">{error}</div>
                 )}

                 <button 
                   onClick={onSearch}
                   disabled={isLoading}
                   className="w-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold text-lg rounded-2xl py-4 shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center"
                 >
                    {isLoading ? <LoadingSpinner className="w-6 h-6 text-white" /> : 'Найти'}
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Step 2: Confirm
  if (step === 'confirm' && candidate) {
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 text-center relative">
           <h2 className="text-xl font-bold text-gray-900 mb-6">Это ваш куратор?</h2>
           
           <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#0EA5E9] to-cyan-400 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-md">
                 {candidate.login.substring(0,2).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{candidate.login}</h3>
              {candidate.name && <p className="text-gray-500 text-sm mb-1">{candidate.name}</p>}
              <div className="flex justify-center items-center space-x-2 mt-3">
                 <span className="bg-blue-100 text-[#0EA5E9] text-xs font-bold px-2 py-1 rounded-lg">
                   {candidate.refs} рефералов
                 </span>
                 {candidate.telegram && (
                   <a href={`https://t.me/${candidate.telegram}`} target="_blank" className="text-gray-400 hover:text-[#0EA5E9] transition-colors">
                     <TelegramIcon className="w-5 h-5" />
                   </a>
                 )}
              </div>
           </div>

           <div className="space-y-3">
             <button 
               onClick={onConfirm}
               disabled={isLoading}
               className="w-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-bold text-lg rounded-2xl py-4 shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center"
             >
                {isLoading ? <LoadingSpinner className="w-6 h-6 text-white" /> : 'Всё верно, продолжить'}
             </button>
             <button 
               onClick={onReset}
               disabled={isLoading}
               className="w-full bg-transparent hover:bg-gray-50 text-gray-500 font-medium text-base rounded-2xl py-3 transition-all"
             >
                Назад к поиску
             </button>
           </div>
        </div>
      </div>
    );
  }

  // Step 3: Success
  return (
    <div className="max-w-md mx-auto animate-fade-in">
       <div className="bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100 text-center relative overflow-hidden">
           {/* Success confetti/bg effect */}
           <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
              <CheckIcon className="w-12 h-12" />
           </div>
           
           <h2 className="text-2xl font-bold text-gray-900 mb-3">Готово!</h2>
           <p className="text-gray-500 mb-8 leading-relaxed">
             Вы успешно закрепились за куратором <span className="font-bold text-gray-900">{candidate?.login}</span>.
           </p>

           <div className="bg-blue-50 p-4 rounded-xl text-[#0EA5E9] text-sm mb-6">
              Теперь вам доступны матрицы и другие разделы системы.
           </div>
       </div>
    </div>
  );
};

const TreeNode: React.FC<{ node: any; level?: number }> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`flex flex-col ${level > 0 ? 'ml-6 border-l-2 border-gray-100 pl-4' : ''}`}>
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 text-[#0EA5E9] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {node.login.slice(0,2).toUpperCase()}
               </div>
               <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                     <span className="font-bold text-gray-900">{node.login}</span>
                     <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500 font-medium">Refs: {node.refs}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                     <span className="flex items-center space-x-1">
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                         <span>{node.date}</span>
                     </span>
                     {node.curator && (
                       <span className="flex items-center space-x-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]/50"></span>
                           <span>Curator: <span className="text-gray-600">{node.curator}</span></span>
                       </span>
                     )}
                  </div>
               </div>
            </div>
             {node.children && node.children.length > 0 ? (
               <button onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                  {isOpen ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
               </button>
             ) : (<div className="w-8 h-8" />)}
        </div>
        {isOpen && node.children && (
            <div className="animate-fade-in">
                {node.children.map((child: any, idx: number) => (
                    <TreeNode key={idx} node={child} level={level + 1} />
                ))}
                {node.hasMore && (
                     <button className="text-sm text-[#0EA5E9] font-medium hover:underline ml-4 mb-4 flex items-center space-x-1 group">
                        <span className="group-hover:text-[#0284c7]">Загрузить ещё...</span>
                        <ChevronDownIcon className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                     </button>
                )}
            </div>
        )}
    </div>
  );
};

const MultiStructureTab = () => {
  const [searchLogin, setSearchLogin] = useState('CurrentUser'); 
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  const initialMockData = {
    login: 'CurrentUser',
    date: '20.05.2024',
    refs: 15,
    curator: 'MasterAdmin',
    children: [
      { login: 'Referral_1', date: '21.05.2024', refs: 3, curator: 'CurrentUser', children: [] },
      { login: 'Referral_2', date: '22.05.2024', refs: 5, curator: 'CurrentUser', children: [{ login: 'SubRef_A', date: '23.05.2024', refs: 0, curator: 'Referral_2' }], hasMore: true },
      { login: 'Referral_3', date: '22.05.2024', refs: 0, curator: 'CurrentUser', children: [] },
    ]
  };
  
  useEffect(() => { setTreeData(initialMockData); }, []);

  const handleSearch = () => {
    setIsLoading(true); setMessage(null); setTreeData(null);
    setTimeout(() => {
        setIsLoading(false);
        if (searchLogin.toLowerCase() === 'unknown') {
            setMessage('Приглашение с таким логином не найдено.'); setTreeData(null);
        } else {
             const searchedNode = { ...initialMockData, login: searchLogin, children: initialMockData.children };
            setTreeData(searchedNode);
        }
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
       <div className="bg-white rounded-3xl shadow-xl p-8 ring-1 ring-black/5">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Поиск по логину</h2>
          <div className="flex flex-col sm:flex-row gap-4">
             <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" value={searchLogin} onChange={(e) => setSearchLogin(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && handleSearch()} placeholder="Введите логин" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block pl-10 p-3.5 outline-none transition-all" />
             </div>
             <button onClick={handleSearch} className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white px-8 py-3.5 rounded-xl transition-all font-medium shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap">Поиск</button>
          </div>
       </div>
       <div className="bg-white rounded-3xl shadow-xl p-8 ring-1 ring-black/5 min-h-[300px]">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Структура</h2>
          {isLoading ? <div className="flex flex-col justify-center items-center h-40 text-gray-500 space-y-3"><LoadingSpinner className="w-8 h-8 text-[#0EA5E9]" /><span className="text-sm font-medium">Загрузка структуры...</span></div> : message ? <div className="flex flex-col items-center justify-center py-12 text-center"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400"><SearchIcon className="w-8 h-8" /></div><p className="text-gray-900 font-medium mb-1">Ничего не найдено</p><p className="text-gray-500 text-sm">{message}</p></div> : treeData ? <div className="overflow-x-auto"><TreeNode node={treeData} /></div> : null}
       </div>
    </div>
  );
};

const MultiMatrixesTab = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState(['Root', 'L1-NodeA', 'L1-NodeB']);

  const handleBuy = () => { setIsBuying(true); setTimeout(() => { setIsBuying(false); setShowConfirm(false); alert('Место успешно куплено! (Simulated)'); }, 1500); };
  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); e.currentTarget.style.cursor = 'grabbing'; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging) { setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); } };
  const onMouseUp = (e: React.MouseEvent) => { setIsDragging(false); e.currentTarget.style.cursor = 'grab'; };
  const handleZoom = (delta: number) => { setScale(prev => Math.min(Math.max(prev + delta, 0.5), 2)); };

  return (
    <div className="w-full animate-fade-in space-y-6">
       <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4 transition-all">
          <div className="flex justify-between items-center">
             <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 text-sm font-medium"><FilterIcon className="w-4 h-4" /><span>{showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}</span></button>
             <div className="flex space-x-2"><button onClick={() => setShowConfirm(true)} className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0284c7] transition-colors shadow-sm">Купить место (10 TON)</button><button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Обновить</button></div>
          </div>
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 animate-slide-down">
               <div><label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Матрица</label><select value={selectedLevel} onChange={(e) => setSelectedLevel(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:ring-2 ring-[#0EA5E9]/20">{[1,2,3,4,5,6].map(i => <option key={i} value={i}>Level {i}</option>)}</select></div>
               <div><label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Места</label><select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:ring-2 ring-[#0EA5E9]/20"><option>Все места</option><option>Свободные</option></select></div>
               <div><label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Поиск</label><input type="text" placeholder="Логин" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:ring-2 ring-[#0EA5E9]/20" /></div>
               <div><label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Блокировки</label><select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:ring-2 ring-[#0EA5E9]/20"><option>Все</option><option>Заблокированные</option></select></div>
            </div>
          )}
       </div>
       <div className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto pb-2 scrollbar-hide"><button className="hover:text-[#0EA5E9] font-medium px-2 py-1 hover:bg-blue-50 rounded-md transition-colors">Вверх ▲</button><span className="text-gray-300">|</span>{path.map((p, i) => (<React.Fragment key={i}><span className={`px-2 py-1 rounded-md transition-colors ${i === path.length - 1 ? 'bg-gray-100 text-gray-900 font-bold' : 'hover:text-[#0EA5E9] hover:bg-blue-50 cursor-pointer'}`}>{p}</span>{i < path.length - 1 && <ChevronRightIcon className="w-4 h-4 text-gray-300" />}</React.Fragment>))}</div>
       <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-3xl shadow-lg ring-1 ring-black/5 relative overflow-hidden h-[500px] select-none group">
             <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20"><button onClick={() => handleZoom(0.1)} className="p-2 bg-white shadow-md rounded-lg hover:bg-gray-50 active:bg-gray-100 text-gray-600"><PlusIcon className="w-5 h-5" /></button><button onClick={() => handleZoom(-0.1)} className="p-2 bg-white shadow-md rounded-lg hover:bg-gray-50 active:bg-gray-100 text-gray-600"><MinusIcon className="w-5 h-5" /></button></div>
             <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur text-xs text-gray-500 px-3 py-1 rounded-full shadow-sm">Drag to move • Scroll to zoom</div>
             <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={() => setIsDragging(false)}>
                <div style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.1s ease-out' }} className="w-full h-full flex flex-col items-center justify-center">
                   <div className="relative z-10 flex flex-col items-center animate-pop-in">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#0284c7] text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-xl cursor-pointer transform hover:scale-110 transition-all duration-300 relative group">ME<div className="absolute inset-0 rounded-full bg-[#0EA5E9] opacity-20 animate-ping"></div></div>
                      <div className="absolute top-full left-1/2 w-0 h-24 border-l-2 border-dashed border-gray-300 -z-10 origin-top transform -translate-x-1/2 rotate-[-25deg]"></div><div className="absolute top-full left-1/2 w-0 h-24 border-l-2 border-dashed border-gray-300 -z-10 origin-top transform -translate-x-1/2 rotate-[25deg]"></div>
                   </div>
                   <div className="flex space-x-32 mt-24">
                       <div className="flex flex-col items-center animate-pop-in" style={{animationDelay: '0.1s'}}><div className="w-16 h-16 rounded-full bg-white text-gray-600 flex items-center justify-center font-bold border-2 border-gray-200 shadow-md cursor-pointer hover:bg-gray-50 hover:border-[#0EA5E9] transition-all hover:-translate-y-1">A1</div><div className="mt-2 text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm">ID: 1234</div></div>
                       <div className="flex flex-col items-center animate-pop-in" style={{animationDelay: '0.2s'}}><div className="w-16 h-16 rounded-full bg-white text-gray-600 flex items-center justify-center font-bold border-2 border-gray-200 shadow-md cursor-pointer hover:bg-gray-50 hover:border-[#0EA5E9] transition-all hover:-translate-y-1">A2</div><div className="mt-2 text-xs font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm">ID: 5678</div></div>
                   </div>
                   <button className="mt-12 bg-white/90 hover:bg-white text-xs px-4 py-2 rounded-full text-gray-600 shadow-lg border border-gray-100 transition-all hover:scale-105 flex items-center space-x-1"><span>Следующая позиция</span><ArrowDownIcon className="w-3 h-3 animate-bounce" /></button>
                </div>
             </div>
          </div>
          <div className="w-full lg:w-80 bg-white rounded-3xl shadow-lg p-6 ring-1 ring-black/5 flex flex-col h-fit animate-slide-in-right">
             <h3 className="font-bold text-gray-900 mb-4 flex items-center"><span className="w-1 h-5 bg-[#0EA5E9] rounded-full mr-2"></span>Детали места</h3>
             <div className="space-y-3 text-sm">
                <div className="flex justify-between py-3 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors"><span className="text-gray-500">Адрес</span><span className="font-mono text-gray-900">EQAb...xyz</span></div>
                <div className="flex justify-between py-3 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors"><span className="text-gray-500">Логин</span><span className="font-medium text-[#0EA5E9] bg-blue-50 px-2 py-0.5 rounded">User_123</span></div>
                <div className="flex justify-between py-3 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors"><span className="text-gray-500">Место #</span><span className="text-gray-900 font-bold">142</span></div>
                <div className="flex justify-between py-3 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors"><span className="text-gray-500">Дата</span><span className="text-gray-900">24.05.2024</span></div>
                <div className="flex justify-between py-3 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg transition-colors"><span className="text-gray-500">Потомки</span><span className="text-gray-900">2</span></div>
             </div>
             <a href="#" className="flex items-center space-x-1 text-xs text-[#0EA5E9] hover:text-[#0284c7] mt-6 mb-6 justify-center bg-blue-50 py-2 rounded-lg transition-colors"><span>Открыть в TonViewer</span><ExternalLinkIcon className="w-3 h-3" /></a>
             <button className="w-full border border-red-200 text-red-500 hover:bg-red-50 font-medium rounded-xl py-3 flex items-center justify-center space-x-2 transition-all active:scale-95"><LockIcon className="w-4 h-4" /><span>Заблокировать</span></button>
          </div>
       </div>
       {showConfirm && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowConfirm(false)}></div>
             <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm transform scale-100 transition-all animate-pop-in">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EA5E9]"><WalletIcon className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Покупка места</h3>
                <p className="text-gray-500 mb-8 text-center">Вы собираетесь купить новое место в матрице за <span className="font-bold text-gray-900">10 TON</span>.</p>
                <div className="flex space-x-3"><button onClick={handleBuy} disabled={isBuying} className="flex-1 bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-medium rounded-xl py-3 flex justify-center transition-colors shadow-lg shadow-blue-500/30">{isBuying ? <LoadingSpinner className="w-5 h-5 text-white" /> : 'Подтвердить'}</button><button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl py-3 transition-colors">Отмена</button></div>
             </div>
         </div>
       )}
       <style>{`@keyframes pop-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } } .animate-pop-in { animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }`}</style>
    </div>
  );
};

const MultiMarketingTab = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="bg-white rounded-3xl shadow-lg p-6 ring-1 ring-black/5 hover:ring-2 hover:ring-[#0EA5E9]/20 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileTextIcon className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Презентация (PDF)</h3><p className="text-gray-500 text-sm mb-4">Подробное описание маркетинга и возможностей программы.</p><a href="#" className="text-[#0EA5E9] font-medium text-sm flex items-center space-x-1 group-hover:underline"><span>Открыть PDF (RU)</span><ExternalLinkIcon className="w-3 h-3" /></a>
       </div>
       <div className="bg-white rounded-3xl shadow-lg p-6 ring-1 ring-black/5 hover:ring-2 hover:ring-[#0EA5E9]/20 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><YoutubeIcon className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Видео-обзор</h3><p className="text-gray-500 text-sm mb-4">Видеоинструкция по работе с платформой.</p><a href="#" className="text-[#0EA5E9] font-medium text-sm flex items-center space-x-1 group-hover:underline"><span>Смотреть видео (RU)</span><ExternalLinkIcon className="w-3 h-3" /></a>
       </div>
    </div>
  );
};

const MultiStatsTab = () => {
  return (
    <div className="w-full animate-fade-in flex justify-center">
       <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3 max-w-lg">
          <div className="text-yellow-600 mt-1">⚠️</div><div><h4 className="font-bold text-yellow-800">Раздел в разработке</h4><p className="text-sm text-yellow-700 mt-1">Статистика будет доступна в ближайших обновлениях.</p></div>
       </div>
    </div>
  );
};

const MultiPage = () => {
  const [activeMultiTab, setActiveMultiTab] = useState<'inviter' | 'structure' | 'matrixes' | 'marketing' | 'stat'>('inviter');
  const BgPattern = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
       <svg className="absolute -top-24 -left-24 w-[600px] h-[600px] text-gray-200" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" /><path d="M100 0 L100 200 M0 100 L200 100" stroke="currentColor" strokeWidth="0.5" /></svg>
    </div>
  );

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#F8FAFC] flex flex-col items-center pt-8 pb-20">
      <BgPattern />
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left w-full">Мульти</h1>
        <div className="w-full overflow-x-auto mb-8 pb-2"><div className="flex space-x-2 min-w-max p-1 bg-white/50 rounded-xl backdrop-blur-sm border border-gray-200/50">
              <button onClick={() => setActiveMultiTab('inviter')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMultiTab === 'inviter' ? 'bg-white text-[#0EA5E9] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}>Куратор</button>
              <button onClick={() => setActiveMultiTab('structure')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMultiTab === 'structure' ? 'bg-white text-[#0EA5E9] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}>Структура</button>
              <button onClick={() => setActiveMultiTab('matrixes')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMultiTab === 'matrixes' ? 'bg-white text-[#0EA5E9] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}>Матрицы</button>
              <button onClick={() => setActiveMultiTab('marketing')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMultiTab === 'marketing' ? 'bg-white text-[#0EA5E9] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}>Маркетинг</button>
              <button onClick={() => setActiveMultiTab('stat')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMultiTab === 'stat' ? 'bg-white text-[#0EA5E9] shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}>Статистика</button>
        </div></div>
        <div className="w-full">
           {activeMultiTab === 'inviter' && <MultiInviterTab />}
           {activeMultiTab === 'structure' && <MultiStructureTab />}
           {activeMultiTab === 'matrixes' && <MultiMatrixesTab />}
           {activeMultiTab === 'marketing' && <MultiMarketingTab />}
           {activeMultiTab === 'stat' && <MultiStatsTab />}
        </div>
      </div>
    </div>
  );
};

const FinancePage = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const transactions = [
    { id: 1, date: '24.05.2024 10:15:30', profile: 'UserLogin_A', profileId: 'EQAf...1234', address: 'EQAb...xyz1', description: 'Покупка места (buy_place)', amount: 10.00 },
    { id: 2, date: '23.05.2024 18:45:10', profile: '-', profileId: '', address: 'EQCd...efg2', description: 'Бонус (bonus)', amount: 0.50 },
    { id: 3, date: '22.05.2024 12:20:05', profile: 'UserLogin_B', profileId: 'EQGh...ijk3', address: 'EQGh...ijk3', description: 'Изменение NFT (edit_content)', amount: -0.10 },
    { id: 4, date: '22.05.2024 09:30:22', profile: '-', profileId: '', address: 'EQLm...nop4', description: 'Передача NFT (transfer)', amount: -0.05 },
    { id: 5, date: '21.05.2024 16:55:00', profile: 'UserLogin_C', profileId: 'EQQr...stu5', address: 'EQQr...stu5', description: 'Покупка места', amount: 20.00 },
  ];

  const handleCopy = (id: number) => { setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };
  const BgPattern = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
       <svg className="absolute -top-24 -left-24 w-[600px] h-[600px] text-gray-200" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" /><circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" /><circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" /><path d="M100 0 L100 200 M0 100 L200 100" stroke="currentColor" strokeWidth="0.5" /></svg>
       <svg className="absolute top-1/2 right-0 w-[800px] h-[800px] text-gray-100 transform translate-x-1/3 -translate-y-1/2" fill="none" viewBox="0 0 200 200"><rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" /><rect x="70" y="70" width="60" height="60" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" /></svg>
    </div>
  );

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#F8FAFC] flex flex-col items-center pt-10 pb-20">
      <BgPattern />
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 self-start w-full">Финансы <span className="text-gray-400 font-normal">/ Finance</span></h1>
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5 mb-8">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead><tr><th className="py-4 px-6 text-sm font-bold text-gray-900">Дата</th><th className="py-4 px-6 text-sm font-bold text-gray-900">Профиль</th><th className="py-4 px-6 text-sm font-bold text-gray-900">Адрес</th><th className="py-4 px-6 text-sm font-bold text-gray-900">Описание</th><th className="py-4 px-6 text-sm font-bold text-gray-900 text-right">Сумма</th></tr></thead>
               <tbody>{transactions.map((tx) => (<tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"><td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">{tx.date}</td><td className="py-4 px-6 text-sm text-gray-900"><div className="flex items-center space-x-2 group relative"><span>{tx.profile}</span>{tx.profile !== '-' && (<><ChatBubbleIcon className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" /><div className="absolute top-full left-10 mt-1 hidden group-hover:flex bg-gray-900 text-white text-xs rounded px-2 py-1 z-20 whitespace-nowrap items-center shadow-lg"><div className="absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div><span className="relative z-10">{tx.profileId}</span></div></>)}</div></td><td className="py-4 px-6 text-sm text-gray-900 font-mono"><div className="flex items-center space-x-2"><span>{tx.address}</span><button onClick={() => handleCopy(tx.id)} className="text-gray-400 hover:text-[#0EA5E9] transition-colors">{copiedId === tx.id ? (<CheckIcon className="w-4 h-4 text-[#0EA5E9]" />) : (<CopyIcon className="w-4 h-4" />)}</button></div></td><td className="py-4 px-6 text-sm text-gray-900">{tx.description}</td><td className={`py-4 px-6 text-sm font-bold text-right ${tx.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} TON</td></tr>))}</tbody>
             </table>
           </div>
           <div className="p-4 sm:p-6"><button className="w-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-medium rounded-xl py-3 transition-all shadow-sm">Загрузить ещё</button></div>
        </div>
        <div className="w-full border border-gray-200 rounded-3xl p-8 flex justify-center items-center bg-transparent"><p className="text-gray-500 font-medium">Транзакций пока нет.</p></div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'update' | 'add' | 'create'>('update');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => { setIsSaving(true); setTimeout(() => { setIsSaving(false); }, 2000); };
  const BgPattern = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
       <svg className="absolute -top-24 -left-24 w-[600px] h-[600px] text-gray-200" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" /><circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" /><circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" /><path d="M100 0 L100 200 M0 100 L200 100" stroke="currentColor" strokeWidth="0.5" /></svg>
       <svg className="absolute top-1/2 right-0 w-[800px] h-[800px] text-gray-100 transform translate-x-1/3 -translate-y-1/2" fill="none" viewBox="0 0 200 200"><rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" /><rect x="70" y="70" width="60" height="60" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" /></svg>
    </div>
  );

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#F8FAFC] flex flex-col items-center pt-10 pb-20">
      <BgPattern />
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 self-start md:self-auto md:ml-0 md:mr-auto lg:ml-[10%] xl:ml-[15%]">Профиль <span className="text-gray-400 font-normal">/ Profile</span></h1>
        <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-black/5">
           <div className="flex bg-[#0EA5E9] p-1">
              <button onClick={() => setActiveTab('update')} className={`flex-1 py-3 text-sm font-medium rounded-t-lg transition-colors ${activeTab === 'update' ? 'bg-[#0B93D3] text-white shadow-inner' : 'text-blue-100 hover:text-white hover:bg-[#0B93D3]/50'}`}>Обновить</button><div className="w-px bg-blue-400/30 my-2"></div>
              <button onClick={() => setActiveTab('add')} className={`flex-1 py-3 text-sm font-medium rounded-t-lg transition-colors ${activeTab === 'add' ? 'bg-[#0B93D3] text-white shadow-inner' : 'text-blue-100 hover:text-white hover:bg-[#0B93D3]/50'}`}>Добавить</button><div className="w-px bg-blue-400/30 my-2"></div>
              <button onClick={() => setActiveTab('create')} className={`flex-1 py-3 text-sm font-medium rounded-t-lg transition-colors ${activeTab === 'create' ? 'bg-[#0B93D3] text-white shadow-inner' : 'text-blue-100 hover:text-white hover:bg-[#0B93D3]/50'}`}>Создать</button>
           </div>
           <div className="p-6 sm:p-8 space-y-6">
              {activeTab === 'update' && (
                <div className="space-y-5 animate-fade-in"><div><label className="block text-sm font-medium text-gray-500 mb-2">URL аватара</label><input type="text" placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-500 mb-2">Имя</label><input type="text" placeholder="Имя" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div><label className="block text-sm font-medium text-gray-500 mb-2">Фамилия</label><input type="text" placeholder="Фамилия" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div></div><div><label className="block text-sm font-medium text-gray-500 mb-2">Имя пользователя Telegram</label><input type="text" placeholder="@username" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div className="pt-4 space-y-3"><button onClick={handleSave} disabled={isSaving} className={`w-full text-white bg-[#0EA5E9] hover:bg-[#0284c7] focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-lg px-5 py-3 text-center transition-all flex justify-center items-center ${isSaving ? 'cursor-not-allowed opacity-90' : ''}`}>{isSaving ? (<LoadingSpinner className="w-6 h-6 text-white" />) : (<span>Сохранить</span>)}</button><button onClick={() => setShowLogoutModal(true)} className="w-full text-[#DC2626] bg-white border-2 border-[#FECACA] hover:bg-[#FEF2F2] font-medium rounded-xl text-lg px-5 py-3 text-center transition-all">Выйти</button></div></div>
              )}
              {activeTab === 'add' && (<div className="space-y-5 animate-fade-in"><div><label className="block text-sm font-medium text-gray-500 mb-2">Логин</label><input type="text" placeholder="Введите логин" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div className="pt-8 flex space-x-4"><button className="flex-1 text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-xl text-lg px-5 py-3 transition-all">Отмена</button><button className="flex-1 text-white bg-[#0EA5E9] hover:bg-[#0284c7] font-medium rounded-xl text-lg px-5 py-3 transition-all">Добавить</button></div></div>)}
              {activeTab === 'create' && (<div className="space-y-4 animate-fade-in"><div><label className="block text-sm font-medium text-gray-500 mb-1">Логин</label><input type="text" placeholder="Логин" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div><label className="block text-sm font-medium text-gray-500 mb-1">Имя</label><input type="text" placeholder="Имя" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div><label className="block text-sm font-medium text-gray-500 mb-1">Фамилия</label><input type="text" placeholder="Фамилия" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div><label className="block text-sm font-medium text-gray-500 mb-1">URL аватара</label><input type="text" placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div><label className="block text-sm font-medium text-gray-500 mb-1">Telegram username</label><input type="text" placeholder="Telegram username" className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#0EA5E9] focus:border-[#0EA5E9] block p-3 outline-none transition-all" /></div><div className="pt-4 flex space-x-4"><button className="flex-1 text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-xl text-lg px-5 py-3 transition-all">Отмена</button><button className="flex-1 text-white bg-[#0EA5E9] hover:bg-[#0284c7] font-medium rounded-xl text-lg px-5 py-3 transition-all">Создать</button></div></div>)}
           </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setShowLogoutModal(false)}></div>
           <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm transform scale-100 transition-transform"><h3 className="text-xl font-bold text-gray-900 mb-2">Log out</h3><p className="text-gray-500 mb-6">Вы уверены, что хотите выйти?</p><div className="flex space-x-3"><button onClick={() => { console.log('Logged out'); setShowLogoutModal(false); }} className="flex-1 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-medium rounded-xl py-2.5 transition-colors">Выйти</button><button onClick={() => setShowLogoutModal(false)} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-xl py-2.5 transition-colors">Отмена</button></div></div>
        </div>
      )}
    </div>
  );
};


// --- HOME PAGE REWRITTEN ---

const ProfileStatusBlock = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 animate-fade-in max-w-md w-full mx-auto relative overflow-hidden group">
       <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
       <div className="relative z-10">
         <div className="w-32 h-32 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-full flex items-center justify-center text-[#0EA5E9] mb-8 shadow-inner mx-auto transform group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-16 h-16 drop-shadow-sm" />
         </div>
         <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">{title}</h2>
         <p className="text-gray-500 text-lg leading-relaxed max-w-xs mx-auto">
            {subtitle}
         </p>
       </div>
    </div>
  );
};

const WarningBlock = () => {
  return (
     <div className="w-full bg-white/60 backdrop-blur-xl border border-yellow-200/50 rounded-3xl p-6 flex items-start space-x-5 animate-fade-in shadow-lg shadow-yellow-900/5 h-full">
        <div className="flex-shrink-0 mt-1">
           <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shadow-sm">
              <AlertIcon className="w-6 h-6" />
           </div>
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900">Сайт находится в разработке</h3>
           <p className="text-base text-gray-600 mt-2 leading-relaxed">Некоторые функции могут быть временно недоступны или работать нестабильно.</p>
        </div>
     </div>
  );
};

const ProfileCard = ({ profile }: { profile: any }) => {
  const hasAvatar = !!profile.imageUrl;
  
  return (
    <div className="relative group bg-white md:bg-gradient-to-br md:from-white md:to-slate-50 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-center transition-all hover:shadow-2xl hover:shadow-slate-300/50 border border-slate-50 min-h-[220px] md:min-h-[280px]">
       {/* Background Decoration */}
       <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
       <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[10rem] opacity-70 transition-transform group-hover:scale-110 duration-700 pointer-events-none md:hidden"></div>

       <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-8 h-full justify-center w-full">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#0EA5E9] to-purple-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
             <div className="relative p-1.5 bg-white rounded-full ring-1 ring-gray-100 md:ring-4 md:ring-blue-50/50">
               {hasAvatar ? (
                  <img src={profile.imageUrl} alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-sm" />
               ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                     <UserIcon className="w-12 h-12 md:w-16 md:h-16" />
                  </div>
               )}
               {/* Desktop Online Indicator */}
               <div className="hidden md:block absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm" title="Online"></div>
             </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
             <div>
                <div className="text-2xl md:text-4xl font-black text-gray-900 truncate tracking-tight mb-1">
                    {profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}` : 'Без имени'}
                </div>
                <div className="hidden md:block text-gray-400 text-sm font-bold uppercase tracking-wider">
                   Участник
                </div>
             </div>
             
             <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                 <div className="inline-flex items-center justify-center space-x-2 bg-blue-50/80 px-4 py-2 rounded-xl text-[#0EA5E9] transition-colors hover:bg-blue-100/80">
                    <SendIcon className="w-4 h-4" />
                    <span className="font-bold">{profile.tgUsername ? `@${profile.tgUsername}` : 'Нет username'}</span>
                 </div>
                 
                 {/* Desktop ID Badge */}
                 <div className="hidden md:inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl text-gray-500 border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-sm font-semibold">ID: 84920</span>
                 </div>
             </div>
          </div>

          {/* Desktop Arrow/Edit Hint */}
          <div className="hidden md:flex flex-col items-center justify-center pl-4 border-l border-gray-100 h-24 opacity-30 hover:opacity-100 transition-all cursor-pointer">
              <ChevronRightIcon className="w-8 h-8 text-gray-400" />
          </div>
       </div>
    </div>
  );
};

const BalanceCard = ({ status, balance }: { status: 'loading' | 'error' | 'success', balance: number }) => {
   return (
      <div className="relative bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/30 overflow-hidden flex flex-col justify-center text-white group min-h-[220px]">
         <svg className="absolute bottom-0 left-0 right-0 opacity-20 group-hover:scale-105 transition-transform duration-700 pointer-events-none" viewBox="0 0 1440 320" fill="currentColor">
            <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
         
         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
            <div className="flex items-center space-x-3 mb-6 opacity-90">
               <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <WalletIcon className="w-6 h-6 text-white" />
               </div>
               <span className="text-sm font-bold uppercase tracking-widest">Текущий баланс</span>
            </div>

            <div className="flex items-end justify-center">
               {status === 'loading' && (
                  <span className="text-3xl font-bold animate-pulse">Загрузка...</span>
               )}
               
               {status === 'error' && (
                  <div className="flex items-center space-x-3 text-red-100 bg-red-500/20 px-4 py-2 rounded-xl border border-red-200/20 backdrop-blur-sm">
                     <AlertIcon className="w-6 h-6" />
                     <span className="font-bold">Ошибка загрузки</span>
                  </div>
               )}

               {status === 'success' && (
                  <div className="flex flex-col items-center">
                     <span className="text-6xl font-black tracking-tighter drop-shadow-md">{balance.toFixed(2)}</span>
                     <span className="text-2xl font-medium opacity-80 mt-1">TON</span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const HomePage = ({ navigateTo }: { navigateTo: (page: string) => void }) => {
  // --- STATE ---
  const [isWalletConnected, setIsWalletConnected] = useState(true); 
  const [hasProfile, setHasProfile] = useState(true);
  
  // Data State
  const [balanceStatus, setBalanceStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [balance, setBalance] = useState(0);
  const [profileData, setProfileData] = useState({
     imageUrl: '', 
     firstName: 'Alex',
     lastName: 'Smith',
     tgUsername: 'alex_crypto'
  });

  // Simulate loading balance logic for demo
  useEffect(() => {
     if (isWalletConnected && hasProfile) {
        setBalanceStatus('loading');
        const timer = setTimeout(() => {
           setBalance(145.50);
           setBalanceStatus('success');
        }, 1500);
        return () => clearTimeout(timer);
     }
  }, [isWalletConnected, hasProfile]);


  // 1. SCREEN: NO WALLET
  if (!isWalletConnected) {
    return (
       <div className="animate-fade-in-up min-h-[70vh] flex flex-col items-center justify-center p-6 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <ProfileStatusBlock 
             icon={WalletIcon}
             title="Ваш кошелёк не подключен!"
             subtitle="Чтобы использовать сайт, подключите свой кошелёк."
          />
          
          <DebugControls connected={isWalletConnected} setConnected={setIsWalletConnected} hasProfile={hasProfile} setHasProfile={setHasProfile} />
       </div>
    );
  }

  // 2. SCREEN: NO PROFILE
  if (isWalletConnected && !hasProfile) {
     return (
        <div className="animate-fade-in-up min-h-[70vh] flex flex-col items-center justify-center p-6 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

           <ProfileStatusBlock 
              icon={UserXIcon}
              title="Профиль не добавлен."
              subtitle="Чтобы использовать сайт, добавьте профиль."
           />
           
           <DebugControls connected={isWalletConnected} setConnected={setIsWalletConnected} hasProfile={hasProfile} setHasProfile={setHasProfile} />
        </div>
     );
  }

  // 3. SCREEN: DASHBOARD
  return (
    <div className="animate-fade-in-up w-full max-w-6xl mx-auto px-4 py-8 pb-32 flex flex-col gap-8">
        {/* Header Section */}
        <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать, {profileData.firstName}!</h1>
            <p className="text-gray-500">Ваша панель управления</p>
        </div>

        {/* Top Grid: Profile & Balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileCard profile={profileData} />
            <BalanceCard status={balanceStatus} balance={balance} />
        </div>

        {/* Bottom Section: Warning */}
        <div className="w-full">
            <WarningBlock />
        </div>

       <div className="mt-8 flex justify-center opacity-40 hover:opacity-100 transition-opacity">
          <DebugControls connected={isWalletConnected} setConnected={setIsWalletConnected} hasProfile={hasProfile} setHasProfile={setHasProfile} />
       </div>
    </div>
  );
};

// Helper for demo purposes to switch states easily
const DebugControls = ({ connected, setConnected, hasProfile, setHasProfile }: any) => (
  <div className="inline-flex items-center space-x-6 px-6 py-3 bg-white border border-gray-200 shadow-xl rounded-full text-xs text-gray-600 backdrop-blur-md bg-white/80 z-50">
     <span className="font-bold uppercase tracking-widest text-gray-400">Demo</span>
     <div className="h-4 w-px bg-gray-300"></div>
     <label className="flex items-center space-x-2 cursor-pointer hover:text-[#0EA5E9] transition-colors">
        <input type="checkbox" checked={connected} onChange={(e) => setConnected(e.target.checked)} className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]" />
        <span>Wallet</span>
     </label>
     <label className="flex items-center space-x-2 cursor-pointer hover:text-[#0EA5E9] transition-colors">
        <input type="checkbox" checked={hasProfile} onChange={(e) => setHasProfile(e.target.checked)} className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]" />
        <span>Profile</span>
     </label>
  </div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter] pb-24 md:pb-0">
      <Header currentPage={currentPage} navigateTo={setCurrentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage navigateTo={setCurrentPage} />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'finance' && <FinancePage />}
        {currentPage === 'multi' && <MultiPage />}
      </main>
      <Footer />
      <BottomNavigation currentPage={currentPage} navigateTo={setCurrentPage} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
