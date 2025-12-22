import bowlingImage from "@/assets/bowling.jpg";
import supergridImage from "@/assets/supergrid.jpg";
import golfImage from "@/assets/golf-sim.jpg";

interface AttractionCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  index: number;
}

const AttractionCard = ({
  title,
  subtitle,
  description,
  image,
  index,
}: AttractionCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 items-center`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="relative overflow-hidden border-4 border-cyan-400/50 hover:border-cyan-400 transition-colors duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/80 to-transparent" />
          <div className="absolute inset-0 scanlines opacity-20" />
        </div>
        {/* Pixel corner decorations */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400" />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-1 bg-cyan-400" />
          <span
            className="font-pixel text-xs text-cyan-400 uppercase tracking-wider"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            Feature {index + 1}
          </span>
        </div>
        <h3
          className="font-pixel text-lg md:text-xl text-purple-400 text-glow-purple leading-relaxed"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {subtitle}
        </h3>
        <h4
          className="font-pixel text-sm md:text-base text-white"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          {title}
        </h4>
        <p className="font-body text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const AttractionsSection = () => {
  const attractions = [
    {
      title: "3 PROFESSIONAL LANES",
      subtitle: "STRIKE ZONE UNLOCKED",
      description:
        "Gather your friends or family and enjoy a round on our three sleek, modern bowling alleys. Ideal for social competition or a unique date.",
      image: bowlingImage,
    },
    {
      title: "SAMUI'S EXCLUSIVE CHALLENGE",
      subtitle: "DOMINATE THE GRID",
      description:
        "Test your speed, skill, and reflexes on the only competitive Super Grid game in the region. This high-energy, light-reaction game is perfect for students and competitive friends seeking the ultimate high score bragging rights.",
      image: supergridImage,
    },
    {
      title: "TEE OFF RAIN OR SHINE",
      subtitle: "VIRTUAL MAJORS",
      description:
        "Experience the most realistic golf simulation on the island. Play world-famous courses, practice your swing, or enjoy a friendly challenge with a drink in hand.",
      image: golfImage,
    },
  ];

  return (
    <section className="py-20 md:py-32  relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--cyan-400)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--cyan-400)) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${
                    i % 2 === 0 ? "bg-cyan-400" : "bg-purple-400"
                  }`}
                />
              ))}
            </div>
          </div>
          <h2
            className="font-pixel text-xl md:text-2xl lg:text-3xl text-cyan-400 text-glow-cyan mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            THE FINAL LEVEL AWAITS
          </h2>
          <h3
            className="font-pixel text-sm md:text-base text-white mb-6"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            SAMUI'S EXCLUSIVE ATTRACTIONS
          </h3>
          <p className="font-body text-gray-400 max-w-3xl mx-auto">
            Pixel Arcade is the island's only high-tech game center, built
            around three incredible, exclusive experiences designed for couples,
            families, and solo players seeking extreme fun.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="space-y-16 md:space-y-24">
          {attractions.map((attraction, index) => (
            <AttractionCard key={index} {...attraction} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
