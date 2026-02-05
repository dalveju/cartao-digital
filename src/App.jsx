import React, { useState, useEffect } from 'react';
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
  Scale,
  Contact,     // Ícone para Salvar Contato
  Smartphone,  // Ícone para NFC
  Wifi         // Ícone visual do NFC
} from 'lucide-react';

const App = () => {
  const [copied, setCopied] = useState(false);
  const [showAreas, setShowAreas] = useState(false);
  const [nfcStatus, setNfcStatus] = useState('idle'); // idle, writing, success, error
  const [supportsNFC, setSupportsNFC] = useState(false);

  // --- 👇 SEUS DADOS 👇 ---
  const lawyerData = {
    nome: "Pedro Ribeiro Gonçalves Junior",
    titulo: "Advogado",
    oab: "OAB/SP 497.372",
    empresa: "Gonçalves Júnior Advogados",
    logoUrl: "https://i.postimg.cc/7L1NbZWp/01-LOGO-01-1.png", 
    whatsapp: "5511948564949", 
    telefone: "11948564949",
    email: "pedro.goncalves@goncalvesjr.com",
    instagram: "pedro_gonçalvesjr.adv",
    linkedin: "https://www.linkedin.com/in/pedrogoncalvesjr-adv",
    pix: "pedro.goncalves@goncalvesjr.com", 
    site: "goncalvesjr.com", // Atualizei para o link real
    areas: [
      "Direito Civil",
      "Direito de Família",
      "Direito do Trabalho",
      "Direito Previdenciário",
      "Consultoria Jurídica"
    ]
  };
  // --- 👆 FIM DA ÁREA DE EDIÇÃO 👆 ---

  useEffect(() => {
    // Verifica se o navegador suporta gravação NFC (Geralmente Android + Chrome)
    if ('NDEFReader' in window) {
      setSupportsNFC(true);
    }
  }, []);

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
        url: formatUrl(lawyerData.site),
      });
    } else {
        // Fallback simples se não suportar share nativo
        copyToClipboard(); 
        alert("Link copiado para a área de transferência!");
    }
  };

  // --- FUNCIONALIDADE 1: GERAR VCARD (Salvar na Agenda) ---
  const handleSaveContact = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${lawyerData.nome}
ORG:${lawyerData.empresa}
TITLE:${lawyerData.titulo}
TEL;TYPE=CELL:${lawyerData.telefone}
EMAIL:${lawyerData.email}
URL:${formatUrl(lawyerData.site)}
NOTE:${lawyerData.oab} - Especialidades: ${lawyerData.areas.join(', ')}
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Contato_Dr_Pedro_Goncalves.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- FUNCIONALIDADE 2: GRAVAR NFC ---
  const handleNfcWrite = async () => {
    if (!('NDEFReader' in window)) {
      alert("Seu navegador não suporta gravação NFC. Tente usar o Chrome no Android.");
      return;
    }

    try {
      setNfcStatus('writing');
      const ndef = new NDEFReader();
      // O navegador vai pedir permissão e pedir para aproximar a tag
      await ndef.write({
        records: [{ recordType: "url", data: formatUrl(lawyerData.site) }]
      });
      setNfcStatus('success');
      alert("Cartão gravado com sucesso! Agora ele abre seu site.");
      setTimeout(() => setNfcStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setNfcStatus('error');
      alert("Erro ao gravar ou cancelado. Certifique-se que o NFC está ligado e a tag é gravável.");
      setTimeout(() => setNfcStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 sm:p-4 font-sans text-white">
      <div className="max-w-md w-full bg-[#0a0a0a] min-h-screen sm:min-h-[850px] sm:rounded-[3rem] shadow-2xl overflow-hidden border-x sm:border-8 border-[#1a1a1a] relative flex flex-col">
        
        {/* Cabeçalho */}
        <div className="relative h-72 bg-[#000] flex flex-col items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-black/90"></div>

          <div className="relative z-10 w-full max-w-[300px] h-52 flex items-center justify-center transform transition-all duration-700">
            <img 
              src={lawyerData.logoUrl} 
              alt="Logo Gonçalves Júnior Advogados" 
              className="max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
          </div>
        </div>

        {/* Informações Individuais */}
        <div className="px-8 -mt-6 text-center relative z-20">
          <div className="bg-[#0a0a0a]/90 backdrop-blur-md py-4 rounded-2xl border border-[#d4af37]/10 shadow-xl">
            <h2 className="text-lg font-serif font-semibold text-white tracking-[0.05em] uppercase leading-tight">
              {lawyerData.nome}
            </h2>
            <div className="flex items-center justify-center space-x-3 mt-2">
               <div className="h-[0.5px] w-8 bg-[#d4af37]/30"></div>
               <p className="text-[#d4af37] text-[10px] font-bold tracking-[0.2em]">{lawyerData.oab}</p>
               <div className="h-[0.5px] w-8 bg-[#d4af37]/30"></div>
            </div>
          </div>
        </div>

        {/* Grelha de Contactos */}
        <div className="px-8 py-8 flex-grow">
          {/* Botão de Salvar Contato (Destaque) */}
          <button 
            onClick={handleSaveContact}
            className="w-full mb-6 py-4 bg-[#1a1a1a] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] text-[#d4af37] font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            <Contact size={18} className="group-hover:stroke-black transition-colors" />
            Salvar na Agenda
          </button>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <IconButton icon={<MessageCircle size={20} />} label="WhatsApp" href={`https://wa.me/${lawyerData.whatsapp}`} />
            <IconButton icon={<Phone size={20} />} label="Ligar" href={`tel:${lawyerData.telefone}`} />
            <IconButton icon={<Mail size={20} />} label="E-mail" href={`mailto:${lawyerData.email}`} />
            <IconButton icon={<Instagram size={20} />} label="Instagram" href={`https://instagram.com/${lawyerData.instagram}`} />
            
            <IconButton icon={<Scale size={20} />} label="Atuação" onClick={() => setShowAreas(!showAreas)} />
            <IconButton icon={<Globe size={20} />} label="Website" href={formatUrl(lawyerData.site)} />
            <IconButton icon={<Linkedin size={20} />} label="LinkedIn" href={formatUrl(lawyerData.linkedin)} />
            
            {/* Botão PIX */}
            <button onClick={copyToClipboard} className="flex flex-col items-center space-y-2 group outline-none">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-[#d4af37]/15 bg-[#121212] transition-all duration-300 group-active:scale-90 ${copied ? 'bg-green-900/40 border-green-600' : 'group-hover:border-[#d4af37]/50'}`}>
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} className="text-[#d4af37]" />}
              </div>
              <span className="text-[8px] uppercase font-bold tracking-widest text-neutral-500 group-hover:text-[#d4af37]">PIX</span>
            </button>
          </div>

          {/* Área de Especialidades */}
          {showAreas && (
            <div className="bg-[#111] rounded-2xl p-5 mb-8 border border-[#d4af37]/10 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-[#d4af37] text-[9px] font-black uppercase tracking-[0.3em] mb-4 flex items-center">
                <div className="w-1 h-1 rounded-full bg-[#d4af37] mr-2 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
                Especialidades
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {lawyerData.areas.map((area, idx) => (
                  <li key={idx} className="flex items-center text-xs text-neutral-400 group cursor-default">
                    <div className="w-1 h-1 rounded-full bg-[#d4af37]/30 mr-3 group-hover:bg-[#d4af37] transition-colors"></div>
                    <span className="group-hover:text-neutral-200 transition-colors">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ações Principais do Rodapé */}
          <div className="space-y-4">
            <button onClick={handleShare} className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b8962d] text-[#0a0a0a] font-black text-[10px] uppercase tracking-[0.3em] rounded-xl shadow-[0_5px_15px_rgba(212,175,55,0.2)] active:scale-95 transition-all flex items-center justify-center hover:brightness-110">
              <Share2 size={16} strokeWidth={2.5} className="mr-3" />
              Compartilhar Link
            </button>

            {/* Botão de Gravar NFC (Só aparece se o navegador suportar) */}
            {supportsNFC && (
              <button 
                onClick={handleNfcWrite}
                className={`w-full py-3 border border-[#333] text-neutral-500 hover:text-white hover:border-neutral-500 font-bold text-[9px] uppercase tracking-[0.2em] rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2
                  ${nfcStatus === 'writing' ? 'animate-pulse text-[#d4af37] border-[#d4af37]' : ''}
                `}
              >
                {nfcStatus === 'writing' ? <Wifi size={14} className="animate-ping" /> : <Smartphone size={14} />}
                {nfcStatus === 'idle' && "Gravar em Cartão NFC"}
                {nfcStatus === 'writing' && "Aproxime a Tag Vazia..."}
                {nfcStatus === 'success' && "Gravado com Sucesso!"}
                {nfcStatus === 'error' && "Erro ao Gravar"}
              </button>
            )}
            
          </div>
        </div>

        {/* Rodapé Texto */}
        <div className="py-6 px-10 border-t border-[#1a1a1a] bg-[#050505] text-center">
          <p className="text-[9px] text-neutral-600 font-serif italic leading-relaxed max-w-[200px] mx-auto opacity-60">
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
      <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#d4af37]/15 bg-[#121212] transition-all duration-300 group-hover:border-[#d4af37]/50 group-active:scale-90 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="text-[#d4af37] relative z-10">{icon}</div>
      </div>
      <span className="text-[8px] uppercase font-bold tracking-widest text-neutral-500 group-hover:text-[#d4af37] whitespace-nowrap transition-colors text-center mt-2">
        {label}
      </span>
    </>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group outline-none">
      {content}
    </a>
  ) : (
    <button onClick={onClick} className="flex flex-col items-center group outline-none">
      {content}
    </button>
  );
};

export default App;
