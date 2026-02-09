import React from "react";
import { X } from "lucide-react";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  // Use direct URL for native browser viewer (works on localhost)
  // const googleViewUrl = ... (removed for localhost support)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-zinc-900 border-2 border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)] rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-black/50 p-4 border-b border-cyan-500/30 flex justify-between items-center">
          <h3
            className="text-cyan-400 font-bold tracking-wider"
            style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "12px",
            }}
          >
            MEDIA KIT READER
          </h3>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-none transition-all font-bold tracking-wider flex items-center gap-2"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            <X size={14} /> CLOSE
          </button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 bg-white relative">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="PDF Viewer"
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="mb-4 text-black">Unable to display PDF directly.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-cyan-500 text-white px-4 py-2 rounded font-bold hover:bg-cyan-600 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </iframe>
        </div>

        {/* Footer Decor */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
      </div>
    </div>
  );
};

export default PDFModal;
