import React from 'react';
import { 
  Home, 
  BarChart2, 
  Aperture, 
  Wallet, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-24 h-screen fixed left-0 top-0 items-center py-10 z-50 border-r border-white/10 bg-black/20 backdrop-blur-xl">
      {/* Brand Logo - Updated to use provided Image */}
      <div className="mb-14 relative group cursor-pointer">
        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white shadow-[0_0_25px_rgba(255,255,255,0.1)] overflow-hidden group-hover:scale-105 group-hover:border-yellow-500 transition-all duration-500">
          <img 
            src="https://1000logos.net/wp-content/uploads/2017/01/Colors-Gucci-Logo.jpg" 
            alt="Gucci Logo" 
            className="w-full h-full object-contain p-1"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-8 w-full items-center">
        <SidebarIcon icon={Home} active />
        <SidebarIcon icon={BarChart2} />
        <SidebarIcon icon={Aperture} />
        <SidebarIcon icon={Wallet} />
        <SidebarIcon icon={User} />
        <SidebarIcon icon={Settings} />
      </nav>

      {/* Bottom Items */}
      <div className="mt-auto flex flex-col gap-6 w-full items-center pb-4">
        <SidebarIcon icon={HelpCircle} />
        <SidebarIcon icon={LogOut} />
      </div>
    </aside>
  );
};

interface SidebarIconProps {
  icon: React.ElementType;
  active?: boolean;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon: Icon, active }) => {
  return (
    <button 
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