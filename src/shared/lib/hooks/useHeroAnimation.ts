import { MutableRefObject, RefObject, useEffect, useRef } from 'react';
import { Hero } from '../../../entities/game';
import { Position } from '../../types/globals.ts';
import { colors } from '../../config/styles/variables.ts';

const mouseProximityRadius: number = 20;
const debounceTime: number = 100;

const useHeroAnimation = (
  canvasRef: RefObject<HTMLCanvasElement>,
  heroes: ReadonlyArray<Hero>,
  mousePositionRef: MutableRefObject<Position>,
) => {
  const lastDirectionChangeTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const update = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = colors.background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const now = Date.now();
          heroes.forEach((hero) => {
            hero.update(ctx, canvas, heroes);

            const distance = hero.getDistanceBetweenMouseAndHero(
              mousePositionRef.current,
            );
            if (
              distance < mouseProximityRadius &&
              now - lastDirectionChangeTimeRef.current > debounceTime
            ) {
              hero.changeDirection();
              lastDirectionChangeTimeRef.current = now;
            }
          });

          requestAnimationFrame(update);
        };

        update();
      }
    }
  }, [heroes, mousePositionRef, canvasRef]);
};

export default useHeroAnimation;
