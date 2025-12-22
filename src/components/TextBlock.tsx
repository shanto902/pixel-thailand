"use client";
import React, { useEffect, useState } from "react";
import LoadingBar from "./LoadingBar";
import PDFModal from "./PDFModal"; // ✅ import the modal component
import { ChevronDown } from "lucide-react";

const shuffleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";

export const AnimatedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState<string[][]>([]);
  useEffect(() => {
    const words = text.split(" ");
    const initial = words.map((w) => Array(w.length).fill(""));
    setDisplayText(initial);
    let interval: NodeJS.Timeout;
    let currentIndex = 0;
    // eslint-disable-next-line prefer-const
    interval = setInterval(() => {
      setDisplayText((prev) => {
        const updated = prev.map((word, wi) =>
          word.map((char, ci) => {
            const globalIndex =
              words.slice(0, wi).reduce((sum, w) => sum + w.length, 0) +
              wi +
              ci;
            if (globalIndex < currentIndex) {
              return words[wi][ci];
            } else {
              return shuffleChars[
                Math.floor(Math.random() * shuffleChars.length)
              ];
            }
          })
        );
        currentIndex++;
        if (currentIndex > text.length + words.length) clearInterval(interval);
        return updated;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block text-balance">
      {displayText.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.4ch]">
          {word.map((char, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-100"
              style={{ minWidth: "0.6ch" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

const TextBlock = () => {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <div className="relative h-[100dvh] w-full">
      {!loadingDone && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <LoadingBar onComplete={() => setLoadingDone(true)} />
        </div>
      )}

      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out z-10 w-full ${
          loadingDone
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="text-sm md:text-lg max-w-5xl text-gray-300 px-4 md:px-6 mx-auto text-center leading-relaxed">
          <h2
            className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight text-center"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            {loadingDone && (
              <AnimatedText text="Pixel is now open in Koh Samui, Get Ready to Get Your Game ON!" />
            )}
          </h2>

          <a
            href="#landing-page"
            className="mt-6 inline-block animate-bounce text-white hover:text-cyan-500 transition duration-1000"
            aria-label="Scroll to Game"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TextBlock;
