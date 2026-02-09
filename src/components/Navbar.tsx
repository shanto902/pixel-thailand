"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PDFModal from "./PDFModal";

interface NavbarProps {
  onOpenMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenMenu }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToLocation = () => {
    const el = document.getElementById("location");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-4 py-3 z-50">
      <div className="flex justify-end gap-2">
        <div
          className={`transition-all duration-700 ease-out transform ${
            showButtons
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          } flex gap-2`}
        >
          <button
            onClick={onOpenMenu}
            className="bg-cyan-400 hover:bg-purple-400 text-black px-3 py-1 text-xs font-bold transition-colors duration-300"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            IZAKAYA MENU
          </button>
          <Link
            to={`/packages`}
            className="bg-cyan-400 hover:bg-purple-400 text-black px-3 py-1 text-xs font-bold transition-colors duration-300"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            ARCADE PACKAGES
          </Link>

          <button
            onClick={scrollToLocation}
            className="bg-cyan-400 hover:bg-purple-400 text-black px-3 py-1 text-xs font-bold transition-colors duration-300"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            FIND US
          </button>
        </div>
      </div>
      <PDFModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl="/pixel-media-kit.pdf" // Put this in your public/ folder
      />
    </nav>
  );
};

export default Navbar;
