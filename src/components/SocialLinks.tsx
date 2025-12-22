import { Facebook, Instagram, TwitterIcon, X, Youtube } from "lucide-react";
import React from "react";

const SocialLinks = () => {
  return (
    <div className="my-10">
      {" "}
      <div className="flex justify-center space-x-6">
        <a
          href="#"
          className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
        >
          <TwitterIcon />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
        >
          <Facebook />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
        >
          <Youtube />
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
        >
          <Instagram />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
