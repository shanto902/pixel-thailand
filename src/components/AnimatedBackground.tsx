import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [pixels, setPixels] = useState<
    Array<{ id: number; x: number; y: number; delay: number; color: string }>
  >([]);

  useEffect(() => {
    const colors = [
      "bg-white",
      "bg-cyan-500",
      "bg-pink-500",
      "bg-yellow-400",
      "bg-purple-500",
    ];

    const newPixels = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setPixels(newPixels);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#050734]" />

      {/* Colorful Pixel Dots */}
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className={`absolute w-[4px] h-[4px] ${pixel.color} animate-ping opacity-70`}
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            animationDelay: `${pixel.delay}s`,
            animationDuration: "2s",
          }}
        />
      ))}

      {/* Optional Pixel Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] [background-size:12px_12px]" />
    </div>
  );
};

export default AnimatedBackground;
