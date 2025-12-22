import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

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

interface GameCanvasProps {
  maze: number[][];
  CELL_SIZE: number;
  MAZE_WIDTH: number;
  MAZE_HEIGHT: number;
}

export interface GameCanvasRef {
  drawGame: (
    pacman: Position,
    ghosts: Ghost[],
    dots: Position[],
    animationFrame: number,
    direction: Position
  ) => void;
}

const GameCanvas = forwardRef<GameCanvasRef, GameCanvasProps>(
  ({ maze, CELL_SIZE, MAZE_WIDTH, MAZE_HEIGHT }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawGame = (
      pacman: Position,
      ghosts: Ghost[],
      dots: Position[],
      animationFrame: number,
      direction: Position
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000033");
      gradient.addColorStop(1, "#006064");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw maze with glowing effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#006064";
      for (let y = 0; y < MAZE_HEIGHT; y++) {
        for (let x = 0; x < MAZE_WIDTH; x++) {
          if (maze[y][x] === 1) {
            const gradient = ctx.createLinearGradient(
              x * CELL_SIZE,
              y * CELL_SIZE,
              (x + 1) * CELL_SIZE,
              (y + 1) * CELL_SIZE
            );
            gradient.addColorStop(0, "#26C6DA");
            gradient.addColorStop(1, "#00BCD4");
            ctx.fillStyle = gradient;
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }

      ctx.shadowBlur = 0;

      // Draw dots with glow
      dots.forEach((dot) => {
        const isPowerPellet = maze[dot.y][dot.x] === 3;
        ctx.shadowBlur = isPowerPellet ? 15 : 5;
        ctx.shadowColor = "#FFFF00";
        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();
        ctx.arc(
          dot.x * CELL_SIZE + CELL_SIZE / 2,
          dot.y * CELL_SIZE + CELL_SIZE / 2,
          isPowerPellet ? 6 : 3,
          0,
          2 * Math.PI
        );
        ctx.fill();
      });

      // Draw ghosts with animation
      ctx.shadowBlur = 8;
      ghosts.forEach((ghost) => {
        const px = ghost.x * CELL_SIZE;
        const py = ghost.y * CELL_SIZE;
        const radius = CELL_SIZE * 0.45;
        const footCount = 3;
        const footWidth = CELL_SIZE / footCount;

        ctx.shadowColor = ghost.color;
        ctx.fillStyle = ghost.color;
        ctx.beginPath();

        // Head (semicircle)
        ctx.arc(px + CELL_SIZE / 2, py + radius, radius, Math.PI, 0, false);

        // Body (rect)
        ctx.lineTo(px + CELL_SIZE - radius / 2, py + CELL_SIZE);
        for (let i = footCount; i > 0; i--) {
          const cx = px + (i - 0.5) * footWidth;
          const cy = py + CELL_SIZE;
          ctx.arc(cx, cy, footWidth / 2, 0, Math.PI, true);
        }
        ctx.lineTo(px + radius / 2, py + CELL_SIZE);
        ctx.closePath();
        ctx.fill();

        // Eyes
        const eyeRadius = CELL_SIZE * 0.1;
        const eyeOffsetX = CELL_SIZE * 0.15;
        const eyeOffsetY = CELL_SIZE * 0.15;

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(
          px + CELL_SIZE / 2 - eyeOffsetX,
          py + CELL_SIZE / 2 - eyeOffsetY,
          eyeRadius,
          0,
          Math.PI * 2
        );
        ctx.arc(
          px + CELL_SIZE / 2 + eyeOffsetX,
          py + CELL_SIZE / 2 - eyeOffsetY,
          eyeRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Pupils
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(
          px + CELL_SIZE / 2 - eyeOffsetX,
          py + CELL_SIZE / 2 - eyeOffsetY,
          eyeRadius / 2,
          0,
          Math.PI * 2
        );
        ctx.arc(
          px + CELL_SIZE / 2 + eyeOffsetX,
          py + CELL_SIZE / 2 - eyeOffsetY,
          eyeRadius / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Draw Pac-Man with mouth animation
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#FFFF00";
      ctx.fillStyle = "#FFFF00";
      ctx.beginPath();

      const mouthAngle = animationFrame % 20 < 10 ? 0.2 : 0.8;
      let startAngle = 0;
      let endAngle = 2 * Math.PI;

      // Pac-Man mouth direction based on movement
      if (direction.x > 0) {
        // Right
        startAngle = mouthAngle;
        endAngle = 2 * Math.PI - mouthAngle;
      } else if (direction.x < 0) {
        // Left
        startAngle = Math.PI + mouthAngle;
        endAngle = Math.PI - mouthAngle;
      } else if (direction.y > 0) {
        // Down
        startAngle = Math.PI / 2 + mouthAngle;
        endAngle = Math.PI / 2 - mouthAngle;
      } else if (direction.y < 0) {
        // Up
        startAngle = (3 * Math.PI) / 2 + mouthAngle;
        endAngle = (3 * Math.PI) / 2 - mouthAngle;
      }

      ctx.arc(
        pacman.x * CELL_SIZE + CELL_SIZE / 2,
        pacman.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        startAngle,
        endAngle
      );
      ctx.lineTo(
        pacman.x * CELL_SIZE + CELL_SIZE / 2,
        pacman.y * CELL_SIZE + CELL_SIZE / 2
      );
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    useImperativeHandle(ref, () => ({
      drawGame,
    }));

    return (
      <canvas
        ref={canvasRef}
        width={MAZE_WIDTH * CELL_SIZE}
        height={MAZE_HEIGHT * CELL_SIZE}
        className="border-2 border-cyan-400  shadow-lg shadow-cyan-400/30 max-w-full h-auto"
      />
    );
  }
);

GameCanvas.displayName = "GameCanvas";

export default GameCanvas;
