import Lottie from "lottie-react";
import logo from "../assets/logo.json";
const Logo = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[40dvh]">
      {/* Logo Section */}
      <div
        className={` transition-all duration-1000 
         opacity-100 scale-100
        `}
      >
        <div className="mr-10 mt-10 md:mr-20">
          <Lottie
            animationData={logo}
            loop={true}
            className="w-fit scale-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
