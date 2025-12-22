import React from "react";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PDFModal: React.FC<PDFModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  const googleViewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    typeof window !== "undefined"
      ? `${window.location.origin}${pdfUrl}`
      : pdfUrl
  )}&embedded=true`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="relative w-[90%] md:w-[80%] h-[80%] bg-black border-4 border-purple-400 rounded-md shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-purple-400 text-black px-3 py-4 text-xs font-bold"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          CLOSE
        </button>

        {/* Google PDF Viewer */}
        <iframe
          src={googleViewUrl}
          title="PDF Menu"
          width="100%"
          height="100%"
          className="rounded-b-md z-50"
        />
      </div>
    </div>
  );
};

export default PDFModal;
