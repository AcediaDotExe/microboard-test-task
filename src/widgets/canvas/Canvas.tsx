import { FC, memo, useCallback, useRef } from 'react';
import { Hero } from '../../entities/game';
import {
  useCanvasResize,
  useHeroAnimation,
  useMouseCanvasPositionRef,
} from '../../shared/lib/hooks';
import './Canvas.scss';

interface CanvasProps {
  heroes: ReadonlyArray<Hero>;
  handleOpenModal: (index: number) => void;
}

const mouseHeroClickRadius: number = 80;

const Canvas: FC<CanvasProps> = memo(({ heroes, handleOpenModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useMouseCanvasPositionRef(canvasRef);
  useCanvasResize(canvasRef, heroes);
  useHeroAnimation(canvasRef, heroes, mousePositionRef);

  const handleHeroClick = useCallback(() => {
    heroes.forEach((hero, index) => {
      const distance = hero.getDistanceBetweenMouseAndHero(
        mousePositionRef.current,
      );
      if (distance < mouseHeroClickRadius) {
        handleOpenModal(index);
      }
    });
  }, [heroes, mousePositionRef, handleOpenModal]);

  return <canvas ref={canvasRef} onClick={handleHeroClick} />;
});

export default Canvas;
