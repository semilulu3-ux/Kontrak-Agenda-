import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { 
  AccountCard, 
  RulesCard, 
  ContractStatusCard, 
  AttentionCard,
  StatisticsCard // Import komponen baru
} from './components/DashboardCards';
import { UserAccount, ContractStep } from './types';
import { Search, User as UserIcon, Menu, Bell, ChevronDown, Lock, Phone, User, ArrowRight, FileText, Banknote, Percent, X } from 'lucide-react';

// --- Login Screen Component ---
interface LoginProps {
  onLogin: () => void;
  data: { name: string; phone: string; password: string };
  setData: React.Dispatch<React.SetStateAction<{ name: string; phone: string; password: string }>>;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin, data, setData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.password && data.phone) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-50 px-4 py-10 w-full animate-in fade-in duration-700">
      <div className="max-w-md w-full bg-black/60 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_0_20px_rgba(250,204,21,0.5)]"></div>

        {/* Logo Section */}
        <div className="flex justify-center mb-8 relative">
           <div className="w-28 h-28 rounded-full bg-white p-1 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center border-4 border-white/10">
              <img 
                src="https://1000logos.net/wp-content/uploads/2017/01/Colors-Gucci-Logo.jpg" 
                className="w-full h-full object-contain rounded-full" 
                alt="Gucci Logo"
              />
           </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-white font-bold mb-2 tracking-wide drop-shadow-lg">Selamat Datang</h2>
          <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium">Kontrak Sistem</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           <div className="space-y-1">
              <label className="text-xs font-bold text-yellow-500/90 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-yellow-400 transition-colors" />
                <input 
                  type="text" 
                  required
                  value={data.name}
                  onChange={e => setData({...data, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 focus:bg-black/60 transition-all font-medium"
                  placeholder="Masukan nama anda"
                />
              </div>
           </div>

           <div className="space-y-1">
              <label className="text-xs font-bold text-yellow-500/90 uppercase tracking-widest ml-1">Nomor Hp</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-yellow-400 transition-colors" />
                <input 
                  type="tel" 
                  required
                  value={data.phone}
                  onChange={e => setData({...data, phone: e.target.value})}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 focus:bg-black/60 transition-all font-medium"
                  placeholder="08xx-xxxx-xxxx"
                />
              </div>
           </div>

           <div className="space-y-1">
              <label className="text-xs font-bold text-yellow-500/90 uppercase tracking-widest ml-1">Kata Sandi</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-yellow-400 transition-colors" />
                <input 
                  type="password" 
                  required
                  value={data.password}
                  onChange={e => setData({...data, password: e.target.value})}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 focus:bg-black/60 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
           </div>

           <button 
             type="submit" 
             className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] text-black font-extrabold py-4 rounded-xl mt-6 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2 group"
           >
              Masuk Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-widest">Protected by Gucci Security System</p>
        </div>
      </div>
    </div>
  );
};


// --- Contract Form Modal ---
interface ContractFormProps {
  onSubmit: (data: { agenda: string; price: string; benefit: string }) => void;
  onClose: () => void;
}

const ContractFormModal: React.FC<ContractFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ agenda: '', price: '', benefit: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agenda && formData.price && formData.benefit) {
      onSubmit(formData);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters
    const rawValue = e.target.value.replace(/\D/g, '');
    
    if (!rawValue) {
      setFormData(prev => ({ ...prev, price: '' }));
      return;
    }

    // Format with dots (Indonesian locale)
    const formattedValue = new Intl.NumberFormat('id-ID').format(Number(rawValue));
    
    // Set state with Rp prefix
    setFormData(prev => ({ ...prev, price: `Rp ${formattedValue}` }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-[#111] p-8 rounded-3xl border border-yellow-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative overflow-hidden animate-in zoom-in-95 duration-300">
         
         <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <X size={24} />
         </button>

         {/* Decorative Elements */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

         <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-white font-bold mb-2 tracking-wide text-yellow-500">Formulir Agenda</h2>
            <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium">Input Data Kontrak</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-5">
            {/* Agenda Ke */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-yellow-500/90 uppercase tracking-widest ml-1">Agenda Ke</label>
               <div className="relative group">
                 <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-yellow-400 transition-colors" />
                 <input 
                   type="text" 
                   required
                   autoFocus
                   value={formData.agenda}
                   onChange={e => setFormData({...formData, agenda: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition-all font-medium"
                   placeholder="Contoh: 2"
                 />
               </div>
            </div>

            {/* Nominal Paket */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-yellow-500/90 uppercase tracking-widest ml-1">Nominal Paket</label>
               <div className="relative group">
                 <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-yellow-400 transition-colors" />
                 <input 
                   type="text" 
                   required
                   value={formData.price}
                   onChange={handlePriceChange}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition-all font-medium"
                   placeholder="Contoh: 100.000"
                 />
               </div>
            </div>

            {/* Keuntungan */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-yellow-500/90 uppercase tracking-widest ml-1">Keuntungan (%)</label>
               <div className="relative group">
                 <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 group-focus-within:text-yellow-400 transition-colors" />
                 <input 
                   type="text" 
                   required
                   value={formData.benefit}
                   onChange={e => setFormData({...formData, benefit: e.target.value})}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/30 focus:outline-none focus:border-yellow-500 focus:bg-white/10 transition-all font-medium"
                   placeholder="Contoh: 20%"
                 />
               </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] text-black font-extrabold py-4 rounded-xl mt-6 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2 group"
            >
               Simpan Kontrak
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
         </form>
      </div>
    </div>
  );
};


// --- Main App Component ---
const App: React.FC = () => {
  // --- Auth State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // New State for Sidebar Tabs
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  
  // Controls if the modal form should be visible
  const [showContractModal, setShowContractModal] = useState(false);
  
  const [loginForm, setLoginForm] = useState({ name: '', phone: '', password: '' });

  // --- Data State ---
  const [userAccount, setUserAccount] = useState<UserAccount>({
    name: "",
    price: "-", // Default value before contract creation
    benefit: "-", // Default value
    expiryMinutes: 60,
    phoneNumber: "",
    agendaNumber: "-" // Default value
  });

  const [contractSteps, setContractSteps] = useState<ContractStep[]>([
    {
      key: '1',
      label: 'Ketentuan',
      description: 'Pesanan di terbitkan oleh sistem',
      status: 'Done'
    },
    {
      key: '2',
      label: 'Proses',
      description: 'Sistem akan memproses tugas secara otomatis',
      status: 'Done'
    },
    {
      key: '3',
      label: 'Agenda',
      description: 'Satu paket satu penarikan',
      status: 'Done'
    },
    {
      key: '4',
      label: 'Penyelesaian',
      description: 'Jika agenda belum selesai, sistem tidak akan mengizinkan penarikan.',
      status: 'Done'
    },
    {
      key: '5',
      label: 'Konfirmasi',
      description: 'Kepada kordinator jika terdapat kendala dalam penyelesaian agenda.',
      status: 'Done'
    }
  ]);

  const handleLogin = () => {
    // Update user account with logged in name and phone
    setUserAccount(prev => ({
      ...prev,
      name: loginForm.name,
      phoneNumber: loginForm.phone
    }));
    setIsLoggedIn(true);
  };

  const handleCreateContract = (data: { agenda: string; price: string; benefit: string }) => {
    // 1. Parse the numeric value from the price string (remove non-digits)
    const numericPrice = parseInt(data.price.replace(/\D/g, ''), 10) || 0;

    // 2. Logic: If price >= 2.560.000, change Agenda description
    const agendaDescription = numericPrice >= 2560000 
      ? 'Tiga paket Tiga pekerjaan' // REVISED: Updated text
      : 'Satu paket satu penarikan';

    // 3. Update User Account Data
    setUserAccount(prev => ({
      ...prev,
      agendaNumber: data.agenda,
      price: data.price.startsWith('Rp') ? data.price : `Rp ${data.price}`,
      // Auto append % if missing
      benefit: data.benefit.includes('%') ? data.benefit : `${data.benefit}%`
    }));

    // 4. Update Contract Steps dynamically based on price
    setContractSteps(prevSteps => prevSteps.map(step => {
      if (step.key === '3') { // Target the 'Agenda' step
        return { ...step, description: agendaDescription };
      }
      return step;
    }));

    setShowContractModal(false);
  };

  return (
    <div className="flex min-h-screen font-sans overflow-x-hidden relative selection:bg-yellow-500/30 selection:text-yellow-100">
      
      {/* --- Background Layer (Always Visible) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* High-quality sunset/nature background */}
        <img 
           src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop"
           className="w-full h-full object-cover"
           alt="Gucci Background"
        />
        {/* Overlay Gradients for Depth & Readability */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"></div>
      </div>

      {/* --- Content Logic --- */}
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} data={loginForm} setData={setLoginForm} />
      ) : (
        <>
          {/* Popup Modal for Contract (Triggers manually via Account Card) */}
          {showContractModal && (
            <ContractFormModal 
              onSubmit={handleCreateContract} 
              onClose={() => setShowContractModal(false)}
            />
          )}

          <Sidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col w-full relative z-10 md:pl-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
             
             {/* Top Header */}
            <header className="px-8 py-10 md:px-12 flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-white/10 bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                   <Menu />
                </button>
                
                {/* Logo Badge in Header */}
                <div className="hidden md:flex w-20 h-20 bg-white rounded-2xl border-2 border-white/20 items-center justify-center overflow-hidden shadow-2xl shrink-0 group">
                   <img 
                     src="https://1000logos.net/wp-content/uploads/2017/01/Colors-Gucci-Logo.jpg" 
                     className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                     alt="Gucci Logo" 
                   />
                </div>

                {/* Logo Text Block */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-none mb-2 drop-shadow-xl text-shadow-lg">
                    {activeTab === 'dashboard' ? 'KONTRAK AGENDA' : 'STATISTIK PERFORMA'}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="h-[3px] w-12 bg-[#8B0000] shadow-[0_0_8px_#8B0000]"></span>
                    <p className="text-xs font-black text-white uppercase tracking-[0.3em] drop-shadow-md">
                      GUCCI INDONESIA
                    </p>
                    <span className="h-[3px] w-12 bg-[#10B981] shadow-[0_0_8px_#10B981]"></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-8 mt-4 md:mt-0">
                {/* Search Bar */}
                <div className="relative group w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-black/40 border border-white/20 rounded-full px-5 py-3 pl-11 text-sm text-white placeholder-white/70 w-full md:w-64 focus:outline-none focus:border-white/50 focus:bg-black/60 transition-all shadow-lg backdrop-blur-md font-medium"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 group-focus-within:text-white transition-colors" />
                </div>

                {/* Profile Actions */}
                <div className="flex items-center gap-6">
                   <button className="relative group p-2 hover:bg-white/10 rounded-full transition-colors">
                     <Bell size={20} className="text-white/90 group-hover:text-white transition-colors drop-shadow-md" />
                     <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-black shadow-[0_0_8px_red]"></span>
                   </button>
                   
                   <div className="h-8 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>

                   <div className="flex items-center gap-4 pl-1 cursor-pointer group">
                     <div className="text-right hidden sm:block">
                       <p className="text-xs font-bold text-white uppercase tracking-widest group-hover:text-yellow-400 transition-colors shadow-black drop-shadow-md">
                           {userAccount.name}
                       </p>
                       <p className="text-[10px] text-white/80 font-medium">System Coordinator</p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-lg backdrop-blur-md group-hover:border-yellow-400/50 transition-colors">
                       <UserIcon size={18} className="text-white" />
                     </div>
                     <ChevronDown size={14} className="text-white/60 group-hover:text-white transition-colors" />
                   </div>
                </div>
              </div>
            </header>

            {/* Content Area Switches based on Active Tab */}
            <div className="p-6 md:p-12 flex-1 relative z-10 max-w-[1920px] mx-auto w-full">
              
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full animate-in fade-in zoom-in-95 duration-500">
                  {/* Row 1: Account & Rules */}
                  <div className="h-full min-h-[300px]">
                     <AccountCard 
                       data={userAccount} 
                       onOpenForm={() => setShowContractModal(true)} 
                     />
                  </div>
                  <div className="h-full min-h-[300px]">
                     <RulesCard />
                  </div>

                  {/* Row 2: Contract Status & Attention */}
                  <div className="h-full min-h-[300px]">
                    <ContractStatusCard steps={contractSteps} />
                  </div>
                  <div className="h-full min-h-[300px]">
                    <AttentionCard />
                  </div>
                </div>
              )}

              {activeTab === 'statistics' && (
                 <div className="h-full w-full animate-in fade-in slide-in-from-right-8 duration-500">
                    <StatisticsCard />
                 </div>
              )}

            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;