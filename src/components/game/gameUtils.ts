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

export const updateGhosts = (
  ghosts: Ghost[],
  pacman: Position,
  maze: number[][],
  MAZE_WIDTH: number,
  MAZE_HEIGHT: number
) => {
  ghosts.forEach((ghost) => {
    // Simple AI: move towards Pac-Man
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;

    let newDirection = { ...ghost.direction };

    // Change direction occasionally or when hitting wall
    if (
      Math.random() < 0.1 ||
      maze[ghost.y + ghost.direction.y]?.[ghost.x + ghost.direction.x] === 1
    ) {
      const possibleDirections = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
      ].filter((dir) => {
        const newX = ghost.x + dir.x;
        const newY = ghost.y + dir.y;
        return (
          newX >= 0 &&
          newX < MAZE_WIDTH &&
          newY >= 0 &&
          newY < MAZE_HEIGHT &&
          maze[newY][newX] !== 1
        );
      });

      if (possibleDirections.length > 0) {
        // Prefer direction towards Pac-Man
        if (Math.abs(dx) > Math.abs(dy)) {
          newDirection = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
        } else {
          newDirection = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
        }

        // Check if preferred direction is valid
        const isValidDirection = possibleDirections.some(
          (dir) => dir.x === newDirection.x && dir.y === newDirection.y
        );

        if (!isValidDirection) {
          newDirection =
            possibleDirections[
              Math.floor(Math.random() * possibleDirections.length)
            ];
        }
      }
    }

    const newX = ghost.x + newDirection.x;
    const newY = ghost.y + newDirection.y;

    if (
      newX >= 0 &&
      newX < MAZE_WIDTH &&
      newY >= 0 &&
      newY < MAZE_HEIGHT &&
      maze[newY][newX] !== 1
    ) {
      ghost.x = newX;
      ghost.y = newY;
      ghost.direction = newDirection;
    }
  });
};

export const checkCollisions = (ghosts: Ghost[], pacman: Position) => {
  return ghosts.some((ghost) => ghost.x === pacman.x && ghost.y === pacman.y);
};

export const initializeDots = (
  maze: number[][],
  MAZE_WIDTH: number,
  MAZE_HEIGHT: number
): Position[] => {
  const dots: Position[] = [];
  for (let y = 0; y < MAZE_HEIGHT; y++) {
    for (let x = 0; x < MAZE_WIDTH; x++) {
      if (maze[y][x] === 2 || maze[y][x] === 3) {
        dots.push({ x, y });
      }
    }
  }
  return dots;
};

export const initializeGhosts = (): Ghost[] => {
  const colors = ["#FF0000", "#FFB6C1", "#00FFFF", "#FFB852"];
  const ghosts: Ghost[] = [];
  for (let i = 0; i < 4; i++) {
    ghosts.push({
      x: 9 + (i % 2),
      y: 6 + Math.floor(i / 2),
      direction: { x: 0, y: 0 },
      color: colors[i],
      targetX: 1,
      targetY: 1,
    });
  }
  return ghosts;
};
