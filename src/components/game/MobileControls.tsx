import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface MobileControlsProps {
  onInput: (direction: Position) => void;
}

const MobileControls = ({ onInput }: MobileControlsProps) => {
  return (
    <div className="text-center mt-5 z-40">
      <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto sm:hidden">
        <div></div>
        <button
          onTouchStart={() => onInput({ x: 0, y: -1 })}
          className="bg-cyan-500 text-white text-xs p-3 rounded-full hover:bg-cyan-400 active:bg-cyan-600 select-none"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <ArrowUpIcon />
        </button>
        <div></div>
        <button
          onTouchStart={() => onInput({ x: -1, y: 0 })}
          className="bg-cyan-500 text-white text-xs p-3 rounded-full hover:bg-cyan-400 active:bg-cyan-600 select-none"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <ArrowLeftIcon />
        </button>
        <div></div>
        <button
          onTouchStart={() => onInput({ x: 1, y: 0 })}
          className="bg-cyan-500 text-white text-xs p-3 rounded-full hover:bg-cyan-400 active:bg-cyan-600 select-none"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <ArrowRightIcon />
        </button>
        <div></div>
        <button
          onTouchStart={() => onInput({ x: 0, y: 1 })}
          className="bg-cyan-500 text-white text-xs p-3 rounded-full hover:bg-cyan-400 active:bg-cyan-600 select-none"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <ArrowDownIcon />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default MobileControls;
