import React, { useState, useRef, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Facebook,
  Instagram,
} from "lucide-react";

interface FlipbookProps {
  onClose: () => void;
  images: string[];
}

// Page Component
const Page = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="page h-full w-full bg-white shadow-sm" ref={ref}>
      <div className="page-content h-full w-full relative overflow-hidden flex flex-col">
        <div className="flex-1 relative">
          <img
            src={props.src}
            alt={`Page ${props.number}`}
            className="h-full w-full object-contain bg-zinc-900"
            loading="lazy"
          />
        </div>
        <div
          className="absolute bottom-2 right-2 text-sm text-white font-mono  px-2 py-1 rounded shadow-sm"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {props.number}
        </div>
      </div>
    </div>
  );
});

// Cover Component
const PageCover = React.forwardRef((props: any, ref: any) => {
  return (
    <div
      className="page page-cover h-full w-full bg-zinc-800 shadow-xl border-r border-zinc-900"
      ref={ref}
      data-density="hard"
    >
      <div className="page-content h-full w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <h1
          className="text-4xl md:text-6xl text-cyan-400 font-bold z-20 text-center"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {props.children}
        </h1>
        <img
          src={props.src}
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      </div>
    </div>
  );
});

const Flipbook: React.FC<FlipbookProps> = ({ onClose, images }) => {
  // Use 'any' for the ref because react-pageflip's types can be tricky
  const flipBookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const nextButtonClick = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const prevButtonClick = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const onPage = (e: any) => {
    setPage(e.data);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  useEffect(() => {
    // Small delay to ensure flipbook is mounted and pages are counted
    const timer = setTimeout(() => {
      if (flipBookRef.current) {
        // Check if pageFlip() exists before calling
        const pageFlip = flipBookRef.current.pageFlip();
        if (pageFlip) {
          setTotalPage(pageFlip.getPageCount());
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
      {/* Controls Header */}
      <div className="absolute top-0 left-0 right-0  flex justify-end items-center z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        {/* <div className="pointer-events-auto text-white font-mono text-xs md:text-sm opacity-70 bg-black/50 px-3 py-1 rounded-full">
          PAGE {page + 1} OF {totalPage > 0 ? totalPage : "..."}
        </div> */}
        <button
          onClick={onClose}
          className="pointer-events-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs md:text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all font-bold tracking-wider flex items-center gap-2"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Navigation Arrows (Desktop) - Moved outside frame */}
      <button
        onClick={prevButtonClick}
        className="absolute left-4 md:left-8 z-50 bg-cyan-600 hover:bg-cyan-500 text-white p-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all hidden md:flex items-center justify-center"
      >
        <ChevronLeft size={32} strokeWidth={3} />
      </button>

      <button
        onClick={nextButtonClick}
        className="absolute right-4 md:right-8 z-50 bg-purple-600 hover:bg-purple-500 text-white p-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all hidden md:flex items-center justify-center"
      >
        <ChevronRight size={32} strokeWidth={3} />
      </button>

      {/* Book Container */}
      <div className="relative w-full h-auto max-w-6xl flex items-center justify-center p-4 ">
        {/* 
            Applied user-requested configuration
        */}
        <HTMLFlipBook
          key={isDesktop ? "desktop-portrait" : "mobile-portrait"}
          width={1400}
          height={1000}
          size="stretch"
          // On desktop, force minWidth high enough that 2 pages (2x800=1600) won't fit comfortably on most screens,
          // favoring the single-page portrait view.
          minWidth={isDesktop ? 800 : 315}
          maxWidth={1400}
          minHeight={400}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="shadow-2xl"
          ref={flipBookRef}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true} // Force single page view
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{}}
        >
          {images.map((src, index) => (
            <Page key={index} number={index + 1} src={src} />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Social Follow Buttons */}
      <div className="absolute bottom-4 right-20 z-50 flex flex-col items-end gap-2 pointer-events-none">
        <span
          className="text-white text-[10px] md:text-xs font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          FOLLOW US
        </span>
        <div className="flex gap-4 pointer-events-auto">
          <a
            href="https://www.facebook.com/profile.php?id=61586283882519"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white p-3 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center rounded-lg"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://www.instagram.com/pikopikosamui?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 hover:bg-pink-500 text-white p-3 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center rounded-lg"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>

      {/* Mobile Helper Text (Hidden if overlapped, or adjust position) */}
      <div className="absolute bottom-24 text-gray-400 text-xs md:hidden animate-pulse pointer-events-none bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
        Swipe to flip
      </div>
    </div>
  );
};

export default Flipbook;
