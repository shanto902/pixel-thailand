import { useEffect, useState } from "react";
import { X } from "lucide-react";

export interface ConversionPopupProps {
  onOpenMenu?: () => void;
}

const ConversionPopup: React.FC<ConversionPopupProps> = ({ onOpenMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasSeenPopup = sessionStorage.getItem("pikoPikoPopupSeen");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        // sessionStorage.setItem("pikoPikoPopupSeen", "true");
      }, 5000); // Trigger after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleView = () => {
    setIsOpen(false);
    if (onOpenMenu) {
      onOpenMenu();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-black border-4 border-cyan-400 p-1 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 text-white p-2 border-2 border-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Inner Content Container */}
        <div className="bg-zinc-900 border-2 border-purple-500 p-4 md:p-6 flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent" />

          {/* Header */}
          <div className="mb-4 space-y-2 relative z-10">
            <h2
              className="text-cyan-400 font-bold text-base md:text-lg tracking-widest animate-pulse"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              LEVEL UNLOCKED
            </h2>
            <h3
              className="text-white text-lg md:text-xl font-bold"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              09.02.2026 🔓
            </h3>
          </div>

          {/* Main Copy */}
          <p className="text-gray-300 mb-6 font-mono text-xs md:text-sm leading-relaxed">
            <span className="text-purple-400 font-bold">Piko Piko Izakaya</span>{" "}
            is officially going LIVE at Haven Mall. Be the first to experience
            Chaweng’s new home for{" "}
            <span className="text-cyan-400 font-bold">
              Yakitori,Highballs and Neon Vibes.
            </span>
          </p>

          {/* Promo Box */}
          <div className="bg-purple-900/30 border border-purple-500/50 p-3 md:p-4 mb-6 w-full rounded">
            <p className="text-cyan-300 text-[10px] md:text-xs font-bold mb-1 uppercase tracking-wider">
              Launch Promo
            </p>
            <p className="text-white text-xs md:text-sm italic">
              Join the loop on opening night (Feb 9th) and get a{" "}
              <span className="text-yellow-400 font-bold">
                COMPLIMENTARY PIXEL SAKE BOMB
              </span>{" "}
              with your first order of the 'Piko Piko Sharing Set'
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleView}
            type="button"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-6 transform skew-x-[-12deg] transition-all hover:scale-105 active:scale-95 border-b-4 border-cyan-600 active:border-b-0 active:translate-y-1"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            VIEW MENU
          </button>
        </div>

        {/* Corner Decor */}
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-400" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400" />
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400" />
      </div>
    </div>
  );
};

export default ConversionPopup;
