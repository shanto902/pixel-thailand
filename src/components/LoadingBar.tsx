"use client";
import React, { useEffect, useRef, useState } from "react";

interface LoadingBarProps {
  onComplete?: () => void;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const hasCompletedRef = useRef(false);

  // 1) Handle progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // 2) Call onComplete AFTER progress hits 100 (and only once)
  useEffect(() => {
    if (progress >= 100 && onComplete && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center text-white font-bold text-lg">
      <div
        className="text-base md:text-xl lg:text-2xl font-bold text-white md:mb-3 mb-2 tracking-tight"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        LOADING <span className="animate-pulse">. . . . </span>
      </div>
      <div className="w-64 p-1 md:w-96 h-10 border-2 border-blue-500 overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
