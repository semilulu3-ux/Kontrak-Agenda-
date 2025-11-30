import React from 'react';
import { 
  Home, 
  BarChart2, 
  Aperture, 
  Wallet, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`flex flex-col w-24 h-screen fixed left-0 top-0 items-center py-10 z-50 border-r border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-white/50 hover:text-white md:hidden"
        >
          <X size={20} />
        </button>

        {/* Brand Logo */}
        <div className="mb-14 relative group cursor-pointer" onClick={() => handleTabClick('dashboard')}>
          <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white shadow-[0_0_25px_rgba(255,255,255,0.1)] overflow-hidden group-hover:scale-105 group-hover:border-yellow-500 transition-all duration-500">
            <img 
              src="https://1000logos.net/wp-content/uploads/2017/01/Colors-Gucci-Logo.jpg" 
              alt="Gucci Logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-8 w-full items-center overflow-y-auto no-scrollbar">
          <SidebarIcon 
            icon={Home} 
            active={activeTab === 'dashboard'} 
            onClick={() => handleTabClick('dashboard')} 
          />
          <SidebarIcon 
            icon={BarChart2} 
            active={activeTab === 'statistics'} 
            onClick={() => handleTabClick('statistics')} 
          />
          <SidebarIcon 
            icon={Aperture} 
            active={activeTab === 'regulations'} 
            onClick={() => handleTabClick('regulations')}
          />
          <SidebarIcon icon={Wallet} />
          <SidebarIcon icon={User} />
          <SidebarIcon icon={Settings} />
        </nav>

        {/* Bottom Items */}
        <div className="mt-auto flex flex-col gap-6 w-full items-center pb-4 pt-4">
          <SidebarIcon icon={HelpCircle} />
          <SidebarIcon icon={LogOut} />
        </div>
      </aside>
    </>
  );
};

interface SidebarIconProps {
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon: Icon, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all duration-300 group relative ${
        active 
          ? 'text-yellow-400' 
          : 'text-white/50 hover:text-white'
      }`}
    >
      <Icon size={22} strokeWidth={active ? 2 : 1.5} className="drop-shadow-sm" />
      {active && (
        <>
           <span className="absolute inset-0 bg-yellow-400/10 rounded-2xl blur-sm"></span>
           <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-1 h-6 bg-yellow-400 rounded-l-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
        </>
      )}
    </button>
  );
};
