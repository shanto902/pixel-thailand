import * as React from "react";
import { ChevronLeft, ChevronRight /*, X */ } from "lucide-react";

export type CarouselImageItem = {
  image: string;
  accentColor: "primary" | "secondary";
};

interface ImageCarouselProps {
  items: CarouselImageItem[];
  className?: string;
}

/* -------------------- Image Card -------------------- */

const ImageCard = ({ image, accentColor }: CarouselImageItem) => {
  const colors = {
    primary: {
      border: "border-cyan-400/50 hover:border-cyan-400",
      corner: "bg-cyan-400",
    },
    secondary: {
      border: "border-purple-400/50 hover:border-purple-400",
      corner: "bg-purple-400",
    },
  } as const;

  const c = colors[accentColor];

  return (
    <div
      className={`relative border-4 ${c.border} my-5 bg-black transition-transform duration-300 hover:scale-[1.02]`}
    >
      <div className="relative h-150 overflow-hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 scanlines opacity-20" />
      </div>

      <div className={`absolute -top-1 -left-1 h-3 w-3 ${c.corner}`} />
      <div className={`absolute -top-1 -right-1 h-3 w-3 ${c.corner}`} />
      <div className={`absolute -bottom-1 -left-1 h-3 w-3 ${c.corner}`} />
      <div className={`absolute -bottom-1 -right-1 h-3 w-3 ${c.corner}`} />
    </div>
  );
};

/* -------------------- Lightbox (disabled for now) -------------------- */

// const Lightbox = ({ ... }) => {};

/* -------------------- Carousel -------------------- */

export default function ImageCarousel({
  items,
  className,
}: ImageCarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState(0);
  const [perView, setPerView] = React.useState(4);

  // const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const totalPages = Math.ceil(items.length / perView);

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 4 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = (p: number) => {
    const el = trackRef.current;
    if (!el) return;

    const slideWidth = el.clientWidth / perView;
    el.scrollTo({
      left: p * perView * slideWidth,
      behavior: "smooth",
    });
    setPage(p);
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Lightbox disabled */}
      {/*
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex(
              (lightboxIndex - 1 + items.length) % items.length
            )
          }
          onNext={() =>
            setLightboxIndex((lightboxIndex + 1) % items.length)
          }
        />
      )}
      */}

      <button
        onClick={() => goTo(Math.max(0, page - 1))}
        disabled={page === 0}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 border-4 border-cyan-400 bg-black p-2"
      >
        <ChevronLeft className="text-cyan-400" />
      </button>

      <button
        onClick={() => goTo(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 border-4 border-purple-400 bg-black p-2"
      >
        <ChevronRight className="text-purple-400" />
      </button>

      <div ref={trackRef} className="flex gap-6 overflow-hidden px-12">
        {items.map((item, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ width: `calc(100% / ${perView})` }}
          >
            {/* click disabled for lightbox */}
            <div className="w-full">
              <ImageCard {...item} />
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-3 w-10 border-2 bg-black ${
              i % 2 === 0 ? "border-cyan-400" : "border-purple-400"
            } ${page === i ? "bg-current" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
