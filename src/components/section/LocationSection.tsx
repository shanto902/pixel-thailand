import { MapPin, Clock, Phone } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MapPin className="w-12 h-12 text-cyan-400 animate-pulse" />
          </div>
          <h2
            className="font-pixel text-xl md:text-2xl lg:text-3xl text-cyan-400 text-glow-cyan mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            YOUR DESTINATION
          </h2>
          <h3
            className="font-pixel text-sm md:text-base text-white"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            PIXEL AT HAVEN
          </h3>
        </div>

        {/* Location Info Grid */}
        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="border-4 border-purple-400/30 bg-transparent/50 backdrop-blur-sm p-8 md:p-12 relative">
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-cyan-400" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-purple-400" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-purple-400" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-cyan-400" />

            <div className="text-center mb-10">
              <p
                className="font-pixel text-sm text-purple-400 mb-4 tracking-wider"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                A STANDALONE EXPERIENCE
              </p>
              <p className="font-body text-gray-400 max-w-2xl mx-auto">
                Pixel is its own unique entertainment destination, located at
                Haven Community Shopping Complex.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Address */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-cyan-400 flex items-center justify-center bg-cyan-400/10">
                  <img
                    src="/location.svg"
                    alt="Location Icon"
                    className="w-8 h-8"
                  />
                </div>
                <h4 className="font-pixel text-xs text-cyan-400 uppercase tracking-wider">
                  Address
                </h4>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  888 Chaweng Beach Road
                  <br />
                  Chaweng, Koh Samui
                  <br />
                  Thailand
                </p>
              </div>

              {/* Arcade Hours */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-purple-400 flex items-center justify-center bg-purple-400/10">
                  <img src="/clock.svg" alt="Clock Icon" className="w-8 h-8" />
                </div>
                <h4 className="font-pixel text-xs text-purple-400 uppercase tracking-wider">
                  Arcade Hours
                </h4>
                <p className="font-body text-gray-400 text-sm">
                  Noon to Midnight
                  <br />
                  <span className="text-gray-200 font-semibold">
                    12 PM - 12 AM
                  </span>
                </p>
              </div>

              {/* RESTAURANT Hours */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-cyan-400 flex items-center justify-center bg-cyan-400/10">
                  <img src="/clock.svg" alt="Clock Icon" className="w-8 h-8" />
                </div>
                <h4 className="font-pixel text-xs text-cyan-400 uppercase tracking-wider">
                  RESTAURANT Hours
                </h4>
                <p className="font-body text-gray-400 text-sm">
                  Noon to Midnight
                  <br />
                  <span className="text-gray-200 font-semibold">
                    12 PM - 12 AM
                  </span>
                </p>
              </div>
              {/* Phone */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-purple-400 flex items-center justify-center bg-purple-400/10">
                  <img src="/phone.svg" alt="Phone Icon" className="w-8 h-8" />
                </div>

                <h4 className="font-pixel text-xs text-purple-400 uppercase tracking-wider">
                  Phone
                </h4>

                <a
                  href="tel:+66935813088"
                  className="inline-block font-body text-sm text-gray-200 font-semibold hover:text-cyan-400 transition-colors"
                >
                  +66 93 581 3088
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
