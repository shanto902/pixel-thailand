import React from "react";

const GoogleMapEmbed: React.FC = () => {
  return (
    <div className=" h-[50vh] w-full z-20 overflow-hidden ">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.8284565861222!2d100.0582939!3d9.523628899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f19d56030f45%3A0x6a43e692f5e042c!2sPixel%20Bar%20Samui!5e0!3m2!1sen!2sbd!4v1753109536488!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
