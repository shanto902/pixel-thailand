import { useEffect, useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import PacManGame from "../components/PacManGame";
import TextBlock from "@/components/TextBlock";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import LocationPage from "@/components/LocationPage";
import { ChevronDown, LocateIcon, MapIcon, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import FlipbookModal from "@/components/FlipbookModal";

import HeroSection from "@/components/section/HeroSection";
import AttractionsSection from "@/components/section/AttractionsSection";
import FuelSection from "@/components/section/FuelSection";
import LocationSection from "@/components/section/LocationSection";
import ImageCarousel, {
  CarouselImageItem,
} from "@/components/section/ImageCarousel";
import ConversionPopup from "@/components/ConversionPopup";

export const demoCarouselItems: CarouselImageItem[] = [
  {
    image: "/carousel/Big Bowl Theory.jpg",
    accentColor: "primary",
  },
  {
    image: "/carousel/Cupid's Arrow.jpg",
    accentColor: "secondary",
  },
  {
    image: "/carousel/Dance Dance Evolution.jpg",
    accentColor: "primary",
  },
  {
    image: "/carousel/Drift King.jpg",
    accentColor: "secondary",
  },
  {
    image: "/carousel/Ghost Rider.jpg",
    accentColor: "primary",
  },
  {
    image: "/carousel/Hammer Time.jpg",
    accentColor: "secondary",
  },
  {
    image: "/carousel/iPad Air Hockey.jpg",
    accentColor: "secondary",
  },
];

const Index = () => {
  const [showDim, setShowDim] = useState(false);
  const [showText, setShowText] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const dimTimeout = setTimeout(() => setShowDim(true), 6000);
    const textTimeout = setTimeout(() => setShowText(true), 3000);

    return () => {
      clearTimeout(dimTimeout);
      clearTimeout(textTimeout);
    };
  }, []);

  return (
    <>
      <Navbar onOpenMenu={() => setModalOpen(true)} />
      {/* let the body handle scrolling */}
      <div className="min-h-screen w-full scroll-smooth">
        {/* SECTION 1 - Animated Intro */}
        <section className="relative h-screen w-full">
          <AnimatedBackground />

          <div className="flex flex-col justify-between h-screen overflow-hidden">
            {/* Background Video */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="/videos/720p.mp4"
                type="video/mp4"
                media="(max-width: 768px)"
              />
              <source src="/videos/1080p.mp4" type="video/mp4" />
            </video>

            {/* Dim overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black via-black md:via-transparent to-transparent transition-opacity duration-1000 pointer-events-none ${
                showDim ? "opacity-80" : "opacity-0"
              }`}
            />

            {/* TextBlock slides up */}
            <div
              className={`relative z-40 transition-all duration-1000 ease-out transform ${
                showText
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <TextBlock />
            </div>
          </div>
        </section>

        <HeroSection onOpenMenu={() => setModalOpen(true)} />

        <section id="attractions">
          <AttractionsSection />
        </section>
        <section>
          <ImageCarousel items={demoCarouselItems} />
        </section>

        <section>
          <FuelSection />
        </section>

        <section>
          <LocationSection />
        </section>

        {/* SECTION 2 - PacMan Game */}
        <section className="min-h-screen w-full flex relative flex-col items-center justify-center">
          <PacManGame />
        </section>

        <section
          id="location"
          className="min-h-screen w-full z-20 flex max-w-7xl mx-auto flex-col items-center justify-center relative"
        >
          <LocationPage />
        </section>
      </div>

      <FlipbookModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ConversionPopup onOpenMenu={() => setModalOpen(true)} />
    </>
  );
};

export default Index;
