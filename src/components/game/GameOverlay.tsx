interface GameOverlayProps {
  gameOver: boolean;
  score: number;
  gameStarted: boolean;
  onResetGame: () => void;
  onStartGame: () => void;
}

const GameOverlay = ({
  gameOver,
  score,
  gameStarted,
  onResetGame,
  onStartGame,
}: GameOverlayProps) => {
  if (gameOver) {
    return (
      <div className="absolute z-40 inset-0 bg-black/80 flex items-center justify-center ">
        <div className="text-center">
          <p
            className="text-red-400 text-sm mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            GAME OVER
          </p>
          <p
            className="text-white text-xs mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            Final Score: {score}
          </p>
          <button
            onClick={onResetGame}
            className="text-xs bg-red-500 text-white px-4 py-2  hover:bg-red-400 transition-colors"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div
          className="mb-4 text-white text-xs"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <p className="mb-2 mt-4 hidden md:block ">
            Press Arrow Keys on Keyboard
          </p>
          <p className="text-yellow-400 mt-4">to Begin Adventure!</p>
        </div>
        <button
          onClick={onStartGame}
          className="text-xs md:hidden bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4  hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105 shadow-lg animate-pulse active:scale-95 touch-manipulation"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          🎮 START GAME 🎮
        </button>
      </div>
    );
  }

  if (gameStarted) {
    return (
      <div className="text-center">
        <div
          className="mb-4 text-white text-xs hidden md:block"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          <p className="mb-2 mt-4 ">Press Esc Key</p>
          <p className="text-yellow-400">to Stop Adventure!</p>
        </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
