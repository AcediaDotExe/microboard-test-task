import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { colors } from '../../../shared/config/styles/variables.ts';
import './index.scss';
import Hero from '../../../entities/game/Hero.ts';

interface CanvasProps {
  heroes: Hero[];
  setSelectedHeroIndex: Dispatch<SetStateAction<number | null>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Canvas: FC<CanvasProps> = ({
  heroes,
  setSelectedHeroIndex,
  setModalOpen,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && heroes) {
      canvas.width = window.innerWidth - window.innerWidth / 5;
      canvas.height = window.innerHeight - window.innerHeight / 3;
      heroes[0].x = 50;
      heroes[1].x = canvas.width - 50;
    }
  }, [heroes]);

  useEffect(() => {
    resizeCanvas(); // Устанавливаем размер при монтировании
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const update = () => {
          // Очистка канваса перед каждой отрисовкой
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Обновление и отрисовка героев
          if (heroes) {
            heroes.forEach((hero) => {
              hero.update(ctx, canvas, heroes);
            });
          }

          // Запрос следующего кадра
          requestAnimationFrame(update);
        };

        update();
      }
    }
  }, [heroes]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const checkProximity = () => {
      if (heroes) {
        heroes.forEach((hero) => {
          const distanceX = hero.x - mousePosition.current.x;
          const distanceY = hero.y - mousePosition.current.y;
          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY,
          );

          const fieldRadius = 30; // радиус силового поля вокруг курсора

          // Проверка на попадание героя в зону силового поля
          if (distance < fieldRadius) {
            hero.direction *= -1; // Меняем направление героя на противоположное
          }
        });
      }
    };

    const intervalId = setInterval(checkProximity, 50); // Проверяем каждые 100 мс

    return () => clearInterval(intervalId);
  }, [heroes]);

  const handleMouseClick = () => {
    if (heroes) {
      heroes.forEach((hero, index) => {
        const distanceX = hero.x - mousePosition.current.x;
        const distanceY = hero.y - mousePosition.current.y;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY,
        );

        const fieldRadius = 70; // радиус силового поля вокруг курсора
        // Проверка на попадание героя в зону силового поля
        if (distance < fieldRadius) {
          setSelectedHeroIndex(index);
          setModalOpen((prevState) => !prevState);
        }
      });
    }
  };

  return <canvas ref={canvasRef} onClick={() => handleMouseClick()} />;
};

export default Canvas;
