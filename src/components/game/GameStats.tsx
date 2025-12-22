interface GameStatsProps {
  score: number;
  lives: number;
  level: number;
}

const GameStats = ({ score, lives, level }: GameStatsProps) => {
  return (
    <div className="text-center z-50">
      <div
        className="flex flex-wrap justify-center gap-4 text-xs md:text-xl text-white"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        <span>
          Score: <span className="text-yellow-400">{score}</span>
        </span>
        <span>
          Lives: <span className="text-red-400">{"♥".repeat(lives)}</span>
        </span>
        <span>
          Level: <span className="text-cyan-400">{level}</span>
        </span>
      </div>
    </div>
  );
};

export default GameStats;
