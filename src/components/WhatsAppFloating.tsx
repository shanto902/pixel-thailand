import { useEffect, useState } from "react";

export default function WhatsAppFloating() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");

      if (sections.length >= 2) {
        const secondSection = sections[1];
        const top = secondSection.getBoundingClientRect().top;

        // When 2nd section passes into view
        if (top < window.innerHeight * 0.3) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed z-50 
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        right-[max(1rem,env(safe-area-inset-right))]
        transition-all duration-500
        ${show ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}
      `}
    >
      <div className="relative group">
        <div
          className="
            absolute right-full mr-3 top-1/2 -translate-y-1/2
            px-3 py-1 rounded-md
            bg-black text-white text-xs whitespace-nowrap
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity
          "
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          Chat with WhatsApp
        </div>

        <a
          href="https://wa.me/66935813088"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="
            flex items-center justify-center
            rounded-full
            bg-[#25D366]
            shadow-lg shadow-black/40
            p-3
            active:scale-95
            transition-transform
          "
        >
          <img src="/whatsapp.svg" alt="WhatsApp" className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
