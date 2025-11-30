
import React, { useState } from 'react';
import { MoreHorizontal, CheckCircle, Edit, Plus, FileText, X, TrendingUp, Users, Wallet, ArrowUpRight, Globe, Activity, ShieldCheck } from 'lucide-react';
import { UserAccount, ContractStep } from '../types';

// --- Reusable Glass Card Container ---
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:bg-black/70 transition-all duration-500 ${className}`}>
    {children}
  </div>
);

// --- Detail Modal Component (Popup untuk membaca isi penuh) ---
const DetailModal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#1a1a1a] w-full max-w-2xl max-h-[80vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/40">
           <h3 className="text-2xl font-serif font-bold text-white tracking-wide">{title}</h3>
           <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
             <X size={24} />
           </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
           {children}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 text-center">
           <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold uppercase tracking-widest transition-colors">
             Tutup
           </button>
        </div>
      </div>
    </div>
  );
};


interface CardHeaderProps { 
  title: string; 
  className?: string;
  onViewDetail?: () => void; // Prop baru untuk handle klik menu
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, className = '', onViewDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center mb-6 relative z-20">
      {/* Title */}
      <h3 className={`text-2xl font-serif font-bold tracking-wide text-white drop-shadow-lg ${className}`}>{title}</h3>
      
      {/* Menu Action */}
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white/70 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 relative z-50 ${isOpen ? 'bg-white/10 text-white' : ''}`}
        >
          {isOpen ? <X size={20} /> : <MoreHorizontal size={20} />}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Invisible Backdrop to close menu when clicking outside */}
            <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsOpen(false)}></div>
            
            {/* Menu Container */}
            <div className="absolute right-0 top-10 w-64 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
               <div className="p-2 space-y-1">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                     <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Opsi Tampilan</p>
                  </div>
                  
                  <button 
                    onClick={() => onViewDetail && handleOptionClick(onViewDetail)}
                    className="w-full text-left px-3 py-3 text-sm text-gray-200 hover:bg-white/10 hover:text-white rounded-lg transition-colors flex items-center gap-3 group"
                  >
                     <FileText size={16} className="text-yellow-500/70 group-hover:text-yellow-400" />
                     <span className="font-medium">Baca Isi Penuh</span>
                  </button>
                  
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- 1. Account Card ---
interface AccountCardProps {
  data: UserAccount;
  onOpenForm: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ data, onOpenForm }) => {
  const [showDetail, setShowDetail] = useState(false);
  const isFormEmpty = data.agendaNumber === '-';

  return (
    <Card className="flex flex-col h-full">
      <CardHeader 
        title="Account" 
        onViewDetail={() => setShowDetail(true)}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 relative z-10 flex-1">
        {/* Info Box */}
        <div className="flex-1 bg-white/10 rounded-xl p-5 border border-white/20 relative overflow-hidden flex flex-col justify-center group-hover:bg-white/15 transition-colors duration-500">
           
          <div className="grid grid-cols-[80px_auto] gap-y-4 text-sm relative z-10">
            <span className="font-bold text-white/80 uppercase text-[11px] tracking-widest self-center shadow-black drop-shadow-sm">NAME</span>
            <div className="flex items-center">
              <span className="text-white font-bold text-lg tracking-wide drop-shadow-md">: {data.name}</span>
            </div>

            <span className="font-bold text-white/80 uppercase text-[11px] tracking-widest self-center shadow-black drop-shadow-sm">AGENDA</span>
            <div className="flex items-center">
              <span className="text-white font-bold text-lg tracking-wide drop-shadow-md">: {data.agendaNumber || '-'}</span>
            </div>
            
            <span className="font-bold text-white/80 uppercase text-[11px] tracking-widest self-center shadow-black drop-shadow-sm">Harga</span>
            <div className="flex items-center">
              <span className="text-yellow-200 font-mono text-lg tracking-tight font-bold drop-shadow-md">: {data.price}</span>
            </div>
            
            <span className="font-bold text-white/80 uppercase text-[11px] tracking-widest self-center shadow-black drop-shadow-sm">BENEFIT</span>
            <div className="flex items-center">
               <span className="text-emerald-300 font-bold text-lg drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">: {data.benefit}</span>
            </div>
          </div>
          
          {isFormEmpty && (
             <button 
               onClick={onOpenForm}
               className="mt-6 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] text-black font-extrabold py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-xs flex items-center justify-center gap-2"
             >
               <Plus size={16} strokeWidth={3} />
               Isi Formulir Agenda
             </button>
          )}

        </div>

        {/* Timer Box */}
        <div className="bg-gradient-to-br from-yellow-900/60 via-black/90 to-black rounded-xl p-4 w-full sm:w-40 border border-yellow-500/40 flex flex-col items-center justify-center relative overflow-hidden shrink-0 shadow-xl">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-500/20 to-transparent"></div>
             
             <div className="text-[10px] text-yellow-400 font-extrabold uppercase mb-2 text-center tracking-[0.15em] leading-relaxed z-10 drop-shadow-md">
               MASA BERLAKU<br/>AGENDA BERAKHIR
             </div>
             <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-3"></div>
             <div className="text-5xl font-serif font-bold text-white relative z-10 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {data.expiryMinutes}
             </div>
             <div className="text-[10px] text-yellow-400 font-bold uppercase mt-1 tracking-[0.2em] z-10 shadow-black">MENIT</div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20 text-center relative">
        <p className="text-emerald-300 text-sm font-medium tracking-widest uppercase inline-flex items-center gap-2 drop-shadow-md">
           <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981] animate-pulse"></span>
           Pastikan sudah di baca sebelum kontrak di setujui
        </p>
      </div>

      {/* Modal Detail Account */}
      {showDetail && (
        <DetailModal title="Detail Informasi Akun" onClose={() => setShowDetail(false)}>
           <div className="grid gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                 <h4 className="text-white/50 text-xs uppercase tracking-widest mb-1">Nama Lengkap</h4>
                 <p className="text-xl text-white font-bold">{data.name}</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                 <h4 className="text-white/50 text-xs uppercase tracking-widest mb-1">Nomor Agenda</h4>
                 <p className="text-xl text-white font-bold">{data.agendaNumber || '-'}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                 <h4 className="text-white/50 text-xs uppercase tracking-widest mb-1">Nominal Paket</h4>
                 <p className="text-xl text-yellow-400 font-mono font-bold">{data.price}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                 <h4 className="text-white/50 text-xs uppercase tracking-widest mb-1">Keuntungan (Benefit)</h4>
                 <p className="text-xl text-emerald-400 font-bold">{data.benefit}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                 <h4 className="text-white/50 text-xs uppercase tracking-widest mb-1">Masa Berlaku</h4>
                 <p className="text-xl text-white font-bold">{data.expiryMinutes} Menit</p>
              </div>
           </div>
        </DetailModal>
      )}
    </Card>
  );
};

// --- 2. Rules Card ("Tolong Di Baca") ---
export const RulesCard: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);

  const rules = [
    "Kontrak agenda ini merupakan bagian yang tidak terpisahkan dari perjanjian antara Pengguna dan Pihak Gucci Sistem.",
    "Setiap dana yang dikirim oleh peserta akan secara otomatis dikonversi menjadi Saldo Akun bussiness milik peserta.",
    "Seluruh proses pelaksanaan agenda dilaksanakan sesuai dengan prosedur dan ketentuan yang berlaku pada Sistem Gucci.",
    "Dengan melakukan aktivasi agenda, Pengguna menyatakan telah membaca, memahami, dan menyetujui seluruh isi perjanjian.",
    "Dokumen ini berlaku sebagai bukti sah persetujuan antara peserta dan Pihak Gucci tanpa memerlukan tanda tangan tertulis."
  ];

  return (
    <>
      <Card className="h-full">
        <CardHeader 
          title="Tolong Di Baca" 
          className="text-red-400" 
          onViewDetail={() => setShowDetail(true)}
        />
        <ul className="space-y-4 pr-2">
          {rules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-3 text-white text-[15px] leading-relaxed group/item">
              <span className="mt-2 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#EF4444] group-hover/item:bg-red-400 transition-all duration-300"></span>
              <span className="font-medium tracking-wide text-gray-100 group-hover/item:text-white transition-colors duration-300 drop-shadow-sm line-clamp-3">
                {rule}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Modal View for Rules */}
      {showDetail && (
        <DetailModal title="Ketentuan & Aturan" onClose={() => setShowDetail(false)}>
           <div className="space-y-6">
              <p className="text-white/60 uppercase tracking-widest text-xs border-b border-white/10 pb-2">Detail Lengkap</p>
              <ul className="space-y-6">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-white text-lg leading-relaxed">
                    <span className="mt-2.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#EF4444]"></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mt-4">
                 <p className="text-red-200 text-sm font-medium text-center">
                    Harap pahami setiap poin sebelum melanjutkan ke tahap berikutnya.
                 </p>
              </div>
           </div>
        </DetailModal>
      )}
    </>
  );
};

// --- 3. Contract Status Card ---
export const ContractStatusCard: React.FC<{ steps: ContractStep[] }> = ({ steps }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleAgree = () => {
    const phoneNumber = "6281385616098";
    const message = "Hallo Advisor , saya telah menyetujui kontrak dan mengikuti semua ketentuan yang telah di tetapkan .";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader 
          title="Kontrak" 
          onViewDetail={() => setShowDetail(true)}
        />
        
        <div className="flex-1 flex flex-col justify-center gap-2 mb-4">
          {steps.map((step) => (
            <div key={step.key} className="grid grid-cols-[100px_1fr_60px] items-center py-4 border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors rounded px-3 group/row">
              <div className="font-bold text-red-300 text-[13px] uppercase tracking-wider group-hover/row:text-red-200 transition-colors drop-shadow-sm">
                 {step.label}
              </div>
              
              {/* Truncated view in Card */}
              <div className="px-4 text-gray-100 text-sm font-medium leading-snug truncate group-hover/row:text-white transition-colors drop-shadow-sm">
                {step.description}
              </div>
              
              <div className="text-right">
                <span className="text-emerald-300 text-[11px] font-bold tracking-wider uppercase bg-emerald-900/60 border border-emerald-500/40 px-2.5 py-1.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  {step.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <button
            onClick={handleAgree}
            className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] text-black font-extrabold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2 group shadow-lg"
          >
            <CheckCircle size={20} className="text-black group-hover:scale-110 transition-transform" />
            Setujui & Konfirmasi
          </button>
          <p className="text-center text-[10px] text-white/40 mt-2 uppercase tracking-widest">
             Klik untuk mengirim konfirmasi ke Advisor
          </p>
        </div>
      </Card>

      {/* Modal View for Contract Details */}
      {showDetail && (
        <DetailModal title="Detail Status Kontrak" onClose={() => setShowDetail(false)}>
           <div className="space-y-2">
              <p className="text-white/60 uppercase tracking-widest text-xs border-b border-white/10 pb-4 mb-4">
                Rincian Tahapan & Deskripsi
              </p>
              {steps.map((step) => (
                <div key={step.key} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-yellow-500/30 transition-colors">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-red-300 font-bold uppercase tracking-wider text-sm">{step.label}</h4>
                      <span className="text-emerald-300 text-xs font-bold bg-emerald-900/40 px-2 py-1 rounded border border-emerald-500/20">
                        {step.status}
                      </span>
                   </div>
                   {/* Full text displayed here */}
                   <p className="text-white text-base leading-relaxed font-medium">
                     {step.description}
                   </p>
                </div>
              ))}
           </div>
        </DetailModal>
      )}
    </>
  );
};

// --- 4. Attention Card ---
export const AttentionCard: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-br from-[#2a1515] to-[#111111] backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden h-full flex flex-col group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>

          {/* Replaced manual header with CardHeader to use the same Dropdown Logic */}
          <CardHeader 
            title="Attention" 
            className="text-3xl italic" 
            onViewDetail={() => setShowDetail(true)}
          />

          <div className="relative z-10 flex-1 flex flex-col justify-center">
              <p className="text-gray-100 text-[15px] leading-8 font-normal tracking-wide drop-shadow-md">
                  <span className="text-white font-bold block mb-4 text-xl border-l-4 border-yellow-500 pl-4 bg-gradient-to-r from-yellow-500/10 to-transparent py-2 rounded-r-lg">
                    Lakukan pengisian saldo akun bussiness
                  </span> 
                  sesuai dengan harga paket yang telah dipilih, harap konfirmasi dengan kordinator apabila terdapat kendala pada saat proses pengisian saldo Gucci.
              </p>
          </div>
          
          <div className="mt-8 flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white"></div>
              <div className="w-2 h-2 bg-white rounded-full aspect-square shadow-[0_0_8px_white]"></div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white"></div>
          </div>
      </div>

      {/* Modal View for Attention */}
      {showDetail && (
        <DetailModal title="Detail Peringatan" onClose={() => setShowDetail(false)}>
            <div className="p-6 bg-gradient-to-br from-red-950/30 to-black rounded-2xl border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                     <span className="text-red-400 font-bold text-xl">!</span>
                  </div>
                  <h4 className="text-white font-bold text-xl tracking-wide uppercase">Instruksi Penting</h4>
               </div>
               
               <p className="text-white text-lg leading-loose font-light">
                   <span className="text-yellow-400 font-bold">Lakukan pengisian saldo akun bussiness</span> sesuai dengan harga paket yang telah dipilih.
                   <br/><br/>
                   Harap konfirmasi dengan kordinator apabila terdapat kendala pada saat proses pengisian saldo Gucci. 
                   Kegagalan dalam konfirmasi dapat menghambat proses verifikasi saldo Anda.
               </p>

               <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Gucci Security System</p>
               </div>
            </div>
        </DetailModal>
      )}
    </>
  );
};

// --- 5. Statistics Card ---
export const StatisticsCard: React.FC = () => {
   const [showDetail, setShowDetail] = useState(false);
   const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily');

   // Data Configuration based on period
   // Data Updated to be random and distinct for each period as requested
   const dataConfig = {
     daily: {
       labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
       values: [35, 50, 45, 85, 60, 90, 75], // Random looking variation for week
       income: {
          total: 'Rp 45.500.000',
          growth: '+5.2%',
          trend: 'Stabil',
          desc: 'Pendapatan Member Harian'
       },
       followers: {
          total: '850.5k', // Hundreds of thousands
          new: '+2.5k',
          trend: 'Harian'
       },
       accumulation: {
          value: '850,520', // Hundreds of thousands (Ratusan Ribu)
          growth: '+1.4%'
       }
     },
     monthly: {
       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
       values: [40, 35, 55, 70, 60, 80, 75, 90, 85, 65, 95, 100], // Random variation for year
       income: {
          total: 'Rp 850.500.000', // Hundreds of Millions
          growth: '+24.5%',
          trend: 'Meningkat',
          desc: 'Pendapatan Member Bulanan'
       },
       followers: {
          total: '250.5M', // Hundreds of millions
          new: '+12.5M',
          trend: 'Bulanan'
       },
       accumulation: {
          value: '250,500,100', // Hundreds of millions (Ratusan Juta)
          growth: '+45.2%'
       }
     },
     yearly: {
       labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
       values: [25, 40, 55, 70, 85, 100], // Upward trend for years
       income: {
          total: 'Rp 12.500.000.000', // Billions in full format
          growth: '+142%',
          trend: 'Melonjak',
          desc: 'Pendapatan Member Tahunan'
       },
       followers: {
          total: '1.5B', // Billions to scale up
          new: '+250M',
          trend: 'Tahunan'
       },
       accumulation: {
          value: '1,500,100,200', // Billions
          growth: '+145.2%'
       }
     }
   };

   const currentData = dataConfig[period];

   return (
     <>
      <Card className="h-full flex flex-col min-h-[600px]">
         <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <CardHeader title="Statistik Ekosistem Global" onViewDetail={() => setShowDetail(true)} className="mb-0" />
            
            {/* Period Selector */}
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 self-start md:self-auto relative z-30">
              {(['daily', 'monthly', 'yearly'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                    period === p 
                    ? 'bg-yellow-500 text-black shadow-lg' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p === 'daily' ? 'Harian' : p === 'monthly' ? 'Bulanan' : 'Tahunan'}
                </button>
              ))}
            </div>
         </div>
         
         {/* Row 1: Big Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Income - BIG & GLOBAL */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-black p-5 rounded-2xl border border-yellow-500/30 flex flex-col gap-3 relative overflow-hidden group/stat">
               <div className="absolute top-0 right-0 p-3 opacity-20 group-hover/stat:opacity-40 transition-opacity">
                 <Wallet size={40} className="text-yellow-500" />
               </div>
               <span className="text-yellow-500/80 text-xs uppercase tracking-widest font-bold">Total Pendapatan Member</span>
               <div className="flex flex-col">
                  <h4 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight drop-shadow-lg break-words">
                    {currentData.income.total}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                       <TrendingUp size={10} />
                       {currentData.income.trend}
                    </span>
                    <span className="text-white/40 text-xs truncate">{currentData.income.growth} dari periode lalu</span>
                  </div>
               </div>
            </div>

            {/* Followers - MANY */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-3 hover:bg-white/10 transition-colors group/stat">
               <span className="text-blue-400/80 text-xs uppercase tracking-widest font-bold">Total Partisipan Global</span>
               <div className="flex flex-col">
                  <h4 className="text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">{currentData.followers.total}</h4>
                  <span className="text-blue-400 text-xs font-bold mt-1 flex items-center gap-1">
                     <Users size={12} />
                     {currentData.followers.new} Member Baru
                  </span>
               </div>
            </div>

            {/* Profit Rate (Static for now, or can be dynamic too) */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-3 hover:bg-white/10 transition-colors group/stat">
               <span className="text-emerald-400/80 text-xs uppercase tracking-widest font-bold">Rata-rata Profit Member</span>
               <div className="flex flex-col">
                  <h4 className="text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">35.2%</h4>
                  <span className="text-emerald-400 text-xs font-bold mt-1 flex items-center gap-1">
                     <ArrowUpRight size={12} />
                     Sangat Tinggi
                  </span>
               </div>
            </div>
         </div>

         {/* Row 2: Charts Area (Split) */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
            
            {/* Chart 1: Income Bar Chart */}
            <div className="flex flex-col bg-black/40 rounded-xl p-6 border border-white/5 relative min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent rounded-xl pointer-events-none"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <h5 className="text-white/80 text-sm font-bold uppercase tracking-wide">Grafik {currentData.income.desc}</h5>
                  <div className="flex gap-4 text-[10px] uppercase font-bold text-white/40">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Member Income</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white/20"></div>Global Target</span>
                  </div>
                </div>

                <div className="flex-1 flex items-end gap-2 md:gap-4 h-full">
                    {currentData.values.map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-3 group/bar h-full justify-end">
                          <div className="w-full relative h-full flex items-end">
                            {/* Background Track */}
                            <div className="absolute bottom-0 left-0 w-full h-full bg-white/5 rounded-t-sm"></div>
                            
                            {/* Fill Bar */}
                            <div 
                              className="w-full bg-gradient-to-t from-yellow-600 via-yellow-400 to-yellow-200 rounded-t-sm relative transition-all duration-700 ease-out group-hover/bar:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                              style={{ height: `${val}%` }}
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl pointer-events-none">
                                  {val}%
                                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                                </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-white/30 uppercase font-bold text-center w-full truncate">{currentData.labels[idx]}</span>
                      </div>
                    ))}
                </div>
            </div>

            {/* Chart 2: Global Follower Accumulation (Cool Diagram) */}
            <div className="flex flex-col bg-black/40 rounded-xl p-0 border border-white/5 relative overflow-hidden min-h-[300px]">
               {/* Header Area */}
               <div className="p-6 pb-2 relative z-10">
                  <div className="flex justify-between items-start">
                     <div>
                        <h5 className="text-white/90 text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                           <Globe size={16} className="text-blue-400" />
                           Akumulasi Global
                        </h5>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Realtime Audience Growth ({currentData.followers.trend})</p>
                     </div>
                     <div className="bg-blue-500/20 border border-blue-500/30 px-2 py-1 rounded text-[10px] text-blue-300 font-bold uppercase animate-pulse">
                        Live Data
                     </div>
                  </div>
                  
                  <div className="mt-6 flex items-baseline gap-2">
                     <h2 className="text-3xl md:text-5xl font-serif text-white font-bold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] truncate">
                        {currentData.accumulation.value}
                     </h2>
                     <span className="text-emerald-400 text-sm font-bold flex items-center gap-1 shrink-0">
                        <TrendingUp size={14} /> {currentData.accumulation.growth}
                     </span>
                  </div>
               </div>

               {/* Cool Area Chart Visualization */}
               <div className="relative flex-1 w-full mt-4">
                  {/* SVG Chart */}
                  <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 50">
                     <defs>
                        <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                           <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                           <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradientLine" x1="0" x2="1" y1="0" y2="0">
                           <stop offset="0%" stopColor="#60a5fa" />
                           <stop offset="50%" stopColor="#3b82f6" />
                           <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                     </defs>
                     
                     {/* Area Fill */}
                     <path d="M0,50 L0,35 Q25,10 50,25 T100,15 L100,50 Z" fill="url(#gradientArea)" />
                     
                     {/* Stroke Line */}
                     <path d="M0,35 Q25,10 50,25 T100,15" fill="none" stroke="url(#gradientLine)" strokeWidth="0.5" className="drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                     
                     {/* Pulsing Dots */}
                     <circle cx="50" cy="25" r="1.5" fill="white" className="animate-ping opacity-75" />
                     <circle cx="50" cy="25" r="0.8" fill="white" />
                     
                     <circle cx="90" cy="18" r="1.5" fill="white" className="animate-ping opacity-75 delay-300" />
                     <circle cx="90" cy="18" r="0.8" fill="white" />
                  </svg>
                  
                  {/* Region Overlay (Bottom Right) */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 w-40 z-20">
                     <p className="text-[9px] text-white/50 uppercase font-bold mb-2 tracking-widest border-b border-white/10 pb-1">Top Region</p>
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-white">
                           <span>Indonesia</span>
                           <span className="font-bold text-yellow-400">45%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                           <div className="bg-yellow-500 h-full w-[45%]"></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-[10px] text-white">
                           <span>Global</span>
                           <span className="font-bold text-blue-400">30%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                           <div className="bg-blue-500 h-full w-[30%]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </Card>
      
      {showDetail && (
         <DetailModal title="Analisis Statistik Lengkap" onClose={() => setShowDetail(false)}>
            <div className="space-y-6">
               <p className="text-white/70">
                  Berikut adalah rincian lengkap mengenai performa ekosistem Gucci. Data ini mencakup <span className="text-yellow-400 font-bold uppercase">akumulasi pendapatan seluruh member</span> yang terdaftar.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                     <h5 className="text-white/50 text-xs uppercase tracking-widest mb-1">Total Omset Member</h5>
                     <p className="text-2xl font-bold text-yellow-400">{currentData.income.total}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                     <h5 className="text-white/50 text-xs uppercase tracking-widest mb-1">Pertumbuhan</h5>
                     <p className="text-2xl font-bold text-emerald-400">{currentData.income.growth}</p>
                  </div>
               </div>

               <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mt-4">
                  <div className="flex items-center gap-3 mb-2">
                     <Users className="text-blue-400" size={20} />
                     <span className="text-blue-300 font-bold uppercase text-xs tracking-widest">Insight Ekosistem</span>
                  </div>
                  <p className="text-white/80 text-sm">
                     Jumlah partisipan mencapai <span className="font-bold text-white">{currentData.followers.total}</span> user aktif secara global. 
                     Data pendapatan yang ditampilkan merupakan kalkulasi kolektif dari seluruh akun aktif dalam sistem.
                  </p>
               </div>
            </div>
         </DetailModal>
      )}
     </>
   )
}

// --- 6. Regulations Card (New View) ---
export const RegulationsView: React.FC = () => {
    const rulesList = [
      {
        title: "Penyerahan Pesanan & Larangan Aktivitas Ilegal",
        points: [
          "Setiap pesanan akan dikirimkan langsung kepada pelanggan sesuai data yang terdaftar.",
          "Bonus VIP akan otomatis ditambahkan ke akun pengguna dan dapat ditarik sesuai dengan arahan pembimbing resmi.",
          "Dilarang keras melakukan aktivitas ilegal, termasuk namun tidak terbatas pada pencucian uang, penyalahgunaan dana, atau penarikan untuk tujuan yang tidak sah setelah pesanan dikirim.",
          "Pengguna wajib menyelesaikan seluruh pekerjaan setelah data pesanan dimulai. Pesanan yang sedang berlangsung tidak dapat dibatalkan. Pelanggaran terhadap ketentuan ini dapat mengakibatkan pembatasan atau penangguhan hak penarikan dana."
        ]
      },
      {
        title: "Penentuan Komisi",
        points: [
          "Besaran komisi ditetapkan berdasarkan jenis pesanan atau tugas yang dipilih pengguna.",
          "Sistem akan mendistribusikan tugas secara otomatis dan acak."
        ]
      },
      {
        title: "Perubahan Harga Pesanan",
        points: [
          "Harga pesanan dapat disesuaikan sewaktu-waktu guna meningkatkan peringkat penjualan dan memperbesar peluang memperoleh komisi optimal."
        ]
      },
      {
        title: "Proses Penarikan Dana",
        points: [
          "Waktu pencairan dana ke rekening pengguna berkisar antara 3–15 menit, tergantung pada antrean proses.",
          "Dalam kondisi tertentu, pencairan dapat memakan waktu hingga 24 jam, menyesuaikan kebijakan dan kecepatan sistem perbankan."
        ]
      },
      {
        title: "Pemeriksaan Saldo Sebelum Penarikan",
        points: [
          "Pastikan saldo komisi telah masuk sebelum melakukan permintaan penarikan.",
          "Dilarang melakukan permintaan penarikan berulang kali dalam waktu singkat dengan menekan tombol penarikan berkali-kali."
        ]
      },
      {
        title: "Kewajiban Penyelesaian Tugas",
        points: [
           "Setiap pesanan wajib diselesaikan sesuai dengan ketentuan sistem.",
           "Jika pesanan hilang akibat kesalahan pribadi, pengguna diwajibkan melakukan proses verifikasi ulang, dan segala akibatnya menjadi tanggung jawab pengguna."
        ]
      },
      {
        title: "Penerimaan Instruksi Penarikan",
        points: [
           "Setelah menerima detail tugas, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh prosedur penarikan dana.",
           "Penarikan dana hanya dapat diproses setelah seluruh pesanan diselesaikan."
        ]
      },
      {
        title: "Batas Harian Tugas Pesanan",
        points: [
           "Setiap pengguna memiliki batas maksimal 5 tugas per hari.",
           "Sisa tugas dapat dilanjutkan kembali pada hari berikutnya setelah batas harian tercapai."
        ]
      },
      {
         title: "Pengurangan Nilai Kredit",
         points: [
            "Apabila ditemukan pelanggaran terhadap peraturan selama pelaksanaan pesanan, sistem akan secara otomatis melakukan pengurangan nilai kredit akun pengguna."
         ]
      },
      {
         title: "Kewajiban Pajak",
         points: [
            "Apabila penghasilan pengguna melebihi batas tertentu, maka pengguna wajib memenuhi kewajiban perpajakan sesuai dengan ketentuan hukum yang berlaku di Republik Indonesia."
         ]
      }
    ];
  
    return (
      <div className="w-full bg-black min-h-screen text-white pb-20">
         <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                   <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-wider uppercase mb-1">Ketentuan dan Aturan</h2>
                  <p className="text-xs text-white/50 tracking-[0.2em] uppercase">Gucci Legal Compliance</p>
                </div>
            </div>

            <div className="space-y-10">
               {rulesList.map((section, idx) => (
                  <div key={idx} className="group">
                     <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm font-bold text-white/90 border border-white/20 group-hover:border-yellow-500 group-hover:text-yellow-500 transition-colors">
                           {idx + 1}
                        </span>
                        {section.title}
                     </h3>
                     <ul className="space-y-4 pl-12 border-l border-white/10 ml-4">
                        {section.points.map((point, pIdx) => (
                           <li key={pIdx} className="text-gray-200 text-base md:text-lg leading-loose relative pl-6">
                              <span className="absolute left-0 top-3 w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span>
                              {point}
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center">
               <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                 © 2016 – 2025 Guccio Gucci S.p.A. All Rights Reserved. <br/>
                 SIAE Licence No. 2294/I/1936 & 5647/I/193
               </p>
            </div>
         </div>
      </div>
    );
};
