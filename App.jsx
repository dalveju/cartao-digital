import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  MessageCircle, 
  Copy, 
  Check, 
  Linkedin, 
  Share2, 
  Globe, 
  Scale 
} from 'lucide-react';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [showAreas, setShowAreas] = useState(false);

  // --- 👇 EDITE SEUS DADOS AQUI EMBAIXO 👇 ---
  const lawyerData = {
    nome: "Pedro Ribeiro Gonçalves Junior",
    oab: "OAB/SP 497.372",
    logoUrl: "https://i.postimg.cc/7L1NbZWp/01-LOGO-01-1.png", 
    
    // Use apenas números: 55 + DDD + Número
    whatsapp: "5511948564949", 
    
    // Número para ligação direta: DDD + Número
    telefone: "11948564949",
    
    email: "pedro.goncalves@goncalvesjr.com",
    
    // Apenas o nome do usuário do Instagram, sem o @
    instagram: "pedro_gonçalvesjr.adv",

    // Link do LinkedIn (O código agora aceita com ou sem https://)
    linkedin: "https://www.linkedin.com/in/pedrogoncalvesjr-adv",
    
    // Sua chave PIX
    pix: "pedro.goncalves@goncalvesjr.com", 
    
    // Seu site (O código agora aceita com ou sem https://)
    site: "www.goncalvesjr.com",
    
    // Suas especialidades
    areas: [
      "Direito Civil",
      "Direito de Família",
      "Direito do Trabalho",
      "Direito Previdenciário",
      "Consultoria Jurídica"
    ]
  };
  // --- 👆 FIM DA ÁREA DE EDIÇÃO 👆 ---

  // Função auxiliar para garantir que o link seja absoluto (comece com https://)
  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = lawyerData.pix;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Cartão Digital - ${lawyerData.nome}`,
        text: `Gonçalves Júnior Advogados - Contatos Profissionais`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 sm:p-4 font-sans text-white">
      <div className="max-w-md w-full bg-[#0a0a0a] min-h-screen sm:min-h-[850px] sm:rounded-[3rem] shadow-2xl overflow-hidden border-x sm:border-8 border-[#1a1a1a] relative flex flex-col">
        
        {/* Cabeçalho com o Logo Completo */}
        <div className="relative h-80 bg-[#000] flex flex-col items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-black/90"></div>

          <div className="relative z-10 w-full max-w-[320px] h-60 flex items-center justify-center transform transition-all duration-700">
            <img 
              src={lawyerData.logoUrl} 
              alt="Logo Gonçalves Júnior Advogados" 
              className="max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden w-32 h-32 border-2 border-[#d4af37]/20 rounded-full flex-col items-center justify-center p-4 text-center">
              <Scale size={40} className="text-[#d4af37] opacity-50" />
            </div>
          </div>
        </div>

        {/* Informações Individuais */}
        <div className="px-8 -mt-10 text-center relative z-20">
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm py-4 rounded-2xl border border-[#d4af37]/10 shadow-xl">
            <h2 className="text-xl font-serif font-semibold text-white tracking-[0.05em] uppercase">
              {lawyerData.nome}
            </h2>
            <div className="flex items-center justify-center space-x-3 mt-2">
               <div className="h-[0.5px] w-10 bg-[#d4af37]/30"></div>
               <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em]">{lawyerData.oab}</p>
               <div className="h-[0.5px] w-10 bg-[#d4af37]/30"></div>
            </div>
          </div>
        </div>

        {/* Grelha de Contactos */}
        <div className="px-8 py-10 flex-grow">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <IconButton icon={<MessageCircle size={22} />} label="WhatsApp" href={`https://wa.me/${lawyerData.whatsapp}`} />
            <IconButton icon={<Phone size={22} />} label="Ligar" href={`tel:${lawyerData.telefone}`} />
            <IconButton icon={<Mail size={22} />} label="E-mail" href={`mailto:${lawyerData.email}`} />
            <IconButton icon={<Instagram size={22} />} label="Instagram" href={`https://instagram.com/${lawyerData.instagram}`} />
            <IconButton icon={<Scale size={22} />} label="Atuação" onClick={() => setShowAreas(!showAreas)} />
            <IconButton icon={<Globe size={22} />} label="Website" href={formatUrl(lawyerData.site)} />
            <IconButton icon={<Linkedin size={22} />} label="LinkedIn" href={formatUrl(lawyerData.linkedin)} />
            <button onClick={copyToClipboard} className="flex flex-col items-center space-y-3 group outline-none">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-[#d4af37]/15 bg-[#121212] transition-all duration-300 group-active:scale-90 ${copied ? 'bg-green-800 border-green-600' : 'group-hover:border-[#d4af37]/50'}`}>
                {copied ? <Check size={22} className="text-white" /> : <Copy size={22} className="text-[#d4af37]" />}
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 group-hover:text-[#d4af37]">PIX</span>
            </button>
          </div>

          {showAreas && (
            <div className="bg-[#111] rounded-2xl p-6 mb-10 border border-[#d4af37]/10 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] mb-5 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mr-3 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
                Especialidades
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {lawyerData.areas.map((area, idx) => (
                  <li key={idx} className="flex items-center text-sm text-neutral-400 group cursor-default">
                    <div className="w-1 h-1 rounded-full bg-[#d4af37]/30 mr-4 group-hover:bg-[#d4af37] transition-colors"></div>
                    <span className="group-hover:text-neutral-200 transition-colors">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botão Principal */}
          <div className="space-y-5">
            <button onClick={handleShare} className="w-full py-5 bg-gradient-to-r from-[#d4af37] to-[#b8962d] text-[#0a0a0a] font-black text-[11px] uppercase tracking-[0.3em] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.4)] active:scale-95 transition-all flex items-center justify-center">
              <Share2 size={18} strokeWidth={2.5} className="mr-3" />
              Compartilhar Cartão
            </button>
            <p className="text-[9px] text-center text-neutral-700 uppercase tracking-[0.4em] font-bold">Toque nos ícones para interagir</p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="py-8 px-10 border-t border-[#1a1a1a] bg-[#050505] text-center">
          <p className="text-[10px] text-neutral-600 font-serif italic leading-relaxed max-w-[220px] mx-auto opacity-60">
            Excelência no atendimento jurídico personalizado.
          </p>
        </div>
      </div>
    </div>
  );
};

const IconButton = ({ icon, label, href, onClick }) => {
  const content = (
    <>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[#d4af37]/15 bg-[#121212] transition-all duration-300 group-hover:border-[#d4af37]/50 group-active:scale-90 shadow-lg">
        <div className="text-[#d4af37]">{icon}</div>
      </div>
      <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 group-hover:text-[#d4af37] whitespace-nowrap transition-colors text-center">
        {label}
      </span>
    </>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-3 group outline-none">
      {content}
    </a>
  ) : (
    <button onClick={onClick} className="flex flex-col items-center space-y-3 group outline-none">
      {content}
    </button>
  );
};

export default App;
