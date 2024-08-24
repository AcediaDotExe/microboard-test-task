import { RefObject, useCallback, useEffect } from 'react';
import { Hero } from '../../../entities/game';

const useCanvasResize = (
  canvasRef: RefObject<HTMLCanvasElement>,
  heroes: ReadonlyArray<Hero>,
) => {
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && heroes) {
      canvas.width = window.innerWidth - window.innerWidth / 5;
      canvas.height = window.innerHeight - window.innerHeight / 3;
      heroes[0].x = 50;
      heroes[1].x = canvas.width - 50;
    }
  }, [heroes, canvasRef]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);
};

export default useCanvasResize;
