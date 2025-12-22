"use client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PDFModal from "./PDFModal";
import { ArrowLeft } from "lucide-react";

const NavbarLaunch: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const scrollToLocation = () => {
    const el = document.getElementById("location");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-4 py-3 z-50">
      <div className="flex justify-end gap-2">
        <div
          className={`transition-all duration-700 ease-out transform
            flex gap-2`}
        >
          <button
            onClick={() => navigate("/")}
            className="bg-cyan-400 hover:bg-purple-400 text-black px-3 py-1 text-xs font-bold transition-colors duration-300"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-cyan-400 hover:bg-purple-400 text-black px-3 py-1 text-xs font-bold transition-colors duration-300"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            MEDIA KIT
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

export default NavbarLaunch;
