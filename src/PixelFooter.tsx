import { Facebook, Instagram } from "lucide-react";

export default function PixelFooter() {
  return (
    <footer className="relative w-full bg-[#050734] text-white mt-20 border-t-4 border-cyan-400 pixel-border">
      <div className="mx-auto max-w-5xl px-4 py-10 flex flex-col items-center space-y-6">
        {/* Pixel Block Glow */}
        <div className="relative">
          <div className="absolute inset-0 rounded-lg border-4 border-cyan-400 opacity-60 blur-sm"></div>
          <h2
            className="
              relative px-6 py-2 rounded-lg border-4 border-cyan-400
              text-center font-bold tracking-widest
              text-cyan-300
            "
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            CONNECT WITH US
          </h2>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1BvneS5fZ1/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center justify-center p-3 rounded-md
              border-4 border-blue-400 bg-blue-400/10
              hover:bg-blue-400/20 transition-all
            "
          >
            <Facebook className="h-7 w-7 text-blue-300 group-hover:scale-110 transition-transform" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/pixel_arcade_thailand?igsh=ZzZ6aGV6amRsaXlt"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center justify-center p-3 rounded-md
              border-4 border-pink-400 bg-pink-400/10
              hover:bg-pink-400/20 transition-all
            "
          >
            <Instagram className="h-7 w-7 text-pink-300 group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Copyright */}
        <p
          className="text-sm text-cyan-200 opacity-70 tracking-wider"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          © {new Date().getFullYear()} PIXEL THAILAND
        </p>
      </div>
    </footer>
  );
}
