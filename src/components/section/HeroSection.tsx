// If you are in Next.js App Router, add this
import { useState, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useVideoIntersection } from "@/hooks/useVideoIntersection";

type HeroSectionProps = {
  onOpenMenu?: () => void;
};

const HeroSection = ({ onOpenMenu }: HeroSectionProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);
  const { videoRef } = useVideoIntersection("hero-video");

  useEffect(() => {
    // Check if user has already interacted with mute before
    const hasUnmuted = localStorage.getItem("hasUnmuted");
    if (!hasUnmuted) {
      // Small delay to make it noticeable after load
      const timer = setTimeout(() => setShowUnmuteHint(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);

      // Hide hint and save preference
      setShowUnmuteHint(false);
      localStorage.setItem("hasUnmuted", "true");
    }
  };

  return (
    <section
      id="landing-page"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover"
          loop
          muted
          playsInline
        >
          <source src="/videos/Pixel.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Retro Audio Control Button */}
      <div className="absolute bottom-12 left-12 z-50 flex items-center gap-4">
        <button
          onClick={toggleAudio}
          className="p-3 bg-purple-400 text-black border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-purple-300 hover:scale-105 transition-all active:scale-95 active:shadow-none"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        {/* Unmute Hint Tooltip */}
        {showUnmuteHint && isMuted && (
          <div className="animate-bounce-horizontal bg-white text-black px-4 py-2 rounded border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-pixel text-xs sm:text-sm whitespace-nowrap relative">
            <span style={{ fontFamily: '"Press Start 2P", cursive' }}>
              UNMUTE FOR BETTER EXPERIENCE
            </span>
            {/* Arrow pointing left to the button */}
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-black border-b-[8px] border-b-transparent"></div>
            <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-white border-b-[6px] border-b-transparent"></div>
          </div>
        )}
      </div>
      ```
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050734]/40 via-[#050734]/80 backdrop-blur-[2px] to-[#050734]/60" />
      {/* Content */}
      <div className="z-10 container mx-auto px-4 text-center">
        <div className="animate-slide-up">
          {/* Pixel decorative element */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-purple-400 animate-pulse mb-5"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cyan-400 text-glow-cyan mb-6 leading-relaxed"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            ARCADE UNLEASHED
          </h1>
          {/* <h2
            className="font-pixel text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            PIXEL IS NOW OPEN IN KOH SAMUI!
          </h2> */}

          {/* Subheadline */}
          <p className="font-body text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            The Island's Newest Entertainment Destination is Here. Explore the{" "}
            <span
              className="text-white font-semibold text-sm"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              Pixel Arcade
            </span>{" "}
            and the{" "}
            <span
              className="text-white font-semibold text-sm"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              Piko Piko Izakaya
            </span>
            , the perfect fun day or night out.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={
                "https://wa.me/66935813088?text=" +
                encodeURIComponent("*Coin Inserted*")
              }
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-400 skew-x-[-12deg] rounded-lg hover:bg-purple-400 inline-block px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              INSERT TOKEN
            </a>

            <button
              type="button"
              onClick={onOpenMenu}
              className="hover:bg-cyan-400 skew-x-[-12deg] rounded-lg bg-purple-400 inline-block px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              EXPLORE MENU
            </button>
          </div>

          {/* Scroll indicator */}
          <a
            href="#attractions"
            className="mt-6 inline-block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white hover:text-cyan-500 transition duration-1000"
            aria-label="Scroll to Game"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </a>
        </div>
      </div>
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-cyan-400 opacity-50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-purple-400 opacity-50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-purple-400 opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-cyan-400 opacity-50" />
    </section>
  );
};

export default HeroSection;
