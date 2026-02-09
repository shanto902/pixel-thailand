import React from "react";
import Flipbook from "./Flipbook";

interface FlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Image filenames in public/menu
const MENU_IMAGES = ["/menu/page (1).jpg", "/menu/page (2).jpg"];

const FlipbookModal: React.FC<FlipbookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return <Flipbook onClose={onClose} images={MENU_IMAGES} />;
};

export default FlipbookModal;
