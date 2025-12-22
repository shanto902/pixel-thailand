import React from "react";
import GoogleMapEmbed from "./GoogleMapEmbed";

const LocationPage = () => {
  return (
    <div className="z-20 w-full flex flex-col justify-center items-center h-full">
      {/* Title */}
      <h2
        className="mb-5 text-white  text-lg tracking-wider z-20"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        Find Us Here
      </h2>

      {/* Map */}
      <GoogleMapEmbed />

      {/* Address Text Block */}
      <div
        className="mt-4 text-white text-[10px] md:text-xs text-center  max-w-7xl px-4 leading-relaxed"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        <h2 className="text-2xl underline my-5"> Pixel Bar Samui </h2>
        Haven Samui Community Mall, <br />
        888 Chaweng Beach Rd, Bo Put, <br />
        Amphoe Ko Samui, Surat Thani 84320
      </div>
    </div>
  );
};

export default LocationPage;
