import arcadeBarImage from "@/assets/THE ARCADE BAR.jpg";
import pixelCafeImage from "@/assets/THE PIXEL CAFÉ.jpg";
import { Utensils, Wine } from "lucide-react";

interface VenueCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  accentColor: "primary" | "secondary";
}

const VenueCard = ({
  title,
  subtitle,
  description,
  image,
  icon,
  accentColor,
}: VenueCardProps) => {
  const colorClasses = {
    primary: {
      border: "border-cyan-400/50 hover:border-cyan-400",
      text: "text-cyan-400",
      glow: "text-glow-cyan",
      bg: "bg-cyan-400",
    },
    secondary: {
      border: "border-purple-400/50 hover:border-purple-400",
      text: "text-purple-400",
      glow: "text-glow-purple",
      bg: "bg-purple-400",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div
      className={`relative group border-4 ${colors.border} bg-black backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-[1.02]`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 scanlines opacity-20" />

        {/* Icon Badge */}
        <div
          className={`absolute top-4 right-4 w-12 h-12 ${colors.bg} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3
          className={`font-pixel text-sm md:text-base ${colors.text} ${colors.glow} uppercase`}
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {subtitle}
        </h3>
        <h4
          className="font-pixel text-xs md:text-sm text-white"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {title}
        </h4>
        <p className="font-body text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner decorations */}
      <div className={`absolute -top-1 -left-1 w-3 h-3 ${colors.bg}`} />
      <div className={`absolute -top-1 -right-1 w-3 h-3 ${colors.bg}`} />
      <div className={`absolute -bottom-1 -left-1 w-3 h-3 ${colors.bg}`} />
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${colors.bg}`} />
    </div>
  );
};

const FuelSection = () => {
  const venues = [
    {
      title: "FAST FUEL & FAVORITES",
      subtitle: "THE ARCADE BAR",
      description:
        "The Arcade building focuses on maximizing playtime. The bar here serves quick, essential refreshments: soft drinks, popular bottled beers, and a selection of favorite cocktails. The food menu is strictly snack and fast-food, hand-held items—perfect for quick, energized breaks.",
      image: arcadeBarImage,
      icon: <Wine className="w-6 h-6 text-primary-black" />,
      accentColor: "primary" as const,
    },
    {
      title: "FULL DINING EXPERIENCE",
      subtitle: "THE PIXEL CAFÉ",
      description:
        "The separate Pixel Café is our dedicated dining destination. It features a full, comprehensive Thai and Westernized menu designed to satisfy both locals and international tourists. The Café bar is a full-service bar for all local and international drinks, including a large list of quality beers on tap.",
      image: pixelCafeImage,
      icon: <Utensils className="w-6 h-6 text-secondary-black" />,
      accentColor: "secondary" as const,
    },
  ];

  return (
    <section className="py-20 md:py-32  relative overflow-hidden">
      {/* Decorative elements */}

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-cyan-400" />
              <div className="w-4 h-4 bg-cyan-400 rotate-45" />
              <div className="w-4 h-4 bg-purple-400 rotate-45" />
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-purple-400" />
            </div>
          </div>
          <h2
            className="font-pixel text-xl md:text-2xl lg:text-3xl text-white mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            FUEL YOUR FUN
          </h2>
          <h3 className="font-pixel text-sm md:text-base text-purple-400 text-glow-purple mb-6">
            ARCADE & CAFÉ
          </h3>
          <p className="font-body text-gray-400 max-w-2xl mx-auto">
            Two distinct experiences under one destination. Quick bites at the
            Arcade Bar or a full dining adventure at the Pixel Café.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {venues.map((venue, index) => (
            <VenueCard key={index} {...venue} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuelSection;
