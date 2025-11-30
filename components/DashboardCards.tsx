
import React from 'react';
import { MoreHorizontal, CheckCircle, Edit, Plus } from 'lucide-react';
import { UserAccount, ContractStep } from '../types';

// --- Reusable Glass Card Container ---
// Increased opacity from bg-black/30 to bg-black/60 for better text contrast
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:bg-black/70 transition-all duration-500 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
  <div className="flex justify-between items-center mb-6 relative z-10">
    {/* Added drop-shadow-lg for extra pop */}
    <h3 className={`text-2xl font-serif font-bold tracking-wide text-white drop-shadow-lg ${className}`}>{title}</h3>
    <button className="text-white/70 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
      <MoreHorizontal size={20} />
    </button>
  </div>
);

// --- 1. Account Card ---
interface AccountCardProps {
  data: UserAccount;
  onOpenForm: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ data, onOpenForm }) => {
  const isFormEmpty = data.agendaNumber === '-';

  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Account" />
      
      <div className="flex flex-col sm:flex-row gap-4 relative z-10 flex-1">
        {/* Info Box - Glassy */}
        <div className="flex-1 bg-white/10 rounded-xl p-5 border border-white/20 relative overflow-hidden flex flex-col justify-center group-hover:bg-white/15 transition-colors duration-500">
           
          <div className="grid grid-cols-[80px_auto] gap-y-4 text-sm relative z-10">
            {/* Brightened labels and added bold */}
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
          
          {/* Manual Trigger Button (Only shows if data is empty) */}
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

        {/* Timer Box - Luxury Gradient */}
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
    </Card>
  );
};

// --- 2. Rules Card ("Tolong Di Baca") ---
export const RulesCard: React.FC = () => {
  const rules = [
    "Kontrak agenda ini merupakan bagian yang tidak terpisahkan dari perjanjian antara Pengguna dan Pihak Gucci Sistem.",
    "Setiap dana yang dikirim oleh peserta akan secara otomatis dikonversi menjadi Saldo Akun bussiness milik peserta.",
    "Seluruh proses pelaksanaan agenda dilaksanakan sesuai dengan prosedur dan ketentuan yang berlaku pada Sistem Gucci.",
    "Dengan melakukan aktivasi agenda, Pengguna menyatakan telah membaca, memahami, dan menyetujui seluruh isi perjanjian.",
    "Dokumen ini berlaku sebagai bukti sah persetujuan antara peserta dan Pihak Gucci tanpa memerlukan tanda tangan tertulis."
  ];

  return (
    <Card className="h-full">
      <CardHeader title="Tolong Di Baca" className="text-red-400" />
      <ul className="space-y-4 pr-2">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-start gap-3 text-white text-[15px] leading-relaxed group/item">
            <span className="mt-2 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 shadow-[0_0_8px_#EF4444] group-hover/item:bg-red-400 transition-all duration-300"></span>
            {/* Improved readability: text-white, increased font size slightly, heavier weight */}
            <span className="font-medium tracking-wide text-gray-100 group-hover/item:text-white transition-colors duration-300 drop-shadow-sm">{rule}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// --- 3. Contract Status Card ---
export const ContractStatusCard: React.FC<{ steps: ContractStep[] }> = ({ steps }) => {
  const handleAgree = () => {
    const phoneNumber = "6281385616098";
    const message = "Hallo Advisor , saya telah menyetujui kontrak dan mengikuti semua ketentuan yang telah di tetapkan .";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader title="Kontrak" />
      
      <div className="flex-1 flex flex-col justify-center gap-2 mb-4">
        {steps.map((step, index) => (
          <div key={step.key} className="grid grid-cols-[100px_1fr_60px] items-center py-4 border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors rounded px-3 group/row">
            {/* Label */}
            <div className="font-bold text-red-300 text-[13px] uppercase tracking-wider group-hover/row:text-red-200 transition-colors drop-shadow-sm">
               {step.label}
            </div>
            
            {/* Description - Brightened text */}
            <div className="px-4 text-gray-100 text-sm font-medium leading-snug truncate sm:whitespace-normal sm:overflow-visible group-hover/row:text-white transition-colors drop-shadow-sm">
              {step.description}
            </div>
            
            {/* Status */}
            <div className="text-right">
              <span className="text-emerald-300 text-[11px] font-bold tracking-wider uppercase bg-emerald-900/60 border border-emerald-500/40 px-2.5 py-1.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                {step.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Agreement Button */}
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
  );
};

// --- 4. Attention Card ---
export const AttentionCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#2a1515] to-[#111111] backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden h-full flex flex-col group">
        {/* Subtle texture or shine */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Bottom colored strip */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-3xl font-serif font-bold text-white tracking-wide italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Attention</h3>
            <button className="text-white/70 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
            </button>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
            {/* Increased text brightness and weight */}
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
  );
};
