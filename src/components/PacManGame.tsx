import { useEffect, useRef, useState, useCallback } from "react";
import GameStats from "./game/GameStats";
import GameOverlay from "./game/GameOverlay";
import MobileControls from "./game/MobileControls";
import GameCanvas, { GameCanvasRef } from "./game/GameCanvas";
import {
  updateGhosts,
  checkCollisions,
  initializeDots,
  initializeGhosts,
} from "./game/gameUtils";
import { ChevronDown, MapPin } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  x: number;
  y: number;
  direction: Position;
  color: string;
  targetX: number;
  targetY: number;
}

const PacManGame = () => {
  const canvasRef = useRef<GameCanvasRef>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const gameLoopRef = useRef<number>();
  const backgroundLoopRef = useRef<number>();

  const pacmanRef = useRef<Position>({ x: 1, y: 1 });
  const directionRef = useRef<Position>({ x: 0, y: 0 });
  const nextDirectionRef = useRef<Position>({ x: 0, y: 0 });
  const dotsRef = useRef<Position[]>([]);
  const ghostsRef = useRef<Ghost[]>([]);
  const animationFrameRef = useRef(0);

  const CELL_SIZE = 40;
  const MAZE_WIDTH = 19;
  const MAZE_HEIGHT = 13;

  // Enhanced maze layout
  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const initializeGame = useCallback(() => {
    dotsRef.current = initializeDots(maze, MAZE_WIDTH, MAZE_HEIGHT);
    ghostsRef.current = initializeGhosts();
    pacmanRef.current = { x: 1, y: 1 };
    directionRef.current = { x: 0, y: 0 };
    nextDirectionRef.current = { x: 0, y: 0 };
    animationFrameRef.current = 0;
  }, []);

  // Background animation loop for when game hasn't started
  const backgroundLoop = useCallback(() => {
    animationFrameRef.current++;

    // Move ghosts in background
    if (animationFrameRef.current % 20 === 0) {
      updateGhosts(
        ghostsRef.current,
        { x: 9, y: 6 },
        maze,
        MAZE_WIDTH,
        MAZE_HEIGHT
      );
    }

    canvasRef.current?.drawGame(
      { x: 1, y: 1 }, // Static Pac-Man position
      ghostsRef.current,
      dotsRef.current,
      animationFrameRef.current,
      { x: 0, y: 0 } // No direction
    );

    if (!gameStarted && !gameOver) {
      backgroundLoopRef.current = requestAnimationFrame(backgroundLoop);
    }
  }, [gameStarted, gameOver]);

  const handleCollisions = useCallback(() => {
    const ghostCollision = checkCollisions(
      ghostsRef.current,
      pacmanRef.current
    );

    if (ghostCollision) {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setGameStarted(false);
        } else {
          // Reset positions
          pacmanRef.current = { x: 1, y: 1 };
          directionRef.current = { x: 0, y: 0 };
        }
        return newLives;
      });
    }
  }, []);

  const gameLoop = useCallback(() => {
    animationFrameRef.current++;

    // Move Pac-Man every few frames for smoother animation
    if (animationFrameRef.current % 8 === 0) {
      // Try to change direction if next direction is set
      if (
        nextDirectionRef.current.x !== 0 ||
        nextDirectionRef.current.y !== 0
      ) {
        const nextX = pacmanRef.current.x + nextDirectionRef.current.x;
        const nextY = pacmanRef.current.y + nextDirectionRef.current.y;

        if (
          nextX >= 0 &&
          nextX < MAZE_WIDTH &&
          nextY >= 0 &&
          nextY < MAZE_HEIGHT &&
          maze[nextY][nextX] !== 1
        ) {
          directionRef.current = { ...nextDirectionRef.current };
          nextDirectionRef.current = { x: 0, y: 0 };
        }
      }

      const newX = pacmanRef.current.x + directionRef.current.x;
      const newY = pacmanRef.current.y + directionRef.current.y;

      if (
        newX >= 0 &&
        newX < MAZE_WIDTH &&
        newY >= 0 &&
        newY < MAZE_HEIGHT &&
        maze[newY][newX] !== 1
      ) {
        pacmanRef.current = { x: newX, y: newY };

        // Check for dot collision
        const dotIndex = dotsRef.current.findIndex(
          (dot) => dot.x === newX && dot.y === newY
        );
        if (dotIndex !== -1) {
          const isPowerPellet = maze[newY][newX] === 3;
          dotsRef.current.splice(dotIndex, 1);
          setScore((prev) => prev + (isPowerPellet ? 50 : 10));

          // Check win condition
          if (dotsRef.current.length === 0) {
            setLevel((prev) => prev + 1);
            initializeGame();
          }
        }
      }

      // Move ghosts every other Pac-Man move
      if (animationFrameRef.current % 16 === 0) {
        updateGhosts(
          ghostsRef.current,
          pacmanRef.current,
          maze,
          MAZE_WIDTH,
          MAZE_HEIGHT
        );
      }

      handleCollisions();
    }

    canvasRef.current?.drawGame(
      pacmanRef.current,
      ghostsRef.current,
      dotsRef.current,
      animationFrameRef.current,
      directionRef.current
    );

    if (gameStarted && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameStarted, gameOver, handleCollisions, initializeGame]);

  useEffect(() => {
    const preventScrollKeys = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScrollKeys, { passive: false });
    return () => {
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, []);
  const handleInput = useCallback(
    (direction: Position) => {
      if (gameOver) return;

      // Start game on first input if not started
      if (!gameStarted) {
        document
          .getElementById("game")
          ?.scrollIntoView({ behavior: "instant" });
        setTimeout(() => {
          document.body.style.overflow = "hidden";
        }, 100); // allow scroll to finish before locking
        startGame();
      }
      nextDirectionRef.current = direction;
    },
    [gameStarted, gameOver]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleInput({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          handleInput({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          handleInput({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          handleInput({ x: 1, y: 0 });
          break;
        case "Escape":
          setGameStarted(false);
          setGameOver(false);
          document.body.style.overflow = "auto";
          break;
      }
    },
    [handleInput]
  );

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    initializeGame();
    document.body.style.overflow = "hidden";
  };

  const resetGame = () => {
    setGameOver(false);
    startGame();
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      if (backgroundLoopRef.current) {
        cancelAnimationFrame(backgroundLoopRef.current);
      }
    };
  }, [handleKeyPress]);

  useEffect(() => {
    // Initialize game elements
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoop();
    } else if (!gameStarted && !gameOver) {
      backgroundLoop();
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      if (backgroundLoopRef.current) {
        cancelAnimationFrame(backgroundLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, gameLoop, backgroundLoop]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-sm sm:max-w-none mx-auto">
      <GameStats score={score} lives={lives} level={level} />

      <div className="relative">
        <GameCanvas
          ref={canvasRef}
          maze={maze}
          CELL_SIZE={CELL_SIZE}
          MAZE_WIDTH={MAZE_WIDTH}
          MAZE_HEIGHT={MAZE_HEIGHT}
        />

        <GameOverlay
          gameOver={gameOver}
          score={score}
          gameStarted={gameStarted}
          onResetGame={resetGame}
          onStartGame={startGame}
        />
      </div>

      {!gameStarted && !gameOver ? null : (
        <MobileControls onInput={handleInput} />
      )}
      {/* <a
        href="#location"
        className="mt-6 inline-block animate-bounce text-white hover:text-cyan-500 transition duration-1000 absolute bottom-5"
        aria-label="Scroll to Game"
      >
        <MapPin className="w-8 h-8 mx-auto" />
      </a> */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-cyan-400 opacity-50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-purple-400 opacity-50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-purple-400 opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-cyan-400 opacity-50" />
    </div>
  );
};

export default PacManGame;
