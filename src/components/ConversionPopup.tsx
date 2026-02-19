import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useVideoContext } from "@/context/VideoContext";

export interface ConversionPopupProps {
  onOpenMenu?: () => void;
}

const ConversionPopup: React.FC<ConversionPopupProps> = ({ onOpenMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setPopupOpen } = useVideoContext();

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

  useEffect(() => {
    setPopupOpen(isOpen);
  }, [isOpen, setPopupOpen]);

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
        <div className="bg-zinc-900 border-2 border-purple-500 p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden w-full max-w-md mx-auto rounded-lg shadow-2xl">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          >
            <source src="/videos/promo-video.mp4" type="video/mp4" />
          </video>
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-black/30 z-0" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-transparent z-0" />{" "}
          {/* Bottom gradient for text */}
          {/* Header */}
          <div className="mb-6 space-y-2 relative z-10 w-full flex flex-col items-center">
            <img
              src="/pikapikologo.png"
              alt="Pika Piko Logo"
              className="w-32 h-auto object-contain mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />

            <h2
              className="text-cyan-400 font-bold text-lg md:text-2xl tracking-widest animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              Promo Offers!
            </h2>
          </div>
          {/* Main Content */}
          <div className="relative z-10 w-full text-left space-y-6">
            {/* Sake Section */}
            <div className="bg-purple-900/40 border border-purple-500/30 p-4 rounded-lg backdrop-blur-sm">
              <p
                className="text-yellow-400 font-bold text-sm  mb-2 text-center"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                🍶 SAKE & WINE PROMO! 🍷
              </p>
              <div className="flex justify-center items-center border-t border-purple-500/30 pt-2 mt-2">
                <span className="text-gray-200 text-center font-mono text-xs md:text-sm">
                  15% OFF on ALL SAKE
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-200 font-mono text-xs md:text-sm">
                  Bottle of WINE
                </span>
                <span className="text-cyan-400 font-bold font-mono text-sm md:text-base">
                  now 790/-
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-2 opacity-50">
              <div className="h-px bg-purple-500 w-12"></div>
              <span className="text-purple-400 text-xs">★ ★ ★</span>
              <div className="h-px bg-purple-500 w-12"></div>
            </div>

            {/* Beer Tower Section */}
            <div className="bg-cyan-900/30 border border-cyan-500/30 p-4 rounded-lg backdrop-blur-sm">
              <h3
                className="text-yellow-400 font-bold text-sm mb-3 text-center uppercase tracking-wider"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                BEER TOWER PROMO! 🍺
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200 font-mono text-xs md:text-sm">
                    ASAHI Tower (3L)
                  </span>
                  <span className="text-pink-400 font-bold font-mono text-sm md:text-base">
                    now 890/-
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-cyan-500/20 pt-2">
                  <span className="text-gray-200 font-mono text-xs md:text-sm">
                    CHANG Tower (3L)
                  </span>
                  <span className="text-pink-400 font-bold font-mono text-sm md:text-base">
                    now 599/-
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* CTA */}
          <button
            onClick={handleView}
            type="button"
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded shadow-[0_0_15px_rgba(168,85,247,0.5)] transform transition-all hover:scale-[1.02] active:scale-95 border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 relative z-10"
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
